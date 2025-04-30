<script setup>
import NotificationBar from '@/components/NotificationBar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
    <NotificationBar />
    <Header />
    <RouterView />
    <Footer />
</template>

<style scoped>
</style>