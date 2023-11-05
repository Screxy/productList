<template>
  <form class="form" @submit.prevent="onSubmitForm">
    <VInput
      placeholder="Email"
      label="Введите Email"
      autocomplete="email"
      v-model.trim="formData.email"
    />
    <span
      class="form__error"
      v-for="error in v$.email.$errors"
      :key="error.$uid"
    >
      {{ error.$message }}.
    </span>
    <VButton class="form__button">Сбросить пароль</VButton>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'

const emit = defineEmits(['submitForm'])

const formData = ref({ email: '' })

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(
        'Поле обязательное для заполнения',
        required
      ),
      email: helpers.withMessage('Введите валидный email', email),
    },
  }
})

const v$ = useVuelidate(rules, formData)

const onSubmitForm = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    emit('submitForm', formData)
    v$.value.$reset()
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.form {
  display: flex;
  flex-direction: column;
}

.form__error {
  color: red;
}

.form__button {
  margin-top: 2rem;
}
</style>
