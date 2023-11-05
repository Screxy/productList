<template>
  <div class="resetpassword">
    <h1 class="resetpassword__title">Сбросить пароль</h1>
    <ResetPasswordForm
      @submit-form="resetPassword"
      class="resetpassword__form"
    />
    <RouterLink class="resetpassword__link" to="/login">Войти</RouterLink>
  </div>
  <Toast
    @close="errorMessage = ''"
    :visible="toastVisible"
    :message="errorMessage"
    error
  />
</template>

<script setup lang="ts">
import Toast from '@/components/UI/Toast.vue'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue'
import { ref, computed } from 'vue';

const errorMessage = ref<string>('')
const toastVisible = computed(() => {
  return errorMessage.value ? true : false
})

const resetPassword = () => {
  console.log('hello')
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;
.resetpassword {
  flex-direction: column;
  border-radius: 2rem;
  background-color: $white;
  display: flex;
  padding: 2rem;
  margin: 0 auto;
}
.resetpassword__title {
  @include title();
}
.resetpassword__form {
  margin-top: 2rem;
}
.resetpassword__link {
  @include desc();
  margin: 1rem auto 0;
  color: $c-accent;
  text-decoration: none;
  &:hover {
    color: $c-brand;
  }
}
</style>
