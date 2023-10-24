<template>
  <Spinner v-if="loading">загрузка</Spinner>
  <AuthForm @submit-form="tryLogin" class="login__form" />
</template>

<script setup lang="ts">
import AuthForm from '@/components/auth/AuthForm.vue'
import Spinner from '@/components/Spinner.vue'
import { ref } from 'vue'
import router from '@/router'
import { useAuthStore, type IUser } from '@/stores/auth'
const loading = ref(false)
const store = useAuthStore()
async function tryLogin(userData: IUser) {
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

@use '@/assets/scss/variables' as *;

.login__form {
  border-radius: 2rem;
  background-color: $white;
  padding: 2rem;
  margin: 0 auto;
  max-width: calc(50% + 2rem);
}
</style>
