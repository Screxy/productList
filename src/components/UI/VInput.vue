<template>
  <label class="label">
    <span class="label__span">
      {{ label }}
    </span>
    <input :value="modelValue" @input="updateInput" class="label__input" :type="type" :placeholder="placeholder" autocomplete="off"/>
  </label>
</template>
<script lang="ts" setup>
defineOptions( {
  name: 'VInput',
})
const props = defineProps<{
  placeholder: string,
  modelValue: string | number,
  label: string,
  type?: string
}>()
const emit = defineEmits(['update:modelValue'])
function updateInput(event: any) {
  emit('update:modelValue', event.target.value);
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixin' as *;

.label__input {
  font-size: 1.2rem;
  width: 100%;
  border: 2px solid color(primaryTitleColor);
  padding: 10px 15px;
  margin-top: .5rem;

  &:focus {
    box-shadow: 0px 0px 7px 3px #757575;
  }
}

.label__span {
  @include secondTitle()
}
</style>
