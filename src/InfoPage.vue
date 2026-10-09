<script setup lang="ts">
import LinkButton from './components/LinkButton.vue'
import CodeOfConduct from './CodeOfConduct.vue'
import { featuredLink, graphics, type InfoPage } from './content'
defineProps<{ page: InfoPage }>()
</script>

<template>
  <main class="landing info-page">
    <h1 tabindex="-1">{{ page.label }}</h1>
    <CodeOfConduct v-if="page.path === '/code-of-goose-conduct'" />
    <template v-else><p v-for="paragraph in page.paragraphs" :key="paragraph">{{ paragraph }}</p></template>
    <LinkButton v-if="page.path === '/next-events'" :href="featuredLink.href" :image="graphics.meetup">
      <strong>{{ featuredLink.label }}</strong>
      <template #details>
        <span>{{ featuredLink.title }}</span>
        <span>{{ featuredLink.date }}</span>
        <span>{{ featuredLink.time }}</span>
        <span>{{ featuredLink.venue }}</span>
      </template>
    </LinkButton>
    <LinkButton href="/" internal>Home</LinkButton>
  </main>
</template>
