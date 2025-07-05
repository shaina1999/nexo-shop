<template>
  <div>
    <img :src="member.image" :alt="member.name" class="w-full rounded-lg" />
    <h3 class="mt-3 sm:mt-4 text-lg font-semibold">{{ member.name }}</h3>
    <p class="text-sm text-gray-600 mt-1">{{ member.role }}</p>
    <div class="flex justify-start space-x-4 mt-3 sm:mt-4 text-sm">
      <PhXLogo v-if="member.socials?.x" :size="24" />
      <PhInstagramLogo v-if="member.socials?.instagram" :size="24" />
      <PhLinkedinLogo v-if="member.socials?.linkedin" :size="24" />
    </div>
  </div>
</template>

<script setup>
import teamMember1 from '@/assets/img/team-member-1.png'
import teamMember2 from '@/assets/img/team-member-2.png'
import teamMember3 from '@/assets/img/team-member-3.png'

defineProps({
  member: {
    type: Object,
    required: true,
  },
})
</script>