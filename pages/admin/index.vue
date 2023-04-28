<template>
  <div>
    Admin.
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})
</script>