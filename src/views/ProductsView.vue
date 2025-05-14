<template>
  <section class="flex items-center justify-center w-full pt-5 md:pt-10">
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
      <div class="flex items-start md:items-center justify-between pb-5 md:pb-10 flex-col-reverse md:flex-row gap-3 md:gap-5">
        <p class="inline-block md:flex items-center gap-x-3 text-sm md:text-base">Showing results for "{{ searchQuery }}" <span class="font-regular text-gray-500"> 50 items found</span></p>
        <div class="flex items-center gap-x-3">
          <BaseButton class="text-sm md:text-base py-1.5! px-2.5! md:py-2! md:px-4.5! flex items-center justify-center gap-x-1 bg-white text-black! border-[1px] border-black/50 hover:bg-gray-200!">
            <span>Filters</span>
            <PhFadersHorizontal :size="20" />
          </BaseButton>
          <BaseButton class="text-sm md:text-base py-1.5! px-2.5! md:py-2! md:px-4.5! flex items-center justify-center gap-x-1 bg-white text-black! border-[1px] border-black/50 hover:bg-gray-200!">
            <span>Sort</span>
            <PhArrowsDownUp :size="20" />
          </BaseButton>
        </div>
      </div>

      <!-- Show this if there are no results found -->
      <div class="flex flex-col items-center justify-center mb-8 hidden">
        <p class="text-center mb-2">No results found for <span class="font-semibold">"{{ searchQuery }}"</span></p>
        <p>Here are some suggestions you may find useful:</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-3 md:gap-x-4 md:gap-y-6 lg:gap-x-6 lg:gap-y-8">
        <ProductCard v-for="(product, index) in products" :key="product.id" :product="product" />
      </div>
    </div>
  </section>

</template>

<script setup>
import { watch, watchEffect, computed, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useFetch } from '@/composables/fetch'
import ProductCard from '@/components/ProductCard.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const route = useRoute()
const { data, error, isLoading, fetchNow } = useFetch()

const products = ref([ // sample products
  { id: 1, name: 'Product 1', price: 1000, discountedPrice: 500, discount: 10, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: true },
  { id: 2, name: 'Product 2', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 3, name: 'Product 3', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 4, name: 'Product 4', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 5, name: 'Product 5', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 6, name: 'Product 6', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 7, name: 'Product 7', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 8, name: 'Product 8', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
])

const searchQuery = computed(() => {
  return route.query?.q || ''
})

watch(data, (newVal) => {
  // products.value = newVal?.products || []
})

watchEffect(() => {
  fetchNow(`/products/search?q=${searchQuery.value}`)
})

onMounted(() => {
  // products.value = data.products
})
</script>