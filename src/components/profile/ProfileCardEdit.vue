<template>
  <div class="profile-card-edit">
    <h2 class="profile-card-edit__title">Редактирование профиля</h2>
    <ProfileCardEditForm class="profile-card-edit__form" @submit-form="tryResetForm"/>
  </div>
</template>

<script setup lang="ts">
import ProfileCardEditForm from '@/components/profile/ProfileCardEditForm.vue'
import {useAuthStore} from '@/stores/auth'
import router from '@/router'

const store = useAuthStore()

const tryResetForm = async (newPassword) => {
  const {error, data} = await store.updatePassword(newPassword)
  console.log(error?.message)
  if (!error) await router.push('/profile')
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixin' as *;

.profile-card-edit {
  display: flex;
  flex-direction: column;
  margin: 2rem auto 0;
  padding: 2rem;
  border-radius: 2rem;
  background-color: $c-secondTextColor;
}

.profile-card-edit__title {
  @include title();
}

.profile-card-edit__form {
  margin-top: 2rem;
}
</style>