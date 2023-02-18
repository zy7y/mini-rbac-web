import { useGlobalStore, useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/main' },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/IndexView.vue'),
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/views/error/404View')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    if (useGlobalStore().token) {
      if (to.path == '/main') {
        console.log(useUserStore().firstMenu)
        return useUserStore().firstMenu.path ?? to.path
      }
      return
    }
    return '/login'
  }
})

export default router
