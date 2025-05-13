<template>
    <ul>
        <li v-for="(link, index) in navLinks" :key="index">
            <RouterLink :to="link.to" activeClass="border-b-[1px] border-black" class="hover:border-secondary-500 hover:text-secondary-500 transition-all duration-300 ease-in-out"><span>{{ link.label }}</span></RouterLink>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue'

const navLinks = ref([
  { label: 'Home', to: '/' },
  { label: 'Contact', to: '/contact' },
  { label: 'About', to: '/about' }
])
</script>

<style scoped></style>