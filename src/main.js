import './assets/css/main.css'
import '@fontsource/poppins'
import '@splidejs/vue-splide/css'
import 'vue-select/dist/vue-select.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import router from '@/router'
import PhosphorIcons from '@phosphor-icons/vue'
import VueCountdown from '@chenfengyuan/vue-countdown'
import VueSplide from '@splidejs/vue-splide'
import VueEasyLightbox from 'vue-easy-lightbox'
import vSelect from 'vue-select'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(PhosphorIcons)
app.use(pinia)
app.use(VueEasyLightbox)
app.use(VueSplide)
app.component('v-select', vSelect)
app.component(VueCountdown.name, VueCountdown)
app.mount('#app')