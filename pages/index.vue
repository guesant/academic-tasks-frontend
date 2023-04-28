<template>
  <div>
    <h1>Início</h1>

    <div v-if="status === 'authenticated'">
      <p>Autenticado.</p>

      <a href="/logout">Sair.</a>
    </div>

    <div v-if="status === 'unauthenticated'">
      <p>Não autenticado.</p>

      <a href="/login">Entrar.</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  title: 'Início',
  auth: false
})

const { status } = useAuthState();

if (unref(status) === "authenticated") {
  const { user, verifyUserHasRole } = await useAuthedUserInfo();

  watch(
    [user],
    () => {
      if (unref(user)) {
        const hasRoleAdmin = verifyUserHasRole("admin");

        if (hasRoleAdmin) {
          return navigateTo("/admin");
        } else {
          return navigateTo("/my");
        }
      }
    },
    {
      immediate: true
    }
  )
}

</script>