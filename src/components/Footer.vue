<template>
    <div class="mt-16 sm:mt-20 md:mt-25 bg-black w-full flex items-center justify-center">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pt-20 text-white">
            <div class="flex justify-between gap-16 flex-wrap lg:flex-nowrap">
                <div class="basis-[100%] md:basis-[45%] lg:basis-[auto]">
                    <div class="text-md lg:text-lg font-bold mb-6">NexoShop</div>
                    <ul class="flex flex-col gap-y-4">
                        <li>Get 10% off your first order</li>
                        <li class="border-[1.5px] border-white rounded-sm flex gap-1 p-2 max-w-[400px]">
                            <input type="text" class="outline-none text-white w-full shrink" placeholder="Enter your email">
                            <button class="cursor-pointer"><PhPaperPlaneRight :size="22" /></button>
                        </li>
                    </ul>
                </div>
                <div class="basis-[100%] md:basis-[45%] lg:basis-[auto]">
                    <div class="ttext-md lg:ext-lg font-semibold mb-6">Support</div>
                    <ul class="flex flex-col gap-y-4">
                        <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
                        <li>nexoshop@gmail.com</li>
                        <li>+88015-88888-9999</li>
                    </ul>
                </div>
                <div class="basis-[100%] md:basis-[45%] lg:basis-[auto]">
                    <div class="text-md lg:text-lg font-semibold mb-6">Account</div>
                    <ul class="flex flex-col gap-y-4">
                        <li>My Account</li>
                        <li>Login / Register</li>
                        <li>Cart</li>
                        <li>Wishlist</li>
                        <li>Shop</li>
                    </ul>
                </div>
                <div class="basis-[100%] md:basis-[45%] lg:basis-[auto]">
                    <div class="text-md lg:text-lg font-semibold mb-6">Quick Links</div>
                    <ul class="flex flex-col gap-y-4">
                        <li>Privacy Policy</li>
                        <li>Terms Of Use</li>
                        <li>FAQ</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-black pt-20">
        <p class="lead-8 px-4 md:px-8 lg:px-16 xl:px-34 text-sm/6 lg:text-base/6 md:text-base text-center text-white py-5 border-t-[1px] border-t-white opacity-[40%]">&copy; Copyright NexoShop 2025. All right reserved</p>
    </div>
</template>

<script setup></script>

<style scoped></style>