<template>
    <section class="login">
        <div class="login__wrapper">
            <p v-if="loading">загрузка</p>
            <AuthForm @submit-form="tryLogin" class="login__form" />
        </div>
    </section>
</template>

<script setup lang="ts">
import AuthForm from '@/components/auth/AuthForm.vue'
import { supabase } from '@/main';
import { ref } from 'vue';
import router from '@/router';
const loading = ref(false)
export type User = {
    email: string,
    password: string
}
async function tryLogin(userData: User) {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
    })
    console.log(data, error);
    loading.value = false
    if (data.session) router.push('/')
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