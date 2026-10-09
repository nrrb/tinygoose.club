<script setup lang="ts">
import LinkButton from './components/LinkButton.vue'
import CodeOfConduct from './CodeOfConduct.vue'
import { meetups, graphics, meetingSpace, type InfoPage } from './content'
const assetBase = import.meta.env.BASE_URL
defineProps<{ page: InfoPage }>()
</script>

<template>
  <main class="landing info-page">
    <h1 tabindex="-1">{{ page.label }}</h1>
    <CodeOfConduct v-if="page.path === '/code-of-goose-conduct'" />
    <template v-else><p v-for="paragraph in page.paragraphs" :key="paragraph">{{ paragraph }}</p></template>
    <section v-if="page.path === '/what-is-tiny-goose-club'" class="meeting-space">
      <h2>A look at the space</h2>
      <p>{{ meetingSpace.description }}</p>
      <figure>
        <img :src="assetBase + meetingSpace.image" :alt="meetingSpace.alt" width="1000" height="1000" />
        <figcaption>{{ meetingSpace.caption }}</figcaption>
      </figure>
      <p>If knowing what to expect helps you feel more at ease, here’s a look at the room ahead of time. We’ll gather around this shared table to work on our projects.</p>
      <p><a :href="meetingSpace.href">Visit Co-Balt Workspace</a></p>
    </section>
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
