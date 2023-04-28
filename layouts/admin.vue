<template>
  <AdminGuard>
    <div class="app">
      <div class="layout">
        <main class="main">
          <slot></slot>
        </main>
      </div>
    </div>
  </AdminGuard>
</template>
