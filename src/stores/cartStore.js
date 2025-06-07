import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/authStore'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

export const useCartStore = defineStore('cart', () => {
    const isLoading = ref(false)
    const cartItems = ref([])
    const auth = useAuthStore()
    const user = auth.user
    const cartCount = computed(() => cartItems.value.reduce((total, item) => total + item.quantity, 0))
    const cartTotal = ref(0)
    const router = useRouter()

    async function fetchCart() {
        try {
          isLoading.value = true
          const { data: items, error } = await supabase
            .from('cart_items')
            .select('id, quantity, is_selected, products:product_id(id, name, discounted_price, images, stock, is_available)')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true })
    
          if (error) throw error
    
          cartItems.value = items ?? []
          await fetchCartTotal()
        } catch (error) {
            console.error('Error fetching cart:', error)
        }  finally {
          isLoading.value = false
        }
    }

    async function addToCart(cartItem) {
        try {
            if(!user){
                Swal.fire({
                    toast: true,
                    timer: 5000,
                    title: 'Please Log In',
                    position: 'bottom-end',
                    html: "You need to sign in to add items to your bag.",
                    icon: 'info'
                })
                router.push('/login')
                return
            }

            cartItem.user_id = user.id

            // 1. Check if the item already exists in the cart
            const { data: existingItems, error: fetchError } = await supabase
                .from('cart_items')
                .select('id, quantity')
                .eq('user_id', user.id).
                eq('product_id', cartItem.product_id).limit(1)
            if (fetchError) throw fetchError

            const existingItem = existingItems?.[0]

            if (existingItem) {
                // 2. If item exists, update the quantity
                const updatedQuantity = existingItem.quantity + (cartItem.quantity || 1)
                const { error: updateError } = await supabase
                    .from('cart_items')
                    .update({ quantity: updatedQuantity })
                    .eq('id', existingItem.id)
                if (updateError) throw updateError
            } else {
                // 3. If item does not exist, insert new
                const { error: insertError } = await supabase
                    .from('cart_items')
                    .insert([cartItem])
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

    async function fetchCartTotal() {
        try {
            /*
            * Check if any cart item is selected
            * - We only want to calculate the total if at least one item is selected
            * - This avoids making an unnecessary database query
            */
            const hasSelectedItems = cartItems.value.some(item => item.is_selected)
            if (!hasSelectedItems) {
                cartTotal.value = 0
                return
            }

            const { data, error } = await supabase
            .from('cart_totals')
            .select('total_amount')
            .eq('user_id', user.id)
            .single()

            if (error) {
                if (error.code === 'PGRST116') {
                    cartTotal.value = 0
                } else {
                    throw error
                }
            } else {
                cartTotal.value = data?.total_amount ?? 0
            }
        } catch (error) {
            console.error('Error fetching cart total:', error)
            cartTotal.value = 0
        }
    }

    function removeCartItemLocally(itemId) {
        cartItems.value = cartItems.value.filter(item => item.id !== itemId)

        Swal.fire({
            toast: true,
            timer: 2000,
            title: 'Removed',
            position: 'bottom-end',
            html: "Item removed from your cart successfully",
            icon: 'success'
        })
    }

    return { isLoading, fetchCart, addToCart, cartItems, cartCount, cartTotal, fetchCartTotal, removeCartItemLocally }
})