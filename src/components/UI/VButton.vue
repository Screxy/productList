<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'VButton',
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixin' as *;

.button {
  padding: 10px;
  color: color(secondDescColor);
  background-color: color(primaryTitleColor);
  border: 1px solid color(primaryTitleColor);
  border-radius: 30px;
  transition: all 0.3s ease;
  @include media(min, md) {
    padding: 15px;
  }
  &:hover {
    box-shadow: 0px 0px 7px 3px #757575;
  }
  &:active {
    background-color: #00aaff;
  }
  &[disabled] {
    transform: scale(0.9);
    opacity: 0.5;
    &:hover {
      box-shadow: none;
    }
    &:active {
      background-color: color(primaryTitleColor);
    }
  }
}
</style>
