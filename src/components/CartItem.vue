<template>
    <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 sm:gap-12">
        <!-- Checkbox + Product Info -->
        <div class="flex items-start gap-4">
            <label class="relative cursor-pointer">
                <input 
                    type="checkbox" 
                    class="absolute left-0 right-0 top-0 bottom-0 w-full h-full opacity-0 cursor-pointer" 
                    @change="(event) => handleCheckboxChange(event, cartItem)"
                    v-model="checkedItems[cartItem?.id]"
                >
                <span 
                    class="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-sm border-[1px] border-black flex items-center justify-center text-white relative"
                    :class="{'bg-black': checkedItems[cartItem?.id]}"
                >
                    <PhCheckFat 
                        :size="12" 
                        weight="fill" 
                        class="absolute top-[50%] -translate-x-1/2 left-1/2 -translate-y-1/2 text-transparent"
                        :class="{'text-white': checkedItems[cartItem?.id], 'text-transparent': !checkedItems[cartItem?.id]}" 
                    />
                </span>
            </label>
            <img :src="cartItem?.products?.images[0].url" :alt="cartItem?.products?.name" class="w-18 h-18 sm:w-20sm: sm:h-20 object-cover rounded" />
            <div>
                <p class="text-sm sm:text-base font-semibold text-gray-800">{{ cartItem?.products?.name }}</p>
                <p class="text-sm sm:text-base text-gray-500">Price: Php {{ formatAmount(cartItem?.products?.discounted_price) }}</p>
                <p class="text-sm sm:text-base text-gray-500">Subtotal: Php {{ formatAmount(cartItem?.products?.discounted_price) }}</p>
            </div>
        </div>
        <!-- Quantity + Remove -->
        <div class="flex items-center justify-between sm:justify-end sm:gap-2.5 w-full sm:w-auto">
            <QuantityInput
                :min="1"
                :max="maxQuantity"
                v-model="quantity"
                :wrapper-class="'flex items-center rounded overflow-hidden w-full sm:w-max h-[30px] sm:h-[36px]'"
                :input-class="'w-[60px] sm:w-[66px] border-t-[1px] border-t-black border-b-[1px] border-b-black outline-none text-center text-sm sm:text-base h-full disabled:opacity-[0.5]'"
                :minus-button-class="'text-lg w-[40px] cursor-pointer h-full border-r-[1px] border flex items-center justify-center rounded-tl-sm rounded-bl-sm hover:!bg-transparent'"
                :plus-button-class="'text-lg w-[40px] cursor-pointer h-full border-r-[1px] text-white border-secondary-500 flex items-center justify-center bg-secondary-500 rounded-tr-sm rounded-br-sm'"
            />
            <BaseButton class="ml-4 sm:ml-0 !p-1.5 sm:!p-2">
                <PhTrash class="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </BaseButton>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useCurrencyFormat } from '@/composables/currencyFormat'
import { useCartStore } from '@/stores/cartStore'
import { supabase } from '@/supabase'
import { useSpinner } from '@/stores/spinnerStore'

import BaseButton from '@/components/BaseButton.vue'
import QuantityInput from '@/components/QuantityInput.vue'

const props = defineProps({
    cartItem: Object
})

const { formatAmount } = useCurrencyFormat()
const cart = useCartStore()
const spinner = useSpinner()

const quantity = ref(props.cartItem?.quantity)
const maxQuantity = props.cartItem?.products?.stock
const checkedItems = reactive({})

const handleCheckboxChange = (event, item) => {
    if (checkedItems[item.id]) {
        console.log(`${item.name} is checked`)
    } else {
        console.log(`${item.name} is unchecked`)
    }
}

watch(quantity, async (newQty, oldQty) => {
  if (newQty !== oldQty && newQty > 0) {
    spinner.start();

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQty })
        .eq('id', props.cartItem.id)

      if (error) throw error

      const item = cart.cartItems.find(i => i.id === props.cartItem.id)
      if (item) {
        item.quantity = newQty
      }

      await cart.fetchCartTotal()
    } catch (err) {
        Swal.fire({
            title: 'Update Failed',
            html: 'We were unable to update the item quantity in your cart. Please try again shortly.',
            icon: 'error',
            confirmButtonText: 'OK',
        })
        console.error('Failed to update cart quantity:', err)
    } finally {
        spinner.stop();
    }
  }
})
</script>