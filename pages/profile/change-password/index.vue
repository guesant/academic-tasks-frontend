<template>
  <div>
    <form @submit.prevent="void handleSubmit()">
      <v-divider class="my-8"></v-divider>

      <div>
        <UIProfileAccountSection title="Alterar Senha">
          <div class="px-4">
            <div class="my-4">
              <v-text-field :disabled="isBusy" label="Senha atual" type="password" variant="outlined"
                v-model="formState.currentPassword" :error-messages="currentPasswordErrorMessages" />
            </div>

            <div class="my-4">
              <v-text-field :disabled="isBusy" label="Nova senha" type="password" variant="outlined"
                v-model="formState.newPassword" />

              <v-text-field :disabled="isBusy" label="Confirme a nova senha" type="password" variant="outlined"
                v-model="formState.confirmNewPassword" />
            </div>

          </div>

        </UIProfileAccountSection>
      </div>

      <div class="mt-4"></div>

      <div class="d-flex py-4 actions">
        <div class="flex-grow-1"></div>

        <v-btn @click="resetFormState" :disabled="isBusy" type="button" class="rounded-xl" variant="outlined">
          Cancelar
        </v-btn>

        <v-btn :disabled="!canSubmit" type="submit" class="rounded-xl" variant="flat" color="teal">
          Atualizar Perfil
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { IUpdateAuthedUserPasswordInput, useUpdateAuthedUserPassword } from '~/composables/api/authed-user/useUpdateAuthedUserPassword';
import { useValidationErrorsForField } from '~/composables/api/helpers/useValidationErrorsForField';
import { Middleware } from '~/helpers/Middleware';

definePageMeta({
  middleware: [Middleware.AUTH],
})

useHead({
  title: 'Academic Tasks - Alterar Senha',
})

const {
  isBusy,
  errors,
  updateAuthedUserPassword,
} = useUpdateAuthedUserPassword();

const formState = reactive<IUpdateAuthedUserPasswordInput>({
  currentPassword: "",

  newPassword: "",
  confirmNewPassword: "",
});

const resetForm = () => {
  formState.newPassword = "";

  formState.confirmNewPassword = "";
  formState.currentPassword = "";
};

const canSubmit = computed(
  () =>
    !unref(isBusy) &&
    formState.newPassword.length > 0 &&
    formState.confirmNewPassword.length > 0 &&
    formState.currentPassword.length > 0 &&
    formState.newPassword === formState.confirmNewPassword
);

const handleSubmit = async () => {
  updateAuthedUserPassword(formState).then(() => {
    resetForm()
  })
}

const resetFormState = () => {
  resetForm();
}

const { fieldErrors: rawFieldCurrentPasswordErrors, resetFieldErrors: resetFieldCurrentPasswordErrors } = useValidationErrorsForField(errors, 'currentPassword')

const currentPasswordErrorMessages = computed(() => {
  return [
    ...unref(rawFieldCurrentPasswordErrors).map((error) => {
      switch (error.code) {
        case 'invalid-password': {
          return 'Senha atual inválida.';
        }

        default: {
          return error.message;
        }
      }
    }),
  ]
})

watch(
  [() => formState.currentPassword],
  () => resetFieldCurrentPasswordErrors(),
)
</script>

<style scoped>
.actions {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>