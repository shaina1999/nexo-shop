<template>
    <!-- Hero Section -->
    <section class="flex items-center justify-center w-full">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl flex">
            <div class="p-6 md:p-10 mt-10 bg-black text-white max-h-max w-full lg:max-h-[344px]">
                <Splide :options="{ type: 'loop', arrows: false, speed: 1000, perMove: 2, pagination: true }">
                    <SplideSlide>
                        <div class="flex items-baseline md:items-center gap-y-8 sm:gap-y-12 md:gap-y-0 justify-center flex-col md:flex-row">
                            <div class="shrink">
                                <div class="flex items-center gap-x-6 mb-3 md:mb-6">
                                    <img :src="appleLogo" alt="Apple Logo">
                                    <span>iPhone 14 Series</span>
                                </div>
                                <div class="font-semibold text-[26px] sm:text-[38px] md:text-[46px]/14 mb-3 md:mb-6 whitespace-normal lg:whitespace-nowrap">Up to 10% off Voucher</div>
                                <RouterLink class="flex items-center gap-x-2 font-medium" to="/product">
                                    <span class="border-b-[1px] border-white text-white bg-transparent">Shop Now</span>
                                    <PhArrowRight :size="22" />
                                </RouterLink>
                            </div>
                            <div class="w-[90%] md:w-[450px]">
                                <img :src="heroIimage" alt="Iphone" class="w-full">
                            </div>
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div class="flex items-baseline md:items-center gap-y-8 sm:gap-y-12 md:gap-y-0 justify-center flex-col md:flex-row">
                            <div class="shrink">
                                <div class="flex items-center gap-x-6 mb-3 md:mb-6">
                                    <img :src="appleLogo" alt="Apple Logo">
                                    <span>iPhone 14 Series</span>
                                </div>
                                <div class="font-semibold text-[26px] sm:text-[38px] md:text-[46px]/14 mb-3 md:mb-6 whitespace-normal lg:whitespace-nowrap">Up to 10% off Voucher</div>
                                <RouterLink class="flex items-center gap-x-2 font-medium" to="/product">
                                    <span class="border-b-[1px] border-white text-white bg-transparent">Shop Now</span>
                                    <PhArrowRight :size="22" />
                                </RouterLink>
                            </div>
                            <div class="w-[90%] md:w-[450px]">
                                <img :src="heroIimage" alt="Iphone" class="w-full">
                            </div>
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    </section>

    <!-- Flash Sales Section -->
    <section class="flex items-center justify-center w-full pt-16 sm:pt-20 md:pt-25 lg:pt-35">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <SectionHeader :label="`Today's`" :title="'Flash Sales'">
                <template v-slot:timer>
                    <div v-show="!isSaleStarted">
                        <vue-countdown 
                            @end="handleCountDowneEnd" 
                            :time="time" v-slot="{ days, hours, minutes, seconds }"
                        >
                            <div class="flex items-end gap-x-2.5 md:gap-x-3.5">
                                <div class="flex items-baseline flex-col">
                                    <span class="text-sm font-medium mb-1 inline-block">Days</span>
                                    <span class="font-bold text-lg sm:text-2xl md:text-3xl">{{ days }}</span>
                                </div>
                                <span class="text-3xl text-secondary-500">:</span>
                                <div class="flex items-baseline flex-col">
                                    <span class="text-sm font-medium mb-1 inline-block">Hours</span>
                                    <span class="font-bold text-lg sm:text-2xl md:text-3xl">{{ hours }}</span>
                                </div>
                                <span class="text-3xl text-secondary-500">:</span>
                                <div class="flex items-baseline flex-col">
                                    <span class="text-sm font-medium mb-1 inline-block">Minutes</span>
                                    <span class="font-bold text-lg sm:text-2xl md:text-3xl">{{ minutes }}</span>
                                </div>
                                <span class="text-3xl text-secondary-500">:</span>
                                <div class="flex items-baseline flex-col">
                                    <span class="text-sm font-medium mb-1 inline-block">Seconds</span>
                                    <span class="font-bold text-lg sm:text-2xl md:text-3xl">{{ seconds }}</span>
                                </div>
                            </div>
                        </vue-countdown>
                    </div>
                </template>
                <template v-slot:buttons>
                    <div class="hidden sm:flex items-center gap-x-2">
                        <button 
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goPrev('flash')"
                        >
                            <PhArrowLeft :size="20" />
                        </button>
                         <button 
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goNext('flash')"
                        >
                            <PhArrowRight :size="20" />
                        </button>
                    </div>
                </template>
            </SectionHeader>
            <div class="pb-7.5 md:pb-15 border-b-[1px] border-b-gray-300">
                <div class="mb-7.5 md:mb-15">
                    <Splide 
                        :ref="el => registerSplide(el, 'flash')"
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
                </div>
                <BaseLinkButton :to="'/products'" class="mx-auto">View All Products</BaseLinkButton>
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
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goPrev('categories')"
                        >
                            <PhArrowLeft :size="20" />
                        </button>
                         <button 
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goNext('categories')"
                        >
                            <PhArrowRight :size="20" />
                        </button>
                    </div>
                </template>
            </SectionHeader>
            <div class="pb-7.5 md:pb-15 border-b-[1px] border-b-gray-300 categories">
                <Splide 
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
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goPrev('best-selling')"
                        >
                            <PhArrowLeft :size="20" />
                        </button>
                         <button 
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
                        <SplideSlide v-for="(product, index) in products" :key="product.id">
                            <ProductCard 
                                :product="product"
                            />
                        </SplideSlide>
                    </Splide>
                </div>
                <BaseLinkButton :to="'/products'" class="mx-auto">View All Products</BaseLinkButton>
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
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goPrev('products')"
                        >
                            <PhArrowLeft :size="20" />
                        </button>
                         <button 
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
                </div>
                <BaseLinkButton :to="'/products'" class="mx-auto">View All Products</BaseLinkButton>
            </div>
        </div>
    </section>

    <!-- New Arrival Section -->
    <section class="flex items-center justify-center w-full py-16 sm:py-20 md:py-25 lg:py-35">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <SectionHeader :label="'Featured'" :title="'New Arrival'"> </SectionHeader>
            <div class="grid new-arrival-grid gap-2.5 lg:gap-7.5 text-white">
                <figure class="bg-black item1 p-5 lg:p-6 relative flex justify-center lg:justify-center">
                    <div class="h-[222px] w-[210px] lg:h-[434px] lg:w-full flex items-end justify-center">
                        <!-- Product image max width: 416px, max height: 734px -->
                        <img src="/src/assets/img/ps5.png" alt="PlayStation 5" class="h-full w-full object-contain">
                    </div>
                    <figcaption class="absolute left-5 bottom-5 right-5 lg:left-6 lg:bottom-6 lg:right-6">
                        <h3 class="font-semibold text-base sm:text-xl md:text-2xl mb-1 lg:mb-2">PlayStation 5</h3>
                        <p class="font-normal text-sm md:text-base mb-1 lg:mb-2">Black and White version of the PS5 coming out on sale.</p>
                        <RouterLink to="'/products'" class="underline block underline-offset-6">Shop Now</RouterLink>
                    </figcaption>
                </figure>
                <figure class="bg-black item2 p-5 lg:p-6 relative flex items-center justify-center">
                    <div class="w-[210px] h-[222px] lg:h-[250px] lg:w-[250px] flex items-end justify-center">
                        <img src="/src/assets/img/speaker.png" alt="PlayStation 5" class="h-full w-full object-contain">
                    </div>
                    <figcaption class="absolute left-5 bottom-5 right-5 lg:left-6 lg:bottom-6 lg:right-6 w-[90%] lg:w-[50%]">
                        <h3 class="font-semibold text-base sm:text-xl md:text-2xl mb-1 lg:mb-2">Women's Collections</h3>
                        <p class="font-normal text-sm md:text-base mb-1 lg:mb-2">Featured woman collections that give you another vibe.</p>
                        <RouterLink to="'/products'" class="underline block underline-offset-6">Shop Now</RouterLink>
                    </figcaption>
                </figure>
                <figure class="bg-black item3 p-5 lg:p-6 relative flex items-center justify-center">
                    <div class="w-[210px] h-[222px] lg:h-[210px] lg:w-[190px] flex items-end justify-center">
                        <img src="/src/assets/img/speaker.png" alt="PlayStation 5" class="h-full w-full object-contain">
                    </div>
                    <figcaption class="absolute left-5 bottom-5 right-5 lg:left-6 lg:bottom-6 lg:right-6 w-[90%] lg:w-[80%]">
                        <h3 class="font-semibold text-base sm:text-xl md:text-2xl mb-1 lg:mb-2">Speakers</h3>
                        <p class="font-normal text-sm md:text-base mb-1 lg:mb-2">Amazon wireless speakers</p>
                        <RouterLink to="'/products'" class="underline block underline-offset-6">Shop Now</RouterLink>
                    </figcaption>
                </figure>
                <figure class="bg-black item4 p-5 lg:p-6 relative flex items-center justify-center">
                    <div class="w-[210px] h-[222px] lg:h-[210px] lg:w-[190px] flex items-end justify-center">
                        <img src="/src/assets/img/speaker.png" alt="PlayStation 5" class="h-full w-full object-contain">
                    </div>
                    <figcaption class="absolute left-5 bottom-5 right-5 lg:left-6 lg:bottom-6 lg:right-6 w-[90%] lg:w-[80%]">
                        <h3 class="font-semibold text-base sm:text-xl md:text-2xl mb-1 lg:mb-2">Perfume</h3>
                        <p class="font-normal text-sm md:text-base mb-1 lg:mb-2">GUCCI INTENSE OUD EDP</p>
                        <RouterLink to="'/products'" class="underline block underline-offset-6">Shop Now</RouterLink>
                    </figcaption>
                </figure>
            </div>
        </div>
    </section>

    <section class="flex items-center justify-center w-full py-16 sm:py-20 md:py-25 lg:py-35">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <ul>
                <li class="service-item">
                    <div>
                        <div>
                            <PhTruck :size="32" />
                        </div>
                    </div>
                    <h3>Free and Fast Delivery</h3>
                    <p>Free delivery for all orders over &#8369;140</p>
                </li>
                <li class="service-item">
                    <div>
                        <div>
                            <PhHeadset :size="32" />
                        </div>
                    </div>
                    <h3>Free and Fast Delivery</h3>
                    <p>Friendly 24/7 customer support</p>
                </li>
                <li class="service-item">
                    <div>
                        <div>
                            <PhShieldCheck :size="32" />
                        </div>
                    </div>
                    <h3>MONEY BACK GUARANTEE</h3>
                    <p>We reurn money within 30 days</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted, computed } from 'vue'
