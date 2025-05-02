<template>
    <ul>
        <li v-for="(link, index) in navLinks" :key="index">
            <RouterLink :to="link.to" activeClass="border-b-[1px] border-black"><span>{{ link.label }}</span></RouterLink>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue'

const navLinks = ref([
    { label: 'Home', to: '/' },
    { label: 'Contact', to: '/contact' },
    { label: 'About', to: '/about' },
    { label: 'Log In', to: '/login' }
])
</script>

<style scoped></style>