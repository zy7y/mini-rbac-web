import { defineStore } from 'pinia'
import { Service } from '@/client'

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
