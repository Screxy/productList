import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
export type Product = {
  id: number;
  price: number;
  name: string;
  count: number;
  createdAt: string;
  purchased: boolean;
};
export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const productsInLocalStorage = localStorage.getItem('products');
  if (productsInLocalStorage) {
    products.value = JSON.parse(productsInLocalStorage);
  }
  if (products.value.length === 0) {
    products.value = [
      {
        id: 1,
        price: 92,
        name: 'Гречка',
        count: 1,
        purchased: false,
        createdAt: '2023-06-03T12:42:22.398Z',
      },
      {
        id: 2,
        price: 342,
        name: 'Порошек',
        count: 1,
        purchased: false,
        createdAt: '2023-06-03T12:42:22.398Z',
      },
      {
        id: 3,
        price: 50,
        name: 'Вода',
        count: 1,
        purchased: true,
        createdAt: '2023-06-03T12:42:22.398Z',
      },
    ];
  }
  const purchasedProducts = computed(() =>
    products.value.filter((product) => product.purchased)
  );

  function addProduct(newProduct: Omit<Product, 'id'>) {
    let newId = 1;
    if (products.value.length > 0) {
      newId = products.value[products.value.length - 1].id + 1;
    }
    const product: Product = {
      id: newId,
      ...newProduct,
      purchased: false,
    };
    products.value.push(product);
  }
  function deleteProduct(id: number) {
    products.value = products.value.filter((product) => product.id != id);
  }
  function updateProduct(product: Product){
    
  }
  function incrementProductCount(id: number) {
    products.value.forEach((product: Product) => {
      if (product.id === id) product.count++;
    });
  }
  function decrementProductCount(id: number) {
    products.value.forEach((product) => {
      if (product.id === id) {
        if (product.count > 1) return product.count--;
        deleteProduct(product.id);
      }
    });
  }

  function togglePurchased(id: number) {
    products.value.forEach((product) => {
      if (product.id === id) product.purchased = !product.purchased;
    });
  }
  async function fetchProducts() {
    try {
      const response = await axios.get('');
      products.value.push(...response.data.reverse());
    } catch (error) {
      console.log(error);
    }
  }
  watch(
    products,
    (state: Product[]) => {
      localStorage.setItem('products', JSON.stringify(state));
    },
    { deep: true }
  );
  return {
    products,
    purchasedProducts,
    fetchProducts,
    addProduct,
    incrementProductCount,
    deleteProduct,
    togglePurchased,
    decrementProductCount,
  };
});
