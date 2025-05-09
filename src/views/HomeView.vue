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
                            @click="goPrev"
                        >
                            <PhArrowLeft :size="20" />
                        </button>
                         <button 
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                            @click="goNext"
                        >
                            <PhArrowRight :size="20" />
                        </button>
                    </div>
                </template>
            </SectionHeader>
            <div class="pb-7.5 md:pb-15 border-b-[1px] border-b-gray-300">
                <div class="mb-7.5 md:mb-15">
                    <Splide ref="splideRef" :options="splideOptions">
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
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
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
const splideRef = ref(null)
const splideInstance = ref(null)
const splideOptions = ref({ type: 'loop', perPage: 4, gap: '16px', arrows: false, speed: 1000, perMove: 2, pagination: false })
const currentBreakpoint = ref('')

const products = ref([ // sample products only
  { id: 1, name: 'Product 1', price: 1000, discountedPrice: 500, discount: 10, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 2, name: 'Product 2', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 3, name: 'Product 3', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 4, name: 'Product 4', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 5, name: 'Product 5', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 6, name: 'Product 6', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 7, name: 'Product 7', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
  { id: 8, name: 'Product 8', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100 },
])

const goPrev = () => {
    splideInstance.value?.go('<')
}

const goNext = () => {
    splideInstance.value?.go('>')
}

const handleCountDowneEnd = () => {
    isSaleStarted.value = true
}

/* watch(data, (newVal) => {
  receivedDateString.value = newVal?.saleDate
})
 */

 const handleScreenResize = () => {
    const width = window.innerWidth
    let newBreakpoint = ''

    if (width < 641) {
        newBreakpoint = 'mobile'
    } else if (width < 768) {
        newBreakpoint = 'mobile-landscape'
    } else if (width < 1025) {
        newBreakpoint = 'tablet'
    } else {
        newBreakpoint = 'desktop'
    }

    if (newBreakpoint !== currentBreakpoint.value) {
        currentBreakpoint.value = newBreakpoint

        const breakpointSettings = {
            mobile: { perPage: 1, perMove: 1, arrows: true },
            'mobile-landscape': { perPage: 2, perMove: 2, arrows: false },
            tablet: { perPage: 3, perMove: 2, arrows: false },
            desktop: { perPage: 4, perMove: 2, arrows: false }
        }

        const settings = breakpointSettings[newBreakpoint]
        if (settings) {
            Object.assign(splideOptions.value, settings)
        }
    }
}

onMounted(() => {
    // fetchNow(`/getsalecountdown/`)

    if (splideRef.value) {
        splideInstance.value = splideRef.value.splide
    }

    handleScreenResize()
    window.addEventListener('resize', handleScreenResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleScreenResize)
})
</script>