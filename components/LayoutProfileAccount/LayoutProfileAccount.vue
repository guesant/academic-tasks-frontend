<template>
  <v-container class="py-5 px-5 px-md-8 py-md-8">
    <h1>Perfil de Conta</h1>

    <v-tabs show-arrows class="tabs rounded-lg">
      <v-tab class="tab" to="/profile" :exact="true" value="profile">
        <v-icon class="tab-icon">mdi-account</v-icon>
        Perfil
      </v-tab>

      <v-tab class="tab" to="/profile/details" value="details">
        <v-icon class="tab-icon">mdi-text-box</v-icon>
        Detalhes Pessoais
      </v-tab>

      <v-tab class="tab" to="/profile/account" value="account">
        <v-icon class="tab-icon">mdi-card-account-details</v-icon>
        Conta
      </v-tab>

      <v-tab class="tab" to="/profile/change-password" value="change-password">
        <v-icon class="tab-icon">mdi-lock</v-icon>
        Alterar Senha
      </v-tab>
    </v-tabs>

    <div>
      <slot></slot>
    </div>
  </v-container>
</template>

<style scoped>
.tabs {
  margin: 2rem 0;
  box-shadow: var(--app-bs-shadow);
}

.tab-icon {
  margin-right: 0.25rem;
}
</style>