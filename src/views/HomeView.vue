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
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl flex">
            test
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import appleLogo from '@/assets/img/apple-logo.png'
import heroIimage from '@/assets/img/hero-image.png'
</script>

<style scoped></style>