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
                    <vue-countdown :time="2 * 24 * 60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }">
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
                </template>
                <template v-slot:buttons>
                    buttons
                </template>
            </SectionHeader>
            <div class="pb-15 border-b-[1px] border-b-gray-300">
                content
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import appleLogo from '@/assets/img/apple-logo.png'
import heroIimage from '@/assets/img/hero-image.png'
import SectionHeader from '@/components/SectionHeader.vue'
</script>

<style scoped></style>