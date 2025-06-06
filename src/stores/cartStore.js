import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useCart = defineStore('cart', () => {
    const isLoading = ref(false)
    const cartItems = ref([])

    async function fetchCart() {
        try {
          isLoading.value = true
          const { data: items, error } = await supabase.from('cart_items').select('*')
    
          if (error) {
            console.error('Error fetching cart:', error)
            return
          }
    
          cartItems.value = items ?? []
        } finally {
          isLoading.value = false
        }
    }

    return { isLoading, fetchCart, cartItems }
})