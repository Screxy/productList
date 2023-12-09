<template>
  <label class="label">
    <span class="label__span">
      {{ label }}
    </span>
    <input
        :value="modelValue"
        @input="updateInput"
        class="label__input"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="disabled"
    />
  </label>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'VInput',
})
const props = defineProps<{
  placeholder: string
  modelValue: string | number
  label: string
  type?: string
  autocomplete?: string
  disabled?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

function updateInput(event: any) {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixin' as *;

.label {
  display: block;
  height: 100%;
}

.label__input {
  font-size: 1.2rem;
  width: 100%;
  border: 2px solid $c-brand;
  padding: 10px 15px;

  &[disabled] {
    border: 2px solid transparent;
  }

  &:focus {
    box-shadow: 0 0 7px 3px #757575;
  }
}

.label__span {
  font-weight: 600;
  font-size: 1.6rem;
  color: $c-title;
}
</style>
