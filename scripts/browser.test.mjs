import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'
const url = process.env.TEST_URL || 'http://127.0.0.1:4173'
const browser = await chromium.launch({ channel: 'chrome' })
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(url)
  await page.getByRole('heading', { name: 'tiny goose club', exact: true }).waitFor()
  assert.equal(await page.getByRole('link').count(), 4)
  assert.equal(await page.locator('footer').innerText(), 'tinygoose.club created with ❤️ for Baltimore by Nicholas Bennett')
  const paths = ['/what-is-tiny-goose-club', '/code-of-goose-conduct', '/next-events']
  const labels = ['WUT DIS?!', 'Code of Goose Conduct', 'Next Times']
  assert.equal(await page.getByRole('link', { name: 'HONK! / NEXT MEETUP!', exact: true }).getAttribute('href'), 'https://luma.com/fv61x8o0')
  for (const href of ['https://luma.com/fv61x8o0', ...paths]) {
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), href)
    assert.notEqual(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle), 'none')
  }
  await page.evaluate(() => document.activeElement.blur())
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    for (const img of await page.locator('.host-row img, .link-button img').all()) {
      assert.ok(await img.evaluate(el => el.complete && el.naturalWidth > 0))
      assert.deepEqual(await img.evaluate(el => { const r = el.getBoundingClientRect(); return [r.width, r.height] }), [128, 128])
    }
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(url)
  await page.getByRole('heading', { name: 'tiny goose club', exact: true }).waitFor()
  await page.screenshot({ path: '/tmp/tiny-goose-sitelayout-mobile.png', fullPage: true })
  await page.getByRole('link', { name: labels[0], exact: true }).click()
  await page.waitForURL('**' + paths[0])
  await page.waitForFunction(() => document.activeElement.tagName === 'H1')
  await page.goBack()
  await page.waitForURL(current => current.pathname === '/')
  await page.goForward()
  await page.waitForURL('**' + paths[0])
  for (const path of paths) {
    await page.goto(url + path)
    await page.getByRole('link', { name: 'Home', exact: true }).click()
    await page.waitForURL(current => current.pathname === '/')
  }
  assert.deepEqual(errors, [])
  console.log('Row layout, 128px graphics, four links, keyboard focus, routes, and responsive widths passed.')
} finally { await browser.close() }
