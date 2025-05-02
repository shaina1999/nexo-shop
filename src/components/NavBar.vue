<template>
    <div class="border-b-black border-b-[0.5px]">
        <nav 
            class="px-4 md:px-8 lg:px-16 xl:px-34 mx-auto w-full max-w-7xl grid grid-cols-2 gap-y-4 lg:flex lg:items-center lg:justify-between pt-4 lg:pt-10 pb-4"
        >
            <RouterLink to="/">
                <span class="text-2xl font-bold">NexoShop</span>
            </RouterLink>
            <ul class="items-center gap-8 xl:gap-10 hidden lg:flex">
                <li v-for="(link, index) in navLinks" :key="index">
                    <RouterLink :to="link.to" activeClass="border-b-[1px] border-black"><span>{{ link.label }}</span></RouterLink>
                </li>
            </ul>
            <BaseButtonIcon class="flex lg:hidden justify-end">
                <template v-slot:icon>
                    <PhList :size="32" />
                </template>
            </BaseButtonIcon>
            <div class="flex items-center gap-3 lg:gap-6 col-span-2 lg:col-span-0">
                <div class="py-2 px-4 bg-gray-200 flex gap-4 item-center rounded-sm w-full lg:w-max">
                    <BaseSearchInput :searchPlaceholder="searchPlaceholder" />
                    <BaseButtonIcon>
                        <template v-slot:icon>
                            <PhMagnifyingGlass :size="22" />
                            <PhX :size="22" class="hidden" />
                        </template>
                    </BaseButtonIcon>
                </div>
                <RouterLink to="/wishlist"><PhHeart :size="26" /></RouterLink>
                <RouterLink to="/cart"> <PhShoppingCart :size="26" /></RouterLink>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseSearchInput from '@/components/BaseSearchInput.vue'
import BaseButtonIcon from '@/components/BaseButtonIcon.vue'

const navLinks = ref([
    { label: 'Home', to: '/' },
    { label: 'Contact', to: '/contact' },
    { label: 'About', to: '/about' },
    { label: 'Log In', to: '/login' }
])

const searchPlaceholder = "What are you looking for?"
</script>

<style scoped></style>