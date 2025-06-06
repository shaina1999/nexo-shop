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
    const cartCount = computed(() => cartItems.value.reduce((total, item) => total + item.quantity, 0))

    async function fetchCart() {
        try {
          isLoading.value = true
          const { data: items, error } = await supabase.from('cart_items').select('id, quantity, products:product_id(id, name, discounted_price, images, stock, is_available)').eq('user_id', user.id)
    
          if (error) throw error
    
          cartItems.value = items ?? []
        } catch (error) {
            console.error('Error fetching cart:', error)
        }  finally {
          isLoading.value = false
        }
    }

    async function addToCart(cartItem) {
        try {
            cartItem.user_id = user.id

            // 1. Check if the item already exists in the cart
            const { data: existingItems, error: fetchError } = await supabase.from('cart_items').select('id, quantity').eq('user_id', user.id).eq('product_id', cartItem.product_id).limit(1)
            if (fetchError) throw fetchError

            const existingItem = existingItems?.[0]

            if (existingItem) {
                // 2. If item exists, update the quantity
                const updatedQuantity = existingItem.quantity + (cartItem.quantity || 1)
                const { error: updateError } = await supabase.from('cart_items').update({ quantity: updatedQuantity }).eq('id', existingItem.id)
                if (updateError) throw updateError
            } else {
                // 3. If item does not exist, insert new
                const { error: insertError } = await supabase.from('cart_items').insert([cartItem])
                if (insertError) throw insertError
            }

            Swal.fire({
                toast: true,
                timer: 2000,
                title: 'Success',
                position: 'bottom-end',
                html: "Added to bag successfully",
                icon: 'success'
            })
            
            await fetchCart()
        } catch (error) { 
            console.error('Add to cart failed:', error)
        }
    }

    return { isLoading, fetchCart, addToCart, cartItems, cartCount }
})