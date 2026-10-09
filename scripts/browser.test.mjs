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
  await page.evaluate(() => document.fonts.ready)
  assert.ok(await page.evaluate(() => Array.from(document.fonts).some(font => font.family === 'Bangers' && font.status === 'loaded')))
  await page.waitForFunction(() => document.querySelector('.honk').getAnimations().length > 0)
  assert.ok(await page.locator('.honk').evaluate(el => {
    const animation = el.getAnimations()[0]
    animation.pause()
    animation.currentTime = 360
    return el.getBoundingClientRect().width > el.closest('a').getBoundingClientRect().width
  }), 'Opening honk grows wider than its button')
  await page.locator('.honk').evaluate(el => el.getAnimations()[0].finish())
  assert.equal(await page.locator('.honk').evaluate(el => getComputedStyle(el).transform), 'none')
  assert.equal(await page.getByRole('link').count(), 6)
  assert.equal(await page.getByRole('link', { name: 'Nicholas on Instagram (@sweet_angel_bb)', exact: true }).getAttribute('href'), 'https://www.instagram.com/sweet_angel_bb/')
  assert.equal(await page.getByRole('link', { name: 'Nicholas on LinkedIn (nicholasrrbennett)', exact: true }).getAttribute('href'), 'https://www.linkedin.com/in/nicholasrrbennett/')
  assert.equal(await page.locator('footer').innerText(), 'tinygoose.club created with ❤️ for Baltimore by Nicholas Bennett')
  const paths = ['/what-is-tiny-goose-club', '/goose-code-of-conduct', '/next-events']
  const labels = ['WAT DIS?!', 'Goose Code of Conduct', 'Next Times']
  assert.equal(await page.getByRole('link', { name: 'HONK! NEXT MEETUP!', exact: true }).getAttribute('href'), 'https://luma.com/fv61x8o0')
  assert.equal(await page.getByRole('link', { name: 'HONK! NEXT MEETUP!', exact: true }).innerText(), 'HONK!\nNEXT MEETUP!')
  for (const href of ['https://www.instagram.com/sweet_angel_bb/', 'https://www.linkedin.com/in/nicholasrrbennett/', 'https://luma.com/fv61x8o0', ...paths]) {
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), href)
    assert.notEqual(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle), 'none')
  }
  await page.evaluate(() => document.activeElement.blur())
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    for (const img of await page.locator('.host-row img, .link-button img').all()) {
      assert.ok(await img.evaluate(el => el.complete && el.naturalWidth === 128 && el.naturalHeight === 128))
      const size = await img.evaluate(el => el.closest('.host-row') ? 64 : 128)
      assert.deepEqual(await img.evaluate(el => { const r = el.getBoundingClientRect(); return [r.width, r.height] }), [size, size])
    }
    assert.ok(await page.locator('.title-row').evaluate(row => {
      const image = row.querySelector('img').getBoundingClientRect()
      const goose = row.querySelector('span').getBoundingClientRect()
      const bounds = row.getBoundingClientRect()
      return Math.abs(image.left - bounds.left) < 1 && Math.abs(goose.right - bounds.right) < 1 && Math.abs(image.height - goose.height) < 1
    }))
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(url)
  await page.getByRole('heading', { name: 'tiny goose club', exact: true }).waitFor()
  await page.screenshot({ path: '/tmp/tiny-goose-sitelayout-mobile.png', fullPage: true })
  await page.getByRole('link', { name: labels[0], exact: true }).click()
  await page.waitForURL('**' + paths[0])
  await page.waitForFunction(() => document.activeElement.tagName === 'H1')
  assert.equal(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle), 'none')
  await page.goBack()
  await page.waitForURL(current => current.pathname === '/')
  assert.equal(await page.locator('.honk').evaluate(el => el.getAnimations().length), 0, 'Honk does not repeat on internal Home navigation')
  await page.goForward()
  await page.waitForURL('**' + paths[0])
  for (const path of paths) {
    await page.goto(url + path)
    if (path === '/what-is-tiny-goose-club') {
      await page.getByRole('heading', { name: 'A look at the space', exact: true }).waitFor()
      assert.equal(await page.getByRole('link', { name: 'Visit Co-Balt Workspace', exact: true }).getAttribute('href'), 'https://cobaltworkspace.com/')
      assert.ok(await page.locator('.meeting-space img').evaluate(img => img.complete && img.naturalWidth === 1000))
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    }
    if (path === '/next-events') {
      await page.getByText('Thursday, October 22, 2026', { exact: true }).waitFor()
      assert.equal(await page.getByRole('link', { name: /Thursday, November 5, 2026/ }).getAttribute('href'), 'https://luma.com/3h6fh921')
      assert.equal(await page.getByRole('link', { name: /Thursday, November 19, 2026/ }).getAttribute('href'), 'https://luma.com/8jb3leku')
      assert.equal(await page.getByText('6–8 PM', { exact: true }).count(), 3)
      assert.equal(await page.getByText('Co-Balt Workspace, Hampden, Baltimore', { exact: true }).count(), 3)
    }
    if (path === '/goose-code-of-conduct') {
      await page.getByRole('heading', { name: 'Goose Code of Conduct', exact: true }).waitFor()
      assert.equal(await page.getByRole('heading', { level: 2 }).count(), 7)
      await page.getByRole('heading', { name: 'Respect the space', exact: true }).waitFor()
      assert.equal(await page.locator('.conduct-copy strong').count(), 2)
      await page.getByText('These expectations apply to everyone, including me, at our meetups and in Tiny Goose Club’s event-related online spaces.', { exact: true }).waitFor()
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    }
    await page.getByRole('link', { name: 'Home', exact: true }).click()
    await page.waitForURL(current => current.pathname === '/')
  }
  await page.goto(url + '/code-of-goose-conduct')
  await page.waitForURL('**/goose-code-of-conduct')
  await page.getByRole('heading', { name: 'Goose Code of Conduct', exact: true }).waitFor()
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await page.waitForURL(current => current.pathname === '/')
  const testTime = new Date('2026-10-09T12:00:00Z')
  await page.clock.install({ time: testTime })
  await page.clock.pauseAt(testTime)
  const aboutLink = page.getByRole('link', { name: 'WAT DIS?!', exact: true })
  assert.ok(await aboutLink.evaluate(el => {
    let preserved = false
    el.addEventListener('click', event => { preserved = !event.defaultPrevented; event.preventDefault() }, { once: true })
    el.dispatchEvent(new MouseEvent('click', { ctrlKey: true, bubbles: true, cancelable: true }))
    return preserved && !el.classList.contains('is-pressed')
  }), 'Modified clicks keep native browser behavior')
  await aboutLink.focus()
  await page.keyboard.press('Enter')
  assert.equal(new URL(page.url()).pathname, '/')
  assert.equal(await page.locator('.is-pressed').count(), 1)
  await page.clock.runFor(179)
  assert.equal(new URL(page.url()).pathname, '/')
  await page.clock.runFor(1)
  await page.waitForURL('**/what-is-tiny-goose-club')
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await page.clock.runFor(180)
  await page.waitForURL(current => current.pathname === '/')
  await page.route('https://luma.com/fv61x8o0', route => route.fulfill({ contentType: 'text/html', body: '<title>Test RSVP destination</title>' }))
  await page.getByRole('link', { name: 'HONK! NEXT MEETUP!', exact: true }).click()
  assert.equal(new URL(page.url()).pathname, '/')
  await page.clock.runFor(180)
  await page.waitForURL('https://luma.com/fv61x8o0')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(url)
  await page.getByRole('heading', { name: 'tiny goose club', exact: true }).waitFor()
  assert.equal(await page.locator('.honk').evaluate(el => getComputedStyle(el).animationName), 'none')
  await page.getByRole('link', { name: 'WAT DIS?!', exact: true }).click()
  await page.clock.runFor(1)
  await page.waitForURL('**/what-is-tiny-goose-club')
  assert.deepEqual(errors, [])
  console.log('Layout, routes, keyboard, delayed press navigation, oversized honk, and reduced motion passed.')
} finally { await browser.close() }
