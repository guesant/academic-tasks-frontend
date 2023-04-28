<template>
  <div></div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  auth: false
})

const { signOut } = useAuth();

onMounted(async () => {
  await signOut({ redirect: false });
  navigateTo("/")
})
</script>