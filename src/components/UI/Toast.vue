<template>
  <div class="toast" :class="{ 'toast--error': error }" v-if="visible">
    <VButton class="toast__button" @click="$emit('close')">x</VButton>
    <p class="toast__message">
      {{ message in messages ? messages[message] : 'Неизвестная ошибка' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import messages from '@/supabase/messages'
const emit = defineEmits(['close'])
const props = defineProps<{
  message: string
  error?: boolean
  visible: boolean
}>()
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;
.toast {
  position: fixed;
  right: 3rem;
  bottom: 3rem;
  padding: 3rem 4rem;
  border-radius: 1rem;
  background-color: $second-body-bg;
}
.toast__button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.2rem;
}
.toast--error {
  background-color: $c-error;
  .toast__message {
    color: $white;
  }
}
.toast__message {
  @include desc();
  color: $black;
}
</style>
