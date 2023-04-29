<template>
  <Head>
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />

    <Link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" />
  </Head>

  <div :class="`app ${appColorMode === 'dark' ? 'dark' : 'light'}`">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { useAppColorMode } from './composables/app/useAppColorMode';
import { useAppAuthedUserInfo } from './composables/auth/useAppAuthedUserInfo';

const { appColorMode } = useAppColorMode();

const { suspense } = useAppAuthedUserInfo();

onServerPrefetch(async () => {
  await suspense()
})
</script>

<style>
@import "@/assets/styles/app.css";
</style>