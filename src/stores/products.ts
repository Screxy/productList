import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {supabase} from '@/main'

export type Product = {
    id: number
    price: number
    name: string
    count: number
    created_at: string
    purchased: boolean
}
export const useProductStore = defineStore('product', () => {
    const products = ref<Product[]>([])
    const loading = ref<boolean>(false)

    const purchasedProducts = computed(() =>
        searchProducts.value.filter((product) => product.purchased)
    )
    const search = ref('')
    const searchProducts = computed(() => {
        return products.value.filter((product) =>
            product.name
                .toLocaleLowerCase()
                .includes(search.value.toLocaleLowerCase())
        )
    })

    async function addProduct(newProduct: Omit<Product, 'id' | 'created_at'>) {
        const product: Omit<Product, 'id' | 'created_at'> = {
            ...newProduct,
            purchased: false,
        }
        const {data, error} = await supabase
            .from('product')
            .insert([product])
            .select()
        if (error) throw new Error(error.message)
        if (data) {
            console.log(data[0])
            products.value.push(data[0])
        }
        console.log(data, error)
    }

    async function deleteProduct(id: number) {
        const {error} = await supabase.from('product').delete().eq('id', id)
        if (error) {
            console.log(error)
        } else {
            products.value = products.value.filter((product) => product.id != id)
        }
    }

    async function updateProduct(product: Product) {
        const indexToUpdate = products.value.findIndex(
            (elem) => elem.id === product.id
        )
        if (indexToUpdate !== -1) {
            products.value[indexToUpdate] = product
        }
        const {data, error} = await updateProductInfo(
            products.value[indexToUpdate]
        )
        if (!error && data) {
            products.value[indexToUpdate] = data[0]
        }
        console.log(data, error)
    }

    async function updateProductInfo(product: Product) {
        const {data, error} = await supabase
            .from('product')
            .update(product)
            .eq('id', product.id)
            .select()
        return {data, error}
    }

    async function incrementProductCount(id: number) {
        const indexToUpdate = products.value.findIndex((elem) => elem.id === id)
        if (indexToUpdate !== -1) {
            products.value[indexToUpdate].count++
        }
        const {data, error} = await updateProductInfo(
            products.value[indexToUpdate]
        )
        console.log(data, error)
    }

    async function decrementProductCount(id: number) {
        const indexToUpdate = products.value.findIndex((elem) => elem.id === id)
        if (indexToUpdate !== -1) {
            products.value[indexToUpdate].count--
        }
        const {data, error} = await updateProductInfo(
            products.value[indexToUpdate]
        )
        console.log(data, error)
    }

    async function togglePurchased(id: number) {
        const indexToUpdate = products.value.findIndex((elem) => elem.id === id)
        if (indexToUpdate !== -1) {
            products.value[indexToUpdate].purchased =
                !products.value[indexToUpdate].purchased
        }
        const {data, error} = await updateProductInfo(
            products.value[indexToUpdate]
        )
    }

    async function fetchProducts(page = 1) {
        try {
            loading.value = true
            const {from, to} = getPagination(page, 3)
            const {data: product, error} = await supabase
                .from('product')
                .select('*', {count: 'exact'})
                .order('id', {ascending: true})
                .range(from, to)
            if (error) throw new Error(error.message)
            if (product) {
                products.value = product
            }
        } catch (error) {
            console.error(error)
        }
        loading.value = false
    }

    async function getServerSideProps({query: {page = 1}}) {
        const {from, to} = getPagination(page, 3)
        const {data: product, count} = await supabase
            .from('product')
            .select('*', {count: 'exact'})
            .order('id', {ascending: true})
            .range(from, to)

        return {
            props: {
                data: product,
                count: count,
                page: +page,
            },
        }
    }

    const getPagination = (page: number, size: number) => {
        const limit = size ? +size : 3
        const from = page ? page * limit : 0
        const to = page ? from + size - 1 : size - 1

        return {from, to}
    }
    // watch(
    //   products,
    //   (state: Product[]) => {
    //     localStorage.setItem('products', JSON.stringify(state))
    //   },
    //   { deep: true }
    // )
    return {
        products,
        search,
        searchProducts,
        purchasedProducts,
        fetchProducts,
        addProduct,
        incrementProductCount,
        deleteProduct,
        togglePurchased,
        decrementProductCount,
        updateProduct,
        updateProductInfo,
        loading,
    }
})
