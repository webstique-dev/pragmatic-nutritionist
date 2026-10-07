import { chromium } from 'playwright'

async function testCoreAreas() {
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
  await page.goto('http://localhost:5173/#services', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1000)

  const section = page.locator('#services')
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await section.screenshot({ path: 'core_areas_badges_fixed.png' })

  await browser.close()
  console.log('Done verifying core areas badges!')
}

testCoreAreas().catch(console.error)
