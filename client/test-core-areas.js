import { chromium } from 'playwright'

async function runCoreAreasTest() {
  console.log('🚀 Running Core Disciplines of Practice UI Verification...')
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

  const baseUrl = 'http://localhost:5173'

  const viewports = [
    { name: 'Mobile (390px)', width: 390, height: 844, screenshot: 'playwright_core_disciplines_390px.png' },
    { name: 'Tablet (768px)', width: 768, height: 1024, screenshot: 'playwright_core_disciplines_768px.png' },
    { name: 'Desktop (1440px)', width: 1440, height: 900, screenshot: 'playwright_core_disciplines_1440px.png' }
  ]

  for (const vp of viewports) {
    console.log(`\n📱 Testing Viewport: ${vp.name}`)
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    const page = await context.newPage()

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(1000)

    const section = page.locator('#core-areas')
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const info = await page.evaluate(() => {
      const sec = document.querySelector('#core-areas')
      const cards = document.querySelectorAll('.core-case-study-card')
      const imgs = document.querySelectorAll('.case-study-img')
      const titles = Array.from(document.querySelectorAll('.case-study-title')).map(el => el.textContent.trim())
      const ctas = Array.from(document.querySelectorAll('.case-study-cta-btn')).map(el => el.textContent.trim())
      const metricGrids = document.querySelectorAll('.case-study-metrics-grid')
      return {
        hasSection: !!sec,
        cardsCount: cards.length,
        imgsCount: imgs.length,
        titles,
        ctas,
        metricGridsCount: metricGrids.length,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      }
    })

    console.log(`  - Section Found: ${info.hasSection ? '✅ YES' : '❌ NO'}`)
    console.log(`  - Case Study Cards Count: ${info.cardsCount} (Expected: 2)`)
    console.log(`  - Images Count: ${info.imgsCount} (Expected: 2)`)
    console.log(`  - Titles:`, info.titles)
    console.log(`  - CTAs:`, info.ctas)
    console.log(`  - Horizontal Overflow: ${info.hasOverflow ? '❌ FAILED' : '✅ PASSED'}`)

    await section.screenshot({ path: vp.screenshot })
    console.log(`  - Screenshot captured: ${vp.screenshot}`)

    await context.close()
  }

  await browser.close()
  console.log('\n✨ Core Disciplines Playwright verification completed successfully!')
}

runCoreAreasTest().catch(console.error)
