import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { graphics, featuredLink, homeLinks, pages, meetups } from '../src/content.ts'
for (const src of Object.values(graphics)) assert.ok(existsSync(`public/${src}`), src)
assert.equal(homeLinks.length, 4)
assert.equal(homeLinks[0].href, featuredLink.href)
assert.equal(featuredLink.href, 'https://luma.com/fv61x8o0')
assert.equal(featuredLink.date, 'Thursday, October 22, 2026')
assert.equal(meetups.length, 3)
assert.equal(new Set(meetups.map(meetup => meetup.href)).size, 3)
for (const link of homeLinks) {
  assert.ok(link.label)
  if (link.internal) assert.ok(pages.some(page => page.path === link.href))
  else assert.equal(new URL(link.href).protocol, 'https:')
}
console.log('Graphic assets and all four link destinations passed.')
