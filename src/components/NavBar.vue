<template>
    <nav class="px-6 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl mx-auto flex">
        <div class="logo">NexoShop</div>
        <ul>
            <li>
                <span>Home</span>
                <span>Contact</span>
                <span>About</span>
                <span>Sign Up</span>
            </li>
        </ul>
        <div class="py-2 px-3 bg-gray-200 flex gap-4 item-center max-w-[243px]">
            <BaseSearchInput :searchPlaceholder="searchPlaceholder" />
            <BaseButtonIcon>
                <template v-slot:icon>
                    <PhMagnifyingGlass :size="26" />
                </template>
            </BaseButtonIcon>
        </div>
        <BaseButtonIcon>
            <template v-slot:icon>
                <PhHeart :size="26" />
            </template>
        </BaseButtonIcon>
        <BaseButtonIcon>
            <template v-slot:icon>
                <PhShoppingCart :size="26" />
            </template>
        </BaseButtonIcon>
    </nav>
</template>

<script setup>
import BaseSearchInput from '@/components/BaseSearchInput.vue'
import BaseButtonIcon from '@/components/BaseButtonIcon.vue'

const searchPlaceholder = "What are you looking for?"
</script>

<style scoped></style>