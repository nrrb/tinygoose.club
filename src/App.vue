<script setup lang="ts">
import LinkButton from './components/LinkButton.vue'
import { portrait, featuredLink } from './content'
const photoSrc = `${import.meta.env.BASE_URL}${portrait.src}`
</script>

<template>
  <main class="landing">
    <h1 class="sr-only">Tiny Goose Club</h1>
    <div class="portrait">
      <img :src="photoSrc" :alt="portrait.alt" />
    </div>
    <LinkButton :href="featuredLink.href">{{ featuredLink.label }}</LinkButton>
  </main>
</template>
