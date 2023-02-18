<script setup lang="ts">
import { reactive } from 'vue'
import PageViewVue from '@/components/content/PageView.vue'
import { useRoleStore } from '@/stores'
import type { IFormPlusItem } from '@/components/form/type'
import type { ColumnType } from 'ant-design-vue/lib/table'

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
    customRender: ({ text, record, index, column }) => {
      console.log(text, record, index, column)
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
    customRender: ({ text, record, index, column }) => {
      console.log(text, record, index, column)
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
    :store-object="useRoleStore()"
    :table-columns="tableColumns"
    page-name="角色"
  />
</template>

<style scoped></style>
