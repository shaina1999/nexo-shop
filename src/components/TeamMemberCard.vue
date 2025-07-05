<template>
  <div 
    :class="[
        'flex items-center justify-center flex-col',
        index === 2 ? 'sm:col-span-2 md:col-span-1' : ''
    ]"
  >
    <img :src="member.image" :alt="member.name" class="object-cover rounded-lg w-50 h-50 md:w-auto md:h-auto" />
    <h3 class="mt-3 sm:mt-4 text-md sm:text-lg font-semibold">{{ member.name }}</h3>
    <p class="text-sm text-gray-600 mt-1">{{ member.role }}</p>
    <div class="flex justify-start space-x-4 mt-3 sm:mt-4 text-sm">
      <PhXLogo v-if="member.socials?.x" :size="24" />
      <PhInstagramLogo v-if="member.socials?.instagram" :size="24" />
      <PhLinkedinLogo v-if="member.socials?.linkedin" :size="24" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  member: {
    type: Object,
    required: true,
  },
  index: Number
})
</script>