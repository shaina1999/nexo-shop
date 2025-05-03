import { createWebHistory, createRouter } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductsView from '@/views/ProductsView.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/home', component: HomeView },
  { path: '/products', component: ProductsView },
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