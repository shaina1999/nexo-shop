<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10 product-details">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
            <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-5 md:pb-10">
                <span class="font-semibold">My Cart 🛒</span><span class="font-regular text-gray-500">(2 items)</span>
            </h2>
            <!-- Cart List -->
            <div class="space-y-5">
                <!-- Cart Item -->
                <div
                    v-for="item in cartItems" 
                    :key="item.id"
                    class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 sm:gap-12"
                >
                    <!-- Checkbox + Product Info -->
                    <div class="flex items-start gap-4">
                        <label class="relative cursor-pointer">
                            <input 
                                name="cartitem1" 
                                type="checkbox" 
                                class="absolute left-0 right-0 top-0 bottom-0 w-full h-full opacity-0 cursor-pointer" 
                                @change="(event) => handleCheckboxChange(event, item)"
                                v-model="checkedItems[item.id]"
                            >
                            <span 
                                class="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-sm border-[1px] border-black flex items-center justify-center text-white relative"
                                :class="{'bg-black': checkedItems[item.id]}"
                            >
                                <PhCheckFat 
                                    :size="12" 
                                    weight="fill" 
                                    class="absolute top-[50%] -translate-x-1/2 left-1/2 -translate-y-1/2 text-transparent"
                                    :class="{'text-white': checkedItems[item.id], 'text-transparent': !checkedItems[item.id]}" 
                                />
                            </span>
                        </label>
                        <img :src="item.image" :alt="item.name" class="w-18 h-18 sm:w-20sm: sm:h-20 object-cover rounded" />
                        <div>
                            <p class="text-sm sm:text-base font-semibold text-gray-800">{{ item.name }}</p>
                            <p class="text-sm sm:text-base text-gray-500">Price: Php {{ formatAmount(650) }}</p>
                            <p class="text-sm sm:text-base text-gray-500">Subtotal: Php {{ formatAmount(650) }}</p>
                        </div>
                    </div>
                    <!-- Quantity + Remove -->
                    <div class="flex items-center justify-between sm:justify-end sm:gap-2.5 w-full sm:w-auto">
                        <div class="flex items-center rounded overflow-hidden w-full sm:w-max h-[30px] sm:h-[36px]">
                            <button 
                                class="text-lg w-[40px] cursor-pointer h-full border-r-[1px] border flex items-center justify-center rounded-tl-sm rounded-bl-sm hover:!bg-transparent"
                            >
                                <PhMinus :size="18" />
                            </button>
                            <input 
                                v-model="quantity"
                                type="text" 
                                class="w-[60px] sm:w-[66px] border-t-[1px] border-t-black border-b-[1px] border-b-black outline-none text-center text-sm sm:text-base h-full disabled:opacity-[0.5]" 
                            >
                            <button 
                                class="text-lg w-[40px] cursor-pointer h-full border-r-[1px] text-white border-secondary-500 flex items-center justify-center bg-secondary-500 rounded-tr-sm rounded-br-sm"
                            >
                                <PhPlus :size="18" />
                            </button>
                        </div>
                        <BaseButton class="ml-4 sm:ml-0 !p-1.5 sm:!p-2">
                            <PhTrash class="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                        </BaseButton>
                    </div>
                </div>
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
                    <BaseButton 
                        :disabled="disableRemoveButton"
                        class="!flex items-center justify-center gap-x-1.5 text-sm !px-4.5 !py-2.5 md:!px-6 md:!py-3 mx-auto md:mx-0 w-full md:w-auto !bg-red-500 !text-white border-[1px] border-red/50 hover:!bg-red-600"
                    >
                        Remove Selected
                        <PhTrash :size="18" />
                    </BaseButton>
                </div>

                <!-- Cart Total -->
                <div class="shrink-1 border p-6 rounded-md w-full md:w-1/2 lg:w-1/3">
                    <h3 class="text-base sm:text-lg font-medium mb-4">Cart Total</h3>
                    <div class="flex justify-between mb-2.5 text-sm sm:text-base">
                        <span>Subtotal:</span>
                        <span>Php {{ formatAmount(1300) }}</span>
                    </div>
                    <div class="flex justify-between mb-2.5 text-sm sm:text-base">
                        <span>Shipping:</span>
                        <span class="text-green-600 font-medium">Free</span>
                    </div>
                    <div class="flex justify-between font-semibold text-base sm:text-lg border-t pt-4 mt-3.5">
                        <span>Total:</span>
                        <span>Php {{ formatAmount(1300) }}</span>
                    </div>
                    <BaseButton class="w-full mt-4">
                        Proceed to Checkout
                    </BaseButton>
                </div>
            </div>

            <div class="flex flex-col items-center justify-center text-center pt-8 hidden">
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
    </section>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useCurrencyFormat } from '@/composables/currencyFormat'

import BaseLinkButton from '@/components/BaseLinkButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import emptyCartIllustration from '@/assets/img/empty-cart.png'

const { formatAmount } = useCurrencyFormat()
const disableRemoveButton = ref(true)
const checkedItems = reactive({})
const quantity = ref(1)

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

const handleCheckboxChange = (event, item) => {
    if (checkedItems[item.id]) {
        console.log(`${item.name} is checked`)
    } else {
        console.log(`${item.name} is unchecked`)
    }
}

onMounted(() => {
    cartItems.forEach(item => {
        checkedItems[item.id] = false
    })
})
</script>