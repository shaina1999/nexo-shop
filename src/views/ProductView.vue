<template>
  <section class="flex items-center justify-center w-full pt-5 md:pt-10">
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
      <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-base mb-8 sm:mb-16 font-semibold">{{ productObj?.name }}</h2>
      <div class="flex items-start gap-6 sm:gap-10 flex-col lg:flex-row">
        <!-- Product Images -->
        <div class="flex basis-[55%] gap-2 flex-col-reverse">
          <div class="grid grid-cols-4 gap-2 basis-[100px] w-auto">
            <div 
              v-for="n in 4"
              :key="n"
              class="shrink-0 bg-gray-200 p-3 flex items-center justify-center cursor-pointer"
            >
              <img :src="productObj?.images[0]?.url" :alt="productObj?.images[0]?.alt" class="w-full h-full sm:w-[80%] object-contain rounded" />
            </div>
          </div>
          <!-- Main Image -->
          <div class="p-3 flex items-center justify-center bg-gray-200 cursor-zoom-in h-[200px] md:h-[350px] lg:h-auto">
            <img :src="productObj?.images[0]?.url" :alt="productObj?.images[0]?.alt" class="w-full lg:w-[80%] h-full object-contain rounded" />
          </div>
        </div>
        <!-- Product Details -->
        <article class="space-y-6 basis-[40%]">
          <header>
            <h1 class="text-2xl font-bold mb-2">{{ productObj?.name }}</h1>
            <div class="flex items-center mb-2">
              <div class="flex items-center text-yellow-400 gap-1 mr-1">
                <PhStar class="text-yellow-500" weight="fill" />
                <p class="text-gray-500 text-base">{{ productObj?.rating }}</p>
              </div>
              <p class="text-gray-500 text-base">(150 Reviews)</p>
              <span class="text-gray-300 mx-2.5">&VerticalLine;</span>
              <span class="text-green-600 text-sm font-medium py-0.5 px-2.5 bg-green-100 rounded-sm">In Stock</span>
            </div>
            <p class="text-2xl font-semibold flex items-center gap-2">
              Php {{ formatAmount(productObj?.discount_price) }} 
              <del class="text-gray-500 text-sm font-normal!">Php {{ formatAmount(productObj?.price) }}</del> 
              <span class="text-sm font-semibold bg-secondary-100 text-secondary-500 rounded-sm px-1">-{{ productObj?.discount }}%</span>
            </p>
          </header>
          <p class="text-gray-600 lead-[1.7]">{{ productObj?.description }}</p>
          <!-- Color Options -->
          <section>
            <h2 class="text-base font-medium mb-1">Colors:</h2>
            <div class="flex flex-wrap gap-3">
              <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out text-white bg-secondary-500 border-secondary-500">Green</button>
              <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">Pink</button>
              <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">Yellow</button>
            </div>
          </section>
          <!-- Size Options -->
          <section>
            <h2 class="text-base font-medium mb-1">Size:</h2>
            <div class="flex flex-wrap gap-3">
              <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out text-white bg-secondary-500 border-secondary-500">XS</button>
              <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">S</button>
              <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">M</button>
              <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">L</button>
              <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">XL</button>
            </div>
          </section>
          <!-- Quantity and Action Buttons -->
          <section class="flex flex-col gap-8">
            <div class="flex flex-col">
              <h2 class="text-base font-medium mb-1">Quantity:</h2>
              <div class="flex items-center rounded overflow-hidden w-max h-[44px]">
                <button 
                  @click="decreaseQuantity"
                  :disabled="quantity === 1"
                  class="text-lg w-[40px] cursor-pointer h-full border-r-[1px] border flex items-center justify-center rounded-tl-sm rounded-bl-sm hover:!bg-transparent"
                >
                  <PhMinus :size="20" weight="bold" />
                </button>
                <input 
                  type="text" 
                  class="w-[80px] border-t-[1px] border-t-black border-b-[1px] border-b-black outline-none text-center text-base font-semibold h-full" 
                  v-model="quantity"
                  @input="handleQuantityInput"
                  @paste="handleQuantityInput"
                >
                <button 
                  @click="increaseQuantity"
                  :disabled="quantity === maxQuantity"
                  class="text-lg w-[40px] cursor-pointer h-full border-r-[1px] text-white border-secondary-500 flex items-center justify-center bg-secondary-500 rounded-tr-sm rounded-br-sm"
                >
                  <PhPlus :size="20" weight="bold" />
                </button>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <BaseButton class="w-full text-sm md:text-base !py-3 !px-2.5 !md:py-3.5 !md:px-4.5 flex items-center justify-center font-medium gap-x-1.5">
                <span>Add to Cart</span>
                <PhShoppingCart :size="22" />
              </BaseButton>
              <BaseButton 
                class="w-full text-sm md:text-base !py-3 !px-2.5 !md:py-3.5 !md:px-4.5 flex items-center justify-center font-medium gap-x-1.5 bg-white !text-secondary-500 border-[1px] border-secondary-500 hover:!bg-secondary-100"
              >
                <span>Add to wishlist</span>
                <PhHeart :size="22" />
              </BaseButton>
            </div>
          </section>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { watch, computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/supabase'
import { useCurrencyFormat } from '@/composables/currencyFormat'

import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const productObj = ref(null)
const isLoading = ref(false)
const { formatAmount } = useCurrencyFormat()
const quantity = ref(1)
const maxQuantity = ref(50)

const fetchProduct = async () => {
  isLoading.value = true
  const id = route.query?.id
  const { data: product, error } = await supabase.from('products').select('*').eq('id', id).single();
  productObj.value = product
  isLoading.value = false
}

const increaseQuantity = () => {
  if (quantity.value < maxQuantity.value) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const handleQuantityInput = (e) => {
  const input = e.target.value.replace(/\D/g, '')
  let parsed = parseInt(input)

  if (isNaN(parsed) || parsed < 1) {
    parsed = 1
  } else if (parsed > maxQuantity.value) {
    parsed = maxQuantity.value
  }

  quantity.value = parsed
}

onMounted(() => {
  fetchProduct()
})
</script>