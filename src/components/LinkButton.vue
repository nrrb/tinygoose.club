<script setup lang="ts">
defineProps<{ href: string }>()
</script>

<template>
  <a class="link-button" :href="href">
    <svg class="link-symbol" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="15" cy="10" r="8" />
      <circle cx="30" cy="10" r="5" />
      <circle cx="7" cy="23" r="5" />
      <circle cx="27" cy="26" r="8" />
      <circle cx="15" cy="34" r="5" />
    </svg>
    <span class="link-label"><slot /></span>
    <svg class="link-dots" viewBox="0 0 6 20" aria-hidden="true">
      <circle cx="3" cy="5" r="1.5" />
      <circle cx="3" cy="10" r="1.5" />
      <circle cx="3" cy="15" r="1.5" />
    </svg>
  </a>
</template>
