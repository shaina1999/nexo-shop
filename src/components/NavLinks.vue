<template>
    <ul>
        <li v-for="(link, index) in navLinks" :key="index">
            <RouterLink :to="link.to" activeClass="border-b-[1px] border-black"><span>{{ t(link.label) }}</span></RouterLink>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const navLinks = ref([
    { label: 'nav.home', to: '/' },
    { label: 'nav.contact', to: '/contact' },
    { label: 'nav.about', to: '/about' },
    { label: 'nav.login', to: '/login' }
])
</script>

<style scoped></style>