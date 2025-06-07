<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10 product-details">
        <div v-if="!cart.isLoading" class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
            <div v-if="cart.cartCount">
                <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-5 md:pb-10">
                    <span class="font-semibold">My Cart 🛒</span><span class="font-regular text-gray-500">({{ cart.cartCount }} item{{ cart.cartCount !== 1 ? 's' : '' }})</span>
                </h2>
                <!-- Cart List -->
                <div class="space-y-5">
                    <!-- Cart Item -->
                    <CartItem v-for="cartItem in cart.cartItems" :key="cartItem.id" :cartItem="cartItem" />
                </div>

                <!-- Actions -->
                <div class="flex items-start flex-col md:flex-row justify-between mt-6 gap-4">
                    <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                        <BaseLinkButton 
                            to="/products" 
                            class="!flex items-center gap-x-1.5 text-sm !px-4.5 !py-2.5 md:!px-6 md:!py-3 md:mx-0 text-center !w-full md:!w-auto bg-white !text-black border-[1px] border-black/50 hover:!bg-gray-200"
                        >
                            Back to Shop
                            <PhArrowUDownLeft :size="18" />
                        </BaseLinkButton>
                    </div>

                    <!-- Cart Total -->
                    <div class="shrink-1 border p-6 rounded-md w-full md:w-1/2 lg:w-1/3">
                        <h3 class="text-base sm:text-lg font-medium mb-4">Cart Total</h3>
                        <div class="flex justify-between mb-2.5 text-sm sm:text-base">
                            <span>Subtotal:</span>
                            <span>Php {{ formatAmount(cart.cartTotal) }}</span>
                        </div>
                        <div class="flex justify-between mb-2.5 text-sm sm:text-base">
                            <span>Shipping:</span>
                            <span class="text-green-600 font-medium">Free</span>
                        </div>
                        <div class="flex justify-between font-semibold text-base sm:text-lg border-t pt-4 mt-3.5">
                            <span>Total:</span>
                            <span>Php {{ formatAmount(cart.cartTotal) }}</span>
                        </div>
                        <BaseButton class="w-full mt-4" @click="checkout">
                            Proceed to Checkout
                        </BaseButton>
                    </div>
                </div>
            </div>

            <div v-else class="flex flex-col items-center justify-center text-center pt-8">
                <img :src="emptyCartIllustration" alt="Empty Cart" class="w-20 h-20 mb-6 md:w-24 md:h-24 object-contain" />
                <h2 class="text-s sm:text-lg font-semibold text-black mb-1">Your cart is empty</h2>
                <p class="text-sm sm:text-base text-gray-500 mb-6 max-w-md">Looks like you haven't added anything to your cart yet.</p>
                <BaseLinkButton 
                    to="/products"
                    class="!flex items-center gap-x-1.5 text-sm sm:text-base !px-4.5 !py-2.5 md:!px-6 md:!py-3 text-center w-auto bg-white !text-black border border-black/50 hover:!bg-gray-200 transition"
                >
                    Continue Shopping
                    <PhBag :size="18" />
                </BaseLinkButton>
            </div>
        </div>
        <CartSkeleton v-else />
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCurrencyFormat } from '@/composables/currencyFormat'
import { useCartStore } from '@/stores/cartStore'
import { useRouter, useRoute } from 'vue-router'

import BaseLinkButton from '@/components/BaseLinkButton.vue'
import CartItem from '@/components/CartItem.vue'
import BaseButton from '@/components/BaseButton.vue'
import CartSkeleton from '@/components/CartSkeleton.vue'
import emptyCartIllustration from '@/assets/img/empty-cart.png'

const { formatAmount } = useCurrencyFormat()
const cart = useCartStore()
const router = useRouter()

const checkout = () => {
    router.push('/checkout')
}

onMounted(async () => {
    await cart.fetchCart()
})
</script>