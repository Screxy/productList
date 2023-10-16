<template>
  <header class="header">
    <div class="header__wrapper">
      <NavBar />
    </div>
  </header>
</template>

<script lang="ts" setup>
import NavBar from './NavBar.vue'
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
.header {
  margin-top: 1.5rem;
}
.header__wrapper {
  @include wrapper();
}
</style>
