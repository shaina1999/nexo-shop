<template>
    <div class="border-b-black border-b-[0.5px]">
        <nav class="px-6 md:px-8 lg:px-16 xl:px-34 mx-auto w-full max-w-7xl flex items-center justify-between pt-10 pb-4">
            <RouterLink to="/">
                <span class="text-2xl font-bold">NexoShop</span>
            </RouterLink>
            <ul class="flex items-center gap-12">
                <li v-for="(link, index) in navLinks" :key="index">
                    <RouterLink :to="link.to" activeClass="border-b-[1px] border-black"><span>{{ link.label }}</span></RouterLink>
                </li>
            </ul>
            <div class="flex items-center gap-6">
                <div class="py-2 px-4 bg-gray-200 flex gap-4 item-center rounded-sm">
                    <BaseSearchInput :searchPlaceholder="searchPlaceholder" />
                    <BaseButtonIcon>
                        <template v-slot:icon>
                            <PhMagnifyingGlass :size="22" />
                            <PhX :size="22" class="hidden" />
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
    { label: 'Sign Up', to: '/signup' }
])

const searchPlaceholder = "What are you looking for?"
</script>

<style scoped></style>