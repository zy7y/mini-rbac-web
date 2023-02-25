import * as icons from '@ant-design/icons-vue'

// 菜单类型映射
export const menuType = {
  0: '目录',
  1: '菜单',
  2: '按钮',
  3: '数据'
}

// 请求方法颜色映射
export const methodColor = {
  GET: '#61AFFE',
  POST: '#49CC90',
  DELETE: '#F93E3E',
  PUT: '#FCA130'
}

// 转换成select 需要的options
export const menuTypeMap = () => {
  return Object.keys(menuType).map((k) => ({
    label: menuType[k],
    value: parseInt(k)
  }))
}

export const methodMap = () => {
  const arr = Object.keys(methodColor).map((k) => ({ label: k, value: k }))
  return arr
}

export const iconMap = () => {
  const arr = Object.keys(icons)
    .filter((k) => k.indexOf('Outlined') !== -1)
    .map((k) => ({ label: k, value: k }))
  return arr
}

import { ref } from 'vue'

export const tableTree = () => {
  // 1.适配菜单表格
  // 展开行 https://blog.csdn.net/weixin_52691965/article/details/120494451
  const expandedRowKeys = ref([])
  const expand = (expanded: any, record: any) => {
    if (expandedRowKeys.value.length > 0) {
      const index = expandedRowKeys.value.indexOf(record.id)
      if (index > -1) {
        expandedRowKeys.value.splice(index, 1)
      } else {
        expandedRowKeys.value.splice(0, expandedRowKeys.value.length)
        expandedRowKeys.value.push(record.id)
      }
    } else {
      expandedRowKeys.value.push(record.id)
    }
  }
  return expand
}

export { icons }
