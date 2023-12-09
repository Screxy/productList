<template>
  <div class="toast" :class="{ 'toast--error': error }" v-if="store.toastVisible">
    <p class="toast__message">
      {{ store.errorMessage in messages ? messages[message] : 'Неизвестная ошибка' }}
    </p>
    <VButton class="toast__button" @click="store.clearErrorMessage()">
      <IconClose class="toast__svg"/>
    </VButton>
  </div>
</template>

<script setup lang="ts">
import messages from '@/supabase/messages'
import IconClose from '@/components/icons/IconClose.vue'
import {useAuthStore} from '@/stores/auth'
import {watch} from 'vue'
import VButton from '@/components/UI/VButton.vue'

const emit = defineEmits(['close'])
const props = defineProps<{
  message: string
  error?: boolean
  visible: boolean
}>()
const store = useAuthStore()
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.toast {
  display: grid;
  grid-template-columns: auto 1fr;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  max-width: 30rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  background-color: $second-body-bg;
}

.toast__button {
  display: flex;
  margin-left: auto;
  max-width: 2.5rem;
  aspect-ratio: 1/1;
  padding: 0.5rem;
}

.toast__svg {
  width: 2.4rem;
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
