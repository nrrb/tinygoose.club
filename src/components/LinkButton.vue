<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps<{ href: string; internal?: boolean; image?: string }>()
const router = useRouter()
const linkHref = computed(() => props.internal ? router.resolve(props.href).href : props.href)
const pressed = ref(false)
let navigationTimer: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(navigationTimer))
const assetBase = import.meta.env.BASE_URL

function press(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  if (pressed.value) return
  pressed.value = true
  const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180
  navigationTimer = setTimeout(() => {
    if (props.internal) void router.push(props.href).finally(() => { pressed.value = false })
    else {
      window.location.assign(props.href)
      pressed.value = false
    }
  }, delay)
}
</script>

<template>
  <a class="link-button" :class="{ 'is-pressed': pressed }" :href="linkHref" @click="press">
    <img v-if="image" :src="assetBase + image" alt="" width="128" height="128" />
    <span class="link-label"><slot /><span v-if="$slots.details" class="link-details"><slot name="details" /></span></span>
  </a>
</template>
