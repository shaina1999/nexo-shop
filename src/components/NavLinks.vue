<template>
    <ul>
        <li v-for="(link, index) in navLinks" :key="index">
            <RouterLink :to="link.to" activeClass="border-b-[1px] border-black" class="hover:border-secondary-500 hover:text-secondary-500 transition-all duration-300 ease-in-out"><span>{{ t(link.label) }}</span></RouterLink>
        </li>
    </ul>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'

const { t } = useI18n()
const auth = useAuthStore()

const navLinks = ref([])

watchEffect(() => {
  const links = [
    { label: 'nav.home', to: '/' },
    { label: 'nav.contact', to: '/contact' },
    { label: 'nav.about', to: '/about' }
  ]

  if (!auth.user) {
    links.push({ label: 'nav.login', to: '/login' })
    links.push({ label: 'nav.signup', to: '/sign-up' })
  }

  navLinks.value = links
})
</script>

<style scoped></style>