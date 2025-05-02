<template>
    <div class="flex">
        <input :placeholder="searchPlaceholder">
    </div>
</template>

<script setup>
defineProps({
    searchPlaceholder: String
})
</script>

<style scoped></style>