import { useFetch } from '@/composables/fetch'
import appleLogo from '@/assets/img/apple-logo.png'
import heroIimage from '@/assets/img/hero-image.png'
import SectionHeader from '@/components/SectionHeader.vue'
import ProductCard from '@/components/ProductCard.vue'
import BaseLinkButton from '@/components/BaseLinkButton.vue'

const receivedDateString = ref('June 30, 2025 10:00 AM')
const targetDate = new Date(receivedDateString.value)
const now = new Date()
const time = Math.max(0, targetDate.getTime() - now.getTime())
const isSaleStarted = ref(false)
const { data, error, isLoading, fetchNow } = useFetch()
const splideInstances = ref({})

const categories = ref([
  { label: 'Phones', icon: 'PhDeviceMobile' },
  { label: 'Computers', icon: 'PhLaptop' },
  { label: 'SmartWatch', icon: 'PhWatch' },
  { label: 'Camera', icon: 'PhCamera' },
  { label: 'HeadPhones', icon: 'PhHeadset' },
  { label: 'Gaming', icon: 'PhGameController' },
  { label: 'Tablets', icon: 'PhDeviceTablet' },
  { label: 'Drones', icon: 'PhDrone' },
  { label: 'TVs', icon: 'PhTelevision' },
  { label: 'Accessories', icon: 'PhPlug' }
])

const products = ref([ // sample products
  { id: 1, name: 'Product 1', price: 1000, discountedPrice: 500, discount: 10, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 2, name: 'Product 2', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 3, name: 'Product 3', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 4, name: 'Product 4', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 5, name: 'Product 5', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 6, name: 'Product 6', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 7, name: 'Product 7', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 8, name: 'Product 8', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
])

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

const handleCountDowneEnd = () => {
    isSaleStarted.value = true
}

/* watch(data, (newVal) => {
  receivedDateString.value = newVal?.saleDate
}) */

/* onMounted(() => {
    fetchNow(`/getsalecountdown/`)
}) */
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