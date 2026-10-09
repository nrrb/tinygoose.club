# Tiny Goose Club

A minimal Vue 3 page: the supplied portrait and one yellow link button.

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

Run `npm run test:e2e` with Chrome installed and preview running. Set `TEST_URL` for a different preview port.

Edit the photo and link in `src/content.ts`. The default button copies the screenshot's “Make your own Beacons page” link. `src/components/LinkButton.vue` accepts an `href` and slot text for reuse.

The photo displays the supplied screenshot through a CSS crop, preserving the original portrait and embedded title. For an original photo, replace the image and remove the screenshot positioning rule in `src/styles.css`. Poppins loads from Google Fonts with a sans-serif fallback.

Deploy `dist/` to static hosting. `public/_redirects` provides an SPA fallback for compatible hosts. Without rewrites, build with `VITE_ROUTER_MODE=hash npm run build`. For a subdirectory set `VITE_BASE=/your-directory/` at build time. Old internal routes redirect to the single landing page. Nothing has been deployed.
