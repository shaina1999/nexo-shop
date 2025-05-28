<template>
  <section class="flex items-center justify-center w-full pt-5 md:pt-10">
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
      <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-base mb-8 sm:mb-16">Product Details</h2>
      <div class="product-grid">
        <div class="flex lg:flex-col gap-4 order-2 lg:order-1">
          <!-- Thumbnails -->
          <div class="flex lg:flex-col gap-4 order-2 lg:order-1">
            <!-- <img v-for="n in 4" :key="n" :src="product.images[0]?.url" :alt="product.images[0]?.alt" class="w-20 h-20 object-cover cursor-pointer border rounded" /> -->
          </div>
          <!-- Main Image -->
          <div class="flex-1 order-1 lg:order-2">
            <img :src="productOj?.images[0]?.url" :alt="productOj?.images[0]?.alt" class="w-full object-cover rounded" />
          </div>
        </div>
        <!-- Product Details -->
        <article class="space-y-6">
          <header>
            <h1 class="text-2xl font-bold">{{ productOj?.name }}</h1>
            <div class="flex items-center space-x-2">
              <div class="flex text-yellow-400">
                ★★★★☆
              </div>
              <p class="text-gray-500 text-sm">(150 Reviews)</p>
              <span class="text-green-600 text-sm font-medium">In Stock</span>
            </div>
            <p class="text-2xl font-semibold mt-2">$192.00</p>
          </header>
          <p class="text-gray-600">PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive. </p>
          <!-- Color Options -->
          <div>
            <h2 class="text-sm font-medium mb-1">Colours:</h2>
            <div class="flex items-center gap-3">
              <button class="w-5 h-5 rounded-full border-2 border-gray-400 bg-red-500"></button>
              <button class="w-5 h-5 rounded-full border-2 border-gray-400 bg-blue-500"></button>
            </div>
          </div>
          <!-- Size Options -->
          <section>
            <h2 class="text-sm font-medium mb-1">Size:</h2>
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

const route = useRoute()
const productOj = ref(null)

const fetchProduct = async () => {
  const id = route.query?.id
  const { data: product, error } = await supabase.from('products').select('*').eq('id', id).single();
  productOj.value = product
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.product-grid{
  display: grid;
  grid-template-columns: 670px auto;
}
</style>