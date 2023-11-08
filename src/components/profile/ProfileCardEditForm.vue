<template>
  <form class="form" @submit.prevent="onSubmitForm">
    <VInput model-value="Vladislav" placeholder="Введите имя" label="Имя" disabled autocomplete="username"/>
    <VInput class="form__input" label="Новый пароль" placeholder="Введите пароль" type="password"
            v-model="formData.password" autocomplete="new-password"/>
    <span class="form__error" v-for="error in v$.password.$errors" :key="error.$uid"
    >{{ error.$message }}.
    </span>
    <VInput class="form__input" label="Повторите новый пароль" placeholder="Введите пароль" type="password"
            v-model="formData.repeatPassword" autocomplete="new-password"/>
    <span class="form__error" v-for="error in v$.repeatPassword.$errors" :key="error.$uid"
    >{{ error.$message }}.
    </span>
    <VButton class="form__button">Изменить</VButton>
  </form>
</template>

<script setup lang="ts">
import {reactive, computed} from 'vue'
import useVuelidate from '@vuelidate/core'
import {
  helpers,
  required,
  minLength,
  email,
  sameAs,
} from '@vuelidate/validators'

const emit = defineEmits(['submitForm'])

const formData = reactive({
  password: '',
  repeatPassword: '',
})
const rules = computed(() => {
  return {
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
    const password = formData.password
    emit('submitForm', password)
    formData.password = ''
    formData.repeatPassword = ''
    v$.value.$reset()
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
  margin-top: 2rem;
}
</style>