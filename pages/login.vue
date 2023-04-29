<template>
  <div class="login-page">
    <form @submit.prevent="handleSubmit">
      <v-card class="login-card rounded-lg" :loading="isBusy" rounded="sm" :elevation="0" variant="outlined">
        <div class="pa-6">
          <p class="login-card-title">
            Academic Tasks
          </p>
        </div>

        <v-divider class="mx-6" />

        <div class="px-6 pt-6">
          <div>
            <v-text-field label="E-mail" type="email" required :disabled="isBusy" v-model="credentials.username" />
          </div>

          <div>
            <v-text-field label="Senha" name="password" type="password" required :disabled="isBusy"
              v-model="credentials.password" />
          </div>
        </div>

        <v-divider class="mx-6" />

        <div class="pa-6">
          <v-btn block type="submit" variant="flat" :disabled="!canSubmit" color="teal">
            Entrar
          </v-btn>
        </div>
      </v-card>
    </form>

    <v-dialog v-model="showErrorDialog" width="auto">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar color="primary" title="Não foi possível realizar o login."></v-toolbar>

          <v-card-text>
            <div class="text-h5 px-4 py-6 text-center">
              <p>Não foi possível realizar o login.</p>
            </div>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="isActive.value = false">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useAppAuthSignIn } from '~/composables/auth/useAppAuthSignIn';

definePageMeta({
  layout: "empty",

  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

useHead({
  title: "Academic Tasks - Entrar"
})


const {
  login,
  isBusy,
  isError,

} = useAppAuthSignIn();

const credentials = reactive({
  username: "",
  password: "",
});

const isValid = computed(() => {
  return credentials.username.length > 0 && credentials.password.length > 0;
});

const canSubmit = computed(() => {
  return !unref(isBusy) && unref(isValid);
});

const handleSubmit = () => {
  if (isValid.value) {
    login(credentials);
  }
}

const showErrorDialog = ref(false)

watch(isError, (value) => {
  if (value) {
    showErrorDialog.value = true
  }
})
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;

  min-height: 100dvh;

  overflow-y: auto;

  padding: 4rem 1rem;
}

.login-page form {
  margin: auto;

  flex-shrink: 1;

  max-width: 100%;

  width: 350px;
}


.login-card-title {
  font-weight: bold;

  text-align: center;

  font-size: 1.75rem;
}
</style>
