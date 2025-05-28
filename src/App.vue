<script setup>
import { useElementSize } from '@vueuse/core'
import { computed, useTemplateRef, ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useSpinner } from '@/stores/spinnerStore'
import { useRoute } from 'vue-router'

import NotificationBar from '@/components/NotificationBar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import Spinner from '@/assets/img/spinner.svg'

const notificationBarRef = useTemplateRef('notificationBarRef')
const { width, height } = useElementSize(notificationBarRef)
const windowWidth = ref(window.innerWidth)
const headerHeight = computed(() => windowWidth.value > 1024 ? 97 : 112)
const auth = useAuthStore()
const spinner = useSpinner()
const showScrollTopButton = ref(false)
const mainContainerRef = ref(null)
const route = useRoute()

const handleScroll = () => {
    showScrollTopButton.value = mainContainerRef.value?.scrollTop > 500
}

const scrollToTop = () => {
    mainContainerRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(route, () => {
    mainContainerRef.value?.scrollTo({ top: 0 })
})

onMounted(async () => {
    await auth.initAuth()
})
</script>

<template>
    <!-- Spinner -->
    <div class="w-full fixed left-0 right-0 bottom-0 top-0 z-50 flex items-center justify-center" v-if="spinner.isLoading">
        <img :src="Spinner" alt="Spinner" class="w-34 h-34">
    </div>
    <div v-if="!auth.loading">
        <div class="fixed top-0 left-0 right-0 z-[2]">
            <NotificationBar ref="notificationBarRef" />
            <Header />
        </div>
        <div :style="{ height: `${height + headerHeight}px` }"></div>
        <div 
            class="overflow-y-scroll" 
            ref="mainContainerRef"
            @scroll="handleScroll"
            :style="`height: calc(100vh - ${height + headerHeight}px);`"
        >
            <div>
                <RouterView />
            </div>
            <Footer />
            <ScrollToTop :showScrollTopButton="showScrollTopButton" @scroll-top="scrollToTop" />
        </div>
    </div>
</template>