<template>
  <AdminGuard>
    <NuxtPage />
  </AdminGuard>
</template>

<script lang="ts" setup>
import { Middleware } from '~/helpers/Middleware';

definePageMeta({
  layout: 'dashboard',
  middleware: [Middleware.AUTH],
})

useHead({
  title: 'Academic Tasks - Painel Administrativo',
})
</script>