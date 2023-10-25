<template>
  <div class="card">
    <img src="../../assets/defualtavatar.svg" alt="" class="card__avatar" />
    <p class="card__name">Имя: {{ store.currentUser?.user_metadata?.name }}</p>
    <p class="card__email">Электронная почта: {{ store.currentUser?.email }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const store = useAuthStore()
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;
.card {
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: $second-body-bg;
  border-radius: 2rem;
}
.card__avatar {
  width: 10rem;
  align-self: center;
}
.card__name {
  @include subTitle();
  margin-top: 1.5rem;
}
.card__email {
  @extend .card__name;
}
</style>
