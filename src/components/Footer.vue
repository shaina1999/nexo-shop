<template>
    <div class="mt-16 sm:mt-20 md:mt-25 bg-black w-full flex items-center justify-center">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pt-20 text-white">
            <div class="flex justify-between gap-16 flex-wrap lg:flex-nowrap">
                <div class="basis-[100%] md:basis-[45%] lg:basis-[auto]">
                    <div class="ttext-md lg:ext-lg font-semibold mb-6">Support</div>
                    <ul class="flex flex-col gap-y-4">
                        <li>Rizal, PH</li>
                        <li>support@nexoshop.com</li>
                        <li>+639544005171</li>
                    </ul>
                </div>
                <div class="basis-[100%] md:basis-[45%] lg:basis-[auto]">
                    <div class="text-md lg:text-lg font-semibold mb-6">Account</div>
                    <ul class="flex flex-col gap-y-4">
                        <FooterLinkItem v-if="auth?.user" to="/my-account" label="My Account" />
                        <FooterLinkItem v-if="auth?.user" to="/orders" label="My Orders" />
                        <FooterLinkItem v-if="!auth?.user" to="/login" label="Login" />
                        <FooterLinkItem v-if="!auth?.user" to="/sign-up" label="Create Account" />
                    </ul>
                </div>
                <div class="basis-[100%] md:basis-[45%] lg:basis-[auto]">
                    <div class="text-md lg:text-lg font-semibold mb-6">Quick Links</div>
                    <ul class="flex flex-col gap-y-4">
                        <FooterLinkItem to="/cart" label="My Cart" />
                        <FooterLinkItem to="/products" label="All Products" />
                        <FooterLinkItem to="/wishlist" label="Wishlist" />
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-black pt-20">
        <p class="lead-8 px-4 md:px-8 lg:px-16 xl:px-34 text-sm/6 lg:text-base/6 md:text-base text-center text-white py-5 border-t-[1px] border-t-white opacity-[40%]">&copy; Copyright NexoShop 2025. All right reserved</p>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

import FooterLinkItem from '@/components/FooterLinkItem.vue'

const auth = useAuthStore()
</script>