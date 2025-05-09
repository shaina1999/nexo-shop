import { createWebHistory, createRouter } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ProductView from '@/views/ProductView.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'

const routes = [
  { path: '/', name:'home', component: HomeView },
  { path: '/products', name:'products', component: ProductsView },
  { path: '/product', name:'product', component: ProductView },
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