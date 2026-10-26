import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { formatMeetupDate, getUpcomingMeetups, graphics, homeLinks, pages, meetups } from '../src/content.ts'
for (const src of Object.values(graphics)) assert.ok(existsSync(`public/${src}`), src)
assert.equal(homeLinks.length, 3)
assert.equal(new Set(meetups.map(meetup => meetup.href)).size, meetups.length)
for (const meetup of meetups) {
  assert.equal(new URL(meetup.href).protocol, 'https:')
  assert.match(meetup.date, /^\d{4}-\d{2}-\d{2}$/)
  assert.equal(new Date(meetup.date).toISOString().slice(0, 10), meetup.date)
  assert.ok(meetup.time)
}
for (const link of homeLinks) {
  assert.ok(link.label)
  if (link.internal) assert.ok(pages.some(page => page.path === link.href))
  else assert.equal(new URL(link.href).protocol, 'https:')
}
const events = [
  { href: 'https://luma.com/later', date: '2026-11-19', time: '6–8 PM' },
  { href: 'https://luma.com/first', date: '2026-10-22', time: '6–8 PM' },
  { href: 'https://luma.com/next', date: '2026-11-05', time: '6–8 PM' },
]
const datesAt = (now: string) => getUpcomingMeetups(new Date(now), events).map(event => event.date)
assert.deepEqual(datesAt('2026-10-22T03:59:59Z'), ['2026-10-22', '2026-11-05', '2026-11-19'])
assert.deepEqual(datesAt('2026-10-23T03:59:59Z'), ['2026-10-22', '2026-11-05', '2026-11-19'], 'Keep an event until its Baltimore day ends, even when UTC is already tomorrow')
assert.deepEqual(datesAt('2026-10-23T04:00:00Z'), ['2026-11-05', '2026-11-19'])
assert.deepEqual(datesAt('2026-10-26T12:00:00Z'), ['2026-11-05', '2026-11-19'])
assert.deepEqual(datesAt('2026-11-06T04:59:59Z'), ['2026-11-05', '2026-11-19'])
assert.deepEqual(datesAt('2026-11-06T05:00:00Z'), ['2026-11-19'], 'Use the standard-time midnight after DST ends')
assert.deepEqual(datesAt('2026-11-20T05:00:00Z'), [])
assert.deepEqual(getUpcomingMeetups(new Date('2026-10-26T12:00:00Z'), []), [])
assert.equal(events[0].date, '2026-11-19', 'Sorting must not mutate the manually maintained list')
assert.equal(formatMeetupDate('2026-11-05'), 'Thursday, November 5, 2026')
for (const [date, before, midnight] of [
  ['2026-03-08', '2026-03-09T03:59:59Z', '2026-03-09T04:00:00Z'],
  ['2026-11-01', '2026-11-02T04:59:59Z', '2026-11-02T05:00:00Z'],
]) {
  const event = [{ href: 'https://luma.com/dst', date: date!, time: '6–8 PM' }]
  assert.equal(getUpcomingMeetups(new Date(before!), event).length, 1)
  assert.equal(getUpcomingMeetups(new Date(midnight!), event).length, 0, 'Handle both DST transition days')
}
console.log('Assets, links, event dates, sorting, Baltimore midnight, DST, and empty schedules passed.')
