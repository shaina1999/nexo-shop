<template>
    <div class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 sm:gap-12">
        <!-- Checkbox + Product Info -->
        <div class="flex items-start gap-4">
            <label class="relative cursor-pointer">
                <input 
                    type="checkbox" 
                    class="absolute left-0 right-0 top-0 bottom-0 w-full h-full opacity-0 cursor-pointer" 
                    @change="(event) => handleCheckboxChange(event, product)"
                    v-model="checkedItems[product?.id]"
                >
                <span 
                    class="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-sm border-[1px] border-black flex items-center justify-center text-white relative"
                    :class="{'bg-black': checkedItems[product?.id]}"
                >
                    <PhCheckFat 
                        :size="12" 
                        weight="fill" 
                        class="absolute top-[50%] -translate-x-1/2 left-1/2 -translate-y-1/2 text-transparent"
                        :class="{'text-white': checkedItems[product?.id], 'text-transparent': !checkedItems[product?.id]}" 
                    />
                </span>
            </label>
            <img :src="product?.image" :alt="product?.name" class="w-18 h-18 sm:w-20sm: sm:h-20 object-cover rounded" />
            <div>
                <p class="text-sm sm:text-base font-semibold text-gray-800">{{ product?.name }}</p>
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
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useCurrencyFormat } from '@/composables/currencyFormat'

import BaseButton from '@/components/BaseButton.vue'

const { formatAmount } = useCurrencyFormat()
const quantity = ref(1)

defineProps({
    product: Object
})

const checkedItems = reactive({})

const handleCheckboxChange = (event, item) => {
    if (checkedItems[item.id]) {
        console.log(`${item.name} is checked`)
    } else {
        console.log(`${item.name} is unchecked`)
    }
}
</script>