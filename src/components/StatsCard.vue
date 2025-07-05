<template>
  <div
    class="bg-white border border-gray-300 rounded-sm py-6 px-4 flex items-center justify-center flex-col gap-2.5 hover:bg-secondary-500 transition-all duration-300 ease-in-out"
    :class="{ 'bg-red-500 text-white border-none': highlight }"
  >
    <div class="w-16 h-16 flex items-center justify-center rounded-full bg-zinc-300">
      <div class="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white">
        <component :is="icon" :size="22" />
      </div>
    </div>
    <div class="text-sl sm:text-xl font-bold">{{ value }}</div>
    <p class="text-sm" :class="{ 'text-gray-600': !highlight }">{{ label }}</p>
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