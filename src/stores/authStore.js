import { defineStore } from 'pinia'
import { supabase } from '@/supabase'
import { ref } from 'vue'
import NProgress from 'nprogress'
import Swal from 'sweetalert2'

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

    // Login
    async function login(email, password) {
        NProgress.start()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (!error) {
            session.value = data.session
            user.value = data.session?.user || null
        } else if (error) {
            Swal.fire({
                title: 'Login Failed',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        NProgress.done()
    }

    // Logout
    async function logout() {
        NProgress.start()
        await supabase.auth.signOut()
        user.value = null
        session.value = null
        NProgress.done()
    }
    
    return { user, session, loading, initAuth, login, logout }
})