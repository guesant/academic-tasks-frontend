<template>
  <v-layout class="layout-dashboard">
    <v-app-bar color="teal">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        Academic Tasks
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer location="left" v-model="drawer" color="surface">
      <v-list nav class="pa-4 d-flex flex-column h-full menu-list" density="compact">
        <v-divider class="my-2" />

        <v-list-item title="Início" to="/" prepend-icon="mdi-home">
        </v-list-item>

        <v-divider class="my-2" />

        <div v-if="isAdmin">
          <v-list-group value="Administração">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-shield-crown" title="Administração"></v-list-item>
            </template>

            <v-list-item title="Professores" to="/admin/teachers" prepend-icon="mdi-human-male-board">
            </v-list-item>

            <v-list-item title="Turmas" to="/admin/classes" prepend-icon="mdi-select-group">
            </v-list-item>

            <v-list-item title="Disciplinas" to="/admin/disciplines" prepend-icon="mdi-book-education">
            </v-list-item>

            <v-list-item title="Cursos" to="/admin/courses" prepend-icon="mdi-school">
            </v-list-item>


            <v-list-item title="Usuários" to="/admin/users" prepend-icon="mdi-account-group">
            </v-list-item>

          </v-list-group>

          <v-divider class="my-2" />
        </div>

        <div class="flex-grow-1"></div>


        <div v-if="isAuthed">
          <v-divider class="my-2" />

          <v-list-item title="Sair" to="/logout" prepend-icon="mdi-logout-variant">
          </v-list-item>

          <v-divider class="my-2" />

          <v-list-item title="Perfil de Conta" to="/profile" :exact="false" prepend-icon="mdi-account-circle">
          </v-list-item>
        </div>

        <div v-if="!isAuthed">
          <v-divider class="my-2" />

          <v-list-item title="Entrar" to="/login" :exact="false" prepend-icon="mdi-login">
          </v-list-item>
        </div>

        <v-divider class="my-2" />

        <v-list-item title="Sobre" to="/about" prepend-icon="mdi-information-outline">
        </v-list-item>

        <v-divider class="my-2" />

      </v-list>
    </v-navigation-drawer>

    <v-main class="layout-dashboard-main">
      <slot></slot>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import { useAppAuthedUserInfo } from '~/composables/auth/useAppAuthedUserInfo';


const drawer = ref(false);

const { smAndUp } = useDisplay()

onMounted(() => {
  if (smAndUp.value) {
    drawer.value = true
  }
})

const { isAuthed, verifyUserHasRole } = await useAppAuthedUserInfo();

const isAdmin = computed(() => isAuthed && verifyUserHasRole('admin'))
</script>

<style scoped>
.layout-dashboard {
  height: 100dvh;
  overflow-y: hidden;
}

.layout-dashboard-main {
  overflow-y: auto;
  height: 100%;

  flex: 1;
}

.menu-list,
.v-navigation-drawer .v-list.menu-list {
  overflow-y: auto;
}
</style>