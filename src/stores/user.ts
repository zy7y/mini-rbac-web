import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Login, MenuInfoTree, UserDetail } from '@/client'
import { Service } from '@/client'
import { useGlobalStore } from './global'
import router from '@/router'
import { loadRoutes } from '@/utils/permissions'

// pinia setup https://pinia.vuejs.org/zh/core-concepts/#setup-stores
export const useUserStore = defineStore(
  'user',
  () => {
    const info = ref<UserDetail>()
    const menus = ref<MenuInfoTree[]>()
    const identifiers = ref<string[]>()

    const firstMenu = computed(() => {
      const firstMenuDir = menus.value?.at(0)
      const firstMenuItem = firstMenuDir?.children?.at(0)
      return {
        openKey: [`${firstMenuDir?.id}`],
        selectKey: [`${firstMenuItem?.id}`],
        path: firstMenuItem?.path
      }
    })

    // 根据角色id重新加载
    const loadMenuWithRouterByRoleId = async (rid: number) => {
      const permissionsRes = await Service.getRoleRoleIdGet(rid)
      // 菜单权限
      menus.value = permissionsRes.data.menus
      // 按钮权限
      identifiers.value = permissionsRes.data.identifiers

      // 加载路由
      loadRoutes(menus.value ?? [])

      // 跳转第一个二级菜单页
      router.push(firstMenu.value.path as string)
    }

    // 登录动作
    const loginAction = async (playod: Login) => {
      const loginRes = await Service.loginLoginPost(playod)
      if (loginRes.data) {
        // 将token 给 global状态管理
        useGlobalStore().token = loginRes.data.token

        // 获取用户信息
        const infoRes = await Service.getUserUserIdGet(loginRes.data.id)
        info.value = infoRes.data

        // 获取权限信息
        const currentRole = infoRes.data?.roles.find(
          (role) => (role.status = 5)
        )
        await loadMenuWithRouterByRoleId(currentRole?.rid as number)
      }
    }

    return {
      info,
      menus,
      identifiers,
      firstMenu,
      loginAction,
      loadMenuWithRouterByRoleId
    }
  },
  {
    persist: true
  }
)
