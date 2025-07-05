<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <!-- Our Story Section -->
            <div class="grid md:grid-cols-2 gap-10 items-center pb-16 sm:pb-20 md:pb-25 lg:pb-35">
                <div>
                    <h2 class="text-3xl font-bold mb-4">Our Story</h2>
                    <p class="text-sm md:text-base text-gray-600 leading-relaxed">
                        Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
                    </p>
                    <p class="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
                        Exclusive has more than 1 Million products to offer, growing at a very fast rate. Exclusive offers a diverse assortment in categories ranging from consumer.
                    </p>
                </div>
                <div class="w-full">
                    <img :src="aboutPageImage" alt="Shopping" class="w-full rounded-lg object-cover" />
                </div>
            </div>

            <!-- Stats Section -->
            <div class="mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 pb-16 sm:pb-20 md:pb-25 lg:pb-35 text-center">
                <div class="bg-white shadow rounded-lg py-6 px-4">
                    <div class="text-lg font-bold">10.5k</div>
                    <p class="text-xs text-gray-600 mt-1">Sellers active our site</p>
                </div>
                <div class="bg-red-500 text-white shadow rounded-lg py-6 px-4">
                    <div class="text-lg font-bold">33k</div>
                    <p class="text-xs mt-1">Monthly Product Sale</p>
                </div>
                <div class="bg-white shadow rounded-lg py-6 px-4">
                    <div class="text-lg font-bold">45.5k</div>
                    <p class="text-xs text-gray-600 mt-1">Customer active in our site</p>
                </div>
                <div class="bg-white shadow rounded-lg py-6 px-4">
                    <div class="text-lg font-bold">25k</div>
                    <p class="text-xs text-gray-600 mt-1">Annual gross sale in our site</p>
                </div>
            </div>

            <!-- Team Section -->
            <div class="mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
                <!-- Person -->
                <div>
                    <img :src="teamMember1" alt="Tom Cruise" class="w-full rounded-lg" />
                    <h3 class="mt-4 text-lg font-semibold">Tom Cruise</h3>
                    <p class="text-sm text-gray-600">Founder & Chairman</p>
                    <div class="flex justify-center space-x-4 mt-2 text-gray-500 text-sm">
                        <i class="fab fa-instagram"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-linkedin"></i>
                    </div>
                </div>
                <!-- Person -->
                <div>
                    <img :src="teamMember2" alt="Emma Watson" class="w-full rounded-lg" />
                    <h3 class="mt-4 text-lg font-semibold">Emma Watson</h3>
                    <p class="text-sm text-gray-600">Managing Director</p>
                    <div class="flex justify-center space-x-4 mt-2 text-gray-500 text-sm">
                        <i class="fab fa-instagram"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-linkedin"></i>
                    </div>
                </div>
                <!-- Person -->
                <div>
                    <img :src="teamMember3" alt="Will Smith" class="w-full rounded-lg" />
                    <h3 class="mt-4 text-lg font-semibold">Will Smith</h3>
                    <p class="text-sm text-gray-600">Product Designer</p>
                    <div class="flex justify-center space-x-4 mt-2 text-gray-500 text-sm">
                        <i class="fab fa-instagram"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-linkedin"></i>
                    </div>
                </div>
            </div>

            <!-- Service Highlights Section -->
            <ServiceHighlights />
        </div>
    </section>
</template>

<script setup>
import ServiceHighlights from '@/components/ServiceHighlights.vue'
import aboutPageImage from '@/assets/img/about-section-image.png'
import teamMember1 from '@/assets/img/team-member-1.png'
import teamMember2 from '@/assets/img/team-member-2.png'
import teamMember3 from '@/assets/img/team-member-3.png'
</script>