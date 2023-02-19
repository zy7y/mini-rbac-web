<script setup lang="ts">
import { reactive, ref } from 'vue'
import PageViewVue from '@/components/content/PageView.vue'
import { useRoleStore } from '@/stores'
import type { IFormPlusItem } from '@/components/form/type'
import type { ColumnType } from 'ant-design-vue/lib/table'
import { Service, type MenuInfoTree } from '@/client'
import type { DataNode } from 'ant-design-vue/lib/tree'

const roleStore = useRoleStore()

// 🔍表单
const searchForm = reactive({
  name: '',
  status: null
})

// 搜索配置
const searchCloumns: IFormPlusItem[] = [
  {
    itemType: 'input',
    label: '角色名称',
    name: 'name',
    placeholder: '请输入角色名称',
    col: { span: 12 }
  },
  {
    itemType: 'select',
    label: '状态',
    name: 'status',
    placeholder: '请选择状态',
    options: [
      { label: '有效', value: 1 },
      { label: '无效', value: 9 }
    ],
    col: { span: 12 }
  }
]

// 表格配置
const tableColumns: ColumnType[] = [
  {
    title: '序号',
    dataIndex: 'index',
    customRender: ({ index }) => {
      return index + 1
    }
  },
  {
    title: '角色名称',
    dataIndex: 'role_name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ text }) => {
      return text == 1 ? '有效' : '无效'
    }
  },
  {
    title: '创建时间',
    dataIndex: 'created'
  },
  {
    dataIndex: 'operation'
  }
]

// modal
const modalForm = reactive<{
  data: {
    status: number
    role_name: string
    desc: string
    menu_ids: number[]
  }
}>({
  data: {
    status: 1,
    role_name: '',
    desc: '',
    menu_ids: []
  }
})

const treeData = ref<DataNode[]>([])
// 菜单列表
const loadMenuTree = async () => {
  const res = await Service.queryMenuMenuGet()
  treeData.value = res.data as unknown as DataNode[]
  console.log(treeData.value)
}
loadMenuTree()

const checkedKeys = ref<number[]>([])

const treeOnCheck = (checked: any[], e: any) => {
  checkedKeys.value = checked
  modalForm.data.menu_ids = [...checked, ...e.halfCheckedKeys]
}

// 解决编辑时最下面的选中节点不勾选问题
const calcMenu = (menus: MenuInfoTree[]) => {
  // 接口上传使用的菜单id 列表
  const allMenus: number[] = []
  // 回显的菜单id，每个子项取到最后节点即可
  const checkMenus: number[] = []
  function _mids(menus: MenuInfoTree[]) {
    for (const menu of menus) {
      allMenus.push(menu.id)
      if (menu.children) {
        _mids(menu.children)
      } else {
        checkMenus.push(menu.id)
      }
    }
  }
  _mids(menus)
  return { allMenus, checkMenus }
}
const modalEdit = async (record: any) => {
  // 拿当前角色的菜单信息
  const res = await Service.getRoleRoleIdGet(record.id)
  const { allMenus, checkMenus } = calcMenu(res.data.menus ?? [])
  record.menu_ids = allMenus
  modalForm.data = record
  checkedKeys.value = checkMenus
}
</script>

<template>
  <PageViewVue
    :search-conf="{
      model: searchForm,
      row: {
        gutter: { xs: 8, sm: 16, md: 24, lg: 32 }
      },
      columns: searchCloumns
    }"
    :store-object="roleStore"
    :table-columns="tableColumns"
    page-name="角色"
    :width="400"
    :modal-conf="{
      model: modalForm.data,
      columns: [
        {
          itemType: 'input',
          label: '角色名称',
          name: 'role_name',
          rules: [{ required: true, message: '请输入角色名称' }]
        },
        {
          itemType: 'input',
          label: '角色描述',
          name: 'desc',
          rules: [{ required: true, message: '请输入角色描述' }]
        },
        {
          itemType: 'tree',
          label: '权限菜单',
          name: 'menu_ids',
          rules: [{ required: true, message: '请勾选权限' }],
          checkable: true,
          treeData: treeData,
          fieldNames: { children: 'children', title: 'name', key: 'id' },
          onCheck: treeOnCheck,
          checkedKeys: checkedKeys
        }
      ]
    }"
    @edit="modalEdit"
    @close="
      modalForm.data = {
        role_name: '',
        desc: '',
        status: 1,
        menu_ids: []
      }
    "
  />
</template>

<style scoped></style>
