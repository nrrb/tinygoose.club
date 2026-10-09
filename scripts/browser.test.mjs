import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'
const url = process.env.TEST_URL || 'http://127.0.0.1:4173'
const browser = await chromium.launch({ channel: 'chrome' })
try {
  const page = await browser.newPage({ viewport: { width: 448, height: 894 } })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(url)
  await page.getByRole('img').waitFor()
  await page.evaluate(() => document.fonts.ready)
  assert.ok(await page.getByRole('img').evaluate(img => img.complete && img.naturalWidth === 440))
  assert.equal(await page.locator('main a').count(), 1)
  assert.equal(await page.locator('p, footer, nav').count(), 0)
  assert.equal(await page.getByRole('link').getAttribute('href'), 'https://beacons.ai')
  assert.equal(await page.getByRole('link').innerText(), 'Make your own Beacons page')
  await page.keyboard.press('Tab')
  assert.equal(await page.evaluate(() => document.activeElement.tagName), 'A')
  assert.notEqual(await page.getByRole('link').evaluate(el => getComputedStyle(el).outlineStyle), 'none')
  await page.getByRole('link').evaluate(el => el.blur())
  await page.screenshot({ path: '/tmp/tiny-goose-minimal.png', fullPage: true })
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    assert.ok(await page.getByRole('link').evaluate(el => el.getBoundingClientRect().height >= 44))
  }
  await page.goto(url + '/about')
  await page.waitForURL(current => current.pathname === '/')
  assert.deepEqual(errors, [])
  console.log('Minimal layout, portrait, link, keyboard, responsive widths, and legacy redirect passed.')
} finally { await browser.close() }
