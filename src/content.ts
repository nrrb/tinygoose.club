export const graphics = {
  title: 'photos/tiny-goose-club-title-844x256.png',
  host: 'photos/nicholas-host-128x128.jpg',
  meetup: 'photos/honk-next-meetup-128x128.jpg',
  about: 'photos/wut-dis-128x128.jpg',
  conduct: 'photos/goose-conduct-128x128.jpg',
  events: 'photos/next-times-128x128.jpg',
}
export const homeLinks = [
  { href: 'https://luma.com/fv61x8o0', headline: 'HONK!', label: '(NEXT EVENT!)', image: graphics.meetup, internal: false },
  { href: '/what-is-tiny-goose-club', label: 'WAT DIS?!', image: graphics.about, internal: true },
  { href: '/goose-code-of-conduct', headline: 'HOW GUD HONK AKK', label: 'Goose Code of Conduct', image: graphics.conduct, internal: true },
  { href: '/next-events', headline: 'WEN NEKS??', label: '(Next Events)', image: graphics.events, internal: true },
]
export const hostProfiles = {
  instagram: 'https://www.instagram.com/sweet_angel_bb/',
  linkedin: 'https://www.linkedin.com/in/nicholasrrbennett/',
}
export const meetingSpace = {
  image: 'photos/meeting-place.jpg',
  alt: 'Co-Balt conference room with a long wooden table, chairs, a bench along the glass wall, and a wall-mounted screen.',
  caption: "The conference room at Co-Balt Workspace where we'll make things together.",
  href: 'https://cobaltworkspace.com/',
  description: "I started working full-time from Co-Balt Workspace in August 2026. I've found it to be a calm, quiet place to work, with room for social connections when they happen naturally. It felt like a good place to bring Tiny Goose Club to life.",
}
export const featuredLink = {
  href: 'https://luma.com/fv61x8o0',
  label: 'NEXT EVENT',
  title: 'Our first meetup',
  date: 'Thursday, October 22, 2026',
  time: '6–8 PM',
  venue: 'Co-Balt Workspace, Hampden, Baltimore',
}
interface Meetup {
  href: string
  label: string
  time: string
  title?: string
  date?: string
  venue?: string
}
export const meetups: Meetup[] = [
  featuredLink,
  { href: 'https://luma.com/3h6fh921', label: 'Thursday, November 5, 2026', time: featuredLink.time, venue: featuredLink.venue },
  { href: 'https://luma.com/8jb3leku', label: 'Thursday, November 19, 2026', time: featuredLink.time, venue: featuredLink.venue },
]
export interface InfoPage {
  path: string
  label: string
  paragraphs: string[]
}
export const pages: InfoPage[] = [
  {
    path: '/what-is-tiny-goose-club',
    label: 'What is Tiny Goose Club 🪿',
    paragraphs: [
      'A creative meetup for dabblers in Hampden, Baltimore. Bring something to make and spend a couple of hours making it alongside other people.',
      "I'm Nicholas, and I wanted a quiet creative meetup for myself. I couldn't find one locally that felt like what I was looking for, so I decided to make it myself.",
      'I wanted it to feel safe for people like me, queer and neurodivergent, and for my friends, some of whom are trans, differently abled, queer, or neurodivergent. I want us to be able to show up as ourselves and participate in whatever way feels comfortable.',
      "What I was mainly looking for was body doubling: having other people around, working on their own things, while I work on mine. We don't have to talk or work on the same project. Sometimes just making something in company is enough.",
      "I also wanted to bring back that childhood excitement of Show and Tell: getting to share something you've made with people who are happy to see it. Show and Tell is optional, and the response is encouragement. There's no pressure to share, finish anything, or impress anyone.",
      'Drawing, writing, knitting, button-making, coding, beginners and unfinished projects are welcome. Bring a project and your own supplies. Talking is optional, and friendship is a possibility.',
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
  { path: '/goose-code-of-conduct', label: 'Goose Code of Conduct', paragraphs: ['Tiny Goose Club’s Making Stuff in Company meetups are a place to create alongside other people, try something new, and feel welcome doing it.'] },
]
