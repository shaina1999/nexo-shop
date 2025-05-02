<template>
    <input 
        :placeholder="searchPlaceholder"
        v-model="search"
        class="outline-none :focus-visible:outline-none focus-within:outline-none w-full lg:w-max text-sm lg:text-base"
    >
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')

defineProps({
    searchPlaceholder: String
})
</script>

<style scoped></style>