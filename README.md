# Tiny Goose Club 🪿

[tinygoose.club](https://tinygoose.club) is the home of Tiny Goose Club, a quiet creative meetup for dabblers in Hampden, Baltimore, organized by Nicholas Bennett.

Bring a project and your own supplies, and spend a couple of hours making things alongside other people. Drawing, writing, knitting, button-making, coding, beginners, and unfinished projects all belong here. Conversation is optional, and friendship is a possibility.

Nicholas started the club because he wanted a quiet creative meetup and couldn't find one locally. The idea combines body doubling, working on your own things with other people nearby, with the childhood excitement of Show and Tell. Sharing is optional and encouraging, with no pressure to finish something or impress anyone. The club aims to feel welcoming and safe for queer, trans, neurodivergent, disabled, and otherwise marginalized people.

Meetups take place around a shared table in a conference room at Co-Balt Workspace. The site helps attendees learn what to expect, see the room before arriving, understand the shared expectations, and RSVP through Luma.

## What's on the site

- **Home:** the club's title, Nicholas's portrait and social profiles, and four links: the next meetup on Luma, About, the Code of Goose Conduct, and upcoming meetups.
- **About:** Nicholas's origin story, body doubling and optional Show and Tell, a conference-room photo, and his experience working from Co-Balt since August 2026.
- **Code of Goose Conduct:** expectations for respecting identities, participation, consent, encouraging feedback, the venue, and how Nicholas handles concerns.
- **Next Events:** meetup dates, times, locations, and direct Luma RSVP links.
- **How It Works** and **Goose in Charge:** additional pages explaining the meetup format and introducing Nicholas. These routes exist but aren't currently linked from Home.

The frontend has no backend, accounts, or RSVP storage. Registration happens on Luma.

## Development

Built with Vue 3, the Composition API, TypeScript, Vite, Vue Router, and ordinary CSS. Use Node 22, matching the deployment workflow.

```sh
npm ci
npm run dev
```

Vite serves the root `index.html`. Keep that file at the repository root.

```sh
npm run build
npm test
npm run preview
```

The production build is written to `dist/`. With preview running and Chrome installed, run browser checks in another terminal:

```sh
npm run test:e2e
```

Set `TEST_URL` to check a different local server. Checks cover mobile layout, images, routes, social links, keyboard navigation, button presses, the opening honk animation, and reduced motion. Luma navigation is intercepted; no RSVP is submitted.

## Editing content and photos

Most editable content is in `src/content.ts`:

- `pages`: page titles and copy, including the About story.
- `homeLinks`: homepage labels, images, and destinations. Update the first link when the next meetup changes.
- `featuredLink` and `meetups`: event details and Luma links. Times are shown in Baltimore local time. Events are listed manually; remove or update past dates as needed.
- `hostProfiles`: Nicholas's Instagram and LinkedIn URLs.
- `graphics`: homepage image paths.
- `meetingSpace`: conference-room photo path, alt text, caption, venue description, and workspace link.

The full Code of Conduct is in `src/CodeOfConduct.vue`. Shared page layout is in `src/InfoPage.vue`, the homepage is in `src/App.vue`, and styles are in `src/styles.css`.

Photos and graphics live in `public/photos/`. Replace files or update their paths in `src/content.ts`, keeping alt text and captions accurate. Square homepage assets use the 128×128 versions; Nicholas's portrait displays at 64×64. The title uses a transparent PNG. If the conference-room photo dimensions change, update its width and height in `src/InfoPage.vue`.

The goose favicon is `public/favicon.svg`. The three-goose social preview is `public/goose-social-preview.png`; its sharing metadata is in the root `index.html`.

Confirm arrival instructions, accessibility details, materials restrictions, Wi-Fi, and outlet availability with the venue before publishing them. The Code of Conduct already includes the office manager's supplied cleaning, parking, workspace, smoking, vaping, and pet rules.

## Hosting

GitHub Pages serves the site at `tinygoose.club`. `.github/workflows/deploy.yml` runs content tests, builds the site, and deploys `dist/` on pushes to `main` or manual runs. Repository Pages settings use **GitHub Actions**, with `tinygoose.club` as the custom domain. Domain DNS is managed separately through Namecheap.

The workflow uses hash routing so direct links and reloads work on GitHub Pages, for example `https://tinygoose.club/#/next-events`. It uses `/` as the asset base for the custom domain.

For other static hosts, upload `dist/`. History routing is the default and requires an SPA fallback to `index.html`; `public/_redirects` supplies one for compatible hosts. For hosts without rewrites:

```sh
VITE_ROUTER_MODE=hash npm run build
```

For subdirectory hosting, also set `VITE_BASE=/your-directory/`. Route-specific social previews may require prerendering because this is a client-rendered SPA. Sharing services may cache previews after updates.
