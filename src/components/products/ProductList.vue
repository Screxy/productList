<template>
    <ul class="list" v-if="filter === 'all'">
        <ProductItem v-for="product in store.products" :product="product" />
    </ul>
    <ul class="list" v-else-if="filter === 'purchased'">
        <ProductItem v-for="product in store.purchasedProducts" :product="product" />
    </ul>
</template>

<script lang="ts" setup>
import { useProductStore } from '@/stores/products';
import ProductItem from './ProductItem.vue';
const store = useProductStore();
defineProps<{
    filter: String,
}>()
</script>

<style scoped lang="scss"></style>