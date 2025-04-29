<template>
    <div>
        <NotificationBar />
        <Header />
        <slot />
        <Footer />
    </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Header.vue'
</script>