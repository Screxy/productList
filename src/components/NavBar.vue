<template>
    <nav class="navigation">
        <button class="navigation__button" @click="toogleMenu" v-if="!desktop">
            <svg class="navigationbar__burger" width="20" height="27" viewBox="0 0 20 27" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect y="5" width="20" height="4" rx="2" fill="#EF5537" class="navigation__burger-line1" />
                <rect y="14" width="20" height="4" rx="2" fill="#EF5537" class="navigation__burger-line2" />
                <rect y="23" width="20" height="4" rx="2" fill="#EF5537" class="navigation__burger-line3" />
            </svg>
        </button>
        <ul class="navigation__list" v-show="burgerVisible || desktop" @click="toogleMenu">
            <li class="navigation__item">
                <router-link to="/" class="navigation__link">Главная</router-link>
            </li>
            <li class="navigation__item">
                <router-link to="/About" class="navigation__link">О проекте</router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const screenWidth = ref(window.innerWidth)
const burgerVisible = ref(false)
const desktop = ref(false)
function handleResize() {
    screenWidth.value > 768
        ? ((desktop.value = true), (burgerVisible.value = true))
        : ((desktop.value = false), (burgerVisible.value = false));
    screenWidth.value = window.innerWidth;
}
function toogleMenu() {
    burgerVisible.value = !burgerVisible.value;
}
function isDesktop() {
    screenWidth.value > 768
        ? ((desktop.value = true), (burgerVisible.value = true))
        : ((desktop.value = false), (burgerVisible.value = false));
}

watch(screenWidth, isDesktop)
onMounted(() => {
    screenWidth.value > 768 ? (desktop.value = true) : (desktop.value = false);
    window.addEventListener('resize', handleResize);
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
})

</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;

.navigation__button {
    border: none;
    background-color: transparent;
}

.navigation {
    position: relative;
}

.navigation__list {
    position: absolute;
    left: 0;
    margin-top: 1rem;
    padding: 2rem;
    border: solid 0.1rem rgba(0, 0, 0, 0.329);
    border-radius: 2rem;
    z-index: 1;
    background-color: #ffffff62;
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);

    @include media(min, md) {
        display: flex;
        position: static;
        margin-top: 0;
        padding: 0;
        border: none;
        justify-content: space-around;
        align-items: center;
        height: auto;
    }
}

.navigation__link {
    @include subTitle();
    text-decoration: none;
    transition: all 0.3s;

    @include media(min, xl) {
        &:hover {
            color: color(primaryTitleColor);
        }
    }
}
</style>
