<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10 product-details">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
           <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <!-- Billing Details -->
                <div class="order-2 lg:order-1">
                    <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-5 md:pb-10">Billing Details</h2>
                    <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium">Full Name<span class="text-red-500">*</span></label>
                        <input type="text" class="mt-1 w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Street Address<span class="text-red-500">*</span></label>
                        <input type="text" class="mt-1 w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Apartment, floor, etc. (optional)</label>
                        <input type="text" class="mt-1 w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Town/City<span class="text-red-500">*</span></label>
                        <input type="text" class="mt-1 w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Phone Number<span class="text-red-500">*</span></label>
                        <input type="text" class="mt-1 w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Email Address<span class="text-red-500">*</span></label>
                        <input type="email" class="mt-1 w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="save-info" class="mr-2" />
                        <label for="save-info" class="text-sm">Save this information for faster check-out next time</label>
                    </div>
                    </form>
                </div>

                <!-- Order Summary -->
                <div class="space-y-6 order-1 lg:order-2">
                    <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-5 md:pb-10 mb-0">Order Summary</h2>
                    <div class="border border-gray-300 p-6 rounded-lg space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <img src="https://img.icons8.com/color/48/monitor.png" alt="LCD Monitor" class="w-10 h-10"/>
                                <span>LCD Monitor</span>
                            </div>
                            <span class="font-semibold">$650</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <img src="https://img.icons8.com/color/48/controller.png" alt="Gamepad" class="w-10 h-10"/>
                                <span>HI Gamepad</span>
                            </div>
                            <span class="font-semibold">$1100</span>
                        </div>
                        <hr>
                        <div class="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>$1750</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div class="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>$1750</span>
                        </div>
                    </div>

                    <!-- Payment Method -->
                    <div class="space-y-4">
                        <div>
                            <label class="flex items-center gap-2">
                                <input type="radio" name="payment" class="accent-red-500" />
                                <span>Cash on delivery</span>
                            </label>
                        </div>
                    </div>
                    <button class="bg-red-500 text-white px-6 py-3 rounded-md w-full font-semibold">Place Order</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
</script>