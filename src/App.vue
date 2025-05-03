<script setup>
import NotificationBar from '@/components/NotificationBar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
    <div class="fixed top-0 left-0 right-0">
        <NotificationBar class="notificationBarRef" />
        <Header class="headerRef" />
    </div>
    <div><RouterView /></div>
    <Footer />
</template>