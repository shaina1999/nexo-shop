<template>
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
            autoplay: false,
            drag: false,
            swipe: false,
            keyboard: false,
            wheel: false,
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
        <SplideSlide v-for="i in 8" :key="i">
            <div 
                class="skeleton-loader h-[150px] flex flex-col items-center space-y-3 rounded-sm border-[1px] border-gray-300 px-2 py-4 sm:px-4 sm:py-8 cursor-pointer category-item transition-all duration-300 ease-in-out hover:bg-secondary-500 hover:text-white"
            >
            </div>
        </SplideSlide>
    </Splide>
</template>

<script setup>
import { ref } from 'vue'

const splideInstances = ref({})

const registerSplide = (el, key) => {
  if (el && el.splide) {
    splideInstances.value[key] = el.splide
  }
}
</script>