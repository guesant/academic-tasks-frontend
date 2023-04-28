<template>
  <div>
    <form @submit.prevent="handleLoginRequest">
      <div>
        <label for="username">E-mail</label>

        <input name="username" type="email" required :disabled="isBusy" v-model="credentials.username" autocomplete="off"
          autocapitalize="none" autocorrect="off">
      </div>

      <div>
        <label for="password">Senha</label>
        <input name="password" type="password" required :disabled="isBusy" v-model="credentials.password">
      </div>

      <button type="submit" :disabled="canSubmit">
        Entrar
      </button>

      <div v-if="isError">
        <div>
          <p>Não foi possível realizar o login.</p>
        </div>
      </div>

    </form>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "empty",

  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

useHead({
  title: "Academic Tasks - Entrar"
})

const {
  isBusy,
  isError,
  canSubmit,
  credentials,
  handleLoginRequest,
} = useAuthSignIn();

</script>

