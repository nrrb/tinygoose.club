<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps<{ href: string; internal?: boolean; image?: string }>()
const assetBase = import.meta.env.BASE_URL
</script>

<template>
  <component :is="internal ? RouterLink : 'a'" class="link-button" v-bind="internal ? { to: href } : { href }">
    <img v-if="image" :src="assetBase + image" alt="" width="128" height="128" />
    <span class="link-label"><slot /><span v-if="$slots.details" class="link-details"><slot name="details" /></span></span>
  </component>
</template>
