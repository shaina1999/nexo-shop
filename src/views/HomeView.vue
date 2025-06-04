<template>
    <!-- Hero Section -->
    <section class="flex items-center justify-center w-full hero-section">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl flex">
            <div class="p-6 md:p-10 mt-8 md:mt-10 bg-black text-white max-h-max w-full lg:max-h-[344px]" :class="{ 'skeleton-loader h-[330px]' : featuredProductsLoading }">
                <Splide 
                    v-if="!featuredProductsLoading && featuredProducts.length > 0"
                    :options="{
                        type: 'fade',
                        drag: featuredProducts.length > 1,
                        pagination: featuredProducts.length > 1,
                        autoplay: true,
                        interval: 4000,
                        speed: 1000,
                        rewind: true,
                        arrows: featuredProducts.length > 1,
                    }"
                >
                    <SplideSlide v-for="featuredProduct in featuredProducts" :key="featuredProduct.id">
                        <div class="flex items-baseline md:items-center gap-y-8 sm:gap-y-12 md:gap-y-0 justify-center flex-col md:flex-row mb-8 md:mb-0">
                            <div class="shrink">
                                <div class="flex items-center gap-x-6 mb-3 md:mb-6 font-medium">
                                    <span>{{ featuredProduct.name }}</span>
                                </div>
                                <div class="font-semibold text-[26px] sm:text-[38px] md:text-[46px]/14 mb-3 md:mb-6 whitespace-normal lg:whitespace-nowrap">{{ featuredProduct.featured_description }}</div>
                                <RouterLink class="flex items-center gap-x-2 font-medium" :to="{ path: '/product', query: { id: featuredProduct.id } }">
                                    <span class="border-b-[1px] border-white text-white bg-transparent">Get this now</span>
                                    <PhArrowRight :size="22" />
                                </RouterLink>
                            </div>
                            <div class="w-[90%] md:w-[450px] h-[150px] sm:h-[250px] mx-auto flex items-center justify-center">
                                <img :src="featuredProduct.images[0].url" :alt="featuredProduct.images[0].alt" class="w-[90%] h-[90%] object-contain">
                            </div>
                        </div>
                    </SplideSlide>
                </Splide>
                <div v-else>
                        <div class="p-0 md:p-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
                        <img :src="emptyCartIllustration" alt="Empty Cart Illustration" class="w-20 h-20 md:w-30 md:h-30 object-contain">
                        <div class="text-center md:text-left ">
                            <h3 class="text-base md:text-lg font-semibold">
                                No featured products available
                            </h3>
                            <p class="text-sm md:text-base text-white mt-1 md:mt-2">
                                We're curating our favorites. Check back soon!
                            </p>
                            <BaseLinkButton 
                                to="/products" 
                                class="text-sm mt-4 !px-4 !py-1.5 md:!px-5 md:!py-2 mx-auto md:mx-0" 
                                :class="{ '!transition-colors' : isDomLoaded, '!transition-none' : !isDomLoaded }"
                            >
                                Browse all products
                            </BaseLinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="flex items-center justify-center w-full pt-16 sm:pt-20">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <SectionHeader :label="'Categories'" :title="'Browse By Category'">
                <template v-slot:buttons v-if="categories.length > 5">
                    <div class="hidden sm:flex items-center gap-x-2">
                        <button 
                            :class="{ 'skeleton-loader' : categoriesLoading }"
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goPrev('categories')"
                        >
                            <PhArrowLeft :size="20" />
                        </button>
                         <button 
                            :class="{ 'skeleton-loader' : categoriesLoading }"
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goNext('categories')"
                        >
                            <PhArrowRight :size="20" />
                        </button>
                    </div>
                </template>
            </SectionHeader>
            <div class="pb-7.5 px-0.5 md:pb-15 border-b-[1px] border-b-gray-300 categories">
                <div v-if="!categoriesLoading">
                    <Splide 
                        v-if="categories.length > 5"
                        :ref="el => registerSplide(el, 'categories')"
                        :options="{
                            perPage: 5,
                            autoplay: true,
                            gap: '1rem',
                            type: 'loop',
                            interval: 2500,
                            arrows: false,
                            speed: 1000,
                            perMove: 1,
                            pagination: false,
                            breakpoints: {
                                640: {
                                    perPage: 2,
                                    arrows: true,
                                    gap: '0.5rem',
                                },
                                768: {
                                    perPage: 3,
                                },
                                1024: {
                                    perPage: 4,
                                },
                                1280: {
                                    perPage: 5,
                                },
                            },
                        }"
                    >
                        <SplideSlide v-for="(category, index) in categories" :key="index">
                            <RouterLink 
                                :to="`/products?category=${category.slug}`"
                                class="text-sm text-center font-medium flex flex-col items-center justify-center space-y-3 rounded-sm border-[1px] border-gray-300 px-2 py-4 sm:px-4 sm:py-8 cursor-pointer category-item transition-all duration-300 ease-in-out hover:bg-secondary-500 hover:text-white"
                            >
                                <component :is="category.icon" :size="38" />
                                <span>{{ category.label }}</span>
                            </RouterLink>
                        </SplideSlide>
                    </Splide>
                    <div 
                        v-else-if="categories.length > 0 && categories.length < 6"
                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                    >
                    <RouterLink 
                        v-for="(category, index) in categories" :key="index"
                        :to="`/products?category=${category.slug}`"
                        class="text-sm text-center font-medium flex flex-col items-center justify-center space-y-3 rounded-sm border-[1px] border-gray-300 px-2 py-4 sm:px-4 sm:py-8 cursor-pointer category-item transition-all duration-300 ease-in-out hover:bg-secondary-500 hover:text-white"
                    >
                        <component :is="category.icon" :size="38" />
                        <span>{{ category.label }}</span>
                    </RouterLink>
                    </div>
                    <div v-else class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                        <img :src="folderRemoveIllustration" alt="Folder Illustration" class="w-16 h-16 md:w-25 md:h-25 object-contain">
                        <div>
                            <h2 class="text-base sm:text-xl font-semibold text-gray-500">
                                No Categories Found
                            </h2>
                            <p class="text-sm sm:text-base mt-2 text-gray-600 max-w-md">
                                Categories will appear here once they're available. Please check back later or explore other sections of our store.
                            </p>
                        </div>
                    </div>
                </div>
                <CategoriesSkeleton v-else />
            </div>
        </div>
    </section>

    <!-- Best Selling Products Section -->
    <section class="flex items-center justify-center w-full pt-16 sm:pt-20">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <SectionHeader :label="'This Month'" :title="'Best-Selling Products'">
                <template v-slot:buttons v-if="bestSellingProducts.length > 4">
                    <div class="hidden sm:flex items-center gap-x-2">
                        <button 
                            :class="{ 'skeleton-loader' : bestSellingProductsLoading }"
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goPrev('best-selling')"
                        >
                            <PhArrowLeft :size="20" />
                        </button>
                         <button 
                            :class="{ 'skeleton-loader' : bestSellingProductsLoading }"
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goNext('best-selling')"
                        >
                            <PhArrowRight :size="20" />
                        </button>
                    </div>
                </template>
            </SectionHeader>
            <div class="pb-7.5 md:pb-15 border-b-[1px] border-b-gray-300">
                <div :class="{ 'mb-7.5 md:mb-15' : bestSellingProducts.length > 4, 'mb-0' : bestSellingProducts.length < 5 }">
                    <div v-if="!bestSellingProductsLoading">
                        <Splide 
                            v-if="bestSellingProducts.length > 4"
                            :ref="el => registerSplide(el, 'best-selling')"
                            :options="{
                                type: 'loop',
                                perPage: 4,
                                gap: '16px',
                                arrows: false,
                                speed: 1000,
                                perMove: 1,
                                pagination: false,
                                breakpoints: {
                                    640: {
                                        perPage: 1, arrows: true
                                    },
                                    768: {
                                        perPage: 2, arrows: false
                                    },
                                    1024: {
                                        perPage: 3, arrows: false
                                    },
                                    1280: {
                                        perPage: 4,
                                        arrows: false
                                    },
                                }
                            }"
                        >
                            <SplideSlide v-for="bestSellingProduct in bestSellingProducts" :key="bestSellingProduct.id">
                                <ProductCard 
                                    :product="bestSellingProduct"
                                />
                            </SplideSlide>
                        </Splide>
                        <div 
                            v-else-if="bestSellingProducts.length > 0 && bestSellingProducts.length < 5"
                            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        >
                            <ProductCard 
                                v-for="bestSellingProduct in bestSellingProducts" 
                                :key="bestSellingProduct.id"
                                :product="bestSellingProduct" 
                            />
                        </div>
                        <div v-else class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                            <img :src="emptyCartIllustration" alt="Empty Cart Illustration" class="w-18 h-18 md:w-28 md:h-28 object-contain">
                            <div>
                                <h2 class="text-base sm:text-xl font-semibold text-gray-500">
                                    No Best-Selling Products Yet
                                </h2>
                                <p class="text-sm sm:text-base mt-2 text-gray-600 max-w-md">
                                    Our best-selling products will appear here once available. Please check back soon or explore other items in our store.
                                </p>
                            </div>
                        </div>
                    </div>
                    <SliderProductSkeleton v-else />
                </div>
                <BaseLinkButton 
                    v-if="bestSellingProducts.length > 4" 
                    :to="'/products?tag=best-selling'" 
                    class="mx-auto" 
                    :class="{ 'skeleton-loader pointer-events-none' : bestSellingProductsLoading }"
                >
                    <span :class="{ 'opacity-0' : bestSellingProductsLoading }">View All Products</span>
                </BaseLinkButton>
            </div>
        </div>
    </section>

    <!-- All Products Section -->
    <section class="flex items-center justify-center w-full pt-16 sm:pt-20">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <SectionHeader :label="'Our Products'" :title="'Explore Our Products'">
                <template v-slot:buttons v-if="products.length > 4">
                    <div class="hidden sm:flex items-center gap-x-2">
                        <button 
                            :class="{ 'skeleton-loader' : productsLoading }"
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goPrev('products')"
                        >
                            <PhArrowLeft :size="20" />
                        </button>
                         <button 
                            :class="{ 'skeleton-loader' : productsLoading }"
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goNext('products')"
                        >
                            <PhArrowRight :size="20" />
                        </button>
                    </div>
                </template>
            </SectionHeader>
            <div class="pb-7.5 md:pb-15 border-b-[1px] border-b-gray-300">
                <div :class="{ 'mb-7.5 md:mb-15' : products.length > 4, 'mb-0' : products.length < 5 }">
                    <div v-if="!productsLoading">
                        <Splide 
                            v-if="products.length > 4"
                            :ref="el => registerSplide(el, 'products')"
                            :options="{
                                type: 'loop',
                                perPage: 4,
                                gap: '16px',
                                arrows: false,
                                speed: 1000,
                                perMove: 1,
                                pagination: false,
                                breakpoints: {
                                    640: {
                                        perPage: 1, arrows: true
                                    },
                                    768: {
                                        perPage: 2, arrows: false
                                    },
                                    1024: {
                                        perPage: 3, arrows: false
                                    },
                                    1280: {
                                        perPage: 4, arrows: false
                                    },
                                }
                            }"
                        >
                            <SplideSlide v-for="product in products" :key="product.id">
                                <ProductCard 
                                    :product="product"
                                />
                            </SplideSlide>
                        </Splide>
                        <div 
                            v-else-if="products.length > 0 && products.length < 5"
                            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        >
                            <ProductCard 
                                v-for="product in products" 
                                :key="product.id"
                                :product="product" 
                            />
                        </div>
                        <div v-else class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                            <img :src="emptyCartIllustration" alt="Empty Cart Illustration" class="w-18 h-18 md:w-28 md:h-28 object-contain">
                            <div>
                                <h2 class="text-base sm:text-xl font-semibold text-gray-500">
                                    No Products Found
                                </h2>
                                <p class="text-sm sm:text-base mt-2 text-gray-600 max-w-md">
                                    All Products will appear here once they're available. Please check back later or explore other sections of our store.
                                </p>
                            </div>
                        </div>
                    </div>
                    <SliderProductSkeleton v-else />
                </div>
                <BaseLinkButton 
                    v-if="products.length > 4" 
                    :to="'/products'" 
                    class="mx-auto" 
                    :class="{ 'skeleton-loader pointer-events-none' : productsLoading }"
                >
                    <span :class="{ 'opacity-0' : productsLoading }">View All Products</span>
                </BaseLinkButton>
            </div>
        </div>
    </section>

    <section class="flex items-center justify-center w-full py-16 sm:py-20 md:py-25 lg:py-35">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 items-start">
                <li class="flex flex-col items-center justify-center">
                    <div class="mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-zinc-300">
                        <div class="w-14.5 h-14.5 flex items-center justify-center rounded-full bg-black text-white">
                            <PhTruck :size="32" />
                        </div>
                    </div>
                    <div class="text-black text-center">
                        <h3 class="mb-2 font-semibold text-[20px]">Free and Fast Delivery</h3>
                        <p>Free delivery for all orders over &#8369;140</p>
                    </div>
                </li>
                <li class="flex flex-col items-center justify-center">
                    <div class="mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-zinc-300">
                        <div class="w-14.5 h-14.5 flex items-center justify-center rounded-full bg-black text-white">
                            <PhHeadset :size="32" />
                        </div>
                    </div>
                    <div class="text-black text-center">
                        <h3 class="mb-2 font-semibold text-[20px]">24/7 Customer Service</h3>
                        <p>Friendly 24/7 customer support</p>
                    </div>
                </li>
                <li class="flex flex-col items-center justify-center cols-span-0 md:col-span-2 lg:col-span-1">
                    <div class="mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-zinc-300">
                        <div class="w-14.5 h-14.5 flex items-center justify-center rounded-full bg-black text-white">
                            <PhShieldCheck :size="32" />
                        </div>
                    </div>
                    <div class="text-black text-center">
                        <h3 class="mb-2 font-semibold text-[20px]">Money Back Guarantee</h3>
                        <p>We return money within 30 days</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'

