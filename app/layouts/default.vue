<script setup lang="ts">
const isSidebarOpen = ref(false)


</script>

<template>
  <div class="layout-container">
    <AppHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
    <AppSidebar :is-open="isSidebarOpen" />
    <main class="main-content transition-all duration-300"
          :class="{ 'ml-64': isSidebarOpen }">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  height: calc(100vh - 4rem);
  background-color: var(--ui-bg);
}

.main-content {
  height: 100%;
  margin-top: 4rem;
}
</style>
