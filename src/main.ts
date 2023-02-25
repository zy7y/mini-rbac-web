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

// 自定义指令 & 按钮权限校验
app.directive('per', {
  mounted(el: Element, binding: any) {
    console.log(el, binding)
    if (
      // 是否存在
      useUserStore().identifiers?.indexOf(binding.value) === -1
    ) {
      // 删除元素
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
})

app.mount('#app')
