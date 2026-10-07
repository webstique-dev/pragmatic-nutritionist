import { chromium } from 'playwright'

async function verifyAll() {
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

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1000)

  // Screenshot Core Areas
  const services = page.locator('#services')
  await services.scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  await services.screenshot({ path: 'verify_core_badges.png' })

  // Screenshot Footer
  const footer = page.locator('footer')
  await footer.scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  await footer.screenshot({ path: 'verify_footer_wa.png' })

  await browser.close()
  console.log('Verification screenshots captured!')
}

verifyAll().catch(console.error)
