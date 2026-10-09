import { createApp, h, nextTick } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory, RouterView } from 'vue-router'
import App from './App.vue'
import InfoPage from './InfoPage.vue'
import { pages } from './content'
import './styles.css'

const router = createRouter({
  history: import.meta.env.VITE_ROUTER_MODE === 'hash'
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: App },
    { path: '/code-of-goose-conduct', redirect: '/goose-code-of-conduct' },
    ...pages.map(page => ({ path: page.path, component: InfoPage, props: { page }, meta: { title: page.label, description: page.paragraphs[0] || 'Upcoming Tiny Goose Club meetups in Baltimore.' } })),
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: (_to, _from, saved) => saved || { top: 0 },
})

let initial = true
router.afterEach(async to => {
  const title = to.meta.title ? `${to.meta.title} · Tiny Goose Club` : 'Tiny Goose Club'
  const description = String(to.meta.description || 'A creative meetup for dabblers in Hampden, Baltimore.')
  const canonical = `https://tinygoose.club${to.path}`
  document.title = title
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
  for (const [selector, value] of [
    ['meta[name="description"]', description], ['meta[property="og:title"]', title],
    ['meta[property="og:description"]', description], ['meta[property="og:url"]', canonical],
    ['meta[name="twitter:title"]', title], ['meta[name="twitter:description"]', description],
  ]) document.querySelector(selector!)?.setAttribute('content', value!)
  await nextTick()
  if (!initial) document.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })
  initial = false
})

createApp({ render: () => h(RouterView) }).use(router).mount('#app')
