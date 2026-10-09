<script setup lang="ts">
import LinkButton from './components/LinkButton.vue'
import CodeOfConduct from './CodeOfConduct.vue'
import { meetups, graphics, type InfoPage } from './content'
defineProps<{ page: InfoPage }>()
</script>

<template>
  <main class="landing info-page">
    <h1 tabindex="-1">{{ page.label }}</h1>
    <CodeOfConduct v-if="page.path === '/code-of-goose-conduct'" />
    <template v-else><p v-for="paragraph in page.paragraphs" :key="paragraph">{{ paragraph }}</p></template>
    <template v-if="page.path === '/next-events'">
      <LinkButton v-for="meetup in meetups" :key="meetup.href" :href="meetup.href" :image="graphics.meetup">
        <strong>{{ meetup.label }}</strong>
        <template #details>
          <span v-if="meetup.title">{{ meetup.title }}</span>
          <span v-if="meetup.date">{{ meetup.date }}</span>
          <span>{{ meetup.time }}</span>
          <span v-if="meetup.venue">{{ meetup.venue }}</span>
        </template>
      </LinkButton>
    </template>
    <LinkButton href="/" internal>Home</LinkButton>
  </main>
</template>
