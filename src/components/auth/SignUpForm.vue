<template>
  <form class="form" @submit.prevent="onSubmitForm">
    <VInput
      v-model.trim="formData.name"
      class="form__input"
      placeholder="Имя"
      label="Введите имя"
    />
    <span class="form__error" v-for="error in v$.name.$errors" :key="error.$uid"
      >{{ error.$message }}.
    </span>
    <VInput
      v-model.trim="formData.email"
      class="form__input"
      placeholder="Email"
      label="Введите Email"
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
      autocomplete="on"
    />
    <span
      class="form__error"
      v-for="error in v$.password.$errors"
      :key="error.$uid"
      >{{ error.$message }}.
    </span>
    <VInput
      v-model="formData.repeatPassword"
      type="password"
      class="form__input"
      placeholder="Повторите пароль"
      label="Повторите пароль"
      autocomplete="off"
    />
    <span
      class="form__error"
      v-for="error in v$.repeatPassword.$errors"
      :key="error.$uid"
      >{{ error.$message }}.
    </span>
    <VButton class="form__button">Зарегестрироваться</VButton>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import {
  helpers,
  required,
  minLength,
  email,
  sameAs,
} from '@vuelidate/validators'
const emit = defineEmits(['submitForm'])
import type { NewUser } from '@/stores/auth'
const formData = reactive({
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
})
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(
        'Поле обязательное для заполнения',
        required
      ),
    },
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
    repeatPassword: {
      required: helpers.withMessage(
        'Поле обязательное для заполнения',
        required
      ),
      sameAsRef: helpers.withMessage(
        'Пароли не совпадают',
        sameAs(formData.password)
      ),
    },
  }
})
const v$ = useVuelidate(rules, formData)
async function onSubmitForm() {
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    console.log(formData)
    const newUserData: NewUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }
    emit('submitForm', newUserData)
  }
}
</script>

<style scoped lang="scss">
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
  margin-top: 15px;
  align-self: flex-end;
}
</style>
