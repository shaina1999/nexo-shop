import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useUser = defineStore('user', () => {
  const user = ref(null)

  async function fetchUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Failed to get user:', error)
      user.value = null
    } else {
      user.value = data.user
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
  }

  return { user, fetchUser, logout }
})