<template>
    <article class="cursor-pointer pointer-events-none">
        <div class="bg-gray-200 p-2.5 sm:p-4 product cursor-pointer">
            <header class="flex items-center justify-between mb-4">
                <div>
                    <div class="bg-secondary-500 text-white py-1 px-2 rounded-sm text-sm skeleton-loader"><span class="opacity-0">50%</span></div>
                </div>
                <button
                    class="cursor-pointer bg-white flex items-center justify-center text-secondary-500 w-10 h-10 rounded-full transition-all duration-300 ease-in-out skeleton-loader">
                    <PhHeart :size="24" />
                </button>
            </header>
            <div class="w-full h-[100px] sm:h-[190px] flex items-center justify-center mr-auto ml-auto skeleton-loader">
            </div>
        </div>
        <footer>
            <button
                class="shadow-xl/5 bg-black text-white w-full p-1.5 transition-all duration-300 ease-in-out cursor-pointer add-to-cart mb-2 sm:mb-4 flex items-center justify-center gap-x-2 skeleton-loader">
                <span class="text-sm">Add To Cart</span>
                <PhPlus :size="18" />
                <PhCheck :size="18" class="hidden" />
            </button>
            <div>
                <h2 class="font-semibold text-sm sm:text-base mb-1 sm:mb-2.5 skeleton-loader"><span class="opacity-0">Productname</span></h2>
                <div class="flex items-center gap-x-2.5 mb-1 sm:mb-2.5 text-sm sm:text-base skeleton-loader">
                    <span class="text-secondary-500 skeleton-loader opacity-0">&#8369;1,000</span>
                    <del class="text-gray-500 decoration-dashed skeleton-loader opacity-0">&#8369;9,000</del>
                </div>
                <button class="flex items-center gap-x-1 cursor-pointer text-sm sm:text-base skeleton-loader">
                    <span class="opacity-0">1000000000000000</span>
                </button>
            </div>
        </footer>
    </article>
</template>