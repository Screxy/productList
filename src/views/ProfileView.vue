<template>
  <section class="profile">
    <div class="profile__wrapper">
      <ProfileCardVue class="profile__card" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProfileCardVue from '@/components/profile/ProfileCard.vue'
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
