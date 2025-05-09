<template>
    <RouterLink 
        :to="to"
        class="flex items-center justify-center w-max cursor-pointer bg-secondary-500 rounded-sm text-white px-10 py-2.5 lg:py-4 hover:bg-secondary-300 transition-colors duration-300 ease-in-out"
    >
        <slot></slot>
    </RouterLink>
</template>

<script setup>
defineProps({
    to: String
})
</script>