<template>
    <section class="flex items-center justify-center w-full py-16 sm:py-20 md:py-25 lg:py-35">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-20 items-start">
                <li class="flex flex-col items-center justify-center">
                    <div class="mb-3 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-zinc-300">
                        <div class="w-12 h-12 sm:w-14.5 sm:h-14.5 flex items-center justify-center rounded-full bg-black text-white">
                            <PhTruck :size="32" />
                        </div>
                    </div>
                    <div class="text-black text-center">
                        <h3 class="mb-mb-1 sm:2 font-semibold text-[16px] sm:text-[20px]">Free and Fast Delivery</h3>
                        <p>Free delivery for all orders over &#8369;140</p>
                    </div>
                </li>
                <li class="flex flex-col items-center justify-center">
                    <div class="mb-3 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-zinc-300">
                        <div class="w-12 h-12 sm:w-14.5 sm:h-14.5  flex items-center justify-center rounded-full bg-black text-white">
                            <PhHeadset :size="32" />
                        </div>
                    </div>
                    <div class="text-black text-center">
                        <h3 class="mb-1 sm:mb-2 font-semibold text-[16px] sm:text-[20px]">24/7 Customer Service</h3>
                        <p>Friendly 24/7 customer support</p>
                    </div>
                </li>
                <li class="flex flex-col items-center justify-center cols-span-0 md:col-span-2 lg:col-span-1">
                    <div class="mb-3 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-zinc-300">
                        <div class="w-12 h-12 sm:w-14.5 sm:h-14.5  flex items-center justify-center rounded-full bg-black text-white">
                            <PhShieldCheck :size="32" />
                        </div>
                    </div>
                    <div class="text-black text-center">
                        <h3 class="mb-1 sm:mb-2 font-semibold text-[16px] sm:text-[20px]">Money Back Guarantee</h3>
                        <p>We return money within 30 days</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>