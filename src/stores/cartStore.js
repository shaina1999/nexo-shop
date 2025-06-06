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

    function showErrorAlert(title, error) {
        Swal.fire({
          title,
          html: error?.message || 'Something went wrong. Please try again.',
          icon: 'error',
        })
    }

    async function fetchCart() {
        try {
          isLoading.value = true
          const { data: items, error } = await supabase.from('cart_items').select('id, quantity, products:product_id(id, name, discounted_price, images, stock, is_available)').eq('user_id', user.id)
    
          if (error) throw error
    
          cartItems.value = items ?? []
        } catch (error) {
            showErrorAlert('Failed to Load Cart Items', error)
            console.error('Error fetching cart:', error)
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
            showErrorAlert('Failed to Add to Cart', error)
            console.error('Add to cart failed:', error)
        }
    }

    return { isLoading, fetchCart, addToCart, cartItems, cartCount }
})