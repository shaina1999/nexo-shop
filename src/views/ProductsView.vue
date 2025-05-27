<template>
  <section class="flex items-center justify-center w-full pt-5 md:pt-10">
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
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

      <div v-else class="flex flex-col justify-center">
        <div v-if="!productsArr.length && searchQuery" class="text-center">
          <p class="text-center mb-2">No results found for <span class="font-semibold">"{{ searchQuery }}"</span></p>
          <p class="mb-8">Here are some suggestions you may find useful:</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-3 md:gap-x-4 md:gap-y-6 lg:gap-x-6 lg:gap-y-8">
          <ProductCard v-for="product in productsArr.length ? productsArr : suggestedProductsArr" :key="product.id" :product="product" />
        </div>
      </div>
    </div>

    <!-- Filters Options -->
    <Teleport to="body">
      <div 
        class="fixed z-20 top-0 right-0 w-[90vw] sm:w-[50vw] lg:w-[35vw] xl:w-[500px] bg-white h-screen shadow-md transition-all duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
        :class="{ 'right-0 opacity-100 pointer-events-auto' : filtersOpen, 'right-[-50%] opacity-0 pointer-events-none' : !filtersOpen }"
      >
        <div class="border-b-[1px] border-b-gray-300 py-4 px-6 flex items-center gap-4 justify-between">
          <span>Filters</span>
          <button class="cursor-pointer" @click="filtersOpen = false">
            <PhX :size="22" />
          </button>
        </div>
        <div class="overflow-y-scroll h-[calc(100vh_-_130px)] ">
          <div class="py-4 px-6">
            <h2 class="text-black font-semibold mb-4">Category</h2>
            <ul class="flex flex-wrap gap-2 text-xs sm:text-base">
              <li 
                class="flex items-center justify-center text-center border-gray-300 border-[1px] rounded-sm p-2 relative"
                :class="{ 'opacity-[0.7]' : isLoading }"
                v-for="(category, index) in categories" :key="index"
              >
                <input 
                  name="category" 
                  :value="category.label" 
                  type="checkbox" 
                  v-model="category.isSelected"
                  class="absolute left-0 right-0 top-0 bottom-0 w-full h-full opacity-0 cursor-pointer" 
                  @change="(event) => handleCategoryChange(event, index)"
                  :disabled="isLoading"
                  :class="{ '!cursor-not-allowed' : isLoading }"
                >
                <span 
                  class="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-sm border-[1px] border-black mr-2 flex items-center justify-center text-white relative"
                  :class="{ 'bg-black' : category.isSelected, '!cursor-not-allowed' : isLoading }"
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
                :class="{ 'opacity-[0.7]' : isLoading }"
                v-for="(price, index) in priceFilter" :key="index"
              >
                <span class="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1px] border-black mr-3 flex items-center justify-center">
                  <span class="w-[60%] h-[60%] m-auto rounded-full transition-colors duration-100 ease-in" :class="{ 'bg-black': selectedPrice === price.label }"></span>
                </span>
                <input 
                  :disabled="isLoading" 
                  type="radio" 
                  :value="price.label" 
                  name="price" 
                  v-model="selectedPrice" 
                  :id="index" 
                  class="opacity-0 absolute left-0 right-0 top-0 bottom-0 w-full h-full cursor-pointer"
                  :class="{ '!cursor-not-allowed' : isLoading }"
                >
                <span>{{ price.label }}</span>
              </li>
            </ul>
          </div>
          <div class="py-4 px-6">
            <h2 class="text-black font-semibold mb-4">Rating</h2>
            <ul class="flex flex-col text-sm sm:text-base gap-3">
              <li 
                class="flex items-center text-center cursor-pointer relative"
                :class="{ 'opacity-[0.7]' : isLoading }"
                v-for="(rating, index) in ratingFilter" :key="index"
              >
                <span class="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-[1px] border-black mr-3 flex items-center justify-center">
                  <span class="w-[60%] h-[60%] m-auto rounded-full transition-colors duration-100 ease-in" :class="{ 'bg-black': selectedRating === rating.label }"></span>
                </span>
                <input 
                  :disabled="isLoading" 
                  type="radio" 
                  :value="rating.label" 
                  name="rating" 
                  v-model="selectedRating" 
                  :id="index" 
                  class="opacity-0 absolute left-0 right-0 top-0 bottom-0 w-full h-full cursor-pointer"
                  :class="{ '!cursor-not-allowed' : isLoading }"
                >
                <PhStar class="text-yellow-500 mr-2" weight="fill" />
                <span>{{ rating.label }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex items-center gap-4 py-4 px-6 border-t-[1px] border-t-gray-300">
          <BaseButton 
            :disabled="isLoading"
            class="w-full text-sm md:text-base py-1.5! px-2.5! md:py-2! md:px-4.5! flex items-center justify-center gap-x-1 bg-white text-black! border-[1px] border-black/50 hover:bg-gray-200!"
            @click="clearFilters"
          >
            <span>Clear</span>
          </BaseButton>
          <BaseButton 
            class="w-full text-sm md:text-base py-1.5! px-2.5! md:py-2! md:px-4.5! flex items-center justify-center" 
            @click="applyFilters" 
            :disabled="!isApplyEnabled || isLoading"
          >
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
import { watch, watchEffect, computed, ref, onMounted, onUnmounted } from 'vue';
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
const suggestedProductsArr = ref([])
const isLoading = ref(false)
const searchQuery = ref(localStorage.getItem('searchTerm'))
const productTag = ref(localStorage.getItem('productTag'))
const categories = ref([])

const priceFilter = [
  { label: "Below PHP 100", min: 1, max: 99 },
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
    .map((category) => category.slug)
})