import SectionHeader from '@/components/SectionHeader.vue'
import ProductCard from '@/components/ProductCard.vue'
import BaseLinkButton from '@/components/BaseLinkButton.vue'
import CategoriesSkeleton from '@/components/CategoriesSkeleton.vue'
import SliderProductSkeleton from '@/components/SliderProductSkeleton.vue'
import emptyCartIllustration from '@/assets/img/empty-cart.png'
import folderRemoveIllustration from '@/assets/img/folder-remove.png'

const isDomLoaded = ref(false)
const splideInstances = ref({})
const featuredProducts = ref([])
const categories = ref([])
const bestSellingProducts = ref([])
const products = ref([])
const featuredProductsLoading = ref(false)
const categoriesLoading = ref(false)
const bestSellingProductsLoading = ref(false)
const productsLoading = ref(false)

const registerSplide = (el, key) => {
  if (el && el.splide) {
    splideInstances.value[key] = el.splide
  }
}

const goPrev = (key) => {
  splideInstances.value[key]?.go('<')
}

const goNext = (key) => {
  splideInstances.value[key]?.go('>')
}

// Featured Products
const getFeaturedProducts = async () => {
    featuredProductsLoading.value = true
    let { data: products, error } = await supabase.from('products').select('*').eq('is_featured', true);
    featuredProducts.value = products
    featuredProductsLoading.value = false

    // isDomLoaded updates BaseLinkButton’s transition to avoid fade effect on page reload
    setTimeout(() => {
        isDomLoaded.value = true
    }, 500);
}

// Categories
const getCategories = async () => {
    categoriesLoading.value = true
    let { data: items, error } = await supabase.from('categories').select('*')
    categories.value = items
    categoriesLoading.value = false
}

// Best Selling Products
const getBestSellingProducts = async () => {
    bestSellingProductsLoading.value = true
    let { data: products, error } = await supabase.from('products').select('*').gt('sales_count', 100).order('sales_count', { ascending: false })
    bestSellingProducts.value = products
    bestSellingProductsLoading.value = false
}

// All Products
const getProducts = async () => {
    productsLoading.value = true
    let { data: items, error } = await supabase.from('products').select('*').limit(10)
    products.value = items
    productsLoading.value = false
}

onMounted(async () => {
    getFeaturedProducts()
    getCategories()
    getBestSellingProducts()
    getProducts()
})
</script>

<style>
@media (min-width: 768px) {
  .hero-section .splide__arrow {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .hero-section .splide__arrow {
    display: flex !important;
  }
}
</style>