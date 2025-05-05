import './assets/css/main.css'
import '@fontsource/poppins';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

import router from '@/router'
import PhosphorIcons from "@phosphor-icons/vue"

const pinia = createPinia()
const app = createApp(App)

const i18n = createI18n({
  // something vue-i18n options here ...
})

app.use(i18n)
app.use(router)
app.use(PhosphorIcons)
app.use(pinia)
app.mount('#app')