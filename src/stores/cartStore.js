import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/authStore'

export const useCartStore = defineStore('cart', () => {
    const isLoading = ref(false)
    const cartItems = ref([])
    const auth = useAuthStore()
    const user = auth.user
    const cartCount = computed(() => cartItems.value.length)

    async function fetchCart() {
        try {
          isLoading.value = true
          const { data: items, error } = await supabase.from('cart_items').select('*').eq('user_id', user.id)
    
          if (error) {
            console.error('Error fetching cart:', error)
            return
          }
    
          cartItems.value = items ?? []
        } finally {
          isLoading.value = false
        }
    }

    return { isLoading, fetchCart, cartItems, cartCount }
})