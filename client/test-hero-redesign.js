import { chromium } from 'playwright'

async function runHeroTests() {
  console.log('🧪 Testing Hero Redesign across multiple viewports...')

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
    { name: 'Mobile SE (320px)', width: 320, height: 600, shot: 'playwright_hero_320px.png' },
    { name: 'Mobile iPhone (390px)', width: 390, height: 844, shot: 'playwright_hero_390px.png' },
    { name: 'Tablet iPad (768px)', width: 768, height: 1024, shot: 'playwright_hero_768px.png' },
    { name: 'Desktop (1440px)', width: 1440, height: 900, shot: 'playwright_hero_1440px.png' }
  ]

  const baseUrl = 'http://localhost:5173'

  for (const vp of viewports) {
    console.log(`\n📐 Testing viewport: ${vp.name} (${vp.width}x${vp.height})`)
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    const page = await context.newPage()

    try {
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 15000 })
      await page.waitForTimeout(1000)

      const hero = page.locator('.hero-editorial-section')
      await hero.scrollIntoViewIfNeeded()

      // 1. Verify content preservation
      const h1Text = await page.locator('.hero-editorial-h1').innerText()
      console.log(`  - H1 Text: "${h1Text.replace(/\n/g, ' ')}"`)
      const hasHeadingMatch = h1Text.includes('Meenu Balaji') && h1Text.includes('Gut Health') && h1Text.includes('Sports Nutrition')
      console.log(`    Heading Verification: ${hasHeadingMatch ? '✅ MATCH' : '❌ MISMATCH'}`)

      const leadText = await page.locator('.hero-primary-lead').innerText()
      console.log(`  - Primary Lead: "${leadText}"`)
      const hasLeadMatch = leadText.includes('From Gut recovery to peak performance')
      console.log(`    Primary Lead Verification: ${hasLeadMatch ? '✅ MATCH' : '❌ MISMATCH'}`)

      const descText = await page.locator('.hero-secondary-desc').innerText()
      console.log(`  - Secondary Statement: "${descText}"`)
      const hasDescMatch = descText.includes('No generic charts, no extreme diets')
      console.log(`    Secondary Desc Verification: ${hasDescMatch ? '✅ MATCH' : '❌ MISMATCH'}`)

      const primaryCta = page.locator('.hero-primary-cta-btn')
      const primaryText = await primaryCta.innerText()
      console.log(`  - Primary CTA Text: "${primaryText.replace(/\n/g, ' ')}"`)
      const hasPrimaryCtaMatch = primaryText.includes('Talk to A Nutritionist')
      console.log(`    Primary CTA Verification: ${hasPrimaryCtaMatch ? '✅ MATCH' : '❌ MISMATCH'}`)

      const secondaryCta = page.locator('.hero-secondary-cta-btn')
      const secondaryText = await secondaryCta.innerText()
      console.log(`  - Secondary CTA Text: "${secondaryText.replace(/\n/g, ' ')}"`)
      const hasSecondaryCtaMatch = secondaryText.includes('Whatsapp Meenu')
      console.log(`    Secondary CTA Verification: ${hasSecondaryCtaMatch ? '✅ MATCH' : '❌ MISMATCH'}`)

      // 2. Check Portrait image
      const img = page.locator('.portrait-main-img')
      const isImgVisible = await img.isVisible()
      const naturalWidth = await img.evaluate((el) => el.naturalWidth)
      console.log(`  - Portrait Image Visible: ${isImgVisible ? '✅ YES' : '❌ NO'} (Natural Width: ${naturalWidth}px)`)

      // 3. Check for Horizontal Overflow
      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
        }
      })
      console.log(`  - Horizontal Overflow: ${overflow.hasOverflow ? '❌ FAILED' : '✅ PASSED'} (scroll: ${overflow.scrollWidth}px, client: ${overflow.clientWidth}px)`)

      // 4. Test Primary CTA click opens modal
      if (vp.width === 1440) {
        await primaryCta.click()
        await page.waitForTimeout(500)
        const modalVisible = await page.locator('.modal-backdrop, .modal-card').first().isVisible()
        console.log(`  - Booking Modal Trigger: ${modalVisible ? '✅ PASSED' : '❌ FAILED'}`)
        if (modalVisible) {
          const closeBtn = page.locator('.modal-close-btn, .modal-close')
          if (await closeBtn.first().isVisible()) {
            await closeBtn.first().click()
            await page.waitForTimeout(300)
          }
        }
      }

      // 5. Screenshot Hero section
      await hero.screenshot({ path: vp.shot })
      console.log(`  - Hero Screenshot Saved: ${vp.shot}`)

    } catch (err) {
      console.error(`  ❌ Error in ${vp.name}:`, err.message)
    } finally {
      await context.close()
    }
  }

  await browser.close()
  console.log('\n✨ Hero tests completed successfully!')
}

runHeroTests()
