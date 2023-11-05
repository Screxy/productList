<template>
  <Spinner fullscreen v-if="loading" />
  <div class="login">
    <h1 class="login__title">Авторизоваться</h1>
    <AuthForm @submit-form="tryLogin" class="login__form" />
    <Toast
      @close="errorMessage = ''"
      :visible="toastVisible"
      :message="errorMessage"
      error
    />
  </div>
</template>

<script setup lang="ts">
import AuthForm from '@/components/auth/AuthForm.vue'
import Spinner from '@/components/Spinner.vue'
import { computed, ref, watch } from 'vue'
import router from '@/router'
import { useAuthStore, type IUser } from '@/stores/auth'
import { AuthError } from '@supabase/supabase-js'
import Toast from '@/components/UI/Toast.vue'
const loading = ref(false)
const store = useAuthStore()

const errorMessage = ref<string>('')
const toastVisible = computed(() => {
  return errorMessage.value ? true : false
})

watch(errorMessage, () => setTimeout(() => (errorMessage.value = ''), 3000))

async function tryLogin(userData: IUser) {
  loading.value = true
  const { data, error } = await store.login(userData)
  if (error) {
    errorMessage.value = error.message
  }
  loading.value = false
  if (store.isAuthenticated) router.push('/')
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;

@use '@/assets/scss/variables' as *;
.login{
  border-radius: 2rem;
  background-color: $white;
  padding: 2rem;
  margin: 0 auto;
}
.login__title{
  @include title();
}
</style>
