<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10 product-details">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
            <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-5 md:pb-10">
                <span class="font-semibold">My Cart 🛒</span><span class="font-regular text-gray-500">(2 items)</span>
            </h2>
            <!-- Cart Table -->
            <div class="overflow-x-auto pb-1">
                <table class="min-w-full bg-white text-left rounded-lg">
                    <thead class="text-black text-sm shadow">
                        <tr>
                            <th class="px-4 py-3">
                                <input type="checkbox" />
                            </th>
                            <th class="px-4 py-3">Product</th>
                            <th class="px-4 py-3">Price</th>
                            <th class="px-4 py-3">Quantity</th>
                            <th class="px-4 py-3">Subtotal</th>
                            <th class="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700 text-sm">
                        <tr class="shadow">
                            <td class="px-4 py-4">
                                <input type="checkbox" />
                            </td>
                            <td class="px-4 py-4 flex items-center gap-4">
                                <img src="" alt="LCD Monitor" class="w-16 h-16 object-cover">
                                <span>LCD Monitor</span>
                            </td>
                            <td class="px-4 py-4">$650</td>
                            <td class="px-4 py-4">
                                <select class="border rounded px-2 py-1">
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                </select>
                            </td>
                            <td class="px-4 py-4">$650</td>
                            <td class="px-4 py-4">
                                <button class="text-red-500 hover:underline">Remove</button>
                            </td>
                        </tr>
                        <tr class="!shadow">
                            <td class="px-4 py-4">
                                <input type="checkbox" />
                            </td>
                            <td class="px-4 py-4 flex items-center gap-4">
                                <img src="" alt="Gamepad" class="w-16 h-16 object-cover">
                                <span>H1 Gamepad</span>
                            </td>
                            <td class="px-4 py-4">$550</td>
                            <td class="px-4 py-4">
                                <select class="border rounded px-2 py-1">
                                    <option>01</option>
                                    <option selected>02</option>
                                    <option>03</option>
                                </select>
                            </td>
                            <td class="px-4 py-4">$1100</td>
                            <td class="px-4 py-4">
                                <button class="text-red-500 hover:underline">Remove</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Actions -->
            <div class="flex items-start flex-col md:flex-row justify-between mt-6 gap-4">
                <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <BaseLinkButton 
                        to="/products" 
                        class="!flex items-center gap-x-1.5 text-sm !px-4.5 !py-2.5 md:!px-6 md:!py-3 md:mx-0 text-center !w-full md:!w-auto bg-white !text-black border-[1px] border-black/50 hover:!bg-gray-200"
                    >
                        Back to Shop
                        <PhArrowUDownLeft :size="18" />
                    </BaseLinkButton>
                    <BaseButton 
                        :disabled="disableRemoveButton"
                        class="!flex items-center justify-center gap-x-1.5 text-sm !px-4.5 !py-2.5 md:!px-6 md:!py-3 mx-auto md:mx-0 w-full md:w-auto !bg-red-500 !text-white border-[1px] border-red/50 hover:!bg-red-600"
                    >
                        Remove
                        <PhTrash :size="18" />
                    </BaseButton>
                </div>

                <!-- Cart Total -->
                <div class="border p-6 rounded-md w-full md:w-1/2 lg:w-1/3">
                    <h3 class="text-lg font-medium mb-4">Cart Total</h3>
                    <div class="flex justify-between mb-2 text-sm">
                        <span>Subtotal:</span>
                        <span>$1750</span>
                    </div>
                    <div class="flex justify-between mb-2 text-sm">
                        <span>Shipping:</span>
                        <span class="text-green-600 font-medium">Free</span>
                    </div>
                    <div class="flex justify-between font-semibold text-base border-t pt-2 mt-2">
                        <span>Total:</span>
                        <span>$1750</span>
                    </div>
                    <button class="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import BaseLinkButton from '@/components/BaseLinkButton.vue'
import BaseButton from '@/components/BaseButton.vue'

const disableRemoveButton = ref(true)
</script>