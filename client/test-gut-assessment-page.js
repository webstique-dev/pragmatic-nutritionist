import { chromium } from 'playwright'

async function runTest() {
  console.log('🧪 Testing /gut-health-checker UI across viewports...')

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
    { name: 'Desktop (1440px)', width: 1440, height: 900, shot: 'playwright_assessment_page_1440px.png' },
    { name: 'Tablet (768px)', width: 768, height: 1024, shot: 'playwright_assessment_page_768px.png' },
    { name: 'Mobile (390px)', width: 390, height: 844, shot: 'playwright_assessment_page_390px.png' }
  ]

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
    await page.goto('http://localhost:5173/gut-health-checker', { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(800)

    // Capture main wizard screenshot
    const mainSection = page.locator('.assessment-body-section')
    await mainSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    await mainSection.screenshot({ path: vp.shot })
    console.log(`  - Screenshot saved for ${vp.name}: ${vp.shot}`)

    // Check overlap between score gauge and title
    if (vp.width === 1440) {
      const gaugeLayout = await page.evaluate(() => {
        const gauge = document.querySelector('.score-visual-gauge')
        const scoreNum = document.querySelector('.score-big-num')
        const title = document.querySelector('.emotion-state-title')
        const rowButtons = document.querySelectorAll('.severity-pill-group')

        const gaugeRect = gauge.getBoundingClientRect()
        const titleRect = title.getBoundingClientRect()
        const overlaps = gaugeRect.bottom > titleRect.top

        return {
          gaugeBottom: gaugeRect.bottom,
          titleTop: titleRect.top,
          overlaps,
          rowCount: rowButtons.length
        }
      })

      console.log(`    Gauge & Title Overlap Check: ${gaugeLayout.overlaps ? '❌ OVERLAPPING' : '✅ CLEAN SEPARATION'}`)
    }

    await page.close()
  }

  await browser.close()
  console.log('\n✨ /gut-health-checker tests completed!')
}

runTest()