const isApplyEnabled = computed(() => {
  const hasSelectedCategories = categories.value.some(c => c.isSelected)
  const hasSelectedPrice = selectedPrice.value !==null
  const hasSelectedRating = selectedRating.value !==null
  return hasSelectedCategories || hasSelectedPrice || hasSelectedRating
})

const handleCategoryChange = (event, index) => {
  categories.value[index].isSelected = event.target.checked
}

const parsePriceRange = (priceStr) => {
  if (!priceStr) return { min: 0, max: Infinity };

  if (priceStr.includes('Below')) {
    const match = priceStr.match(/Below PHP\s*(\d+)/);
    if (match) return { min: 0, max: Number(match[1]) };
  }

  if (priceStr.includes('and up')) {
    const match = priceStr.match(/PHP\s*(\d+)\s*and up/);
    if (match) return { min: Number(match[1]), max: Infinity };
  }

  const match = priceStr.match(/PHP\s*(\d+)\s*-\s*(\d+)/);
  if (match) {
    return { min: Number(match[1]), max: Number(match[2]) };
  }

  return { min: 0, max: Infinity };
};

const parseRating = (ratingStr) => {
  if (!ratingStr) return null;
  const match = ratingStr.match(/(\d+)/);
  return match ? Number(match[1]) : null;
};

const applyFilters = async () => {
  isLoading.value = true;

  try {
    if (!filteredCategories.value.length) {
      productsArr.value = [];
      isLoading.value = false;
      return;
    }

    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .in('slug', filteredCategories.value);

    if (categoryError) throw categoryError;

    const categoryIds = categories.map(cat => cat.id);

    let productQuery = supabase
      .from('products')
      .select('*')
      .in('category_id', categoryIds);

    const priceRange = parsePriceRange(selectedPrice.value);
    if (priceRange && !isNaN(priceRange.min) && !isNaN(priceRange.max)) {
      productQuery = productQuery
        .gte('discount_price', priceRange.min)
        .lte('discount_price', priceRange.max);
    }

    const minRating = parseRating(selectedRating.value);
    if (minRating && !isNaN(minRating)) {
      productQuery = productQuery.gte('rating', minRating);
    }

    const { data: products, error: productError } = await productQuery;

    if (productError) throw productError;

    searchQuery.value = '';
    productsArr.value = products;

    const query = { ...route.query };
    delete query.q;
    delete query.category;
    query.categories = filteredCategories.value.join(',');
    router.replace({ query });
  } catch (error) {
    console.error('Error applying filters:', error);
  } finally {
    isLoading.value = false;
    filtersOpen.value = false;
    localStorage.setItem('selectedCategories', JSON.stringify(filteredCategories.value))
    localStorage.setItem('selectedPrice', selectedPrice.value)
    localStorage.setItem('selectedRating', selectedRating.value)
  }
};

