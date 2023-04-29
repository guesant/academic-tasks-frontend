<template>
  <div>

    <v-divider class="my-8"></v-divider>

    <div v-if="user">
      <div>
        <v-card class="rounded-lg">
          <v-card-title class="py-4 px-6">Detalhes Pessoais</v-card-title>

          <v-divider />

          <v-list class="py-0">

            <v-list-item class="py-4 pl-6">
              <v-list-item-subtitle>Nome</v-list-item-subtitle>

              <v-list-item-title>
                <p v-if="user.name && user.name.length > 0">
                  {{ user.name }}
                </p>

                <p v-else>
                  <i>Não informado.</i>
                </p>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </div>

      <v-divider class="my-8"></v-divider>

      <div>
        <v-card class="rounded-lg">
          <v-card-title class="py-4 px-6">Conta</v-card-title>

          <v-divider />

          <v-list class="py-0">

            <v-list-item class="py-4 pl-6">
              <v-list-item-subtitle>Academic Tasks ID</v-list-item-subtitle>

              <v-list-item-title>
                <p>
                  {{ user.id }}
                </p>
              </v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item class="py-4 pl-6">
              <v-list-item-subtitle>Cargos</v-list-item-subtitle>

              <ul v-if="user.roles.length > 0" class="mt-2 roles-list">
                <li v-for="role in user.roles" :key="role.id">
                  <v-chip>
                    {{ role.slug }}
                  </v-chip>
                </li>
              </ul>

              <v-list-item-title v-else>
                <i>Usuário comum.</i>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppAuthedUserInfo } from '~/composables/auth/useAppAuthedUserInfo';
import { Middleware } from '~/helpers/Middleware';

definePageMeta({
  middleware: [Middleware.AUTH],
})

useHead({
  title: 'Academic Tasks - Minha Conta',
})

const { user } = await useAppAuthedUserInfo();
</script>

<style scoped>
.roles-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem
}
</style>