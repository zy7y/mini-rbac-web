<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { FormPlusInstance, FormPlusProps } from '../form/type'
import SearchForm from './SearchForm.vue'
import type { Store } from 'pinia'
import type { ColumnType } from 'ant-design-vue/lib/table'
import ModalForm from './ModalForm.vue'
import type { FormInstance } from 'ant-design-vue'
interface PageProps {
  searchConf?: FormPlusProps // 搜索表单
  storeObject: Store // 使用的store
  tableColumns: ColumnType[] // table表格列
  pageName?: string
  expand?: any // tree 适配
  pagination?: any // 分页适配

  // modal
  modalConf: FormPlusProps
  width: number

  // 按钮权限页面标识
  pageFlag: string
}

const props = defineProps<PageProps>()

// 是否请求数据
const isRequest = ref(true)

const loadTableData = async () => {
  tableDatas.loading = true
  const res = await props.storeObject['getPageData']({
    ...props.searchConf?.model,
    limit: tableDatas.pagination.pageSize,
    offset: tableDatas.pagination.current
  })

  // 需要分页的列表
  tableDatas.data = res.data?.items ?? res.data
  tableDatas.pagination.total = res.data.total
  tableDatas.loading = false
  isRequest.value = false
}

const handleSearch = async (value: object) => {
  console.log('子组件传来的值', value)
  isRequest.value = true
}

const handleReset = async () => {
  isRequest.value = true
}

// 表格
const tableDatas = reactive({
  data: [],
  loading: false,
  pagination: {
    current: 1, //当前页
    pageSize: 10, // 每页数量
    total: 0,
    pageSizeOptions: ['5', '10', '50'],
    showTotal: (total: number) => `共 ${total} 条数据`,
    onChange: async (page: number, pageSize: number) => {
      tableDatas.pagination.current = page
      tableDatas.pagination.pageSize = pageSize
      isRequest.value = true
    }
  }
})

// modal
const emits = defineEmits(['edit', 'close'])

const modalFormRef = ref<FormPlusInstance>()
const modalConfData = reactive<{
  visible: boolean
  type: 'add' | 'edit' | 'del' // modal 类型
  currentRow: any
}>({
  visible: false,
  type: 'add',
  currentRow: null
})

const clickModalOk = async (antForm: FormInstance) => {
  if (modalConfData.type == 'del') {
    await props.storeObject['delData'](modalConfData.currentRow.id)
  } else {
    const result = await antForm.validate()
    if (result) {
      if (modalConfData.type == 'edit') {
        await props.storeObject['updateData'](
          props.modalConf.model.id,
          props.modalConf.model
        )
      } else if (modalConfData.type == 'add') {
        await props.storeObject['createData'](props.modalConf.model)
      }
    }
  }
  modalConfData.visible = false
  isRequest.value = true
}

const clickModalExit = () => {
  modalConfData.visible = false
  emits('close')
}

const modalTitle = computed(() => {
  let prefix = ''
  if (modalConfData.type == 'del') {
    prefix = '删除'
  } else if (modalConfData.type == 'edit') {
    prefix = `编辑`
  } else {
    prefix = '新增'
  }
  return prefix + props.pageName
})

// 新增按钮
const clickAddBtn = () => {
  modalConfData.type = 'add'
  modalConfData.visible = true
}

// 编辑按钮
const clickEditBtn = (record: any) => {
  modalConfData.type = 'edit'
  modalConfData.visible = true
  // 当前行数据向上传递
  emits('edit', record)
}

// 删除按钮
const clickDelBtn = async (record: any) => {
  modalConfData.type = 'del'
  modalConfData.visible = true
  modalConfData.currentRow = record
}

loadTableData()
// 监听
watch(isRequest, async (newValue, oldValue) => {
  console.log(newValue, oldValue)
  if (newValue && newValue != oldValue) {
    await loadTableData()
  }
})
</script>

<template>
  <div class="page-content">
    <!-- 搜索 -->
    <template v-if="searchConf">
      <SearchForm
        v-per="`${pageFlag}:query`"
        :row="searchConf.row"
        @search="handleSearch"
        @reset="handleReset"
        :search-form="searchConf.model"
        :columns="searchConf.columns"
      />
    </template>

    <a-card class="tablePage">
      <div class="head">
        <h2>{{ pageName + '列表' }}</h2>
        <a-button
          type="primary"
          @click="clickAddBtn"
          v-per="`${pageFlag}:create`"
        >
          新增</a-button
        >
      </div>
      <a-table
        :columns="tableColumns"
        :data-source="tableDatas.data"
        :loading="tableDatas.loading"
        :pagination="
          props?.pagination ? tableDatas.pagination : props?.pagination
        "
        :row-key="(record) => record.id"
        @expand="props?.expand"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <!-- todo -->
            <a @click="clickEditBtn(record)" v-per="`${pageFlag}:update`"
              >编辑</a
            >
            <a-divider type="vertical" />
            <a @click="clickDelBtn(record)" v-per="`${pageFlag}:delete`"
              >删除</a
            >
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- modal -->
    <ModalForm
      ref="modalFormRef"
      :row="modalConf.row"
      :columns="modalConf.columns"
      :modal-visible="modalConfData.visible"
      :modal-title="modalTitle"
      :modal-form="modalConf.model"
      @sure="clickModalOk"
      @close="clickModalExit"
      :type="modalConfData.type"
      :width="width"
    />
  </div>
</template>

<style scoped>
.page-content {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.tablePage {
  margin-top: 30px;
}
.head {
  display: flex;
  justify-content: space-between;
}
</style>
