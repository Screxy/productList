<template>
  <li class="item">
    <div class="item__info">
      <p class="item__name">
        {{ product.name }}
      </p>
      <p class="item__price">{{ product.price }} руб.</p>
      <p class="item__count">x{{ product.count }}</p>
    </div>
    <div class="item__buttons" v-if="authStore.isAuthenticated">
      <VButton
        :disabled="formVisible"
        class="item__button"
        @click="store.incrementProductCount(product.id)"
      >
        +
      </VButton>
      <VButton
        :disabled="formVisible"
        class="item__button"
        @click="store.decrementProductCount(product.id)"
      >
        -
      </VButton>
      <VButton
        :disabled="formVisible"
        class="item__button"
        @click="store.deleteProduct(product.id)"
      >
        Удалить
      </VButton>
      <VButton
        :disabled="formVisible"
        class="item__button item__cart-button"
        @click="store.togglePurchased(product.id)"
      >
        <PurchasedIcon
          class="item__svg"
          :class="{ item__svg_active: product.purchased }"
        />
      </VButton>
      <VButton
        class="item__button item__cart-button"
        @click="formVisible = !formVisible"
      >
        <EditIcon class="item__svg" />
      </VButton>
    </div>
    <p class="item__time">
      {{
        new Intl.DateTimeFormat('ru', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date(product.created_at))
      }}
    </p>
    <ProductForm
      @submit-form="updateProduct"
      v-if="formVisible"
      :name="product.name"
      :count="product.count"
      :price="product.price"
    />
  </li>
</template>

<script lang="ts" setup>
import type { Product } from '@/stores/products'
import { useProductStore } from '@/stores/products'
import ProductForm from '@/components/products/ProductForm.vue'
import PurchasedIcon from './icons/PurchasedIcon.vue'
import EditIcon from './icons/EditIcon.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const props = defineProps<{ product: Product }>()
const formVisible = ref(false)
function updateProduct(newProduct: Omit<Product, 'id' | 'purchased'>) {
  formVisible.value = !formVisible.value
  const editedProduct: Product = {
    id: props.product.id,
    name: newProduct.name,
    price: newProduct.price,
    count: newProduct.count,
    created_at: props.product.created_at,
    purchased: props.product.purchased,
  }
  store.updateProduct(editedProduct)
}
const store = useProductStore()
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/variables' as *;

.item {
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: $c-secondTextColor;
  border-radius: 15px;
}

.item__info {
  display: flex;
  flex-wrap: wrap;
  word-break: normal;
  p + p {
    margin-left: 3rem;
    @include media(min, xs) {
      margin-left: 3rem;
    }
  }
  .item__count {
    margin-left: auto;
        @include media(min, sm) {
      margin-left: 3rem;
    }
  }
}

.item__name {
  @include secondTitle();
  // max-width: 50%;
  word-break: break-all;
  font-size: 2rem;
}

.item__price {
  @extend .item__name;
}

.item__count {
  @extend .item__name;
}

.item__time {
  @include secondTitle();
  margin-top: 1rem;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  @include media(min, sm){
    margin-top: 0;
  }
}

.item__buttons {
  display: flex;
  justify-content: space-between;
  @include media(min, sm) {
    justify-content: start;
  }
  margin-top: 1.5rem;
}

.item__button + .item__button {
  @include media(min, sm) {
    margin-left: 2rem;
  }
}

.item__cart-button {
  padding: 0;
  width: 3rem;
}

.item__svg {
  height: 2.5rem;
  transition: fill stroke 0.1s linear;
}

.item__svg_active {
  fill: #008167;
  stroke: #008167;
}
</style>
