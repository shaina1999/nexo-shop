<script setup>
import { useElementSize } from '@vueuse/core'
import { computed, useTemplateRef, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'

import NotificationBar from '@/components/NotificationBar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

const notificationBarRef = useTemplateRef('notificationBarRef')
const { width, height } = useElementSize(notificationBarRef)
const windowWidth = ref(window.innerWidth)
const headerHeight = computed(() => windowWidth.value > 1024 ? 97 : 118)
const auth = useAuthStore()

onMounted(async () => {
  await auth.initAuth()
})
</script>

<template>
    <div class="fixed top-0 left-0 right-0 z-[2]">
        <NotificationBar ref="notificationBarRef" />
        <Header />
    </div>
    <div :style="{ marginTop: `${height + headerHeight}px` }">
        <RouterView />
    </div>
    <Footer />
    <ScrollToTop />
</template>