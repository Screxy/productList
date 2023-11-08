import {computed, ref, watch} from 'vue'

export function useToast() {
    const errorMessage = ref<string>('')
    const toastVisible = computed(() => {
        return errorMessage.value ? true : false
    })

    watch(errorMessage, () => setTimeout(() => (errorMessage.value = ''), 3000))
    return {errorMessage, toastVisible}
}