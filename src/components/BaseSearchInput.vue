<template>
    <input 
        :placeholder="searchPlaceholder"
        class="outline-none :focus-visible:outline-none focus-within:outline-none w-full lg:w-max text-sm lg:text-base"
    >
</template>

<script setup>
defineProps({
    searchPlaceholder: String
})
</script>

<style scoped></style>