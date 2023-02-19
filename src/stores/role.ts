import { defineStore } from 'pinia'
import { Service, type RoleSchema } from '@/client'

// pinia setup https://pinia.vuejs.org/zh/core-concepts/#setup-stores
export const useRoleStore = defineStore('role', () => {
  // 获取角色列表
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

  // 创建
  const createData = async (playod: RoleSchema) => {
    return await Service.addRoleRolePost(playod)
  }

  // 更新
  const updateData = async (id: number, playod: RoleSchema) => {
    if (playod?.created) {
      delete playod.created
    }
    if (playod?.modified) {
      delete playod.modified
    }
    if (playod?.id) {
      delete playod.id
    }
    return await Service.editRoleRoleIdPut(id, playod)
  }

  // 删除
  const delData = async (id: number) => {
    return await Service.delRoleRoleIdDelete(id)
  }

  return {
    // 接口
    getPageData,
    createData,
    updateData,
    delData
  }
})
