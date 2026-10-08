import assert from 'node:assert/strict'
import { events, partitionEvents, eventDate, eventTime } from '../src/content.ts'
const event = events[0]!
assert.equal(partitionEvents(Date.parse(event.end)).upcoming.length, 1)
assert.equal(partitionEvents(Date.parse(event.end) + 1).past.length, 1)
assert.equal(eventDate(event), 'Tuesday, October 20, 2026')
assert.equal(eventTime(event), '6:00 PM–8:00 PM')
for (const e of events) {
  assert.ok(Date.parse(e.end) > Date.parse(e.start))
  assert.match(e.start, /[+-]\d{2}:\d{2}$/)
  assert.match(e.end, /[+-]\d{2}:\d{2}$/)
  assert.equal(new URL(e.url).hostname, 'luma.com')
}
console.log('Event boundary, timezone, and content checks passed.')
