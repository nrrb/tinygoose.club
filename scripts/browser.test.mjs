import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'
import { formatMeetupDate, getUpcomingMeetups, meetups } from '../src/content.ts'
const testTime = new Date(`${[...meetups].sort((a, b) => a.date.localeCompare(b.date))[0].date}T12:00:00Z`)
const upcoming = getUpcomingMeetups(testTime)
const nextHref = upcoming[0].href
const url = process.env.TEST_URL || 'http://127.0.0.1:4173'
const browser = await chromium.launch({ channel: 'chrome' })
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.clock.install({ time: testTime })
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
  const labels = ['WAT DIS?! (What is Tiny Goose Club)', 'HOW GUD HONK AKK (Goose Code of Conduct)', 'WEN NEKS?? (Next Events)']
  assert.equal(await page.getByRole('link', { name: labels[1], exact: true }).innerText(), 'HOW GUD HONK AKK\n(Goose Code of Conduct)')
  assert.equal(await page.getByRole('link', { name: labels[2], exact: true }).innerText(), 'WEN NEKS??\n(Next Events)')
  assert.equal(await page.getByRole('link', { name: 'HONK! (Next Event)', exact: true }).getAttribute('href'), nextHref)
  assert.equal(await page.getByRole('link', { name: 'HONK! (Next Event)', exact: true }).innerText(), 'HONK!\n(Next Event)')
  for (const href of ['https://www.instagram.com/sweet_angel_bb/', 'https://www.linkedin.com/in/nicholasrrbennett/', nextHref, ...paths]) {
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
      assert.equal(await page.locator('.link-button img').count(), upcoming.length)
      for (const img of await page.locator('.link-button img').all()) {
        assert.ok(await img.evaluate(el => el.complete && el.naturalWidth === 630 && el.src.endsWith('/photos/goose-event-square.jpg')))
      }
      for (const meetup of upcoming) {
        assert.equal(await page.getByRole('link', { name: formatMeetupDate(meetup.date), exact: false }).getAttribute('href'), meetup.href)
      }
      assert.equal(await page.locator('a[href="https://luma.com/fv61x8o0"]').count(), 0)
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
  await page.clock.pauseAt(new Date(testTime.getTime() + 60_000))
  const aboutLink = page.getByRole('link', { name: 'WAT DIS?! (What is Tiny Goose Club)', exact: true })
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
  await page.route(nextHref, route => route.fulfill({ contentType: 'text/html', body: '<title>Test RSVP destination</title>' }))
  await page.getByRole('link', { name: 'HONK! (Next Event)', exact: true }).click()
  assert.equal(new URL(page.url()).pathname, '/')
  await page.clock.runFor(180)
  await page.waitForURL(nextHref)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(url)
  await page.getByRole('heading', { name: 'tiny goose club', exact: true }).waitFor()
  assert.equal(await page.locator('.honk').evaluate(el => getComputedStyle(el).animationName), 'none')
  await page.getByRole('link', { name: 'WAT DIS?! (What is Tiny Goose Club)', exact: true }).click()
  await page.clock.runFor(1)
  await page.waitForURL('**/what-is-tiny-goose-club')
  await page.goto(url)
  await page.clock.fastForward(24 * 60 * 60 * 1000)
  const afterFirstEvent = getUpcomingMeetups(new Date(testTime.getTime() + 24 * 60 * 60 * 1000))
  if (afterFirstEvent.length) {
    assert.equal(await page.getByRole('link', { name: 'HONK! (Next Event)', exact: true }).getAttribute('href'), afterFirstEvent[0].href, 'An open homepage promotes the next event without a reload')
  } else {
    assert.equal(await page.getByRole('link', { name: 'HONK! (Next Event)', exact: true }).count(), 0)
  }
  await page.goto(url + '/next-events')
  assert.equal(await page.locator(`a[href="${nextHref}"]`).count(), 0, 'Past event disappears from Next Events')
  assert.equal(await page.locator('.link-button img').count(), afterFirstEvent.length)
  const afterAllEvents = new Date(`${upcoming.at(-1).date}T12:00:00Z`)
  afterAllEvents.setUTCDate(afterAllEvents.getUTCDate() + 1)
  await page.clock.setSystemTime(afterAllEvents)
  await page.clock.runFor(60_000)
  await page.getByText('New meetup dates are coming soon. Check back for the next event.', { exact: true }).waitFor()
  assert.equal(await page.locator('.link-button img').count(), 0, 'An open event list expires the final event')
  await page.goto(url)
  assert.equal(await page.getByRole('link', { name: 'HONK! (Next Event)', exact: true }).count(), 0)
  assert.equal(await page.getByRole('link', { name: labels[2], exact: true }).count(), 1, 'Next Events remains reachable with an empty schedule')
  assert.deepEqual(errors, [])
  console.log('Layout, routes, keyboard, delayed press navigation, honk, reduced motion, live event rollover, and empty schedule passed.')
} finally { await browser.close() }
