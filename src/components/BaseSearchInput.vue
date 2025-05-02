<template>
    <div class="flex">
        <input 
            :placeholder="searchPlaceholder" v-model="search" class="outline-none :focus-visible:outline-none focus-within:outline-none"
        >
    </div>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')

defineProps({
    searchPlaceholder: String
})
</script>

<style scoped></style>