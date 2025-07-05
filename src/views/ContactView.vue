<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
            <!-- Card -->
            <div class="flex flex-col md:flex-row gap-8">
                <div class="flex-1 space-y-6">
                    <div class="flex gap-4">
                        <div class="h-10 w-10 shrink-0 text-primary bg-secondary-500 flex items-center justify-center rounded-full text-white">
                            <PhPhone :size="22" />
                        </div>
                        <div>
                            <h3 class="text-md sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Call to Us</h3>
                            <p class="text-gray-500 text-sm">We are available 24/7, 7 days a week.</p>
                            <p class="text-gray-800 mt-2 font-medium">Phone: +040 012 222 222</p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <div class="h-10 w-10 shrink-0 text-primary bg-secondary-500 flex items-center justify-center rounded-full text-white">
                            <PhEnvelopeSimple :size="22" />
                        </div>
                        <div>
                            <h3 class="text-md sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Write to Us</h3>
                            <p class="text-gray-500 text-sm">Fill out our form and we’ll contact you within 24 hours.</p>
                            <p class="text-gray-800 mt-2 font-medium">Email: customer@exclusive.com</p>
                            <p class="text-gray-800 font-medium">Email: support@exclusive.com</p>
                        </div>
                    </div>
                </div>

                <form class="flex-1 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            class="md:col-span-2 text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                        />
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Email"
                            class="text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                        />
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Phone"
                            class="text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                        />
                    </div>

                    <!-- Message -->
                    <textarea 
                        name="message" 
                        rows="6" 
                        placeholder="Your Message"
                        class="text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-ou"
                    >
                    </textarea>

                    <!-- Submit -->
                    <BaseButton
                        class="w-full sm:w-max"
                    >
                        Send Massage
                    </BaseButton>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
</script>