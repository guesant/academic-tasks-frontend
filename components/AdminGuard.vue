<template>
  <div v-if="isFetching">
    <p>Carregando...</p>
  </div>

  <slot v-if="showContent"></slot>

  <div v-if="showNotAllowed">
    <h1>Você não tem permissão para acessar esta página. </h1>
  </div>
</template>

<script lang="ts" setup>
const { isFetching, verifyUserHasRole } = await useAuthedUserInfo();

const userHasRoleAdmin = verifyUserHasRole("admin");

const showContent = computed(() => !unref(isFetching) && unref(userHasRoleAdmin));
const showNotAllowed = computed(() => !unref(isFetching) && !unref(userHasRoleAdmin));

</script>