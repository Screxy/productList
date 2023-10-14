import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/main';
export type User = {
  email: string;
  password: string;
};
export type NewUser = User & {
  name: string;
};
export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const user = ref({});
  const session = ref({});
  async function login(userData: User) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });
    if (!error) isAuthenticated.value = true;
    return { data, error };
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
    });
    if (!error) isAuthenticated.value = true;
    return { data, error };
  }
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) isAuthenticated.value = false;
    console.log(error);
    
    return error;
  }
  return { isAuthenticated, user, session, login, signUp, logout };
});
