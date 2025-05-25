<template>
    <!-- Hero Section -->
    <section class="flex items-center justify-center w-full hero">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl flex">
            <div class="p-6 md:p-10 mt-10 bg-black text-white max-h-max w-full lg:max-h-[344px]" :class="{ 'skeleton-loader h-[330px]' : promotionProductsLoading }">
                <Splide 
                    :options="{
                        type: 'loop', 
                        arrows: false, 
                        pagination: true,
                        arrows: false,
                        breakpoints: {
                            768: {
                                arrows: true,
                                pagination: false
                            },
                        }
                    }"
                >
                    <SplideSlide v-for="promotionProduct in promotionProducts" :key="promotionProduct.id">
                        <div class="flex items-baseline md:items-center gap-y-8 sm:gap-y-12 md:gap-y-0 justify-center flex-col md:flex-row">
                            <div class="shrink">
                                <div class="flex items-center gap-x-6 mb-3 md:mb-6 font-medium">
                                    <span>{{ promotionProduct.title }}</span>
                                </div>
                                <div class="font-semibold text-[26px] sm:text-[38px] md:text-[46px]/14 mb-3 md:mb-6 whitespace-normal lg:whitespace-nowrap">{{ promotionProduct.description }}</div>
                                <RouterLink class="flex items-center gap-x-2 font-medium" to="/product">
                                    <span class="border-b-[1px] border-white text-white bg-transparent">Get this now</span>
                                    <PhArrowRight :size="22" />
                                </RouterLink>
                            </div>
                            <div class="w-[90%] md:w-[450px] h-[160px] sm:h-[250px]">
                                <img :src="promotionProduct.image_url" :alt="promotionProduct.title" class="w-full h-full object-contain">
                            </div>
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="flex items-center justify-center w-full pt-16 sm:pt-20">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <SectionHeader :label="'Categories'" :title="'Browse By Category'">
                <template v-slot:buttons>
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
                <Splide 
                    v-if="!categoriesLoading"
                    :ref="el => registerSplide(el, 'categories')"
                    :options="{
                        perPage: 6,
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
                                perPage: 6,
                            },
                        },
                    }"
                >
                    <SplideSlide v-for="(category, index) in categories" :key="index">
                        <div 
                            class="flex flex-col items-center space-y-3 rounded-sm border-[1px] border-gray-300 px-2 py-4 sm:px-4 sm:py-8 cursor-pointer category-item transition-all duration-300 ease-in-out hover:bg-secondary-500 hover:text-white"
                        >
                            <component :is="category.icon" :size="38" />
                            <span>{{ category.label }}</span>
                        </div>
                    </SplideSlide>
                </Splide>
                <CategoriesSkeleton v-else />
            </div>
        </div>
    </section>

    <!-- Best Selling Products Section -->
    <section class="flex items-center justify-center w-full pt-16 sm:pt-20">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <SectionHeader :label="'This Month'" :title="'Best Selling Products'">
                <template v-slot:buttons>
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
                <div class="mb-7.5 md:mb-15">
                    <Splide 
                        v-if="!bestSellingProductsLoading"
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
                                    perPage: 4, arrows: false
                                },
                            }
                        }"
                    >
                        <SplideSlide v-for="(bestSellingProduct, index) in bestSellingProducts" :key="bestSellingProduct.id">
                            <ProductCard 
                                :product="bestSellingProduct"
                            />
                        </SplideSlide>
                    </Splide>
                    <SliderProductSkeleton v-else />
                </div>
                <BaseLinkButton :to="'/products?tag=best-selling'" class="mx-auto" :class="{ 'skeleton-loader pointer-events-none' : bestSellingProductsLoading }">
                    <span :class="{ 'opacity-0' : bestSellingProductsLoading }">View All Products</span>
                </BaseLinkButton>
            </div>
        </div>
    </section>

    <!-- Explore Our Products Section -->
    <section class="flex items-center justify-center w-full pt-16 sm:pt-20">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <SectionHeader :label="'Our Products'" :title="'Explore Our Products'">
                <template v-slot:buttons>
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
                <div class="mb-7.5 md:mb-15">
                    <Splide 
                        v-if="!productsLoading"
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
                        <SplideSlide v-for="(product, index) in products" :key="product.id">
                            <ProductCard 
                                :product="product"
                            />
                        </SplideSlide>
                    </Splide>
                    <SliderProductSkeleton v-else />
                </div>
                <BaseLinkButton :to="'/products'" class="mx-auto" :class="{ 'skeleton-loader pointer-events-none' : productsLoading }">
                    <span :class="{ 'opacity-0' : bestSellingProductsLoading }">View All Products</span>
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

const splideInstances = ref({})
const promotionProducts = ref([])
const categories = ref([])
const bestSellingProducts = ref([])
const products = ref([])
const promotionProductsLoading = ref(false)
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

// Promotions Products
const getPromotionsProducts = async () => {
    promotionProductsLoading.value = true
    let { data: products, error } = await supabase.from('promotions').select('*')
    promotionProducts.value = products
    // promotionProductsLoading.value = false
}

// Product Categories
const getCategories = async () => {
    categoriesLoading.value = true
    let { data: items, error } = await supabase.from('categories').select('*')
    categories.value = items
    // categoriesLoading.value = false
}

// Best Selling Products
const getBestSellingProducts = async () => {
    bestSellingProductsLoading.value = true
    let { data: products, error } = await supabase.from('products').select('*').order('sales_count', { ascending: false }).limit(10)
    bestSellingProducts.value = products
    // bestSellingProductsLoading.value = false
}

// All Products
const getProducts = async () => {
    productsLoading.value = true
    let { data: items, error } = await supabase.from('products').select('*').limit(10)
    products.value = items
    // productsLoading.value = false
}

onMounted(async () => {
    getPromotionsProducts()
    getCategories()
    getBestSellingProducts()
    getProducts()
})
</script>

<style scoped>
@media (max-width: 1023px) {
    .new-arrival-grid {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: none;
        grid-template-rows: 270px 270px;
    }
}

@media (max-width: 640px) {
    .new-arrival-grid {
        grid-template-columns: 1fr;
    }
}

@media (min-width: 1024px) {
    .item1{ grid-area: item1; }
    .item2{ grid-area: item2; }
    .item3{ grid-area: item3; }
    .item4{ grid-area: item4; }

    .new-arrival-grid {
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas:
            'item1 item1 item2 item2'
            'item1 item1 item2 item2'
            'item1 item1 item3 item4'
            'item1 item1 item3 item4'
        ;
    }
}
</style>