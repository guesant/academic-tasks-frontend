<template>
  <div>
    <DashboardContainer>
      <h1>Cursos</h1>
    </DashboardContainer>
  </div>
</template>

<script lang="ts" setup>
import { Middleware } from '~/helpers/Middleware';

definePageMeta({
  layout: 'dashboard',
  middleware: [Middleware.AUTH]
})
</script>