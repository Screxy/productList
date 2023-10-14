<template>
    <section class="login">
        <div class="login__wrapper">
            <p v-if="loading">загрузка</p>
            <SignUpForm class="login__form" @submit-form="trySignUp" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { supabase } from '@/main'
import SignUpForm from '@/components/auth/SignUpForm.vue'
import { ref } from 'vue';

export type newUser = {
    name: string,
    email: string,
    password: string
}
const loading = ref(false)
async function trySignUp(newUserData: newUser) {
    loading.value = true
    const { data, error } = await supabase.auth.signUp(
        {
            email: newUserData.email,
            password: newUserData.password,
            options: {
                data: {
                    name: newUserData.name,
                }
            }
        }
    )
    console.log(data, error);
    loading.value = false
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