<template>
    <div class="border-b-black border-b-[0.5px]">
        <nav 
            class="px-4 md:px-8 lg:px-16 xl:px-34 mx-auto w-full max-w-7xl grid grid-cols-2 gap-y-4 lg:flex lg:items-center lg:justify-between pt-4 lg:pt-10 pb-4"
        >
            <!-- Logo -->
            <RouterLink to="/">
                <span class="text-2xl font-bold">NexoShop</span>
            </RouterLink>

            <!-- Nav Links -->
            <NavLinks class="items-center gap-8 xl:gap-10 hidden lg:flex" />

            <!-- Hamburger Button -->
            <BaseButtonIcon
                class="flex lg:hidden justify-end"
                @click="toggleMobileNav"
            >
                <template v-slot:icon>
                    <PhList :size="32" />
                </template>
            </BaseButtonIcon>

            <!-- Desktop Nav -->
            <div class="flex items-center gap-3 lg:gap-6 col-span-2 lg:col-span-0">
                <div class="py-2 px-4 bg-gray-200 flex gap-4 item-center rounded-sm w-full lg:w-max relative">
                    <input 
                        placeholder="What are you looking for?"
                        class="outline-none :focus-visible:outline-none focus-within:outline-none w-full lg:w-max text-sm lg:text-base"
                        v-model="searchTerm"
                    >
                    <BaseButtonIcon 
                        :class="{ 'hidden' : isSearching, 'block' : !isSearching }"
                    >
                        <template v-slot:icon>
                            <PhMagnifyingGlass :size="22" />
                        </template>
                    </BaseButtonIcon>
                    <BaseButtonIcon 
                        :class="{ 'hidden' : !isSearching, 'block' : isSearching }"
                        @click="searchTerm = ''"
                    >
                        <template v-slot:icon>
                            <PhX :size="22" />
                        </template>
                    </BaseButtonIcon>
                    <ul 
                        class="absolute w-full h-max top-[42px] bg-white right-0 py-2 px-4 border-t-[1px] border-t-white shadow-md flex-col gap-4 cursor-pointer max-h-[300px] md:max-h-[500px] overflow-y-scroll"
                        :class="{ 'flex' : isSearching, 'hidden' : !isSearching }"
                    >
                        <div class="pt-2 font-semibold" @click="searchProduct(searchTerm)">Search for: {{ searchTerm }}</div>
                        <li class="hover:text-primary-500" v-for="(item, index) in filteredSuggestions" :key="index" @click="searchProduct(item.category)">{{ item.value }}</li>
                    </ul>
                </div>
                <RouterLink to="/wishlist"><PhHeart :size="26" /></RouterLink>
                <RouterLink to="/cart"> <PhShoppingCart :size="26" /></RouterLink>
            </div>

            <!-- Mobile Nav -->
            <Teleport to="body">
                <div v-if="isMobileNavOpen" class="fixed top-0 right-0 w-[100vw] bg-white h-screen px-4 shadow-md">
                    <BaseButtonIcon
                        class="flex justify-end ml-auto mt-4"
                        @click="toggleMobileNav"
                    >
                        <template v-slot:icon>
                           <PhX :size="22" />
                        </template>
                    </BaseButtonIcon>
                    <NavLinks class="flex flex-col gap-y-10 h-screen items-center mt-8" />
                </div>
            </Teleport>
        </nav>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import searchSuggestions from '@/assets/js/searchSuggestions'
import { useSearchStore } from '@/stores/searchStore'

import BaseButtonIcon from '@/components/BaseButtonIcon.vue'
import NavLinks from '@/components/NavLinks.vue'

const router = useRouter()
const route = useRoute()
const isMobileNavOpen = ref(false)
const searchTerm = ref('')
const isSearching = computed(() => searchTerm.value ? true : false)
const filteredSuggestions = computed(() => {
    return searchSuggestions.filter((suggestion) => suggestion.value.includes(searchTerm.value.toLowerCase()) || suggestion.category.includes(searchTerm.value.toLowerCase()))
})
const searchStore = useSearchStore()

const toggleMobileNav = () => {
    isMobileNavOpen.value = !isMobileNavOpen.value
}

const searchProduct = (q) => {
    searchStore.setSearchTerm(q)
    router.push('/products')
}

watch(route, () => {
    if (isMobileNavOpen.value) {
        isMobileNavOpen.value = false
    }
})
</script>

<style scoped></style>