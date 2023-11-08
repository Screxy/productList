<template>
  <Spinner fullscreen v-if="loading"/>
  <div class="login">
    <h1 class="login__title">Авторизоваться</h1>
    <AuthForm @submit-form="tryLogin" class="login__form"/>
    <ul class="login__link-list link-list">
      <li class="link-list__item">
        <RouterLink class="link-list__link" to="/resetpassword"> Забыли пароль?</RouterLink>
      </li>
      <li class="link-list__item">
        <RouterLink class="link-list__link" to="/signup"> Нет аккаунта?</RouterLink>
      </li>
    </ul>
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
import {computed, ref, watch} from 'vue'
import router from '@/router'
import {useAuthStore, type IUser} from '@/stores/auth'
import {AuthError} from '@supabase/supabase-js'
import Toast from '@/components/UI/Toast.vue'
import {useToast} from '@/hooks/useToast'

const loading = ref(false)
const store = useAuthStore()

const {errorMessage, toastVisible} = useToast()

async function tryLogin(userData: IUser) {
  loading.value = true
  const {data, error} = await store.login(userData)
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

.login {
  border-radius: 2rem;
  background-color: $white;
  padding: 2rem;
  margin: 0 auto;
}

.login__title {
  @include title();
}

.link-list {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.link-list__link {
  @include desc();
  margin-top: 1rem;
  color: $c-accent;
  text-decoration: none;

  &:hover {
    color: $c-brand;
  }
}
</style>
