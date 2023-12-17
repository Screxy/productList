<template>
  <section class="products">
    <div class="products__wrapper">
      <h1 class="products__title">
        Страница, для отображения купленных товаров
      </h1>
      <p class="products__text" v-if="filter === 'all'">
        Всего товаров: {{ products.length }}
      </p>
      <p class="products__text" v-else-if="filter === 'purchased'">
        Количество купленных товаров: {{ purchasedProducts.length }}
      </p>
      <VButton
          v-if="authStore.isAuthenticated"
          class="products__button"
          @click="showDialog"
      >
        Добавить продукт
      </VButton>
      <VDialog v-model:show="dialogVisible">
        <ProductForm
            class="products__form"
            @submit-form="
            (product) => {
              store.addProduct(product)
              dialogVisible = false
            }
          "
        />
      </VDialog>
      <nav class="products__filter">
        <VButton
            class="products__filter-button"
            @click="filter = 'all'"
            :class="{ 'products__filter-button_checked': filter === 'all' }"
        >
          Все
        </VButton>
        <VButton
            class="products__filter-button"
            @click="filter = 'purchased'"
            :class="{ 'products__filter-button_checked': filter === 'purchased' }"
        >
          Купленные
        </VButton>
      </nav>
      <VInput
          class="products__search"
          label="Поиск"
          placeholder="Название продукта"
          v-model="search"
      />
      <Spinner fullscreen v-if="store.loading"/>
      <ProductList :filter="filter"/>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Spinner from '@/components/Spinner.vue'
import VDialog from '@/components/UI/VDialog.vue'
import ProductForm from '@/components/products/ProductForm.vue'
import ProductList from '@/components/products/ProductList.vue'
import {ref} from 'vue'
import {useProductStore} from '@/stores/products'
import {useAuthStore} from '@/stores/auth'
import {storeToRefs} from 'pinia'
import VInput from '@/components/UI/VInput.vue'
import VButton from '@/components/UI/VButton.vue'

const authStore = useAuthStore()
const store = useProductStore()
const {products, purchasedProducts, search, searchProducts} =
    storeToRefs(store)
store.fetchProducts()

const dialogVisible = ref(false)

function showDialog() {
  dialogVisible.value = true
}

const filter = ref('all')
</script>

<style lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.products__wrapper {
  @include wrapper(block);
}

.products__title {
  @include title();
  margin-top: 2rem;
}

.products__text {
  margin-top: 1.5rem;
  @include subTitle();
}

.products__button {
  margin-top: 1.5rem;
}

.products__filter {
  margin-top: 1.5rem;

  .products__filter-button_checked {
    background-color: #008167;
    border-color: #008167;
  }
}

.products__filter-button + .products__filter-button {
  margin-left: 1.5rem;
}

.products__search {
  margin-top: 1.5rem;
}
</style>
