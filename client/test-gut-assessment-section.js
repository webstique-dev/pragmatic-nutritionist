import { chromium } from 'playwright'

async function runTest() {
  console.log('🧪 Testing Gut Assessment Section on Homepage...')

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
    { name: 'Desktop (1440px)', width: 1440, height: 900, shot: 'playwright_gut_section_1440px.png' },
    { name: 'Mobile (390px)', width: 390, height: 844, shot: 'playwright_gut_section_390px.png' }
  ]

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(800)

    const gutSection = page.locator('#gut-assessment')
    await gutSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)

    const isVisible = await gutSection.isVisible()
    console.log(`  - Section visible on ${vp.name}: ${isVisible ? '✅ YES' : '❌ NO'}`)

    // Test interactive sample button click
    const firstOptionBtn = page.locator('.sym-severity-buttons .sym-btn').first()
    if (await firstOptionBtn.isVisible()) {
      await firstOptionBtn.click()
      await page.waitForTimeout(300)
      const scoreText = await page.locator('.preview-score-badge .score-num').innerText()
      console.log(`    Live preview score after click: ${scoreText}/100`)
    }

    // Capture screenshot
    await gutSection.screenshot({ path: vp.shot })
    console.log(`  - Screenshot saved: ${vp.shot}`)

    // Check link navigation
    if (vp.width === 1440) {
      const ctaBtn = page.locator('.gut-primary-cta-btn')
      const targetHref = await ctaBtn.getAttribute('href')
      console.log(`    CTA target href: ${targetHref} (${targetHref === '/gut-health-checker' ? '✅ MATCH' : '❌ MISMATCH'})`)
    }

    await page.close()
  }

  await browser.close()
  console.log('\n✨ Gut Assessment Section tests completed!')
}

runTest()
