import { chromium } from 'playwright'

async function runTest() {
  console.log('🧪 Testing updated Hero image and Footer UI...')

  let browser
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true })
  } catch {
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true })
    } catch {
      browser = await chromium.launch({ headless: true })
    }
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 15000 })
  await page.waitForTimeout(1000)

  // 1. Verify Hero image
  const heroImg = page.locator('.portrait-main-img')
  const heroSrc = await heroImg.getAttribute('src')
  const isHeroVisible = await heroImg.isVisible()
  console.log(`  - Hero Image src: ${heroSrc}`)
  console.log(`  - Hero Image visible: ${isHeroVisible ? '✅ YES' : '❌ NO'}`)

  const heroSection = page.locator('.hero-editorial-section')
  await heroSection.screenshot({ path: 'playwright_hero_updated_image.png' })
  console.log('  - Screenshot saved: playwright_hero_updated_image.png')

  // 2. Verify Footer Logo
  const footer = page.locator('.osmo-footer')
  await footer.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)

  const footerLogo = page.locator('.osmo-footer-logo-img')
  const isLogoVisible = await footerLogo.isVisible()
  const filterVal = await footerLogo.evaluate((el) => getComputedStyle(el).filter)
  console.log(`  - Footer Logo visible: ${isLogoVisible ? '✅ YES' : '❌ NO'}`)
  console.log(`  - Footer Logo filter: ${filterVal}`)

  const footerCol = page.locator('.osmo-brand-col')
  await footerCol.screenshot({ path: 'playwright_footer_brand_col.png' })
  console.log('  - Screenshot saved: playwright_footer_brand_col.png')

  await browser.close()
  console.log('\n✨ Verification completed!')
}

runTest()
