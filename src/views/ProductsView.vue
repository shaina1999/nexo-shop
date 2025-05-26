<template>
  <section class="flex items-center justify-center w-full pt-5 md:pt-10">
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
      <div class="flex items-start md:items-center justify-between pb-5 md:pb-10 flex-col md:flex-row gap-3 md:gap-5">
        <p :class="{ 'skeleton-loader' : isLoading }">
          <span class="inline-block md:flex items-center gap-x-3 text-sm md:text-base" v-if="route.query?.q">
            <div class="mb-1 md:mb-0">
              Showing results for <span class="font-semibold">"{{ searchQuery }}"</span>
            </div> 
            <span class="font-regular text-gray-500"> {{ productsArr?.length }} items found</span>
          </span>
          <span class="inline-block md:flex items-center gap-x-3 text-base md:text-lg font-semibold" v-else>
            {{ route.query.tag || route.query.category ? useTitleCaseConcat(route.query?.tag || route.query.category) : 'Browse All Products' }} 🛍️
            <span class="text-sm text-gray-500 !font-normal">{{ productsArr.length ? productsArr.length +' items' : '' }}</span>
          </span>
        </p>
        <div class="flex items-center gap-x-3">
          <BaseButton 
            class="text-sm md:text-base py-1.5! px-2.5! md:py-2! md:px-4.5! flex items-center justify-center gap-x-1 bg-white text-black! border-[1px] border-black/50 hover:bg-gray-200!"
            :class="{ 'skeleton-loader' : isLoading }"
            @click="filtersOpen = true"
          >
            <span>Filters</span>
            <PhFadersHorizontal :size="20" />
          </BaseButton>
          <BaseButton 
            class="text-sm md:text-base py-1.5! px-2.5! md:py-2! md:px-4.5! flex items-center justify-center gap-x-1 bg-white text-black! border-[1px] border-black/50 hover:bg-gray-200!"
            :class="{ 'skeleton-loader' : isLoading }"
            @click="sortingOptionOpen = true"
          >
            <span>Sort</span>
            <PhArrowsDownUp :size="20" />
          </BaseButton>
        </div>
      </div>

      <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-3 md:gap-x-4 md:gap-y-6 lg:gap-x-6 lg:gap-y-8 pointer-events-none">
        <ProductCardSkeleton v-for="i in 32" :key="i" />
      </div>

      <div v-else>
        <div class="flex flex-col items-center justify-center mb-8" v-if="!productsArr.length && searchQuery">
          <p class="text-center mb-2">No results found for <span class="font-semibold">"{{ searchQuery }}"</span></p>
          <p>Here are some suggestions you may find useful:</p>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-3 md:gap-x-4 md:gap-y-6 lg:gap-x-6 lg:gap-y-8">
          <ProductCard v-for="(product, index) in productsArr" :key="product.id" :product="product" />
        </div>
      </div>
    </div>

    <!-- Filters Options -->
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
                class="flex items-center justify-center text-center border-gray-300 border-[1px] rounded-sm p-2 cursor-pointer relative"
                v-for="(category, index) in categories" :key="index"
              >
                <input 
                  name="category" 
                  :value="category.label" 
                  type="checkbox" 
                  v-model="category.isSelected"
                  class="absolute left-0 right-0 top-0 bottom-0 w-full h-full opacity-0 cursor-pointer" 
                  @change="(event) => handleCategoryChange(event, index)"
                >
                <span 
                  class="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-sm border-[1px] border-black mr-2 flex items-center justify-center text-white relative"
                  :class="{ 'bg-black' : category.isSelected }"
                >
                  <PhCheckFat :size="12" weight="fill" class="absolute top-[50%] -translate-x-1/2 left-1/2 -translate-y-1/2 text-transparent" :class="{ 'bg-black text-white' : category.isSelected }" />
                </span>
                <span>{{ category.label }}</span>
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
            @click="clearFilters"
          >
            <span>Clear</span>
          </BaseButton>
          <BaseButton class="w-full text-sm md:text-base py-1.5! px-2.5! md:py-2! md:px-4.5! flex items-center justify-center" @click="applyFilters">
            Apply
          </BaseButton>
        </div>
      </div>
    </Teleport>

    <!-- Sort Options -->
    <Teleport to="body">
      <div 
        class="fixed z-20 top-0 right-0 w-[90vw] sm:w-[50vw] lg:w-[35vw] xl:w-[500px] bg-white h-screen shadow-md transition-all duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
        :class="{ 'right-0 opacity-100 pointer-events-auto' : sortingOptionOpen, 'right-[-50%] opacity-0 pointer-events-none' : !sortingOptionOpen }"
      >
        <div class="border-b-[1px] border-b-gray-300 py-4 px-6 flex items-center gap-4">
          <button class="cursor-pointer" @click="sortingOptionOpen = false">
            <PhX :size="22" />
            </button>
          <span>Sort</span>
        </div>
        <div class="overflow-y-scroll h-[calc(100vh_-_130px)] ">
          <div class="py-4 px-6">
            <h2 class="text-black font-semibold mb-4">Sort By:</h2>
            <ul class="flex flex-col text-sm sm:text-base gap-3">
              <li 
                class="flex items-center text-center cursor-pointer relative"
                v-for="(sortingOption, index) in sortingOptions" :key="index"
              >
                <span class="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1px] border-black mr-3 flex items-center justify-center">
                  <span class="w-[60%] h-[60%] m-auto rounded-full transition-colors duration-100 ease-in" :class="{ 'bg-black': selectedSortOption === sortingOption.label }"></span>
                </span>
                <input 
                  type="radio" 
                  :value="sortingOption.label" 
                  name="sort_option" 
                  v-model="selectedSortOption" 
                  :id="index" 
                  class="opacity-0 absolute left-0 right-0 top-0 bottom-0 w-full h-full cursor-pointer"
                  @change="handleSortOptionChange"
                >
                <span>{{ sortingOption.label }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Teleport>
    
    <!-- Overlay for sort and filter options -->
    <Teleport to="body">
      <div
        class="w-screen h-screen fixed left-0 right-0 top-0 z-10 bg-black transition-opacity duration-300 ease-in"
        @click="filtersOpen = false; sortingOptionOpen = false"
        :class="{
          'opacity-50 pointer-events-auto': filtersOpen || sortingOptionOpen,
          'opacity-0 pointer-events-none': !filtersOpen && !sortingOptionOpen
        }"
      >
      </div>
    </Teleport>
  </section>

