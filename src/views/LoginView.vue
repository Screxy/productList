<template>
  <section class="login">
    <div class="login__wrapper">
      <Spinner v-if="loading">загрузка</Spinner>
      <AuthForm @submit-form="tryLogin" class="login__form" />
    </div>
  </section>
</template>

<script setup lang="ts">
import AuthForm from '@/components/auth/AuthForm.vue'
import Spinner from '@/components/Spinner.vue';
import { ref } from 'vue'
import router from '@/router'
import { useAuthStore, type User } from '@/stores/auth'
const loading = ref(false)
const store = useAuthStore()
async function tryLogin(userData: User) {
  loading.value = true
  const { data, error } = await store.login(userData)
  loading.value = false
  // console.log(data)
  // console.log(error)
  if (store.isAuthenticated) router.push('/')
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;

.login__wrapper {
  @include wrapper(block);
}

.login__form {
  margin: 0 auto;
  max-width: 50%;
}
</style>
