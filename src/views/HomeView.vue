<template>
    <!-- Hero Section -->
    <section class="flex items-center justify-center w-full">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl flex">
            <div class="p-6 md:p-10 mt-10 bg-black text-white max-h-max w-full lg:max-h-[344px]">
                <div class="flex items-baseline md:items-center gap-y-8 sm:gap-y-12 md:gap-y-0 justify-center flex-col md:flex-row">
                    <div class="shrink">
                        <div class="flex items-center gap-x-6 mb-3 md:mb-6">
                            <img :src="appleLogo" alt="Apple Logo">
                            <span>iPhone 14 Series</span>
                        </div>
                        <div class="font-semibold text-[26px] sm:text-[38px] md:text-[46px]/14 mb-3 md:mb-6 whitespace-normal lg:whitespace-nowrap">Up to 10% off Voucher</div>
                        <RouterLink class="flex items-center gap-x-2 font-medium" to="/products">
                            <span class="border-b-[1px] border-white text-white bg-transparent">Shop Now</span>
                            <PhArrowRight :size="22" />
                        </RouterLink>
                    </div>
                    <div class="w-[90%] md:w-[450px]">
                        <img :src="heroIimage" alt="Iphone" class="w-full">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Flash Sales Section -->
    <section class="flex items-center justify-center w-full pt-35">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <SectionHeader :label="`Today's`" :title="'Flash Sales'">
                <template v-slot:timer>
                    <div v-show="!isSaleStarted">
                        <vue-countdown 
                            @end="handleCountDowneEnd" 
                            :time="time" v-slot="{ days, hours, minutes, seconds }"
                        >
                            <div class="flex items-end gap-x-3.5">
                                <div class="flex items-baseline flex-col">
                                    <span class="text-sm font-medium mb-1 inline-block">Days</span>
                                    <span class="font-bold text-3xl">{{ days }}</span>
                                </div>
                                <span class="text-3xl text-secondary-500">:</span>
                                <div class="flex items-baseline flex-col">
                                    <span class="text-sm font-medium mb-1 inline-block">Hours</span>
                                    <span class="font-bold text-3xl">{{ hours }}</span>
                                </div>
                                <span class="text-3xl text-secondary-500">:</span>
                                <div class="flex items-baseline flex-col">
                                    <span class="text-sm font-medium mb-1 inline-block">Minutes</span>
                                    <span class="font-bold text-3xl">{{ minutes }}</span>
                                </div>
                                <span class="text-3xl text-secondary-500">:</span>
                                <div class="flex items-baseline flex-col">
                                    <span class="text-sm font-medium mb-1 inline-block">Seconds</span>
                                    <span class="font-bold text-3xl">{{ seconds }}</span>
                                </div>
                            </div>
                        </vue-countdown>
                    </div>
                </template>
                <template v-slot:buttons>
                    <div class="flex items-center gap-x-2">
                        <button 
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                        >
                            <PhArrowLeft :size="20" />
                        </button>
                         <button 
                            class="flex items-center justify-center cursor-pointer bg-gray-200 shadow-xs rounded-full w-10 h-10 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out"
                        >
                            <PhArrowRight :size="20" />
                        </button>
                    </div>
                </template>
            </SectionHeader>
            <div class="pb-15 border-b-[1px] border-b-gray-300">
                <div class="grid grid-cols-4">
                    <RouterLink to="/products">
                        <div class="bg-gray-200 p-4 product cursor-pointer">
                            <div class="flex items-center justify-between mb-4">
                                <div class="bg-secondary-500 text-white py-1 px-2 rounded-sm text-sm">-40%</div>
                                <button 
                                    class="cursor-pointer bg-white flex items-center justify-center text-secondary-500 w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
                                    @click.prevent.stop="addToWishList"
                                >
                                    <PhHeart :size="24" 
                                />
                                </button>
                            </div>
                            <div class="w-[190px] h-[190px] flex items-center justify-center mx-auto">
                                <img src="/src/assets/img/product-image.png" alt="Iphone" class="w-full">
                            </div>
                        </div>
                        <button 
                            class="bg-black text-white w-full p-1.5 transition-all duration-300 ease-in-out cursor-pointer add-to-cart mb-4 flex items-center justify-center gap-x-2"
                            @click.prevent.stop="addToCart"
                        >
                            <span class="text-sm">Add To Cart</span>
                            <PhPlus :size="18" />
                            <PhCheck :size="18" class="hidden" />
                        </button>
                        <div>
                            <div class="font-semibold text-base mb-2.5">HAVIT HV-G92 Gamepad</div>
                            <div class="flex items-center gap-x-2.5 mb-2.5">
                                <span class="text-secondary-500">&#8369;120</span>
                                <del class="text-gray-500 decoration-dashed">&#8369;160</del>
                            </div>
                             <div class="flex items-center gap-x-2">
                                <div class="flex items-center text-orange-500 gap-x-1">
                                    <PhStar :size="19" weight="fill" />
                                    <PhStar :size="19" weight="fill" />
                                    <PhStar :size="19" weight="fill" />
                                    <PhStarHalf :size="19" weight="fill" />
                                    <PhStar :size="19" />
                                </div>
                                <span class="text-gray-500">(190)</span>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useFetch } from '@/composables/fetch'
import appleLogo from '@/assets/img/apple-logo.png'
import heroIimage from '@/assets/img/hero-image.png'
import SectionHeader from '@/components/SectionHeader.vue'

const receivedDateString = ref('June 30, 2025 10:00 AM')
const targetDate = new Date(receivedDateString.value)
const now = new Date()
const time = Math.max(0, targetDate.getTime() - now.getTime())
const isSaleStarted = ref(false)
const { data, error, isLoading, fetchNow } = useFetch()

const handleCountDowneEnd = () => {
    isSaleStarted.value = true
}

const addToWishList = () => {
    console.log('add to wish list')
}

const addToCart = () => {
    console.log('add to cart')
}

/* watch(data, (newVal) => {
  receivedDateString.value = newVal?.saleDate
})

onMounted(() => {
    fetchNow(`/getsalecountdown/`)
}) */
</script>