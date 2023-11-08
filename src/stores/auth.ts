import {computed, ref, watch} from 'vue'
import {defineStore} from 'pinia'
import {supabase} from '@/main'
import type {User} from '@supabase/gotrue-js/src/lib/types'
import type {Session} from '@supabase/supabase-js'

export interface IUser {
    email: string
    password: string
}

export interface INewUser extends IUser {
    name: string
}

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const currentUser = ref<User | null>(null)
    const currentSession = ref<Session | null>(null)

    const errorMessage = ref<string>('')
    const toastVisible = computed(() => {
        return !!errorMessage.value
    })
    const clearErrorMessage = () => errorMessage.value = ''

    watch(errorMessage, () => setTimeout(clearErrorMessage, 3000))

    async function authCheck() {
        const {data, error} = await supabase.auth.getSession()
        if (data.session) {
            currentUser.value = data.session.user
            currentSession.value = data.session
        }
        if (error) {
            console.log(error)
            errorMessage.value = error.message
        }
        isAuthenticated.value = data.session != null
        return isAuthenticated.value
    }

    async function login(userData: IUser) {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: userData.email,
            password: userData.password,
        })
        if (error) {
            errorMessage.value = error.message
        } else {
            isAuthenticated.value = true
        }
        if (data.user) currentUser.value = data.user
        if (data.session) currentSession.value = data.session
        return {data, error}
    }

    async function signUp(newUserData: INewUser) {
        const {data, error} = await supabase.auth.signUp({
            email: newUserData.email,
            password: newUserData.password,
            options: {
                data: {
                    name: newUserData.name,
                },
            },
        })
        if (error) {
            errorMessage.value = error.message
        } else {
            isAuthenticated.value = true
        }
        return {data, error}
    }

    async function logout() {
        const {error} = await supabase.auth.signOut()

        if (error) {
            errorMessage.value = error.message
        } else {
            isAuthenticated.value = false
            currentUser.value = null
            currentSession.value = null
        }

        return error
    }

    async function updatePassword(newPassword: string) {
        const {data, error} = await supabase.auth.updateUser({
            password: newPassword
        })
        currentUser.value = data.user
        if (error) errorMessage.value = error.message
        return {data, error}
    }

    return {
        isAuthenticated,
        currentUser,
        currentSession,
        errorMessage,
        toastVisible,
        clearErrorMessage,
        updatePassword,
        login,
        signUp,
        logout,
        authCheck,
    }
})
