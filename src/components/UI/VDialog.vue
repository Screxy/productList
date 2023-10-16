<template>
  <div class="dialog" v-if="show" @mousedown="hideDialog">
    <div @mousedown.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'VDialog',
})
const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['update:show'])
function hideDialog() {
  emit('update:show', false)
}
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 1;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog__content {
  margin: auto;
  background-color: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>
