<script lang="ts">
let honkShown = false
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LinkButton from './components/LinkButton.vue'
import { graphics, homeLinks, hostProfiles } from './content'
const assetBase = import.meta.env.BASE_URL
const animateHonk = ref(false)
const firstVisit = !honkShown
honkShown = true
onMounted(async () => {
  await document.fonts.ready
  animateHonk.value = firstVisit
})
</script>

<template>
  <main class="landing">
    <h1 class="title-row" tabindex="-1">
      <img :src="assetBase + graphics.title" alt="tiny goose club" />
      <span aria-hidden="true">🪿</span>
    </h1>
    <div class="host-row">
      <img :src="assetBase + graphics.host" alt="Nicholas Bennett" width="64" height="64" />
      <p>
        <strong>nicholas bennett</strong>
        <span class="host-details">
          <span>host, tiniest goose</span>
          <span class="host-socials">
            <a :href="hostProfiles.instagram" aria-label="Nicholas on Instagram (@sweet_angel_bb)">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a :href="hostProfiles.linkedin" aria-label="Nicholas on LinkedIn (nicholasrrbennett)">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52zM7.93 18.75H4.98V9.2h2.95v9.55zM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.79-1.53 2.98 0 3.58 1.96 3.58 4.51v5.27z" />
              </svg>
            </a>
          </span>
        </span>
      </p>
    </div>
    <nav class="link-stack" aria-label="Tiny Goose Club">
      <LinkButton v-for="link in homeLinks" :key="link.href" :href="link.href" :internal="link.internal" :image="link.image">
        <template v-if="link.headline"><span class="honk" :class="{ 'honk-attention': animateHonk }">{{ link.headline }}</span><br /></template>{{ link.label }}
      </LinkButton>
    </nav>
    <footer>tinygoose.club created with ❤️ for Baltimore by Nicholas Bennett</footer>
  </main>
</template>
