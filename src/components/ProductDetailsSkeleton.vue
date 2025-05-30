<template>
   <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
        <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg mb-5 md:mb-10 lg:mb-16 font-semibold skeleton-loader w-max max-w-[90%]">Lorem ipsum dolor sit amet consectetu</h2>
        <div class="flex items-start gap-6 lg:gap-8 flex-col lg:flex-row">
            <!-- Product Images -->
            <div class="flex w-full lg:w-auto basis-[55%] gap-2 flex-col-reverse">
            <div class="basis-[100px] w-auto">
            <div class="grid grid-cols-4 gap-3 skeleton-loader">
                <div 
                class="bg-gray-200 flex items-center justify-center p-2 w-[90px] h-[90px] cursor-pointer border-2 border-transparent transition-colors duration-200 ease-in-out" 
                >
                </div>
            </div>
            </div>
            <!-- Main Image -->
            <div>
                <a 
                href="#"
                class="p-3 flex items-center justify-center bg-gray-200 h-[200px] md:h-[350px] lg:h-[450px] cursor-pointer outline-none skeleton-loader"
                >
                </a>
            </div>
            </div>
            <!-- Product Details -->
            <article class="space-y-6 basis-[42%] w-full">
            <header>
                <h1 class="text-lg sm:text-2xl font-bold mb-2 skeleton-loader">Lorem, ipsum dolor sit amet consectetur adipisicing.</h1>
                <div class="flex items-center mb-2 skeleton-loader">
                    <div class="flex items-center text-yellow-400 gap-1 mr-1">
                        <PhStar class="text-yellow-500" weight="fill" />
                        <p class="text-gray-500 text-sm sm:text-base">4.6</p>
                    </div>
                    <p class="text-gray-500 text-sm sm:text-base">(150 Reviews)</p>
                    <span class="text-gray-300 mx-2.5">&VerticalLine;</span>
                    <span class="text-green-600 text-sm sm:text-base font-medium py-0.5 px-2.5 bg-green-100 rounded-sm">In Stock</span>
                </div>
                <p class="text-lg sm:text-2xl font-semibold flex items-center gap-2">
                    <span class="skeleton-loader">16,000.00</span>
                    <del class="h-[32px] text-gray-500 text-xs sm:text-sm font-normal! skeleton-loader skeleton-loader inline-block">Php 10,000.00 </del> 
                    <span class="h-[32px] text-xs sm:text-sm font-semibold bg-secondary-100 text-secondary-500 rounded-sm px-1 skeleton-loader">-70%</span>
                </p>
            </header>
            <p class="text-gray-600 lead-[1.7] skeleton-loader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus hic delectus necessitatibus alias fuga.</p>
            <!-- Color Options -->
            <section class="skeleton-loader">
                <h2 class="text-sm sm:text-base font-medium mb-1">Colors:</h2>
                <div class="text-xs sm:text-base flex flex-wrap gap-3">
                <button class="px-3 py-1 border-[1px] rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out text-white bg-secondary-500 border-secondary-500">Green</button>
                <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">Pink</button>
                <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">Yellow</button>
                </div>
            </section>
            <!-- Size Options -->
            <section class="skeleton-loader">
                <h2 class="text-sm sm:text-base font-medium mb-1">Size:</h2>
                <div class="text-xs sm:text-base flex flex-wrap gap-3">
                <button class="px-3 py-1 border-[1px] rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out text-white bg-secondary-500 border-secondary-500">XS</button>
                <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">S</button>
                <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">M</button>
                <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">L</button>
                <button class="px-3 py-1 border-[1px] border-black rounded-sm cursor-pointer hover:border-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-300 ease-in-out">XL</button>
                </div>
            </section>
            <!-- Quantity and Action Buttons -->
            <section class="flex flex-col gap-8">
                <div class="flex flex-col skeleton-loader">
                    <h2 class="text-sm sm:text-base font-medium mb-1">Quantity:</h2>
                    <div class="flex items-center rounded overflow-hidden w-full sm:w-max h-[35px] sm:h-[44px]">
                        <button 
                        class="text-lg w-[60px] sm:w-[40px] cursor-pointer h-full border-r-[1px] border flex items-center justify-center rounded-tl-sm rounded-bl-sm hover:!bg-transparent"
                        >
                        <PhMinus :size="20" weight="bold" />
                        </button>
                        <input 
                        type="text" 
                        class="w-full sm:w-[80px] border-t-[1px] border-t-black border-b-[1px] border-b-black outline-none text-center text-sm sm:text-base font-semibold h-full" 
                        >
                        <button 
                        class="text-lg w-[60px] sm:w-[40px] cursor-pointer h-full border-r-[1px] text-white border-secondary-500 flex items-center justify-center bg-secondary-500 rounded-tr-sm rounded-br-sm"
                        >
                        <PhPlus :size="20" weight="bold" />
                        </button>
                    </div>
                </div>

                <div class="flex items-center gap-3 flex-col sm:flex-row">
                <BaseButton class="w-full text-sm md:text-base py-3! px-2.5! md:!py-3.5 md:!px-4 flex items-center justify-center font-medium gap-x-1.5 skeleton-loader">
                    <span>Add to Cart</span>
                    <PhShoppingCart class="text-xl" />
                </BaseButton>
                <BaseButton 
                    class="w-full text-sm md:text-base py-3! px-2.5! md:!py-3.5 md:!px-4 flex items-center justify-center font-medium gap-x-1.5 bg-white text-secondary-500! border-[1px] border-secondary-500 hover:!bg-secondary-100 skeleton-loader"
                >
                    <span>Add to wishlist</span>
                    <PhHeart class="text-xl" />
                </BaseButton>
                </div>
            </section>
            </article>
        </div>
    </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
</script>