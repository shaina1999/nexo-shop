import './assets/css/main.css'
import '@fontsource/poppins'
import '@splidejs/vue-splide/css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import router from '@/router'
import PhosphorIcons from '@phosphor-icons/vue'
import i18n from '@/i18n'
import VueCountdown from '@chenfengyuan/vue-countdown'
import VueSplide from '@splidejs/vue-splide'

const pinia = createPinia()
const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(PhosphorIcons)
app.use(pinia)
app.use(VueSplide)
app.component(VueCountdown.name, VueCountdown)
app.mount('#app')