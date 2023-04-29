<template>
  <v-card class="rounded-lg">
    <v-card-title class="py-4 px-6">
      <slot name="title">
        {{ title }}
      </slot>
    </v-card-title>

    <v-divider class="pb-4" />

    <slot></slot>
  </v-card>
</template>

<script lang="ts" setup>
const { title } = defineProps<{ title?: string }>();
</script>