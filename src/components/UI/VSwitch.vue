<template>
  <label class="switch">
    <span class="visually-hidden">Переключатель</span>
    <input
      type="checkbox"
      :checked="modelValue"
      @input="updateCheck"
      class="visually-hidden"
    />
    <span class="switch"></span>
  </label>
</template>

<script setup lang="ts">
defineOptions({
  name: 'VSwitch',
})
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])
function updateCheck() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixin' as *;
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch {
  cursor: pointer;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.switch:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .switch {
  background-color: $c-brand;
}

input:focus + .switch {
  box-shadow: 0 0 1px 2px $c-brand;
}

input:checked + .switch:before {
  transform: translateX(26px);
}
</style>
