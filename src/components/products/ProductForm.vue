<template>
    <form class="form" @submit.prevent="onSubmitForm">
        <VInput v-model="product.name" class="form__input" placeholder="Продукт" label="Введите название продукта" />
        <span class="form__error" v-for="error in v$.name.$errors" :key="error.$uid">{{ error.$message }}. </span>
        <VInput v-model.number="product.price" type="number" class="form__input" placeholder="Цена" label="Введите цену" />
        <span class="form__error" v-for="error in v$.price.$errors" :key="error.$uid">{{ error.$message }}</span>

        <VInput v-model.number="product.count" type="number" class="form__input" placeholder="Количество"
            label="Введите количество" />
        <span class="form__error" v-for="error in v$.count.$errors" :key="error.$uid">{{ error.$message }} </span>

        <VButton class="form__button" type="submit">
            Отправить форму
        </VButton>
    </form>
</template>

<script lang="ts" setup>
import type { Product } from '@/stores/products';
import { reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required, minLength, minValue } from '@vuelidate/validators'
const emit = defineEmits(['submitForm'])
interface Props {
    name?: string
    price?: number
    count?: number
}
const props = withDefaults(defineProps<Props>(), {
    name: '',
    price: 0,
    count: 0
})
const product = reactive<Omit<Product, 'id' | 'purchased'>>({
    name: props.name,
    price: props.price,
    count: props.count,
    createdAt: new Date(Date.now()).toISOString()
})
const rules = computed(() => {
    return {
        name:
        {
            required: helpers.withMessage('Поле обязательное для заполнения', required),
            minLength: helpers.withMessage(`Название не может быть короче ${minLength(3).$params.min} символов`, minLength(3))
        },
        price:
        {
            required: helpers.withMessage('Поле обязательное для заполнения', required),
            minValueValue: helpers.withMessage(`Цена не может быть ниже ${minValue(1).$params.min} `, minValue(1))
        },
        count:
        {
            required: helpers.withMessage('Поле обязательное для заполнения', required),
            minValueValue: helpers.withMessage(`Количество не может быть ниже ${minValue(1).$params.min} `, minValue(1))
        },
    }
})
const v$ = useVuelidate(rules, product)
async function onSubmitForm() {
    const isFormCorrect = await v$.value.$validate()
    if (isFormCorrect) {
        emit('submitForm', product)
    }
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixin' as *;

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