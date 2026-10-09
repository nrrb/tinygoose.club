<script lang="ts">
let honkShown = false
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LinkButton from './components/LinkButton.vue'
import { graphics, homeLinks } from './content'
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
      <img :src="assetBase + graphics.host" alt="Nicholas Bennett" width="128" height="128" />
      <p><strong>nicholas bennett</strong><br />host, tiniest goose</p>
    </div>
    <nav class="link-stack" aria-label="Tiny Goose Club">
      <LinkButton v-for="link in homeLinks" :key="link.href" :href="link.href" :internal="link.internal" :image="link.image">
        <template v-if="link.headline"><span class="honk" :class="{ 'honk-attention': animateHonk }">{{ link.headline }}</span><br /></template>{{ link.label }}
      </LinkButton>
    </nav>
    <footer>tinygoose.club created with ❤️ for Baltimore by Nicholas Bennett</footer>
  </main>
</template>
