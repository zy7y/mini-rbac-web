import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Login, MenuInfoTree, UserDetail } from '@/client'
import { Service } from '@/client'
import { useGlobalStore } from './global'

// pinia setup https://pinia.vuejs.org/zh/core-concepts/#setup-stores
export const useUserStore = defineStore(
  'user',
  () => {
    const info = ref<UserDetail>()
    const menus = ref<MenuInfoTree[]>()
    const identifiers = ref<string[]>()

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
        const permissionsRes = await Service.getRoleRoleIdGet(
          currentRole?.rid as number
        )
        // 菜单权限
        menus.value = permissionsRes.data.menus
        // 按钮权限
        identifiers.value = permissionsRes.data.identifiers
      }
    }

    return { info, menus, identifiers, loginAction }
  },
  {
    persist: true
  }
)
