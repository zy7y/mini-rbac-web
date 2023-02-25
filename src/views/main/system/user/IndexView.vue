<script setup lang="ts">
import { reactive, ref } from 'vue'
import PageViewVue from '@/components/content/PageView.vue'
import { useRoleStore, useUserStore } from '@/stores'
import type { IFormPlusItem } from '@/components/form/type'
import type { ColumnType } from 'ant-design-vue/lib/table'
import type { UserSchema } from '@/client'

const userStore = useUserStore()

// 🔍表单
const searchForm = reactive({
  username: '',
  nickname: '',
  status: null
})

// 搜索配置
const searchCloumns: IFormPlusItem[] = [
  {
    itemType: 'input',
    label: '用户名',
    name: 'username',
    placeholder: '请输入用户名',
    col: { span: 8 }
  },
  {
    itemType: 'input',
    label: '昵称',
    name: 'nickname',
    placeholder: '请输入昵称',
    col: { span: 8 }
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
    col: { span: 8 }
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
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '昵称',
    dataIndex: 'nickname'
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ text, record, index, column }) => {
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
const modalFormModel = reactive<{
  data: UserSchema
}>({
  data: {
    username: '',
    nickname: '',
    password: '',
    status: 1,
    roles: []
  }
})

const modalEdit = async (record: any) => {
  modalFormModel.data = record
  const res = await userStore.getUserInfo(record.id)
  modalFormModel.data.roles = res.data?.roles.map((item) => item.rid) as any
}

// role options
const roleOptions = ref<any[]>([])

const loadRoleOptions = async () => {
  const options = await useRoleStore().getPageData({ offset: 1, limit: 200 })
  roleOptions.value =
    options.data.items?.map((item) => ({
      label: item.role_name,
      value: item.id
    })) ?? []
}
loadRoleOptions()
</script>

<template>
  <PageViewVue
    page-flag="user"
    :search-conf="{
      model: searchForm,
      row: {
        gutter: { xs: 8, sm: 16, md: 24, lg: 32 }
      },
      columns: searchCloumns
    }"
    :store-object="userStore"
    :table-columns="tableColumns"
    page-name="用户"
    :modal-conf="{
      model: modalFormModel.data,
      row: {
        // gutter: 16,
        wrap: true
      },
      columns: [
        {
          itemType: 'input',
          name: 'username',
          label: '账号',
          rules: [
            {
              required: true,
              message: '请输入用户名'
            }
          ]
        },
        {
          itemType: 'input',
          name: 'nickname',
          label: '昵称',
          rules: [
            {
              required: true,
              message: '请输入昵称'
            }
          ]
        },
        {
          itemType: 'select',
          name: 'roles',
          label: '角色',
          options: roleOptions,
          mode: 'multiple',
          rules: [
            {
              required: true,
              message: '请选择角色'
            }
          ],
          style: {
            width: '180px'
          }
        }
      ]
    }"
    @edit="modalEdit"
    @close="
      modalFormModel.data = {
        username: '',
        nickname: '',
        password: '',
        status: 1,
        roles: []
      }
    "
    :width="300"
  />
</template>

<style scoped></style>
