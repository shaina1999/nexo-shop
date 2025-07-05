<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
            <!-- Our Story Section -->
            <div class="grid md:grid-cols-2 gap-5 sm:gap-10 items-center pb-16 sm:pb-20 md:pb-25 lg:pb-35">
                <div>
                    <h2 class="text-xl sm:text-3xl font-bold mb-4">Our Story</h2>
                    <p class="text-sm md:text-base text-gray-600 leading-relaxed">
                        Launched as a passion project, <span class="font-medium text-black">NexoShop</span> is a modern e-commerce platform built to deliver a clean, fast, and intuitive online shopping experience. Designed with performance and user experience in mind, NexoShop caters to startups, freelancers, and small businesses looking for a ready-to-launch solution.
                    </p>
                    <p class="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
                        With a curated collection of products, responsive design, and essential features like product filtering, sorting, and variation handling, NexoShop is built to scale and evolve. It’s not just a demo—it's a complete shopping experience created to showcase development skills and modern frontend practices.
                    </p>
                </div>
                <div class="w-full">
                    <img :src="aboutPageImage" alt="Shopping" class="mx-auto rounded-lg object-contain w-100 h-100 md:w-auto md:h-auto" />
                </div>
            </div>

            <!-- Stats Section -->
            <div class="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 pb-16 sm:pb-20 md:pb-25 lg:pb-35 text-center">
                <StatsCard
                    v-for="(stat, index) in stats"
                    :key="index"
                    :icon="stat.icon"
                    :value="stat.value"
                    :label="stat.label"
                    :highlight="stat.highlight"
                />
            </div>

            <!-- Team Section -->
            <div class="mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-7.5 text-left">
                <TeamMemberCard
                    v-for="member in teamMembers"
                    :key="member.id"
                    :member="member"
                />
            </div>

            <!-- Service Highlights Section -->
            <ServiceHighlights />
        </div>
    </section>
</template>

<script setup>
import ServiceHighlights from '@/components/ServiceHighlights.vue'
import StatsCard from '@/components/StatsCard.vue'
import TeamMemberCard from '@/components/TeamMemberCard.vue'
import aboutPageImage from '@/assets/img/about-section-image.png'
import teamMember1 from '@/assets/img/team-member-1.png'
import teamMember2 from '@/assets/img/team-member-2.png'
import teamMember3 from '@/assets/img/team-member-3.png'

const stats = [
  {
    icon: 'PhStorefront',
    value: '10.5k',
    label: 'Sellers active our site',
  },
  {
    icon: 'PhShoppingBag',
    value: '33k',
    label: 'Monthly Product Sale',
  },
  {
    icon: 'PhUsers',
    value: '45.5k',
    label: 'Customer active in our site',
  },
  {
    icon: 'PhCurrencyDollar',
    value: '25k',
    label: 'Annual gross sale in our site',
  },
]

const teamMembers = [
  {
    id: 1,
    name: "Tom Cruise",
    role: "Founder & Chairman",
    image: teamMember1,
    socials: {
      x: true,
      instagram: true,
      linkedin: true,
    },
  },
  {
    id: 2,
    name: "Emma Watson",
    role: "Chief Marketing Officer",
    image: teamMember2,
    socials: {
      x: true,
      instagram: true,
      linkedin: true,
    },
  },
  {
    id: 3,
    name: "Robert Downey Jr.",
    role: "Head of Operations",
    image: teamMember3,
    socials: {
      x: true,
      instagram: true,
      linkedin: true,
    },
  },
];
</script>