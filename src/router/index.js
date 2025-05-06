import { createWebHistory, createRouter } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import SearchView from '@/views/SearchView.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'

const routes = [
  { path: '/', name:'home', component: HomeView },
  { path: '/home', name:'home', component: HomeView },
  { path: '/search', name:'search', component: SearchView },
  { path: '/login', name:'login', component: LoginView },
  { path: '/sign-up', name:'sign-up', component: SignUpView },
  { path: '/forgot-password', name:'forgot-password', component: ForgotPasswordView },
  { path: '/:pathMatch(.*)', component: NotFoundComponent }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router