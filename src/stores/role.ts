import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Login, MenuInfoTree, UserDetail } from '@/client'
import { Service } from '@/client'
import { useGlobalStore } from './global'
import router from '@/router'
import { loadRoutes } from '@/utils/permissions'

// pinia setup https://pinia.vuejs.org/zh/core-concepts/#setup-stores
export const useRoleStore = defineStore(
  'role',
  () => {
    // 获取用户列表
    const getPageData = async (playod: IQueryRoleParams) => {
      const res = await Service.queryRoleRoleGet(
        playod.offset,
        playod.limit,
        playod.status,
        playod.ordering ?? '-created',
        playod.name
      )
      return res
    }

    return {
      // 接口
      getPageData
    }
  },
  {
    persist: true
  }
)
