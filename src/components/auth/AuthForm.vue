<template>
  <form class="form" @submit.prevent="onSubmitForm">
    <VInput
        v-model.trim="formData.email"
        class="form__input"
        placeholder="Email"
        label="Введите Email"
        autocomplete="email"
    />
    <span
        class="form__error"
        v-for="error in v$.email.$errors"
        :key="error.$uid"
    >{{ error.$message }}.
    </span>
    <VInput
        v-model="formData.password"
        type="password"
        class="form__input"
        placeholder="Пароль"
        label="Введите пароль"
        autocomplete="current-password"
    />
    <span
        class="form__error"
        v-for="error in v$.password.$errors"
        :key="error.$uid"
    >{{ error.$message }}.
    </span>
    <VButton class="form__button">Войти</VButton>
  </form>
</template>

<script setup lang="ts">
import {reactive, computed} from 'vue'
import useVuelidate from '@vuelidate/core'
import {helpers, required, minLength, email} from '@vuelidate/validators'
import type {IUser} from '@/stores/auth'

const emit = defineEmits(['submitForm'])
const formData = reactive<IUser>({
  email: '',
  password: '',
})
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(
          'Поле обязательное для заполнения',
          required
      ),
      email: helpers.withMessage('Введите валидный email', email),
    },
    password: {
      required: helpers.withMessage(
          'Поле обязательное для заполнения',
          required
      ),
      minLength: helpers.withMessage(
          `Минимальная длина пароля ${minLength(6).$params.min}`,
          minLength(6)
      ),
    },
  }
})
const v$ = useVuelidate(rules, formData)

async function onSubmitForm() {
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    emit('submitForm', formData)
    formData.password = ''
    v$.value.$reset()
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.form {
  display: flex;
  flex-direction: column;
}

.form__input {
  margin-top: 1rem;
}

.form__error {
  color: red;
}

.form__button {
  margin-top: 1.5rem;
}

.form__link {
  @include desc();
  margin-top: 1rem;
  color: $c-accent;
  text-decoration: none;

  &:hover {
    color: $c-brand;
  }
}
</style>
