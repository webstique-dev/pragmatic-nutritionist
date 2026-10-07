import { chromium } from 'playwright'

async function runTest() {
  console.log('🧪 Testing Placeholder Page UI Fixes (/gut-health)...')

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
    { name: 'Desktop (1440px)', width: 1440, height: 900, shot: 'playwright_placeholder_1440px.png' },
    { name: 'Mobile (390px)', width: 390, height: 844, shot: 'playwright_placeholder_390px.png' }
  ]

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
    await page.goto('http://localhost:5173/gut-health', { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(800)

    const section = page.locator('.placeholder-content-section')
    await section.scrollIntoViewIfNeeded()
    await section.screenshot({ path: vp.shot })
    console.log(`  - Screenshot saved for ${vp.name}: ${vp.shot}`)

    const layoutCheck = await page.evaluate(() => {
      const cards = document.querySelectorAll('.subtopic-card')
      const features = document.querySelectorAll('.placeholder-feature')
      
      let maxCardOverflow = false
      cards.forEach((c) => {
        if (c.scrollWidth > c.clientWidth + 2) maxCardOverflow = true
      })

      const feature1 = features[0]
      const strongEl = feature1 ? feature1.querySelector('strong') : null
      const spanEl = feature1 ? feature1.querySelector('span') : null

      const isStacked = strongEl && spanEl ? strongEl.getBoundingClientRect().bottom <= spanEl.getBoundingClientRect().top + 2 : false

      return {
        cardsCount: cards.length,
        featuresCount: features.length,
        maxCardOverflow,
        isFeatureStacked: isStacked
      }
    })

    console.log(`    Features count: ${layoutCheck.featuresCount}, Stacked vertically: ${layoutCheck.isFeatureStacked ? '✅ YES' : '❌ NO'}`)
    console.log(`    Subtopic cards count: ${layoutCheck.cardsCount}, Card horizontal overflow: ${layoutCheck.maxCardOverflow ? '❌ YES' : '✅ NO'}`)

    await page.close()
  }

  await browser.close()
  console.log('\n✨ Placeholder page verification completed!')
}

runTest()
