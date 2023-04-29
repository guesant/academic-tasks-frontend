<template>
  <div>
    <DashboardContainer>
      <h1>Usuários</h1>
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