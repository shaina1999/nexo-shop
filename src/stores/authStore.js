import { defineStore } from 'pinia'
import { supabase } from '@/supabase'
import { ref } from 'vue'
import NProgress from 'nprogress'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const session = ref(null)
    const loading = ref(true)

    // Initialize session on app load
    async function initAuth() {
        const { data, error } = await supabase.auth.getSession()
        if (!error) {
            session.value = data.session
            user.value = data.session?.user || null
        }
        loading.value = false

        // Auth change listener
        supabase.auth.onAuthStateChange((_event, newSession) => {
            session.value = newSession
            user.value = newSession?.user || null
        })
    }

    // Logout
    async function logout() {
        NProgress.start()
        await supabase.auth.signOut()
        user.value = null
        session.value = null
        NProgress.done()
    }
    
    return { user, session, loading, initAuth, logout }
})