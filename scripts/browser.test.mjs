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
  assert.equal(await page.locator('main a').count(), 5)
  assert.equal(await page.locator('p, footer, nav').count(), 0)
  const eventLink = page.getByRole('link', { name: /^NEXT EVENT/ })
  assert.equal(await eventLink.getAttribute('href'), 'https://luma.com/fv61x8o0')
  assert.match(await eventLink.innerText(), /^NEXT EVENT/)
  await page.getByText('Tuesday, October 20, 2026', { exact: true }).waitFor()
  await page.getByText('6–8 PM · America/New_York', { exact: true }).waitFor()
  const paths = ['/what-is-tiny-goose-club', '/how-it-works', '/goose-in-charge', '/next-events']
  const labels = ['What is Tiny Goose Club', 'How It Works', 'Goose in Charge', 'Next Events']
  for (const href of ['https://luma.com/fv61x8o0', ...paths]) {
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), href)
    assert.notEqual(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle), 'none')
  }
  await page.evaluate(() => document.activeElement.blur())
  await page.screenshot({ path: '/tmp/tiny-goose-minimal.png', fullPage: true })
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    for (const link of await page.getByRole('link').all()) assert.ok(await link.evaluate(el => el.getBoundingClientRect().height >= 44))
  }
  await page.getByRole('link', { name: labels[0], exact: true }).click()
  await page.waitForURL('**' + paths[0])
  await page.waitForFunction(() => document.activeElement.tagName === 'H1')
  await page.goBack()
  await page.waitForURL(current => current.pathname === '/')
  await page.goForward()
  await page.waitForURL('**' + paths[0])
  for (let i = 0; i < paths.length; i++) {
    await page.goto(url + paths[i])
    await page.getByRole('heading', { name: labels[i], exact: true }).waitFor()
    assert.equal(await page.title(), labels[i] + ' · Tiny Goose Club')
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://tinygoose.club' + paths[i])
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    await page.getByRole('link', { name: 'Home', exact: true }).click()
    await page.waitForURL(current => current.pathname === '/')
  }
  await page.goto(url + '/about')
  await page.waitForURL(current => current.pathname === '/')
  assert.deepEqual(errors, [])
  console.log('Five links, event details, responsive layout, keyboard focus, routes, and back/forward passed.')
} finally { await browser.close() }