</template>

<script setup>
import { watch, watchEffect, computed, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/supabase'

import ProductCard from '@/components/ProductCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'

const router = useRouter()
const route = useRoute()
const filtersOpen = ref(false)
const sortingOptionOpen = ref(false)
const selectedPrice = ref(null)
const selectedRating = ref(null)
const selectedSortOption = ref(null)
const selectedCategories = ref([])
const productsArr = ref([])
const isLoading = ref(false)
const searchQuery = ref(localStorage.getItem('searchTerm'))
const productTag = ref(localStorage.getItem('productTag'))

const categories = ref([
  { label: "Women's Clothing", route: "/products", isSelected: false },
  { label: "Women's Shoes", route: "/products", isSelected: false },
  { label: "Women's Bag", route: "/products", isSelected: false },
  { label: "Women's Sports", route: "/products", isSelected: false },
  { label: "Men's Clothing", route: "/products", isSelected: false },
  { label: "Men's Shoes", route: "/products", isSelected: false },
  { label: "Men's Bag", route: "/products", isSelected: false },
  { label: "Men's Sports", route: "/products", isSelected: false }
])

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

const sortingOptions = [
  { label: 'Top Rated' },
  { label: 'Price High to Low' },
  { label: 'Price Low to High' }
]

const filteredCategories = computed(() => {
  return categories.value
    .filter((category) => category.isSelected)
    .map((category) => category.label)
})

const handleCategoryChange = (event, index) => {
  categories.value[index].isSelected = event.target.checked
}

const applyFilters = () => {
  console.log('categories', filteredCategories.value)
  console.log('selectedPrice', selectedPrice.value)
  console.log('selectedRating', selectedRating.value)
}

const clearFilters = () => {
  categories.value.forEach(category => {
    category.isSelected = false
  })
  selectedPrice.value = null
  selectedRating.value = null
}

const handleSortOptionChange = () => {
  setTimeout(() => {
    sortingOptionOpen.value = false
  }, 300);
}

const useTitleCaseConcat = (words) => {
  return words.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
}

watch([filtersOpen, sortingOptionOpen], (newVal) => {
  const html = document.documentElement

  if (filtersOpen.value || sortingOptionOpen.value) {
    html.style.overflow = 'hidden'
  } else {
    html.style.overflow = ''
  }
})

watch(route, () => {
  searchQuery.value = localStorage.getItem('searchTerm')
  productTag.value = localStorage.getItem('productTag')
})

onMounted(async () => {
  isLoading.value = true

  try {
    const categorySlug = route.query.category
    const tag = route.query.tag

    let query = supabase.from('products').select('*')

    if (categorySlug) {
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single()

      if (categoryError || !category) throw categoryError || new Error('Category not found')
      query = query.eq('category_id', category.id)
    } else if (tag === 'best-selling') {
      query = query
        .gt('sales_count', 100)
        .order('sales_count', { ascending: false })
    } else if (route.query?.q) {
      query = query.contains('tags', [productTag.value]);
    }

    const { data: products, error: productsError } = await query
    if (productsError) throw productsError

    productsArr.value = products
  } catch (err) {
    console.error('Error fetching products:', err)
  } finally {
    isLoading.value = false
  }
})
</script>