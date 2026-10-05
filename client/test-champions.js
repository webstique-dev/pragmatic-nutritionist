import { chromium } from 'playwright'

async function runChampionsTest() {
  console.log('🚀 Running Champions Showcase Test...')
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

  // Desktop Test
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const desktopPage = await desktopCtx.newPage()

  desktopPage.on('console', msg => console.log('PAGE LOG:', msg.text()))
  desktopPage.on('pageerror', err => console.log('PAGE ERROR:', err))
  desktopPage.on('response', resp => {
    if (resp.status() >= 400) {
      console.log('HTTP ERROR:', resp.status(), resp.url())
    }
  })

  await desktopPage.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await desktopPage.waitForTimeout(2000)

  const championsDesktop = desktopPage.locator('#champions')
  await championsDesktop.scrollIntoViewIfNeeded()
  await desktopPage.waitForTimeout(500)

  const desktopInfo = await desktopPage.evaluate(() => {
    const section = document.querySelector('#champions')
    const title = document.querySelector('.champions-display-title')
    const cards = document.querySelectorAll('.athlete-showcase-card')
    const imgs = document.querySelectorAll('.athlete-framed-img')
    const ctaStrip = document.querySelector('.young-athlete-cta-strip')
    return {
      hasSection: !!section,
      titleText: title?.textContent?.trim(),
      cardsCount: cards.length,
      imgsCount: imgs.length,
      hasCtaStrip: !!ctaStrip
    }
  })

  console.log('Desktop Check:', desktopInfo)
  await championsDesktop.screenshot({ path: 'playwright_champions_1440px.png' })
  console.log('✅ Captured playwright_champions_1440px.png')

  // Mobile Test
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const mobilePage = await mobileCtx.newPage()
  await mobilePage.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await mobilePage.waitForTimeout(1000)

  const championsMobile = mobilePage.locator('#champions')
  await championsMobile.scrollIntoViewIfNeeded()
  await mobilePage.waitForTimeout(500)

  const mobileInfo = await mobilePage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    }
  })

  console.log('Mobile Check (390px):', mobileInfo)
  await championsMobile.screenshot({ path: 'playwright_champions_390px.png' })
  console.log('✅ Captured playwright_champions_390px.png')

  await browser.close()
  console.log('✨ Done testing Champions Showcase!')
}

runChampionsTest().catch(console.error)
