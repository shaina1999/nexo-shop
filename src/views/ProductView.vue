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
              <div class="flex text-yellow-400 gap-1 mr-1">
                <PhStar class="text-yellow-500" weight="fill" />
                <PhStar class="text-yellow-500" weight="fill" />
                <PhStar class="text-yellow-500" weight="fill" />
                <PhStarHalf class="text-yellow-500" weight="fill" />
                <PhStar class="text-yellow-500" />
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
              <button class="px-3 py-1 border rounded">XS</button>
              <button class="px-3 py-1 border rounded">S</button>
              <button class="px-3 py-1 border rounded bg-red-500 text-white">M</button>
              <button class="px-3 py-1 border rounded">L</button>
              <button class="px-3 py-1 border rounded">XL</button>
            </div>
          </section>
          <!-- Quantity and Action Buttons -->
          <section class="flex items-center gap-4">
            <div class="flex items-center border rounded overflow-hidden">
              <button class="px-3 py-1 text-lg">−</button>
              <span class="px-4">2</span>
              <button class="px-3 py-1 text-lg">+</button>
            </div>
            <button class="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">Buy Now</button>
            <button class="p-2 border rounded"><span class="sr-only">Add to wishlist</span>♡</button>
          </section>
          <!-- Delivery Info -->
          <footer class="space-y-4 pt-6 border-t mt-6">
            <div class="flex items-start gap-4">
              <div class="text-xl">🚚</div>
              <div>
                <p class="font-medium">Free Delivery</p>
                <a href="#" class="text-blue-600 text-sm underline">Enter your postal code for Delivery Availability</a>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="text-xl">↩️</div>
              <div>
                <p class="font-medium">Return Delivery</p>
                <p class="text-sm">Free 30 Days Delivery Returns. <a href="#" class="text-blue-600 underline">Details</a></p>
              </div>
            </div>
          </footer>
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

const route = useRoute()
const productObj = ref(null)
const isLoading = ref(false)
const { formatAmount } = useCurrencyFormat()

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