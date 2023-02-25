<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { h, onMounted, reactive, ref } from 'vue'
import { icons, menuType, methodColor, methodMap, tableTree } from './conf'
import { Tag } from 'ant-design-vue'
import PageViewVue from '@/components/content/PageView.vue'
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '路由',
    dataIndex: 'path',
    key: 'path',
    width: 120
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 80,
    customRender: ({ value }) => {
      return menuType[value]
    }
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    key: 'component',
    width: 120
  },
  {
    title: '权限标识',
    dataIndex: 'identifier',
    key: 'identifier',
    width: 120
  },
  {
    title: '请求接口',
    dataIndex: 'api',
    key: 'api',
    width: 120
  },
  {
    title: '请求方法',
    dataIndex: 'method',
    key: 'method',
    width: 120,
    customRender: ({ value }) => {
      if (value) {
        return h(Tag, { color: methodColor[value] }, value)
      }
    }
  },
  {
    dataIndex: 'operation'
  }
]
const menuStore = useMenuStore()
const data = ref<any[]>([])
const loadData = async () => {
  const res = await menuStore.getPageData()
  data.value = res.data
}
onMounted(async () => {
  await loadData()
})

// tubiao
const filterOption = (
  input: string,
  option: { label: string; value: string }
) => {
  if (option.value) {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
}

//菜单筛选
const filterTreeNode = (inputValue: string, treeNode: any) => {
  return treeNode.name.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
}

// modal
const modalConfModel = reactive({
  data: {
    icon: null,
    api: null,
    status: 1,
    name: '',
    path: null,
    type: 1,
    component: null,
    pid: null,
    identifier: null,
    method: null
  }
})

const modalEdit = async (record: any) => {
  // 拿当前角色的菜单信息
  modalConfModel.data = record
}

// event
const modalClose = () => {
  modalConfModel.data = {
    icon: null,
    api: null,
    status: 1,
    name: '',
    path: null,
    type: 1,
    component: null,
    pid: null,
    identifier: null,
    method: null
  }
}
</script>

<template>
  <div class="page-content">
    <PageViewVue
      page-flag="menu"
      page-name="菜单"
      :pagination="false"
      :expand="tableTree"
      :modal-conf="{
        model: modalConfModel.data,
        row: {
          gutter: 16
        },
        columns: [
          {
            itemType: 'tree-select',
            name: 'pid',
            label: '父级菜单',
            col: { span: 24 },
            treeData: data,
            placeholder: '不选时，为顶层菜单',
            showSearch: true,
            filterTreeNode: filterTreeNode,
            fieldNames: { children: 'children', label: 'name', value: 'id' }
          },
          {
            itemType: 'input',
            name: 'name',
            label: '名称',
            col: { span: 12 },
            rules: [{ required: true, message: '请输入名称' }]
          },
          {
            itemType: 'select',
            name: 'type',
            label: '类型',
            col: { span: 12 },
            rules: [{ required: true, message: '请选折类型' }],
            options: Object.entries(menuType).map((key, value) => ({
              label: key[1],
              value
            }))
          },
          {
            itemType: 'select-icon',
            name: 'icon',
            label: '图标',
            col: { span: 12 },
            icons: icons,
            showSearch: true,
            filterOption: filterOption,
            options: Object.entries(icons).map((key) => {
              return { label: key[0], value: key[0] }
            })
          },
          {
            itemType: 'input',
            name: 'component',
            label: '组件',
            col: { span: 12 }
          },
          { itemType: 'input', name: 'path', label: '路由', col: { span: 12 } },
          {
            itemType: 'input',
            name: 'identifier',
            label: '权限',
            col: { span: 12 }
          },
          { itemType: 'input', name: 'api', label: '接口', col: { span: 12 } },
          {
            itemType: 'select',
            name: 'method',
            label: '方法',
            col: { span: 12 },
            placeholder: '不选默认为Null',
            options: methodMap()
          }
        ]
      }"
      :table-columns="columns"
      :store-object="menuStore"
      :width="500"
      @close="modalClose"
      @edit="modalEdit"
    />
  </div>
</template>

<style scoped>
.page-content {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
