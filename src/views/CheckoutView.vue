<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10 product-details">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
           <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <!-- Billing Details -->
                <div class="order-2 lg:order-1">
                    <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-5 lg:pb-10">Billing Details</h2>
                    <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium">Full Name<span class="text-red-500">*</span></label>
                        <input type="text" class="mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Street Address<span class="text-red-500">*</span></label>
                        <input type="text" class="mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Apartment, floor, etc. <span class="text-gray-500 text-xs">(Optional)</span></label>
                        <input type="text" class="mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Town/City<span class="text-red-500">*</span></label>
                        <input type="text" class="mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Phone Number<span class="text-red-500">*</span></label>
                        <input type="text" class="mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Email Address <span class="text-gray-500 text-xs">(Optional)</span></label>
                        <input type="email" class="mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" />
                    </div>
                    <div class="flex items-center">
                         <label class="relative cursor-pointer flex items-center gap-1.5">
                            <input 
                                type="checkbox" 
                                class="absolute left-0 right-0 top-0 bottom-0 w-full h-full opacity-0 cursor-pointer" 
                            >
                            <span 
                                class="w-4.5 h-4.5 rounded-sm border-[1px] border-black flex items-center justify-center text-white relative"
                            >
                                <PhCheckFat 
                                    :size="12" 
                                    weight="fill" 
                                    class="absolute top-[50%] -translate-x-1/2 left-1/2 -translate-y-1/2 text-transparent"
                                />
                            </span>
                            <span class="text-sm">Save this information for faster check-out next time </span>
                        </label>
                    </div>
                    </form>
                </div>

                <!-- Order Summary -->
                <div class="space-y-6 order-1 lg:order-2">
                    <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-5 lg:pb-10 mb-0">Order Summary</h2>
                    <div class="border border-gray-300 p-6 rounded-lg space-y-8 lg:space-y-6 shadow">
                        <div class="flex items-baseline md:items-center lg:items-center justify-between gap-2 lg:gap-12 flex-col md:flex-row">
                            <div class="flex items-center gap-3 grow-0">
                                <img src="https://jquwasnrxbzlhmtwnrit.supabase.co/storage/v1/object/public/product-images//c08186083_1_1.avif" alt="LCD Monitor" class="w-10 h-10 object-contain"/>
                                <span class="line-clamp-2 text-sm sm:text-base font-semibold text-gray-800">Gaming Laptop</span>
                            </div>
                            <div class="shrink-0 flex flex-col gap-0.5 text-sm sm:text-base text-gray-500">
                                <span>Php 100,00.00</span>
                                <span>Qty: 12</span>
                            </div>
                        </div>
                        <div class="flex items-baseline md:items-center lg:items-center justify-between gap-2 lg:gap-12 flex-col md:flex-row">
                            <div class="flex items-center gap-3 grow-0">
                                <img src="https://jquwasnrxbzlhmtwnrit.supabase.co/storage/v1/object/public/product-images//c08186083_1_1.avif" alt="LCD Monitor" class="w-10 h-10 object-contain"/>
                                <span class="line-clamp-2 text-sm sm:text-base font-semibold text-gray-800">5G Android Phone</span>
                            </div>
                            <div class="shrink-0 flex flex-col gap-0.5 text-sm sm:text-base text-gray-500">
                                <span>Php 100,00.00</span>
                                <span>Qty: 12</span>
                            </div>
                        </div>
                        <div class="flex items-baseline md:items-center lg:items-center justify-between gap-2 lg:gap-12 flex-col md:flex-row">
                            <div class="flex items-center gap-3 grow-0">
                                <img src="https://jquwasnrxbzlhmtwnrit.supabase.co/storage/v1/object/public/product-images//c08186083_1_1.avif" alt="LCD Monitor" class="w-10 h-10 object-contain"/>
                                <span class="line-clamp-2 text-sm sm:text-base font-semibold text-gray-800">Gaming Laptop</span>
                            </div>
                            <div class="shrink-0 flex flex-col gap-0.5 text-sm sm:text-base text-gray-500">
                                <span>Php 100,00.00</span>
                                <span>Qty: 12</span>
                            </div>
                        </div>
                        <div class="border-t pt-6 mt-6 space-y-2.5">
                            <div class="flex justify-between text-sm sm:text-base">
                                <span>Subtotal:</span>
                                <span>Php 100,00.00</span>
                            </div>
                            <div class="flex justify-between text-sm sm:text-base">
                                <span>Shipping:</span>
                                <span class="text-green-500">Free</span>
                            </div>
                            <div class="flex justify-between font-bold text-base sm:text-lg">
                                <span>Total:</span>
                                <span>Php 100,00.00</span>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Method -->
                    <div class="space-y-2">
                        <h2>Payment Options:</h2>
                        <div>
                            <label class="flex items-center gap-2">
                                <input type="radio" name="payment" class="accent-red-500" />
                                <span>Cash on delivery</span>
                            </label>
                        </div>
                        <div>
                            <label class="flex items-center gap-2">
                                <input type="radio" name="payment" class="accent-red-500" />
                                <span>Bank</span>
                            </label>
                        </div>
                    </div>
                    <BaseButton class="w-full">Place Order</BaseButton>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
</script>