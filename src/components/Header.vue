<template>
    <NavBar />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter() // Use this to access the router instance
const route = useRoute() // Use this to access the current route

import NavBar from '@/components/NavBar.vue'
</script>

<style scoped></style>