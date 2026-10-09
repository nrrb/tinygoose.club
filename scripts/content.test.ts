import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { portrait, featuredLink } from '../src/content.ts'
assert.ok(existsSync(`public/${portrait.src}`))
assert.ok(portrait.alt)
assert.equal(new URL(featuredLink.href).protocol, 'https:')
assert.ok(featuredLink.label)
console.log('Portrait asset and link content passed.')
