<template>
    <div class="w-full flex items-center justify-center pt-0 lg:pt-15 relative h-[calc(100vh_-_214px)] lg:h-[781px]">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div class="absolute left-0 top-15 bottom-0 right-[52%] hidden lg:flex">
                <img :src="authRightImage" alt="Ecommerce illustration" class="w-full h-full object-cover login-image">
            </div>
            <div class="h-[706px] hidden lg:flex"></div>
            <div class="w-[320px] sm:w-[60%] lg:w-full mx-auto lg:mx-0 flex justify-center flex-col">
                <div class="text-center lg:text-left">
                    <div class="text-2xl md:text-4xl font-medium mb-2.5 md:mb-6">{{ title }}</div>
                    <div class="text-base mb-4 md:mb-12">{{ subTitle }}</div>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import authRightImage from '@/assets/img/login-signup-image.png'

defineProps({
    title: String,
    subTitle: String
})
</script>