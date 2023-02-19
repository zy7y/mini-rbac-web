import { defineStore } from 'pinia'
import { Service, type MenuIn } from '@/client'

// pinia setup https://pinia.vuejs.org/zh/core-concepts/#setup-stores
export const useMenuStore = defineStore(
  'menu',
  () => {
    // 获取角色列表
    const getPageData = async () => {
      return await Service.queryMenuMenuGet()
    }

    // 创建
    const createData = async (playod: MenuIn) => {
      return await Service.addMenuMenuPost(playod)
    }

    // 更新
    const updateData = async (id: number, playod: MenuIn) => {
      return await Service.editMenuMenuIdPut(id, playod)
    }

    // 删除
    const delData = async (id: number) => {
      return await Service.delMenuMenuIdDelete(id)
    }

    return {
      // 接口
      getPageData,
      createData,
      updateData,
      delData
    }
  },
  {
    persist: true
  }
)
