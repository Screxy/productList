import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/main'
export type User = {
  email: string
  password: string
}
export type NewUser = User & {
  name: string
}
export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const currentUser = ref({})
  const currentSession = ref({})
  async function AuthCheck() {
    const { data, error } = await supabase.auth.getSession()
    if (data.session) {
      currentUser.value = data.session.user
      currentSession.value = data.session
    }
    if (error) console.log(error)
    if (data.session != null) return (isAuthenticated.value = true)
    return (isAuthenticated.value = false)
  }
  onMounted(AuthCheck)
  async function login(userData: User) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    })
    if (!error) isAuthenticated.value = true
    if (data.user) currentUser.value = data.user
    if (data.session) currentSession.value = data.session
    return { data, error }
  }
  async function signUp(newUserData: NewUser) {
    const { data, error } = await supabase.auth.signUp({
      email: newUserData.email,
      password: newUserData.password,
      options: {
        data: {
          name: newUserData.name,
        },
      },
    })
    if (!error) isAuthenticated.value = true
    return { data, error }
  }
  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      isAuthenticated.value = false
      currentUser.value = {}
      currentSession.value = {}
    }
    console.log(error)

    return error
  }
  return { isAuthenticated, currentUser, currentSession, login, signUp, logout }
})
