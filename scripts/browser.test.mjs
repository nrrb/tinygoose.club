import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'
const url = process.env.TEST_URL || 'http://127.0.0.1:4173'
const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, timezoneId: 'Pacific/Auckland' })
await page.clock.setFixedTime(new Date('2026-10-08T12:00:00-04:00'))
page.setDefaultTimeout(10000)
const errors = []
page.on('pageerror', error => errors.push(error.message))
try {
  await page.goto(url)
  await page.getByRole('heading', { level: 1 }).waitFor()
  assert.equal(await page.title(), 'Tiny Goose Club')
  assert.equal(await page.getByRole('link', { name: 'View event & RSVP' }).getAttribute('href'), 'https://luma.com/fv61x8o0')
  await page.getByText('Tuesday, October 20, 2026', { exact: false }).waitFor()
  assert.ok(await page.locator('.link-list').evaluate(el => el.getBoundingClientRect().bottom <= 844), 'Main navigation fits mobile viewport')
  await page.keyboard.press('Tab')
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content')
  await page.keyboard.press('Enter')
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main')
  for (const href of ['https://luma.com/fv61x8o0', '/about', '/how-it-works', '/cones', '/nicholas']) {
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), href)
    assert.ok(await page.evaluate(() => document.activeElement.getBoundingClientRect().height >= 44))
    assert.notEqual(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle), 'none')
  }
  await page.getByRole('link', { name: 'What’s Tiny Goose Club?' }).click()
  await page.waitForURL('**/about')
  await page.waitForFunction(() => document.activeElement?.tagName === 'H1')
  assert.match(await page.title(), /What’s Tiny Goose Club/)
  await page.goBack()
  await page.waitForURL(current => current.pathname === '/')
  await page.goForward()
  await page.waitForURL('**/about')
  for (const path of ['/about', '/how-it-works', '/cones', '/nicholas', '/events', '/missing']) {
    await page.goto(url + path)
    await page.getByRole('heading', { level: 1 }).waitFor()
    assert.ok(await page.getByRole('link', { name: '← Home', exact: true }).count())
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://tinygoose.club' + path)
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path + ' has no horizontal overflow')
    if (path === '/cones') {
      await page.getByRole('heading', { name: 'Green on top' }).waitFor()
      await page.getByRole('heading', { name: 'Red on top' }).waitFor()
    }
    if (path === '/events') assert.equal(await page.getByRole('link', { name: 'View event & RSVP' }).getAttribute('href'), 'https://luma.com/fv61x8o0')
  }
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(url)
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `No overflow at ${width}px`)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: '/tmp/tiny-goose-mobile.png', fullPage: true })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.screenshot({ path: '/tmp/tiny-goose-desktop.png', fullPage: true })
  assert.deepEqual(errors, [])
  console.log('Mobile, keyboard, route focus, back/forward, direct routes, metadata, and Luma links passed.')
} finally { await browser.close() }
