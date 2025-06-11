<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
            <CheckoutSkeleton v-if="isLoading" />
            <div v-if="!isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <!-- Billing Details -->
                <div>
                    <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-2.5 lg:pb-6">Billing Details</h2>
                    <div 
                        v-if="isMobile && !showForm"
                        class="border border-gray-300 p-4 sm:p-6 rounded-lg shadow w-full text-left flex justify-between gap-4 items-start text-sm sm:text-base"
                    >
                        <div class="flex flex-col" v-if="isMobile && hasBillingDetails">
                            <span class="inline-block mb-0.5">{{ billing.fullname }}</span>
                            <span class="inline-block mb-0.5">{{ billing.phone }}</span>
                            <span class="inline-block mb-0.5">
                                {{ billing.apartment ? billing.apartment+', ' : '' }}
                                {{ billing.address ? billing.address+', ' : '' }} {{ billing.city }}
                            </span>
                        </div>
                        <button 
                            @click="showForm = true"
                            class="text-secondary-500 cursor-pointer flex items-center gap-1 text-sm sm:text-base" 
                            v-if="isMobile && hasBillingDetails"
                        >
                            Edit
                            <PhPencilSimple :size="16" />
                        </button>
                        <button 
                            v-if="isMobile && !hasBillingDetails && !showForm"
                            @click="showForm = true"
                            class="text-secondary-500 cursor-pointer flex items-center gap-1 self-center text-sm sm:text-base mx-auto"
                        >
                            Add Billing Details
                            <PhPlus :size="16" />
                        </button>
                    </div>
                    <form class="space-y-4" v-if="!isMobile || showForm">
                        <div>
                            <label class="block text-sm font-medium">Full Name<span class="text-red-500">*</span></label>
                            <input 
                                v-model="billing.fullname"
                                type="text" 
                                class="mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" 
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Street Address<span class="text-red-500">*</span></label>
                            <input 
                                v-model="billing.address"
                                type="text" 
                                class="mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" 
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Apartment, floor, etc. <span class="text-gray-500 text-xs">(Optional)</span></label>
                            <input 
                                v-model="billing.address"
                                type="text" 
                                class="mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" 
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Town/City<span class="text-red-500">*</span></label>
                            <input 
                                v-model="billing.city"
                                type="text" 
                                class="mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" 
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Phone Number<span class="text-red-500">*</span></label>
                            <input 
                                v-model="billing.phone"
                                type="text" 
                                class="mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" 
                            />
                        </div>
                        <div class="flex items-center">
                            <label class="relative cursor-pointer flex items-center gap-1.5">
                                <input 
                                    type="checkbox" 
                                    v-model="saveBillingInfo"
                                    class="absolute left-0 right-0 top-0 bottom-0 opacity-0 z-10 cursor-pointer"
                                >
                                <span 
                                    class="w-4.5 h-4.5 rounded-sm border-[1px] border-black flex items-center justify-center text-white relative"
                                >
                                   <PhCheckFat 
                                        :size="12" 
                                        weight="fill" 
                                        :class="[
                                            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-150',
                                            saveBillingInfo ? 'text-black' : 'text-transparent'
                                        ]"
                                    />
                                </span>
                                <span class="text-sm">Save details for faster checkout next time</span>
                            </label>
                        </div>

                        <div v-if="isMobile" class="flex gap-3">
                            <BaseButton
                                type="button"
                                class="text-sm md:text-base !py-1.5 !px-4 !md:py-2 !md:px-4.5 flex items-center justify-center gap-x-1 bg-white !text-black border-[1px] border-black/50 hover:!bg-gray-200"
                                @click="showForm = false"
                            >
                                Cancel
                            </BaseButton>
                            <BaseButton
                                type="submit"
                                class="text-sm md:text-base !py-1.5 !px-4 !md:py-2 !md:px-4.5 flex items-center justify-center"
                                @click.prevent="showForm = false"
                            >
                                Save
                            </BaseButton>
                        </div>
                    </form>
                </div>

                <!-- Order Summary -->
                <div class="space-y-5">
                    <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-2.5 lg:pb-6 mb-0">Order Summary</h2>
                    <div class="border border-gray-300 p-6 rounded-lg space-y-8 lg:space-y-6 shadow">
                        <div
                            v-for="(cartItem, index) in cart.cartSelectedItems" :key="cartItem.id"
                            :class="[
                                'flex items-baseline md:items-center justify-between gap-2 lg:gap-12 flex-col md:flex-row',
                                index !== cart.cartSelectedItems.length - 1 ? 'border-b border-b-gray-300 pb-6' : ''
                            ]"
                        >
                            <div class="flex items-center gap-3 grow-0">
                                <img :src="cartItem?.products?.images[0]?.url" :alt="cartItem?.products?.name" class="w-10 h-10 object-contain"/>
                                <div>
                                    <span class="line-clamp-2 text-sm sm:text-base font-semibold text-gray-800">{{ cartItem?.products?.name }}</span>
                                    <span class="text-sm sm:text-base text-gray-500">Php {{ formatAmount(cartItem?.products?.discounted_price) }}</span>
                                </div>
                            </div>
                            <div class="shrink-0 flex flex-col gap-0.5 text-sm sm:text-base text-gray-500">
                                <span class="text-left md:text-right">Quantity: {{ cartItem?.quantity }}</span>
                                <span>Php {{ formatAmount(cartItem?.products?.discounted_price * cartItem?.quantity) }}</span>
                            </div>
                        </div>
                        <div class="border-t border-t-gray-300 pt-6 mt-6 space-y-2.5">
                            <div class="flex justify-between text-sm sm:text-base">
                                <span>Subtotal:</span>
                                <span>Php {{ formatAmount(cart.cartTotal) }}</span>
                            </div>
                            <div class="flex justify-between text-sm sm:text-base">
                                <span>Shipping:</span>
                                <span class="text-green-500">Free</span>
                            </div>
                            <div class="flex justify-between font-bold text-base sm:text-lg">
                                <span>Total:</span>
                                <span>Php {{ formatAmount(cart.cartTotal) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Options -->
                    <div class="space-y-2">
                        <h2>Payment Options:</h2>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <!-- Cash on Delivery -->
                            <label
                                class="group block cursor-pointer border rounded-lg p-2.5 sm:p-3 transition-all hover:shadow relative"
                                :class="payment === 'cod' ? 'border-secondary-500 ring-2 ring-secondary-100' : 'border-gray-300'"
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    v-model="payment"
                                    class="sr-only"
                                />
                                <div class="flex items-center gap-3 text-sm sm:text-base">
                                    <PhMoney :size="20" :weight="'regular'" :class="payment === 'cod' ? 'text-secondary-500' : 'text-gray-500'" />
                                    <span :class="payment === 'cod' ? 'text-secondary-600 font-medium' : 'text-gray-700'">Cash on Delivery</span>
                                </div>
                            </label>

                            <!-- Bank -->
                            <label
                                class="group block cursor-pointer border rounded-lg p-2.5 sm:p-3 transition-all hover:shadow relative"
                                :class="payment === 'bank' ? 'border-secondary-500 ring-2 ring-secondary-100' : 'border-gray-300'"
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="bank"
                                    v-model="payment"
                                    class="sr-only"
                                />
                                <div class="flex items-center gap-3 text-sm sm:text-base">
                                    <PhBank :size="20" :weight="'regular'" :class="payment === 'bank' ? 'text-secondary-500' : 'text-gray-500'" />
                                    <span :class="payment === 'bank' ? 'text-secondary-600 font-medium' : 'text-gray-700'">Bank</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <BaseButton class="w-full">Place Order</BaseButton>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useCurrencyFormat } from '@/composables/currencyFormat'

import BaseButton from '@/components/BaseButton.vue'
import CheckoutSkeleton from '@/components/CheckoutSkeleton.vue'

const payment = ref('cod')
const isMobile = ref(false)
const showForm = ref(false)
const saveBillingInfo = ref(false)
const isLoading = ref(false)
const cart = useCartStore()
const { formatAmount } = useCurrencyFormat()

const billing = ref({
    fullname: 'Shaina De Guzman',
    phone: '097676767',
    address: 'J.P Rizal Street',
    city: 'Jalajala, Rizal',
    apartment: '3245 Apartment',
})

const hasBillingDetails = computed(() => {
    return billing.value.fullname && billing.value.phone && billing.value.address && billing.value.city
})

const checkViewport = () => {
    isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
    checkViewport()
    window.addEventListener('resize', checkViewport)
})

onMounted(async () => {
    isLoading.value = true
    await cart.fetchSelectedCartItems()
    isLoading.value = false
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkViewport)
})
</script>