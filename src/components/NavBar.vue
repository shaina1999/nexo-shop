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
                @click="mobileNavStore.updateState(!mobileNavStore.isOpen)"
            >
                <template v-slot:icon>
                    <PhList :size="32" />
                </template>
            </BaseButtonIcon>

            <!-- Desktop Nav -->
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

            <!-- Mobile Nav -->
            <Teleport to="body">
                <div v-if="mobileNavStore.isOpen" class="fixed top-0 right-0 w-[100vw] bg-white h-screen px-4 shadow-md">
                    <BaseButtonIcon
                        class="flex justify-end ml-auto mt-4"
                        @click="mobileNavStore.updateState(!mobileNavStore.isOpen)"
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
import { ref, watch } from 'vue'
import { useMobileNavStore } from '@/stores/mobileNavStore'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter() // Use this to access the router instance
const route = useRoute() // Use this to access the current route

import BaseSearchInput from '@/components/BaseSearchInput.vue'
import BaseButtonIcon from '@/components/BaseButtonIcon.vue'
import NavLinks from '@/components/NavLinks.vue'

const searchPlaceholder = "What are you looking for?"
const mobileNavStore = useMobileNavStore()

watch(route, () => {
    mobileNavStore.updateState(false)
})
</script>

<style scoped></style>