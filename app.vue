<template>
  <Head>
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />

  </Head>

  <div :class="`app ${appColorMode === 'dark' ? 'dark' : 'light'}`">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { appColorMode } = useAppColorMode();
</script>

<style>
@import "@/assets/styles/themes/theme.css";

img {
  display: block;
  max-width: 100%;
}

svg {
  max-width: 100%;
  height: auto;
  display: block;
}

.svg-fill-text path {
  fill: rgb(var(--app-theme-text))
}

html {
  overflow: auto;
}
</style>