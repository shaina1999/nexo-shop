<template>
    <section class="flex items-center justify-center w-full pt-16 sm:pt-20 md:pt-25 lg:pt-35">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl text-center">
            <h1 class="text-black text-6xl md:text-8xl font-medium mb-4">404</h1>
            <p class="font-medium text-2xl md:text-3xl">Page Not Found</p>
            <p class="text-base md:text-lg font-normal my-10 md:my-12">Sorry, the page you're looking for doesn't exist or has been moved.</p>
            <BaseLinkButton :to="'/'" class="mx-auto">Back to home page</BaseLinkButton>
        </div>
    </section>
</template>

<script setup>
import BaseLinkButton from '@/components/BaseLinkButton.vue'
</script>