<template>
  <section class="flex items-center justify-center w-full pt-5 md:pt-10">
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
      <div class="flex items-start md:items-center justify-between pb-5 md:pb-10 flex-col-reverse md:flex-row gap-3 md:gap-5">
        <p class="inline-block md:flex items-center gap-x-3 text-sm md:text-base">Showing results for "{{ searchQuery }}" <span class="font-regular text-gray-500"> 50 items found</span></p>
        <div class="flex items-center gap-x-3">
          <BaseButton 
            class="text-sm md:text-base py-1.5! px-2.5! md:py-2! md:px-4.5! flex items-center justify-center gap-x-1 bg-white text-black! border-[1px] border-black/50 hover:bg-gray-200!"
            @click="filtersOpen = true"
          >
            <span>Filters</span>
            <PhFadersHorizontal :size="20" />
          </BaseButton>
          <BaseButton 
            class="text-sm md:text-base py-1.5! px-2.5! md:py-2! md:px-4.5! flex items-center justify-center gap-x-1 bg-white text-black! border-[1px] border-black/50 hover:bg-gray-200!"
          >
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

    <Teleport to="body">
      <div 
        class="fixed z-20 top-0 right-0 w-[90vw] sm:w-[50vw] lg:w-[35vw] xl:w-[500px] bg-white h-screen shadow-md transition-all duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
        :class="{ 'right-0 opacity-100 pointer-events-auto' : filtersOpen, 'right-[-50%] opacity-0 pointer-events-none' : !filtersOpen }"
      >
        <div class="border-b-[1px] border-b-gray-300 py-4 px-6 flex items-center gap-4">
          <button class="cursor-pointer" @click="filtersOpen = false">
            <PhX :size="22" />
            </button>
          <span>Filters</span>
        </div>
        <div class="overflow-y-scroll h-[calc(100vh_-_130px)] ">
          <div class="py-4 px-6">
            <h2 class="text-black font-semibold mb-4">Category</h2>
            <ul class="flex flex-wrap gap-2 text-xs sm:text-base">
              <li 
                class="flex items-center justify-center text-center border-gray-300 border-[1px] rounded-sm p-2 cursor-pointer"
                v-for="(category, index) in categories" :key="index"
              >
              {{ category.label }}
              </li>
            </ul>
          </div>
          <div class="py-4 px-6">
            <h2 class="text-black font-semibold mb-4">Price</h2>
            <ul class="flex flex-col text-sm sm:text-base gap-3">
              <li 
                class="flex items-center text-center cursor-pointer relative"
                v-for="(price, index) in priceFilter" :key="index"
              >
                <span class="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1px] border-black mr-3 flex items-center justify-center">
                  <span class="w-[60%] h-[60%] m-auto rounded-full transition-colors duration-100 ease-in" :class="{ 'bg-black': selectedPrice === price.label }"></span>
                </span>
                <input type="radio" :value="price.label" name="price" v-model="selectedPrice" :id="index" class="opacity-0 absolute left-0 right-0 top-0 bottom-0 w-full h-full cursor-pointer">
                <span>{{ price.label }}</span>
              </li>
            </ul>
          </div>
          <div class="py-4 px-6">
            <h2 class="text-black font-semibold mb-4">Rating</h2>
            <ul class="flex flex-col text-sm sm:text-base gap-3">
              <li 
                class="flex items-center text-center cursor-pointer relative"
                v-for="(rating, index) in ratingFilter" :key="index"
              >
                <span class="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1px] border-black mr-3 flex items-center justify-center">
                  <span class="w-[60%] h-[60%] m-auto rounded-full transition-colors duration-100 ease-in" :class="{ 'bg-black': selectedRating === rating.label }"></span>
                </span>
                <input type="radio" :value="rating.label" name="rating" v-model="selectedRating" :id="index" class="opacity-0 absolute left-0 right-0 top-0 bottom-0 w-full h-full cursor-pointer">
                <PhStar class="text-yellow-500 mr-2" weight="fill" />
                <span>{{ rating.label }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex items-center gap-4 py-4 px-6 border-t-[1px] border-t-gray-300">
          <BaseButton 
            class="w-full text-sm md:text-base py-1.5! px-2.5! md:py-2! md:px-4.5! flex items-center justify-center gap-x-1 bg-white text-black! border-[1px] border-black/50 hover:bg-gray-200!"
          >
            <span>Clear</span>
          </BaseButton>
          <BaseButton class="w-full text-sm md:text-base py-1.5! px-2.5! md:py-2! md:px-4.5! flex items-center justify-center">
            Apply
          </BaseButton>
        </div>
      </div>
    </Teleport>
    
    <Teleport to="body">
      <div 
        class="w-screen h-screen fixed left-0 right-0 top-0 z-10 bg-black transition-opacity duration-200 ease-in" 
        @click="filtersOpen = false" :class="{ 'opacity-30 pointer-events-auto' : filtersOpen, 'opacity-0 pointer-events-none' : !filtersOpen }"
      >
      </div>
    </Teleport>
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
const filtersOpen = ref(false)
const selectedPrice = ref(null)
const selectedRating = ref(null)

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

const categories = [
  { label: "Women's Clothing", route: "/products" },
  { label: "Women's Shoes", route: "/products" },
  { label: "Women's Bag", route: "/products" },
  { label: "Women's Sports", route: "/products" },
  { label: "Men's Clothing", route: "/products" },
  { label: "Men's Shoes", route: "/products" },
  { label: "Men's Bag", route: "/products" },
  { label: "Men's Sports", route: "/products" }
]

const priceFilter = [
  { label: "Below PHP 100", min: 0, max: 99 },
  { label: "PHP 100 - 199", min: 100, max: 199 },
  { label: "PHP 200 - 299", min: 200, max: 299 },
  { label: "PHP 300 - 499", min: 300, max: 499 },
  { label: "PHP 500 and up", min: 500, max: Infinity }
]

const ratingFilter = [
  { label: '4 & up', value: 4 },
  { label: '3 & up', value: 3 },
  { label: '2 & up', value: 2 },
  { label: '1 & up', value: 1 }
]

const searchQuery = computed(() => {
  return route.query?.q || ''
})

watch(data, (newVal) => {
  // products.value = newVal?.products || []
})

watch(filtersOpen, (newVal) => {
  const html = document.documentElement

  if (filtersOpen.value) {
    html.style.paddingRight = '15px'
    html.style.overflow = 'hidden'
  } else {
    html.style.overflow = ''
    html.style.paddingRight = ''
  }
})

watchEffect(() => {
  fetchNow(`/products/search?q=${searchQuery.value}`)
})

onMounted(() => {
  // products.value = data.products
})
</script>