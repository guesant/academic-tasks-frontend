<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <v-divider class="my-8"></v-divider>

      <div>
        <UIProfileAccountSection title="Informações Pessoais">
          <div class="px-4">
            <v-text-field :disabled="isBusy" label="Nome" type="text" variant="outlined" v-model="formState.name" />
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
import { useAppAuthedUserInfo } from '~/composables/auth/useAppAuthedUserInfo';
import { Middleware } from '~/helpers/Middleware';

definePageMeta({
  middleware: [Middleware.AUTH],
})

useHead({
  title: 'Academic Tasks - Detalhes Pessoais',
})

const {
  isBusy,

  updateAuthedUser,

} = useUpdateAuthedUser();

const { user, suspense } = useAppAuthedUserInfo();

onServerPrefetch(async () => {
  await suspense()
})

const canSubmit = computed(() => !unref(isBusy));

const formState = reactive<IUpdateAuthedUserInput>({
  name: '',
});

const resetFormState = () => {
  const user_v = unref(user)!;
  formState.name = user_v?.name || '';
}

watch(
  [user],

  () => {
    resetFormState();
  },

  { immediate: true }
)

const handleSubmit = () => {
  updateAuthedUser(formState)
}
</script>

<style scoped>
.actions {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>