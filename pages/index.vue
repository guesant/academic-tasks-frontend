<template>
  <div>
    <DashboardContainer>
      <h1>Início</h1>
    </DashboardContainer>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  auth: false
})

useHead({
  title: 'Academic Tasks - Início',
})
</script>