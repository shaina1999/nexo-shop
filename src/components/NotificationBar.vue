<template>
    <div class="bg-black w-full flex items-center justify-center">
        <div 
            class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl text-white min-h-12 flex items-center gap-4 md:gap-6 py-2 md:py-0"
            :class="{ 'justify-between' : !auth.user, 'justify-center' : auth.user }"
        >
            <div class="hidden md:block"></div>
            <div class="text-sm">
                <span class="inline-block mr-0 md:mr-3">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
                <RouterLink to="/products"><span class="font-medium underline">Shop Now</span></RouterLink>
            </div>
            <div class="relative shrink-0" v-if="!auth.user">
                <RouterLink to="/login" class="text-sm bg-secondary-500 rounded-sm py-1 px-4">
                    <span>Login / Join</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
</script>