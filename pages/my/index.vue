<template>
  <div>
    Usuário.
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})
</script>