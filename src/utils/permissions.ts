import type { MenuInfoTree } from '@/client'
import router from '@/router'

const modules = import.meta.glob('../views/**/**.vue')

const loadRoutes = (menus: MenuInfoTree[]) => {
  menus.map((menu) => {
    if (menu.type == 1 && menu.path) {
      router.addRoute('main', {
        path: menu.path,
        component: modules[`../views/main${menu.component}/IndexView.vue`],
        children: []
      })
    } else if (menu.children) {
      loadRoutes(menu.children)
    }
  })
}

export { loadRoutes }
