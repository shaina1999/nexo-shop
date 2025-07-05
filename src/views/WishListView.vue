<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
            <header class="flex items-center justify-between gap-4 mb-6">
                <h2 class="text-md sm:text-xl font-semibold">
                    Wishlist <span class="font-normal text-gray-500">(4)</span>
                </h2>
                <button
                    class="flex items-center gap-x-1.5 text-sm px-4 py-2 md:px-6 md:py-3 md:mx-0 text-center w-max bg-white rounded-sm !text-black border-[1px] border-black/50 hover:bg-gray-200 cursor-pointer"
                >
                    Move All To Bag
                </button>
            </header>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-3 md:gap-x-4 md:gap-y-6 lg:gap-x-6 lg:gap-y-8">
                <WishListProductCard />
            </div>
        </div>
    </section>
</template>

<script setup>
import WishListProductCard from '@/components/WishListProductCard.vue'
</script>