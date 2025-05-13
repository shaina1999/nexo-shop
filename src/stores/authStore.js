import { defineStore } from 'pinia'
import { supabase } from '@/supabase'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import NProgress from 'nprogress'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const session = ref(null)
    const loading = ref(true)
    const isSubmitting = ref(false)
    const router = useRouter()
    const route = useRoute()

    // Initialize session on app load
    async function initAuth() {
        NProgress.start()
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
        NProgress.done()
    }

    // Login
    async function login(email, password) {
        NProgress.start()
        isSubmitting.value = true

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
        isSubmitting.value = false
        router.push('/')
    }

    // Logout
    async function logout() {
        NProgress.start()
        await supabase.auth.signOut()
        user.value = null
        session.value = null
        NProgress.done()
    }
    
    return { user, session, loading, initAuth, login, logout, isSubmitting }
})