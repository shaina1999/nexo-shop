<template>
    <Splide 
        :options="{
            type: 'loop',
            perPage: 4,
            gap: '16px',
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
        <SplideSlide v-for="i in 3" :key="i">
            <ProductCardSkeleton />
        </SplideSlide>
    </Splide>
</template>

<script setup>
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'
</script>