import './assets/css/main.css'
import '@fontsource/poppins';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import router from '@/router'
import PhosphorIcons from '@phosphor-icons/vue'
import i18n from '@/i18n'

const pinia = createPinia()
const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(PhosphorIcons)
app.use(pinia)
app.mount('#app')