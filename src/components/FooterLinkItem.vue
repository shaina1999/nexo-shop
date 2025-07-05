<template>
  <li>
    <RouterLink
      :to="to"
      class="hover:border-b-white border-b border-b-transparent transition-colors duration-300 ease-in-out"
    >
      {{ label }}
    </RouterLink>
  </li>
</template>

<script setup>
defineProps({
  to: { type: String, required: true },
  label: { type: String, required: true },
})
</script>