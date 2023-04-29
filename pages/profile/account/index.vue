<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <v-divider class="my-8"></v-divider>

      <div>
        <UIProfileAccountSection title="Conta">
          <div class="px-4 py-4">
            <v-text-field :disabled="isBusy" label="E-mail" type="email" variant="outlined" v-model="formState.email"
              :error-messages="emailErrorMessages" />
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
import { IUpdateAuthedUserInput, useUpdateAuthedUser } from '~/composables/api/authed-user/useUpdateAuthedUser';
import { useValidationErrorsForField } from '~/composables/api/helpers/useValidationErrorsForField';
import { useAppAuthedUserInfo } from '~/composables/auth/useAppAuthedUserInfo';
import { Middleware } from '~/helpers/Middleware';

definePageMeta({
  middleware: [Middleware.AUTH],
})

useHead({
  title: 'Academic Tasks - Minha Conta',
})

const {
  isBusy,
  errors,
  updateAuthedUser,
} = useUpdateAuthedUser();

const { user, suspense } = useAppAuthedUserInfo();

onServerPrefetch(async () => {
  await suspense()
})

const canSubmit = computed(() => !unref(isBusy));

const formState = reactive<IUpdateAuthedUserInput>({});

const resetFormState = () => {
  const user_v = unref(user)!;
  formState.email = user_v?.email || '';
}

const handleSubmit = () => {
  updateAuthedUser(formState)
}

const { fieldErrors: rawFieldEmailErrors, resetFieldErrors: resetFieldEmailErrors } = useValidationErrorsForField(errors, 'email')

const emailErrorMessages = computed(() => {
  return [
    ...unref(rawFieldEmailErrors).map((error) => {
      switch (error.code) {
        case 'email-already-in-use': {
          return 'Este e-mail já está em uso.';
        }

        case 'invalid_string': {
          return 'Este e-mail é inválido.';
        }

        default: {
          return error.message;
        }
      }
    }),
  ]
})

watch(
  [() => formState.email],
  () => resetFieldEmailErrors(),
)

watch(
  [user],
  () => resetFormState(),
  { immediate: true }
)
</script>

<style scoped>
.actions {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>