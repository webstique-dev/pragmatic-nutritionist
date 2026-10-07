import { chromium } from 'playwright'

async function runTest() {
  console.log('🧪 Testing Mobile Navbar Alignment & Layout...')

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

  const viewports = [
    { name: '320px (Mobile SE)', width: 320, height: 600, shot: 'playwright_navbar_320px.png' },
    { name: '390px (iPhone 14)', width: 390, height: 844, shot: 'playwright_navbar_390px.png' },
    { name: '768px (iPad)', width: 768, height: 1024, shot: 'playwright_navbar_768px.png' },
    { name: '1440px (Desktop)', width: 1440, height: 900, shot: 'playwright_navbar_1440px.png' }
  ]

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(800)

    const header = page.locator('.navbar-header')
    await header.screenshot({ path: vp.shot })
    console.log(`  - Navbar Screenshot saved for ${vp.name}: ${vp.shot}`)

    const layout = await page.evaluate(() => {
      const navContainer = document.querySelector('.navbar-container')
      const logo = document.querySelector('.navbar-logo')
      const actions = document.querySelector('.navbar-actions')
      const cta = document.querySelector('.nav-editorial-cta')
      const hamburger = document.querySelector('.navbar-hamburger')

      const navRect = navContainer.getBoundingClientRect()
      const logoRect = logo.getBoundingClientRect()
      const actionsRect = actions.getBoundingClientRect()
      const ctaRect = cta ? cta.getBoundingClientRect() : null
      const hamRect = hamburger ? hamburger.getBoundingClientRect() : null

      return {
        navHeight: navRect.height,
        logoY: logoRect.top,
        actionsY: actionsRect.top,
        ctaRect,
        hamRect
      }
    })

    console.log(`    Navbar height: ${layout.navHeight}px`)
    if (layout.ctaRect && layout.hamRect) {
      const isSideBySide = layout.ctaRect.right <= layout.hamRect.left + 5
      const sameVerticalBand = Math.abs((layout.ctaRect.top + layout.ctaRect.height/2) - (layout.hamRect.top + layout.hamRect.height/2)) < 10
      console.log(`    Side-by-side: ${isSideBySide ? '✅ YES' : '❌ NO'}, Aligned vertically: ${sameVerticalBand ? '✅ YES' : '❌ NO'}`)
    }

    await page.close()
  }

  await browser.close()
  console.log('\n✨ Navbar tests completed successfully!')
}

runTest()
