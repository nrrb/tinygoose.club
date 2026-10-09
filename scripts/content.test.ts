import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { portrait, featuredLink, pages } from '../src/content.ts'
assert.ok(existsSync(`public/${portrait.src}`))
assert.ok(portrait.alt)
assert.equal(new URL(featuredLink.href).protocol, 'https:')
assert.ok(featuredLink.label)
assert.equal(featuredLink.href, 'https://luma.com/fv61x8o0')
assert.equal(featuredLink.date, 'Tuesday, October 20, 2026')
assert.equal(featuredLink.time, '6–8 PM · America/New_York')
assert.equal(pages.length, 4)
assert.equal(new Set(pages.map(page => page.path)).size, 4)
console.log('Portrait asset and link content passed.')
