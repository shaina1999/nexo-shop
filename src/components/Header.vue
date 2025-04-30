<template>
    <div>
        <RouterLink to="/">Go to Login</RouterLink>
        <RouterLink to="/home">Go to Home</RouterLink>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter() // Use this to access the router instance
const route = useRoute() // Use this to access the current route
</script>

<style scoped></style>