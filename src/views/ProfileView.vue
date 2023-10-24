<template>
  <section class="profile">
    <div class="profile__wrapper">
      {{ store.currentUser?.user_metadata}}
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const store = useAuthStore()
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
.profile__wrapper {
  @include wrapper();
}
</style>
