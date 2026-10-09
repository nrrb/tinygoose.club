# Tiny Goose Club

A minimal Vue 3 page: the supplied portrait and reusable yellow link buttons.

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

Run `npm run test:e2e` with Chrome installed and preview running. Set `TEST_URL` for a different preview port.

Edit the photo and links in `src/content.ts`. The top button shows the October 20, 2026 meetup details and links directly to Luma. Dates are written in Baltimore time so visitor timezones cannot shift them. `src/components/LinkButton.vue` accepts an `href`, slot text, and an optional `details` slot for reuse.

The four links and their simple page content live in the `pages` array in `src/content.ts`: `/what-is-tiny-goose-club`, `/how-it-works`, `/goose-in-charge`, and `/next-events`. Internal buttons use Vue Router; the event button links directly to Luma. Titles, metadata, and focus update on navigation.

The photo displays the supplied screenshot through a CSS crop, preserving the original portrait and embedded title. For an original photo, replace the image and remove the screenshot positioning rule in `src/styles.css`. Poppins loads from Google Fonts with a sans-serif fallback.

Deploy `dist/` to static hosting. `public/_redirects` provides an SPA fallback for compatible hosts. Without rewrites, build with `VITE_ROUTER_MODE=hash npm run build`. For a subdirectory set `VITE_BASE=/your-directory/` at build time. Unknown routes redirect to the landing page. Route-specific social previews may require prerendering. Nothing has been deployed.
