<template>
    <div class="px-6 md:px-8 lg:px-16 xl:px-34 w-full bg-black text-white min-h-12 flex items-center justify-between gap-4 md:gap-6 py-2 md:py-0">
        <div class="hidden md:block"></div>
        <div class="text-xs sm:text-sm">
            <span class="inline-block mr-0 md:mr-3">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
            <span class="font-medium underline">ShopNow</span>
        </div>
        <div class="relative">
            <button class="text-sm flex item-center gap-1 sm:gap-2 cursor-pointer">
                <span class="inline-block">English</span>
                <PhCaretDown :size="20" />
            </button>
            <ul class="text-sm bg-black absolute py-3 px-4 flex flex-col gap-y-3 rounded-sm text-white top-10 right-0">
                <li class="relative flex items-center gap-2 hover:underline">
                    <span>Filipino</span>
                    <PhCheck :size="20" class="hidden" />
                    <input type="radio" name="language" class="opacity-0 absolute top-0 left-0 right-0 bottom-0 cursor-pointer">
                </li>
                <li class="relative flex items-center gap-2 hover:underline font-bold">
                    <span>English</span>
                    <PhCheck :size="20" />
                    <input type="radio" name="language" class="opacity-0 absolute top-0 left-0 right-0 bottom-0 cursor-pointer">
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup></script>

<style scoped></style>