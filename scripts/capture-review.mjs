import { chromium, devices } from 'playwright'
import { mkdir } from 'node:fs/promises'

const URL = 'http://localhost:5173/'
const OUT = 'D:/2026_futervisor/.review-shots-v3'

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

// ---------- Desktop ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  await page.screenshot({ path: `${OUT}/desktop-1-hero.png` })

  for (const id of ['solution', 'portfolio', 'pricing', 'contact']) {
    const el = await page.$(`#${id}`)
    if (el) {
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(400)
      await page.screenshot({ path: `${OUT}/desktop-${id}.png` })
    }
  }

  // Compare table - scroll past solution title to expose the table
  await page.evaluate(() => {
    const tbl = document.querySelector('table')
    tbl?.scrollIntoView({ block: 'center' })
  })
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/desktop-compare-table.png` })

  await page.screenshot({ path: `${OUT}/desktop-full.png`, fullPage: true })
  await ctx.close()
}

// ---------- Mobile ----------
{
  const ctx = await browser.newContext({ ...devices['iPhone 13'] })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  await page.screenshot({ path: `${OUT}/mobile-1-hero.png` })

  for (const id of ['portfolio', 'pricing', 'contact']) {
    const el = await page.$(`#${id}`)
    if (el) {
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(400)
      await page.screenshot({ path: `${OUT}/mobile-${id}.png` })
    }
  }

  // Step 1 of contact form
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ block: 'start' })
  })
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/mobile-contact-step1.png` })

  // Fill required fields and click "next" to show step 2
  await page.fill('input[name="company"]', '테스트 주식회사')
  await page.fill('input[name="phone"]', '010-1234-5678')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="message"]', '재고 정산 자동화')
  await page.click('button:has-text("업종·예산 추가하기")')
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/mobile-contact-step2.png` })

  await ctx.close()
}

await browser.close()
console.log('done')
