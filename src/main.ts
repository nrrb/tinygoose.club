import { createApp, h } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory, RouterView } from 'vue-router'
import App from './App.vue'
import './styles.css'

const router = createRouter({
  history: import.meta.env.VITE_ROUTER_MODE === 'hash'
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: App },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

createApp({ render: () => h(RouterView) }).use(router).mount('#app')
