<script setup lang="ts">
import LinkButton from './components/LinkButton.vue'
import { portrait, featuredLink, pages } from './content'
const photoSrc = `${import.meta.env.BASE_URL}${portrait.src}`
</script>

<template>
  <main class="landing">
    <h1 class="sr-only">Tiny Goose Club</h1>
    <div class="portrait">
      <img :src="photoSrc" :alt="portrait.alt" />
    </div>
    <div class="link-stack">
      <LinkButton :href="featuredLink.href">
        <strong>{{ featuredLink.label }}</strong>
        <template #details>
          <span>{{ featuredLink.title }}</span>
          <span>{{ featuredLink.date }}</span>
          <span>{{ featuredLink.time }}</span>
          <span>{{ featuredLink.venue }}</span>
        </template>
      </LinkButton>
      <LinkButton v-for="page in pages" :key="page.path" :href="page.path" internal>{{ page.label }}</LinkButton>
    </div>
  </main>
</template>
