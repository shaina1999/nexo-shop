import './assets/main.css'
import '@fontsource/poppins';

import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import PhosphorIcons from "@phosphor-icons/vue"

const app = createApp(App)
app.use(router)
app.use(PhosphorIcons)
app.mount('#app')