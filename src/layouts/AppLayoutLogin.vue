<template>
  <section class="login">
    <div class="login__wrapper">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixin' as *;

@use '@/assets/scss/variables' as *;

.login__wrapper {
  @include wrapper();
  justify-content: center;
  min-height: 100vh;
}
.login {
  background-color: $primary-body-bg;
}
</style>
