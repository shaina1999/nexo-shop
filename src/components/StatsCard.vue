<template>
  <div
    class="bg-white border border-gray-300 rounded-sm py-6 px-4 flex items-center justify-center flex-col gap-2.5 hover:bg-secondary-500 transition-all duration-300 ease-in-out group"
    :class="{ 'bg-red-500 text-white border-none': highlight }"
  >
    <div class="w-16 h-16 flex items-center justify-center rounded-full bg-zinc-300 transition-all duration-300 ease-in-out group-hover:bg-white/50">
      <div class="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white transition-all duration-300 ease-in-out group-hover:bg-black">
        <component :is="icon" :size="22" />
      </div>
    </div>
    <div class="text-lg sm:text-xl font-bold group-hover:text-white transition-all duration-300 ease-in-out">{{ value }}</div>
    <p class="text-sm group-hover:text-white transition-all duration-300 ease-in-out" :class="{ 'text-gray-600': !highlight }">{{ label }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  value: String,
  label: String,
  highlight: {
    type: Boolean,
    default: false,
  },
})
</script>