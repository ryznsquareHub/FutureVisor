import { chromium, devices } from 'playwright'
import { mkdir } from 'node:fs/promises'

const URL = 'http://localhost:5173/'
const OUT = 'D:/2026_futervisor/.review-mobile-audit'

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

// Mobile
{
  const ctx = await browser.newContext({ ...devices['iPhone 13'] })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${OUT}/mobile-hero.png` })

  // Transition (between Why and Solution)
  await page.evaluate(() => {
    const h = [...document.querySelectorAll('h2')].find((n) =>
      n.textContent?.includes('시간에 쫓겨'),
    )
    h?.scrollIntoView({ block: 'center' })
  })
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/mobile-transition.png` })

  // Pricing
  const pricing = await page.$('#pricing')
  if (pricing) {
    await pricing.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    await page.screenshot({ path: `${OUT}/mobile-pricing.png` })
  }
  await ctx.close()
}

// Desktop
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${OUT}/desktop-hero.png` })

  await page.evaluate(() => {
    const h = [...document.querySelectorAll('h2')].find((n) =>
      n.textContent?.includes('시간에 쫓겨'),
    )
    h?.scrollIntoView({ block: 'center' })
  })
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/desktop-transition.png` })

  const pricing = await page.$('#pricing')
  if (pricing) {
    await pricing.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    await page.screenshot({ path: `${OUT}/desktop-pricing.png` })
  }
  await ctx.close()
}

await browser.close()
console.log('done')
