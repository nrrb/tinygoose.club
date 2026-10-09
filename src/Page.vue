<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Photo from './components/Photo.vue'
import { intro, photos, personal, partitionEvents, eventDate, eventTime, timeZone } from './content'
const route = useRoute()
const now = ref(Date.now())
let timer: ReturnType<typeof setInterval>
onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 1000) })
onUnmounted(() => clearInterval(timer))
const schedule = computed(() => partitionEvents(now.value))
const featured = computed(() => schedule.value.upcoming[0])
const links = [
  { path: '/about', icon: '✳', title: 'What’s Tiny Goose Club?', note: 'A little more about the idea' },
  { path: '/how-it-works', icon: '↗', title: 'How a meetup works', note: 'What to bring & what to expect' },
  { path: '/cones', icon: '△', title: 'The conversation cones', note: 'Your space, at your own pace' },
  { path: '/nicholas', icon: '☺', title: 'Meet Nicholas', note: 'The human behind the geese' },
]
</script>
<template>
  <template v-if="route.path === '/'">
    <div class="profile-card">
      <Photo :photo="photos.portrait!" />
      <h1 tabindex="-1">Tiny Goose Club</h1>
    </div>
    <section class="home-intro">
      <div class="eyebrow"><span class="orange-dot"></span> A LITTLE SPACE TO MAKE THINGS</div>
      <p class="subtitle">A creative meetup for dabblers.</p>
      <p class="intro">{{ intro }}</p>
      <p class="location">A queer- and neurodivergent-friendly gathering in Hampden, Baltimore.</p>
    </section>
    <section v-if="featured" class="event-card" aria-labelledby="featured-title">
      <div class="event-top"><span class="eyebrow">YOU’RE INVITED</span><span class="pill">Bring your unfinished things</span></div>
      <h2 id="featured-title">{{ featured.title }}</h2>
      <p>{{ eventDate(featured) }} <span class="time">{{ eventTime(featured) }} · {{ timeZone }}</span></p>
      <p class="venue">{{ featured.venue }}</p>
      <a class="button" :href="featured.url">View event & RSVP <span aria-hidden="true">↗</span></a>
    </section>
    <section v-else class="event-card"><h2>More making, soon.</h2><p>Check back for our next meetup.</p><RouterLink to="/events">See meetups →</RouterLink></section>
    <nav class="link-list" aria-label="Explore Tiny Goose Club">
      <RouterLink v-for="link in links" :key="link.path" :to="link.path"><span class="link-icon" aria-hidden="true">{{ link.icon }}</span><span><strong>{{ link.title }}</strong><small>{{ link.note }}</small></span><span class="arrow" aria-hidden="true">↗</span></RouterLink>
    </nav>
    <div class="home-photo"><Photo :photo="photos.goose!" compact /><p>No masterpiece required.<br />Just you, a project,<br />and a little company.</p></div>
  </template>
  <article v-else class="content-page">
    <span class="eyebrow">A LITTLE SPACE TO MAKE THINGS</span>
    <h1 tabindex="-1">{{ route.meta.title }}<span class="title-dot">.</span></h1>
    <template v-if="route.path === '/about'">
      <p class="lead">Something to make. People to make it around.</p>
      <p>Working on creative projects alongside other people is the baseline. Conversation is optional, and friendship is a possibility.</p>
      <p>Draw, write, knit, make buttons, code, or bring another creative project. Beginners and unfinished projects are welcome. You don’t need to be good at something to enjoy making it.</p>
      <aside class="note"><h2>How it began</h2><p>{{ personal.originStory || 'Nicholas’s origin story is coming soon.' }}</p><h3>Why the tiny goose?</h3><p>{{ personal.tinyGooseStory || 'The story behind the tiny goose is coming soon.' }}</p><small v-if="!personal.originStory || !personal.tinyGooseStory">Editable story section · awaiting Nicholas’s words</small></aside>
      <h2>A few works in progress</h2><div class="gallery"><Photo :photo="photos.project1!" /><Photo :photo="photos.project2!" /></div>
    </template>
    <template v-else-if="route.path === '/how-it-works'">
      <p class="lead">Bring a project. Pull up a chair.</p>
      <ol class="steps"><li><h2>Bring your own supplies</h2><p>Bring something you want to work on and the supplies you need to make it.</p></li><li><h2>Make yourself comfortable</h2><p>We gather around a shared table in a conference room at Co-Balt Workspace, the coworking office where Nicholas works. You can chat, concentrate, or switch between the two. Headphones are welcome.</p></li><li><h2>Share, if you feel like it</h2><p>There’s optional show-and-tell. Nicholas will share first, and you can join in or simply listen.</p></li></ol>
      <Photo :photo="photos.venue!" />
      <aside class="note"><h2>A little signal, a little space</h2><p>Each person gets a red and a green cone. Green on top means you’re open to conversation; red on top means you’re concentrating. Switch whenever you like.</p><RouterLink to="/cones">Get to know the conversation cones →</RouterLink></aside>
    </template>
    <template v-else-if="route.path === '/cones'">
      <p class="lead">You don’t have to explain what you need.</p><p>Each person gets a red cone and a green cone. Stack them to let people know whether you’re open to chatting or taking some space to focus.</p>
      <div class="cone-grid"><section class="cone-card"><div class="cone-stack" aria-hidden="true"><span class="cone green"></span><span class="cone red"></span></div><h2>Green on top</h2><p>“I’m open to conversation.”</p></section><section class="cone-card"><div class="cone-stack" aria-hidden="true"><span class="cone red"></span><span class="cone green"></span></div><h2>Red on top</h2><p>“I’m concentrating. Please let me work.”</p></section></div>
      <p>Switch whenever you want, without explaining. Respect each other’s signals, while allowing necessary practical interruptions.</p><Photo :photo="photos.cones!" />
    </template>
    <template v-else-if="route.path === '/nicholas'">
      <p class="lead">Hi, I’m Nicholas.</p><Photo :photo="photos.portrait!" /><p>I’m a frontend developer in Baltimore, a creative dabbler, and the person putting Tiny Goose Club together.</p><p>I like having something to make and people to make it around. I’m hoping this becomes a place where we can try things, share what we’re learning, and get to know each other at our own pace.</p><p v-if="personal.additionalDetails">{{ personal.additionalDetails }}</p><h2>Beginner energy, in practice</h2><div class="gallery"><Photo :photo="photos.project1!" /><Photo :photo="photos.project2!" /></div>
    </template>
    <template v-else-if="route.path === '/events'">
      <p class="lead">A couple of hours. A little company.</p><p>All meetup times are in {{ timeZone }} (Baltimore time).</p>
      <section v-for="event in schedule.upcoming" :key="event.id" class="event-card"><h2>{{ event.title }}</h2><p>{{ eventDate(event) }}<span class="time">{{ eventTime(event) }} · {{ timeZone }}</span></p><p class="venue">{{ event.venue }}</p><a class="button" :href="event.url">View event & RSVP <span aria-hidden="true">↗</span></a></section>
      <p v-if="!schedule.upcoming.length" class="note">The next meetup hasn’t been announced yet. Check back soon.</p>
      <section v-if="schedule.past.length" class="past-events"><h2>Past meetups</h2><div v-for="event in schedule.past" :key="event.id"><a :href="event.url">{{ event.title }} ↗</a><small>{{ eventDate(event) }} · {{ eventTime(event) }} · {{ timeZone }}</small></div></section>
    </template>
    <template v-else><p>This page wandered off. Let’s head home.</p><RouterLink to="/" class="button">Back to Tiny Goose Club →</RouterLink></template>
  </article>
</template>
