# Tiny Goose Club

Vue 3 landing page following `sitelayout.txt`: title graphic and goose, host row, four graphic link rows, and the Baltimore footer.

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

`index.html` must remain at the repository root: Vite serves its root entry file, not `public/photos/index.html`. Moving or deleting it causes a 404 at the dev server's root URL.

Run `npm run test:e2e` with Chrome installed and preview running. Set `TEST_URL` for another URL. Tests cover image loading and 128×128 graphic sizes, mobile overflow, keyboard navigation, and button destinations.

Edit graphics and links in `src/content.ts`. The reusable `LinkButton.vue` takes `href`, optional `internal`, an optional image, and slot text. Homepage graphics are displayed at 128×128 without stretching. Original image files remain unchanged.

The meetup link goes directly to Luma. “WUT DIS?!” opens About, “Code of Goose Conduct” opens `/code-of-goose-conduct`, and “Next Times” opens the event page. Conduct copy has not been provided; that page is clearly marked as coming soon.

Upload `dist/` to static hosting. `public/_redirects` provides an SPA fallback for compatible hosts. Without rewrites, build with `VITE_ROUTER_MODE=hash npm run build`; for a subdirectory set `VITE_BASE=/your-directory/`. Route-specific social previews may require prerendering. Nothing has been deployed.
