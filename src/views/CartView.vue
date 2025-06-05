<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10 product-details">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
            <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-5 md:pb-10">
                <span class="font-semibold">My Cart 🛒</span><span class="font-regular text-gray-500">(2 items)</span>
            </h2>
            <!-- Cart List -->
            <div class="space-y-3 md:space-y-5">
                <!-- Cart Item -->
                <div
                    v-for="item in cartItems" 
                    :key="item.id"
                    class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                    <!-- Checkbox + Product Info -->
                    <div class="flex items-start gap-4">
                        <input type="checkbox" class="mt-1" />
                        <img :src="item.image" :alt="item.name" class="w-18 h-18 sm:w-20sm: sm:h-20 object-cover rounded" />
                        <div>
                            <p class="font-medium text-gray-800">{{ item.name }}</p>
                            <p class="text-sm text-gray-500">Price: Php {{ formatAmount(650) }}</p>
                            <p class="text-sm text-gray-500">Subtotal: Php {{ formatAmount(650) }}</p>
                        </div>
                    </div>
                    <!-- Quantity + Remove -->
                    <div class="flex items-center justify-between sm:justify-end sm:gap-4 w-full sm:w-auto">
                        <select class="border rounded px-2 py-1 text-sm">
                            <option v-for="n in 10" :key="n" :value="n">
                                {{ n.toString().padStart(2, '0') }}
                            </option>
                        </select>
                        <BaseButton class="ml-4 sm:ml-0 !p-1.5 sm:!p-2">
                            <PhTrash class="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                        </BaseButton>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex items-start flex-col md:flex-row justify-between mt-6 gap-4">
                <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <BaseLinkButton 
                        to="/products" 
                        class="!flex items-center gap-x-1.5 text-sm !px-4.5 !py-2.5 md:!px-6 md:!py-3 md:mx-0 text-center !w-full md:!w-auto bg-white !text-black border-[1px] border-black/50 hover:!bg-gray-200"
                    >
                        Back to Shop
                        <PhArrowUDownLeft :size="18" />
                    </BaseLinkButton>
                    <BaseButton 
                        :disabled="disableRemoveButton"
                        class="!flex items-center justify-center gap-x-1.5 text-sm !px-4.5 !py-2.5 md:!px-6 md:!py-3 mx-auto md:mx-0 w-full md:w-auto !bg-red-500 !text-white border-[1px] border-red/50 hover:!bg-red-600"
                    >
                        Remove
                        <PhTrash :size="18" />
                    </BaseButton>
                </div>

                <!-- Cart Total -->
                <div class="border p-6 rounded-md w-full md:w-1/2 lg:w-1/3">
                    <h3 class="text-lg font-medium mb-4">Cart Total</h3>
                    <div class="flex justify-between mb-3.5 text-sm">
                        <span>Subtotal:</span>
                        <span>Php {{ formatAmount(1300) }}</span>
                    </div>
                    <div class="flex justify-between mb-3.5 text-sm">
                        <span>Shipping:</span>
                        <span class="text-green-600 font-medium">Free</span>
                    </div>
                    <div class="flex justify-between font-semibold text-base border-t pt-3.5 mt-3.5">
                        <span>Total:</span>
                        <span>Php {{ formatAmount(1300) }}</span>
                    </div>
                    <BaseButton class="w-full mt-4">
                        Proceed to Checkout
                    </BaseButton>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useCurrencyFormat } from '@/composables/currencyFormat'

import BaseLinkButton from '@/components/BaseLinkButton.vue'
import BaseButton from '@/components/BaseButton.vue'

const { formatAmount } = useCurrencyFormat()
const disableRemoveButton = ref(true)

const cartItems = [
  {
    id: 1,
    name: 'LCD Monitor',
    price: 650,
    quantity: 1,
    image: 'https://jquwasnrxbzlhmtwnrit.supabase.co/storage/v1/object/public/product-images//c08186083_1_1.avif',
  },
  {
    id: 2,
    name: 'H1 Gamepad',
    price: 550,
    quantity: 2,
    image: 'https://jquwasnrxbzlhmtwnrit.supabase.co/storage/v1/object/public/product-images//Bluetooth-Smartwatch-PNG-Picture.png',
  },
];
</script>