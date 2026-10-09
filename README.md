# Tiny Goose Club

A mobile-first Vue 3 / TypeScript SPA. No backend or state-management library. RSVP links lead directly to Luma.

## Develop and verify

Use Node 22.12+ (or Node 20.19+).

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

With preview running at port 4173 and Google Chrome installed, run `npm run test:e2e`. Set `TEST_URL` for another URL. This checks mobile overflow, main navigation visibility, skip-link keyboard use, route focus, back/forward, direct routes, metadata, and both Luma links. The browser uses a fixed pre-event date and an Auckland timezone to check Baltimore dates do not shift. Screenshots go to `/tmp/tiny-goose-mobile.png` and `/tmp/tiny-goose-desktop.png`. Playwright is development-only; update assertions when replacing the first event.

## Static deployment

Upload `dist/` after `npm run build`. History routing requires serving `index.html` for routes that aren't real files. `public/_redirects` supplies this fallback for Netlify and compatible hosts. For Nginx use `try_files $uri $uri/ /index.html;`. Configure equivalent fallback elsewhere and verify `/about` loads directly. Don't rewrite actual asset requests to HTML.

For hosts without rewrites:

```sh
VITE_ROUTER_MODE=hash npm run build
```

Links then use `/#/about`. For a subdirectory use `VITE_BASE=/your-directory/` at build time. Photo paths must include that directory. Canonical URLs assume `https://tinygoose.club`; adjust `src/main.ts` and `index.html` for another public domain. The app has not been deployed.

Page titles, descriptions, canonicals, Open Graph and Twitter metadata update in the browser. **Route-specific social previews may require prerendering**: many crawlers only see homepage metadata in initial HTML. No sharing image is advertised until a real photo exists. Unknown paths display a friendly page but SPA fallback responses retain HTTP 200.

## Photos and personal content

All photo paths, alt text, captions, editable stories, and events live in `src/content.ts`. Add actual photos to `public/photos/`, then set `src` to e.g. `/photos/tiny-geese.jpg`. Empty or broken paths render labeled placeholders. Update alt text and captions to match the real image. Previews use `object-fit: cover`; check important details aren't cropped. No personal photographs or project descriptions have been invented.

Fill `personal.originStory`, `personal.tinyGooseStory`, and `personal.additionalDetails` with Nicholas's actual words. About clearly marks the unfinished story section. Two project entries are reused on About and Nicholas; add more when needed. Home uses the goose photo, How it works uses the room, and Cones uses the cone photo alongside labeled CSS diagrams.

The Beacons-inspired design uses a square portrait with a bold white title, a white background, and yellow links with black outlines and offset shadows. Set `photos.portrait.src` to Nicholas's original photograph to fill the homepage portrait and host page; the reference screenshot is not used as a photograph. The square portrait means the last main links require a short scroll on typical mobile screens.

Typography uses Google Fonts (Poppins and Lilita One), with local sans-serif fallbacks. Self-host them or remove the CSS import if third-party requests aren't wanted. Design tokens are at the top of `src/styles.css`.

## Edit meetups

Each event has a unique `id`, `title`, ISO `start` and `end` with explicit UTC offsets, `venue`, and a direct HTTPS Luma `url`. Use Baltimore's offset on the date: `-04:00` during daylight saving time, `-05:00` during standard time. Formatting always uses `America/New_York`, independent of visitor timezone. Events remain upcoming through their exact end time, moving to past events afterward, with a one-second refresh while open. Upcoming events sort earliest first, past events newest first. Home features the next upcoming event or a pending announcement.

## Details to confirm before publishing

These fields exist under `unpublished` in the content file and are never rendered. Confirm before adding public copy:

- Arrival: entrance, floor/room, check-in, late arrivals, and whom to contact.
- Accessibility: verified step-free access, lifts, restrooms, seating, sensory conditions, and accommodation contact.
- Materials restrictions: permitted tools/materials, mess, ventilation, cleanup.
- Wi-Fi: guest access and how credentials are shared.
- Outlets: availability and whether to bring charged devices.

Also supply goose photos, Nicholas's portrait, room and cone photos, real beginner-project photos/captions, origin story, and tiny-goose explanation. No venue details beyond the supplied workspace and conference room have been added.

## Accessibility

Semantic landmarks and links, visible Home navigation, skip link, visible focus, route-heading focus, saved back/forward scroll, comfortable touch targets, reduced-motion support, and explicit labels for both cone configurations. Orange buttons use near-black text. Browser checks supplement manual review and don't establish accessibility certification. No autoplay or audio.
