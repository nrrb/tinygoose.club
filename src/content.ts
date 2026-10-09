export const graphics = {
  title: 'photos/tiny-goose-club-title-844x256.png',
  host: 'photos/nicholas-host-128x128.jpg',
  meetup: 'photos/honk-next-meetup-128x128.jpg',
  about: 'photos/wut-dis-128x128.jpg',
  conduct: 'photos/goose-conduct-128x128.jpg',
  events: 'photos/next-times-128x128.jpg',
}
export const homeLinks = [
  { href: 'https://luma.com/fv61x8o0', headline: 'HONK!', label: 'NEXT MEETUP!', image: graphics.meetup, internal: false },
  { href: '/what-is-tiny-goose-club', label: 'WUT DIS?!', image: graphics.about, internal: true },
  { href: '/code-of-goose-conduct', label: 'Code of Goose Conduct', image: graphics.conduct, internal: true },
  { href: '/next-events', label: 'Next Times', image: graphics.events, internal: true },
]
export const featuredLink = {
  href: 'https://luma.com/fv61x8o0',
  label: 'NEXT EVENT',
  title: 'Our first meetup',
  date: 'Tuesday, October 20, 2026',
  time: '6–8 PM · America/New_York',
  venue: 'Co-Balt Workspace, Hampden, Baltimore',
}
export interface InfoPage {
  path: string
  label: string
  paragraphs: string[]
}
export const pages: InfoPage[] = [
  {
    path: '/what-is-tiny-goose-club',
    label: 'What is Tiny Goose Club',
    paragraphs: [
      'A creative meetup for dabblers in Hampden, Baltimore. Bring something to make and spend a couple of hours making it alongside other people.',
      'Drawing, writing, knitting, button-making, coding—beginners and unfinished projects are welcome. Talking is optional, and friendship is a possibility. This is a queer- and neurodivergent-friendly gathering.',
    ],
  },
  {
    path: '/how-it-works',
    label: 'How It Works',
    paragraphs: [
      'Bring a project and your own supplies. We gather around a shared table in a conference room at Co-Balt Workspace, the coworking office where Nicholas works.',
      'Chat, concentrate, or switch between the two. Headphones are welcome. Show-and-tell is optional, with Nicholas sharing first.',
    ],
  },
  {
    path: '/goose-in-charge',
    label: 'Goose in Charge',
    paragraphs: [
      'Hi, I’m Nicholas. I’m a frontend developer in Baltimore, a queer neurodivergent creative dabbler, and the person putting Tiny Goose Club together.',
      'I like working on stuff with other people around who are also working on stuff. I’m hoping this becomes a place where we can try things, share what we’re making in a supportive space, and make some other creative friends.',
    ],
  },
  { path: '/next-events', label: 'Next Events', paragraphs: [] },
  { path: '/code-of-goose-conduct', label: 'Code of Goose Conduct', paragraphs: ['Conduct details are coming soon.'] },
]
