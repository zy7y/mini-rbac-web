import type { FormInstance, RowProps, ColProps } from 'ant-design-vue'
import type { SizeType } from 'ant-design-vue/lib/config-provider'
import type { StyleValue } from 'vue'

export interface FormPlusProps {
  layout?: 'inline' | 'horizontal' | 'vertical' | undefined
  row?: RowProps // 山岚布局
  model: {
    // 表单响应式数据
    [key: string]: any
  }
  columns: IFormPlusItem[] // 表单子项配置
}

export interface IFormPlusItem {
  itemType: string // 类型
  col?: ColProps // 布局
  name: string // 表单响应式子项
  label?: string // label
  placeholder?: string // ts
  type?: string // 子项type 如input password
  solts?: {} // 插槽，如果是.vue文件渲染返回内容需要是 h()
  disabled?: boolean // 用
  hidden?: boolean // 隐藏
  rules?: RuleObject[] // 校验

  // select
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE' | undefined // i下拉是否多选
  options?: DefaultOptionType[] // select options
  size?: SizeType // 尺寸
  style?: StyleValue
  icons?: Object // 兼容icon
  filterOption?: any // 筛选
  showSearch?: boolean // 可搜说

  // tree select
  dropdownStyle?: CSSProperties // 下拉样式
  filterTreeNode?: any //筛选

  // tree
  treeData?: DataNode[] // 数据
  checkable?: boolean
  fieldNames?: FieldNames
  onCheck?: (checked: any[], e: any) => void // 选中事件
  checkable?: boolean
  checkedKeys?: expandedKeys // 选中
  expandedKeys?: any // 展开的
  selectedKeys?: any
}

// expose form
export interface FormPlusInstance {
  antFormInstance: FormInstance
}
