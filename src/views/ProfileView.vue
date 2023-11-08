<template>
  <section class="profile">
    <div class="profile__wrapper">
      <ProfileCard :name="Username" :email="UserEmail" class="profile__card"/>
      <router-view class="profile__card-edit">
      </router-view>
      <Toast visible="visible" :message="message" error/>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProfileCard from '@/components/profile/ProfileCard.vue'
import {useAuthStore} from '@/stores/auth'
import Toast from '@/components/UI/Toast.vue'
import {ref} from 'vue'

const visible = true
const message = ref('New password should be different from the old password')
const store = useAuthStore()
const Username = store.currentUser?.user_metadata?.name as string
const UserEmail = store.currentUser?.email as string
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.profile__wrapper {
  @include wrapper();
}

.profile__card {
  margin-top: 2rem;
}
</style>
