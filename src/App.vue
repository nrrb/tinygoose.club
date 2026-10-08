<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="site-shell">
    <header class="masthead">
      <RouterLink to="/" class="brand" aria-label="Tiny Goose Club home"><span class="goose-mark" aria-hidden="true">g<span>•</span></span><span>TINY GOOSE CLUB</span></RouterLink>
      <span class="city">BALTIMORE, MD</span>
    </header>
    <nav v-if="route.path !== '/'" class="back-nav" aria-label="Home"><RouterLink to="/">← Home</RouterLink></nav>
    <main id="main" tabindex="-1"><RouterView /></main>
    <footer><span>Make a little. Meet a little.</span><RouterLink v-if="route.path !== '/events'" to="/events">Upcoming meetups ↗</RouterLink><RouterLink v-else to="/">Tiny Goose Club ↗</RouterLink></footer>
  </div>
</template>
