<template>
  <div>
    <DashboardContainer>
      <h1>Sobre</h1>
    </DashboardContainer>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: 'dashboard',
  auth: false,
})

useHead({
  title: 'Academic Tasks - Sobre',
})
</script>