<template>
  <section class="flex items-center justify-center w-full pt-5 md:pt-10">
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
      <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-base mb-8 sm:mb-16">{{ productObj?.name }}</h2>
      <div class="flex gap-10">
        <!-- Product Images -->
        <div class="grid grid-cols-2 gap-2 basis-[60%]">
          <div class="bg-gray-200 p-6 flex items-center justify-center">
            <img :src="productObj?.images[0]?.url" :alt="productObj?.images[0]?.alt" class="w-[90%] object-cover rounded" />
          </div>
          <div class="bg-gray-200 p-6 flex items-center justify-center">
            <img :src="productObj?.images[0]?.url" :alt="productObj?.images[0]?.alt" class="w-[90%] object-cover rounded" />
          </div>
          <div class="bg-gray-200 p-6 flex items-center justify-center">
            <img :src="productObj?.images[0]?.url" :alt="productObj?.images[0]?.alt" class="w-[90%] object-cover rounded" />
          </div>
          <div class="bg-gray-200 p-6 flex items-center justify-center">
            <img :src="productObj?.images[0]?.url" :alt="productObj?.images[0]?.alt" class="w-[90%] object-cover rounded" />
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
          <div>
            <h2 class="text-base font-medium mb-1">Colours:</h2>
            <div class="flex items-center gap-3">
              <button class="w-5 h-5 rounded-full border-2 border-gray-400 bg-red-500"></button>
              <button class="w-5 h-5 rounded-full border-2 border-gray-400 bg-blue-500"></button>
            </div>
          </div>
          <!-- Size Options -->
          <section>
            <h2 class="text-base font-medium mb-1">Size:</h2>
            <div class="flex gap-2">
              <button class="px-3 py-1 border rounded-sm cursor-pointer hover:bg-secondary-500 hover:text-white transition-all duration-200 ease-in">XS</button>
              <button class="px-3 py-1 border rounded-sm cursor-pointer hover:bg-secondary-500 hover:text-white transition-all duration-200 ease-in">S</button>
              <button class="px-3 py-1 border rounded-sm cursor-pointer hover:bg-secondary-500 hover:text-white transition-all duration-200 ease-in bg-secondary-500 text-white">M</button>
              <button class="px-3 py-1 border rounded-sm cursor-pointer hover:bg-secondary-500 hover:text-white transition-all duration-200 ease-in">L</button>
              <button class="px-3 py-1 border rounded-sm cursor-pointer hover:bg-secondary-500 hover:text-white transition-all duration-200 ease-in">XL</button>
            </div>
          </section>
          <!-- Quantity and Action Buttons -->
          <section class="flex flex-col gap-8">
            <div class="flex flex-col">
              <h2 class="text-base font-medium mb-1">Quantity:</h2>
              <div class="flex items-center rounded overflow-hidden w-max h-[44px]">
                <button class="text-lg w-[40px] cursor-pointer h-full border-r-[1px] border flex items-center justify-center rounded-tl-sm rounded-bl-sm">
                  <PhMinus :size="20" weight="bold" />
                </button>
                <input type="text" class="w-[80px] border-t-[1px] border-t-black border-b-[1px] border-b-black outline-none text-center text-base font-semibold h-full" v-model="quantity">
                <button class="text-lg w-[40px] cursor-pointer h-full border-r-[1px] text-white border-secondary-500 flex items-center justify-center bg-secondary-500 rounded-tr-sm rounded-br-sm">
                  <PhPlus :size="20" weight="bold" />
                </button>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <BaseButton class="w-full text-sm md:text-base !py-3 !px-2.5 !md:py-3.5 !md:px-4.5 flex items-center justify-center font-medium gap-x-2">
                <span>Add to Cart</span>
                <PhShoppingCart :size="22" />
              </BaseButton>
              <BaseButton 
                class="w-full text-sm md:text-base !py-3 !px-2.5 !md:py-3.5 !md:px-4.5 flex items-center justify-center font-medium gap-x-2 bg-white !text-secondary-500 border-[1px] border-secondary-500 hover:!bg-secondary-100"
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

const fetchProduct = async () => {
  isLoading.value = true
  const id = route.query?.id
  const { data: product, error } = await supabase.from('products').select('*').eq('id', id).single();
  productObj.value = product
  isLoading.value = false
}

onMounted(() => {
  fetchProduct()
})
</script>