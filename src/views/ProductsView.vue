<template>
    <div>Products</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSearchStore } from '@/stores/searchStore'

const searchStore = useSearchStore()

onMounted(() => {
    console.log('search for:', searchStore.searchQuery)
})
</script>

<style scoped></style>