const clearFilters = () => {
  categories.value.forEach(category => {
    category.isSelected = false
  })
  selectedPrice.value = null
  selectedRating.value = null

  localStorage.removeItem('selectedCategories')
  localStorage.removeItem('selectedPrice')
  localStorage.removeItem('selectedRating')
}

const handleSortOptionChange = () => {
  const targetArr = productsArr.value.length ? productsArr : suggestedProductsArr;

  // Create a new sorted array based on the selected option
  const sorted = [...targetArr.value].sort((a, b) => {
    switch (selectedSortOption.value) {
      case 'Top Rated':
        return (b.rating || 0) - (a.rating || 0);
      case 'Price High to Low':
        return (b.discount_price || 0) - (a.discount_price || 0);
      case 'Price Low to High':
        return (a.discount_price || 0) - (b.discount_price || 0);
      default:
        return 0;
    }
  });

  targetArr.value = sorted;

  sortingOptionOpen.value = false;

  localStorage.setItem('sortOption', selectedSortOption.value);
};

const useTitleCaseConcat = (words) => {
  return words.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
}

const searchProduct = async (tag) => {
  isLoading.value = true
  
  const { data: products, error: productsError } = await supabase.from('products').select('*').contains('tags', [tag]);
  productsArr.value = products

  if (!productsArr.value.length) {
    const { data: products, error: productsError } = await supabase.from('products').select('*');
    suggestedProductsArr.value = products
    isLoading.value = false
  }

  isLoading.value = false
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

  if (route.query?.q) {
    searchProduct(productTag.value)
  }
})

onMounted(async () => {
  isLoading.value = true

  try {
    const categorySlug = route.query.category
    const tag = route.query.tag
    const categorySlugsArray = route.query.categories?.split(',')

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
    } else if (categorySlugsArray.length) {
      const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, slug')
      .in('slug', categorySlugsArray);
      
      const categoryIds = categories?.map(category => category.id) || [];
      query = query.in('category_id', categoryIds)
    }

    const { data: products, error: productsError } = await query
    if (productsError) throw productsError

    productsArr.value = products

    if (!productsArr.value.length) {
      const { data: products, error: productsError } = await supabase.from('products').select('*')
      suggestedProductsArr.value = products
    }

    selectedSortOption.value = localStorage.getItem('sortOption')
    handleSortOptionChange()
  } catch (err) {
    console.error('Error fetching products:', err)
  } finally {
    isLoading.value = false
  }

  try {
    let { data: items, error } = await supabase.from('categories').select('*')
    if (error) {
      console.error('Error fetching categories:', error)
    } else {
      categories.value = items.map(category => ({
        ...category,
        isSelected: false
      }))
    }
  } catch (err) {
    console.error('Error fetching products:', err)
  } finally {
    isLoading.value = false

    let hasSavedFilters = false
    const savedCategories = JSON.parse(localStorage.getItem('selectedCategories'))
    if (savedCategories?.length) {
      categories.value.forEach((category) => {
        category.isSelected = savedCategories.includes(category.slug)
      })
      hasSavedFilters = true
    }

    const savedPrice = localStorage.getItem('selectedPrice')
    if (savedPrice) {
      selectedPrice.value = savedPrice
      hasSavedFilters = true
    }

    const savedRating = localStorage.getItem('selectedRating')
    if (savedRating) {
      selectedRating.value = savedRating
      hasSavedFilters = true
    }

    if (hasSavedFilters) {
      applyFilters()
    }
  }
})

onUnmounted(() => {
  localStorage.removeItem('selectedCategories')
  localStorage.removeItem('selectedPrice')
  localStorage.removeItem('selectedRating')
  localStorage.removeItem('sortOption')
})
</script>