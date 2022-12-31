import { createApp } from 'vue'

import App from './App'
import pinia, { useUserStore } from './stores'
import router from './router'

import './assets/main.css'
import 'normalize.css'
import 'ant-design-vue/dist/antd.css'
import { loadRoutes } from './utils/permissions'

const app = createApp(App)

app.use(pinia)

const userStore = useUserStore()
// fix 刷新页面路由丢失
loadRoutes(userStore.menus ?? [])
app.use(router)
// fix 刷新页面跳转第一个菜单
if (
  router.getRoutes().find((e) => {
    e.path == userStore.firstMenu.path
  })
) {
  router.push(userStore.firstMenu.path as string)
}

app.mount('#app')
