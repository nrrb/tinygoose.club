import { createApp, nextTick } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Page from './Page.vue'
import './styles.css'
const pages = [
  ['/', 'Home', 'A creative meetup for dabblers in Hampden, Baltimore. Beginners welcome; talking optional.'],
  ['/about', 'What’s Tiny Goose Club?', 'Make creative projects alongside other people. Beginners and unfinished projects are welcome.'],
  ['/how-it-works', 'How a meetup works', 'Bring a project and your supplies to a shared table at Co-Balt Workspace in Baltimore.'],
  ['/cones', 'The conversation cones', 'Green on top means open to conversation. Red on top means time to concentrate.'],
  ['/nicholas', 'Meet Nicholas', 'Meet Nicholas, a frontend developer, creative dabbler, and host of Tiny Goose Club.'],
  ['/events', 'Upcoming meetups', 'Find upcoming Tiny Goose Club meetups in Baltimore and RSVP on Luma.'],
]
const router = createRouter({
  history: import.meta.env.VITE_ROUTER_MODE === 'hash' ? createWebHashHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
  routes: [...pages.map(([path, title, description]) => ({ path: path!, component: Page, meta: { title, description } })), { path: '/:pathMatch(.*)*', component: Page, meta: { title: 'Page not found', description: 'Return to Tiny Goose Club.' } }],
  scrollBehavior(_to, _from, savedPosition) { return savedPosition || { top: 0 } },
})
let firstLoad = true
router.afterEach(async to => {
  const title = to.path === '/' ? 'Tiny Goose Club' : `${to.meta.title} · Tiny Goose Club`
  document.title = title
  const description = String(to.meta.description)
  const canonical = `https://tinygoose.club${to.path === '/' ? '/' : to.path}`
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
  for (const [selector, value] of [
    ['meta[name="description"]', description], ['meta[property="og:title"]', title],
    ['meta[property="og:description"]', description], ['meta[property="og:url"]', canonical],
    ['meta[name="twitter:title"]', title], ['meta[name="twitter:description"]', description],
  ]) document.querySelector(selector!)?.setAttribute('content', value!)
  await nextTick()
  if (!firstLoad) document.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })
  firstLoad = false
})
createApp(App).use(router).mount('#app')
