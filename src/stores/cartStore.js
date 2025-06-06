import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/authStore'
import Swal from 'sweetalert2'

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
    
          if (error) throw error
    
          cartItems.value = items ?? []
        } catch (error) {
            Swal.fire({
                title: 'Failed to Load Cart Items',
                html: error?.message || 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'Ok',
            })
            console.error('Error fetching cart:', err)
        }  finally {
          isLoading.value = false
        }
    }

    async function addToCart(cartItem) {
        try {
            cartItem.user_id = user.id
            const { data, error } = await supabase.from('cart_items').insert([cartItem])
            await fetchCart()

            if (error) throw error
        } catch (error) { 
            Swal.fire({
                toast: true,
                position: 'top-end',
                timer: 2000,
                title: 'Failed to Add to Cart',
                html: error?.message || 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'Ok',
            })
            console.error('Add to cart failed:', err)
        }
    }

    return { isLoading, fetchCart, addToCart, cartItems, cartCount }
})