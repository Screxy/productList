<template>
  <Spinner v-if="loading">загрузка</Spinner>
  <SignUpForm class="login__form" @submit-form="trySignUp" />
</template>

<script setup lang="ts">
import Spinner from '@/components/Spinner.vue'
import SignUpForm from '@/components/auth/SignUpForm.vue'
import { ref } from 'vue'
import { useAuthStore, type INewUser } from '@/stores/auth'
import router from '@/router'
const store = useAuthStore()
const loading = ref(false)
async function trySignUp(newUserData: INewUser) {
  loading.value = true

  const { data, error } = await store.signUp(newUserData)
  console.log(data, error)
  loading.value = false
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
