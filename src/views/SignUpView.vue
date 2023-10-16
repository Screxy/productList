<template>
  <section class="login">
    <div class="login__wrapper">
      <p v-if="loading">загрузка</p>
      <SignUpForm class="login__form" @submit-form="trySignUp" />
    </div>
  </section>
</template>

<script setup lang="ts">
import SignUpForm from '@/components/auth/SignUpForm.vue'
import { ref } from 'vue'
import { useAuthStore, type NewUser } from '@/stores/auth'
import router from '@/router'
const store = useAuthStore()
const loading = ref(false)
async function trySignUp(newUserData: NewUser) {
  loading.value = true

  const { data, error } = await store.signUp(newUserData)
  console.log(data, error)
  loading.value = false
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
