export const timeZone = 'America/New_York'
export const intro = 'Bring something to make. Spend a couple of hours making it alongside other people. Talking is optional, beginners are welcome, and friendship is a possibility.'
export interface Photo { src: string; alt: string; caption: string }
export const photos: Record<string, Photo> = {
  goose: { src: '', alt: 'Tiny goose figurines', caption: 'A little goose, a little company.' },
  portrait: { src: '', alt: 'Nicholas, the host of Tiny Goose Club', caption: 'Nicholas, your host.' },
  venue: { src: '', alt: 'The conference room at Co-Balt Workspace', caption: 'Our shared table at Co-Balt Workspace.' },
  cones: { src: '', alt: 'Red and green conversation cones', caption: 'A small signal for what you need.' },
  project1: { src: '', alt: 'One of Nicholas’s beginner creative projects', caption: 'A work in progress. Details coming from Nicholas.' },
  project2: { src: '', alt: 'Another of Nicholas’s beginner creative projects', caption: 'Trying something new. Details coming from Nicholas.' },
}
export const personal = { originStory: '', tinyGooseStory: '', additionalDetails: '' }
// Unconfirmed details stay out of the published site.
export const unpublished = { arrival: '', accessibility: '', materialsRestrictions: '', wifi: '', outlets: '' }
export interface Meetup { id: string; title: string; start: string; end: string; venue: string; url: string }
export const events: Meetup[] = [{
  id: 'first-meetup', title: 'Our first meetup',
  start: '2026-10-20T18:00:00-04:00', end: '2026-10-20T20:00:00-04:00',
  venue: 'Co-Balt Workspace, Hampden, Baltimore', url: 'https://luma.com/fv61x8o0',
}]
export function partitionEvents(now = Date.now()) {
  return {
    upcoming: events.filter(e => Date.parse(e.end) >= now).sort((a,b) => Date.parse(a.start) - Date.parse(b.start)),
    past: events.filter(e => Date.parse(e.end) < now).sort((a,b) => Date.parse(b.start) - Date.parse(a.start)),
  }
}
export function eventDate(event: Meetup) {
  return new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(event.start))
}
export function eventTime(event: Meetup) {
  const format = new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' })
  return `${format.format(new Date(event.start))}–${format.format(new Date(event.end))}`
}
