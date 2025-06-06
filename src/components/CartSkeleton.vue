<template>
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
        <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-5 md:pb-10">
            <div class="skeleton-loader"><span class="font-semibold">My Cart 🛒</span><span class="font-regular text-gray-500">(2 items)</span></div>
        </h2>
        <div class="space-y-5">
            <div v-for="n in 5" :key="n" class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 sm:gap-12">
                <div class="flex items-start gap-4">
                    <label class="relative cursor-pointer skeleton-loader">
                        <input 
                            type="checkbox" 
                            class="absolute left-0 right-0 top-0 bottom-0 w-full h-full opacity-0 cursor-pointer" 
                        >
                        <span 
                            class="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-sm border-[1px] border-black flex items-center justify-center text-white relative"
                        >
                            <PhCheckFat 
                                :size="12" 
                                weight="fill" 
                                class="absolute top-[50%] -translate-x-1/2 left-1/2 -translate-y-1/2 text-transparent"
                            />
                        </span>
                    </label>
                    <div class="w-18 h-18 sm:w-20sm: sm:h-20 object-cover rounded skeleton-loader"></div>
                    <div>
                        <p class="text-sm sm:text-base font-semibold text-gray-800 skeleton-loader mb-2">Lorem ipsum dolor sit amet consectetur.</p>
                        <p class="text-sm sm:text-base text-gray-500 skeleton-loader mb-2">Price: Php 100,000.00</p>
                        <p class="text-sm sm:text-base text-gray-500 skeleton-loader">Subtotal: Php 100,000.00</p>
                    </div>
                </div>
                <div class="flex items-center justify-between sm:justify-end sm:gap-2.5 w-full sm:w-auto">
                    <div class="h-[30px] sm:h-[36px] w-[150px] skeleton-loader"></div>
                    <div class="h-[30px] sm:h-[36px] ml-4 sm:ml-0 !p-1.5 sm:!p-2 skeleton-loader">
                        <PhTrash class="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-start flex-col md:flex-row justify-between mt-6 gap-4">
            <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <div 
                    to="/products" 
                    class="skeleton-loader !flex items-center gap-x-1.5 text-sm !px-4.5 !py-2.5 md:!px-6 md:!py-3 md:mx-0 text-center !w-full md:!w-auto"
                >
                    Back to Shop
                    <PhArrowUDownLeft :size="18" />
                </div>
                <div 
                    class="skeleton-loader !flex items-center justify-center gap-x-1.5 text-sm !px-4.5 !py-2.5 md:!px-6 md:!py-3 mx-auto md:mx-0 w-full md:w-auto"
                >
                    Remove Selected
                    <PhTrash :size="18" />
                </div>
            </div>
            <div class="shrink-1 border border-gray-200 p-6 rounded-md w-full md:w-1/2 lg:w-1/3">
                <h3 class="text-base sm:text-lg font-medium mb-4 skeleton-loader">Cart Total</h3>
                <div class="flex justify-between mb-2.5 text-sm sm:text-base skeleton-loader">
                    <span>Subtotal:</span>
                    <span>Php 100,000.00</span>
                </div>
                <div class="flex justify-between mb-2.5 text-sm sm:text-base skeleton-loader">
                    <span>Shipping:</span>
                    <span class="text-green-600 font-medium">Free</span>
                </div>
                <div class="flex justify-between font-semibold text-base sm:text-lg border-t pt-4 mt-3.5 skeleton-loader">
                    <span>Total:</span>
                    <span>Php 100,000.00</span>
                </div>
                <div class="w-full mt-4 px-10 py-2.5 lg:py-4 skeleton-loader">
                    Proceed to Checkout
                </div>
            </div>
        </div>
    </div>
</template>