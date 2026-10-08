<script setup lang="ts">
import { ref } from 'vue'
import type { Photo } from '../content'
defineProps<{ photo: Photo; compact?: boolean }>()
const failed = ref(false)
</script>
<template>
  <figure :class="['photo', { compact }]">
    <img v-if="photo.src && !failed" :src="photo.src" :alt="photo.alt" loading="lazy" @error="failed = true" />
    <div v-else class="photo-placeholder"><span aria-hidden="true">✳</span><span>{{ photo.alt }}</span><small>Photo to come</small></div>
    <figcaption>{{ photo.caption }}</figcaption>
  </figure>
</template>
