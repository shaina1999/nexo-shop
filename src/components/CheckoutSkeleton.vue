<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <!-- Billing Details -->
        <div>
            <h2 class="mb-5 inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-2.5 skeleton-loader">
                <span class="skeleton-loader">Billing Details</span>
            </h2>
            <form>
                <div class="mb-4">
                    <label class="block text-sm font-medium skeleton-loader">Full Name<span class="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        class="skeleton-loader mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" 
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium skeleton-loader">Street Address<span class="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        class="skeleton-loader mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" 
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium skeleton-loader">Apartment, floor, etc. <span class="text-gray-500 text-xs">(Optional)</span></label>
                    <input 
                        type="text" 
                        class="skeleton-loader mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" 
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium skeleton-loader">Town/City<span class="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        class="skeleton-loader mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" 
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium skeleton-loader">Phone Number<span class="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        class="skeleton-loader mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out" 
                    />
                </div>
                <div class="flex items-center">
                    <label class="relative cursor-pointer flex items-center gap-1.5 skeleton-loader">
                        <input 
                            type="checkbox" 
                            class="absolute left-0 right-0 top-0 bottom-0 opacity-0 z-10 cursor-pointer"
                        >
                        <span 
                            class="w-4.5 h-4.5 rounded-sm border-[1px] border-black flex items-center justify-center text-white relative"
                        >
                            <PhCheckFat 
                                :size="12" 
                                weight="fill" 
                                :class="[
                                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-150',
                                ]"
                            />
                        </span>
                        <span class="text-sm ">Save details for faster checkout next time</span>
                    </label>
                </div>
            </form>
        </div>

        <!-- Order Summary -->
        <div class="space-y-5">
            <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-2.5 mb-4 skeleton-loader">Order Summary</h2>
            <div class="border border-gray-300 p-6 rounded-lg space-y-8 lg:space-y-6 shadow">
                <div v-for="n in 3" :key="n" class="flex items-baseline md:items-center lg:items-center justify-between gap-2 lg:gap-12 flex-col md:flex-row">
                    <div class="flex items-center gap-3 grow-0">
                        <div class="w-10 h-10 object-contain skeleton-loader"></div>
                        <span class="line-clamp-2 text-sm sm:text-base font-semibold text-gray-800 skeleton-loader">5G Android Phone</span>
                    </div>
                    <div class="shrink-0 flex flex-col gap-0.5 text-sm sm:text-base text-gray-500">
                        <span class="skeleton-loader">Php 100,00.00</span>
                        <span class="skeleton-loader">Qty: 12</span>
                    </div>
                </div>
                <div class="border-t border-gray-200 pt-6 mt-6 space-y-2.5">
                    <div class="flex justify-between text-sm sm:text-base skeleton-loader">
                        <span class="skeleton-loader">Subtotal:</span>
                        <span class="skeleton-loader">Php 100,00.00</span>
                    </div>
                    <div class="flex justify-between text-sm sm:text-base">
                        <span class="skeleton-loader">Shipping:</span>
                        <span class="text-green-500 skeleton-loader">Free</span>
                    </div>
                    <div class="flex justify-between font-bold text-base sm:text-lg">
                        <span class="skeleton-loader">Total:</span>
                        <span class="skeleton-loader">Php 100,00.00</span>
                    </div>
                </div>
            </div>

            <!-- Payment Options -->
            <div class="space-y-2">
                <h2 class="skeleton-loader mb-4">Payment Options:</h2>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <!-- Cash on Delivery -->
                    <label
                        class="skeleton-loader group block cursor-pointer border rounded-lg p-2.5 sm:p-3 transition-all hover:shadow relative"
                    >
                        <input
                            type="radio"
                            name="payment"
                            value="cod"
                            class="sr-only"
                        />
                        <div class="flex items-center gap-3 text-sm sm:text-base">
                            <PhMoney :size="20" :weight="'regular'" />
                            <span>Cash on Delivery</span>
                        </div>
                    </label>

                    <!-- Bank -->
                    <label
                        class="skeleton-loader group block cursor-pointer border rounded-lg p-2.5 sm:p-3 transition-all hover:shadow relative"
                    >
                        <input
                            type="radio"
                            name="payment"
                            value="bank"
                            class="sr-only"
                        />
                        <div class="flex items-center gap-3 text-sm sm:text-base">
                            <PhBank :size="20" :weight="'regular'" />
                        </div>
                    </label>
                </div>
            </div>
            <button class="w-full skeleton-loader px-10 py-2.5 lg:py-3">Place Order</button>
        </div>
    </div>
</template>