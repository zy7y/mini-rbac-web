<script setup lang="ts">
import { reactive } from 'vue'
import type { FormPlusProps } from '../form/type'
import SearchForm from './SearchForm.vue'
import type { Store } from 'pinia'
import type { ColumnType } from 'ant-design-vue/lib/table'
interface PageProps {
  searchConf: FormPlusProps // 搜索表单
  storeObject: Store // 使用的store
  tableColumns: ColumnType[] // table表格列
  pageName?: string
}

const props = defineProps<PageProps>()

const loadTableData = async () => {
  tableDatas.loading = true
  const res = await props.storeObject['getPageData']({
    ...props.searchConf.model,
    limit: tableDatas.pagination.pageSize,
    offset: tableDatas.pagination.current
  })
  tableDatas.data = res.data?.items ?? []
  tableDatas.pagination.total = res.data.total
  tableDatas.loading = false
}

const handleSearch = async (value: object) => {
  console.log('子组件传来的值', value)
  await loadTableData()
}

const handleReset = async () => {
  await loadTableData()
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
      await loadTableData()
    }
  }
})

loadTableData()
</script>

<template>
  <div class="page-content">
    <!-- 搜索 -->
    <SearchForm
      :row="searchConf.row"
      @search="handleSearch"
      @reset="handleReset"
      :search-form="searchConf.model"
      :columns="searchConf.columns"
    />

    <a-card class="tablePage">
      <div class="head">
        <h2>{{ pageName + '列表' }}</h2>
        <a-button type="primary"> 新增</a-button>
      </div>
      <a-table
        :columns="tableColumns"
        :data-source="tableDatas.data"
        :loading="tableDatas.loading"
        :pagination="tableDatas.pagination"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'operation'">
            <!-- todo -->
            <a>编辑</a>
            <a-divider type="vertical" />
            <a>删除</a>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- // 表格 -->
  </div>
</template>

<style scoped>
.page-content {
  width: 100%;
  height: 100%;
}
.tablePage {
  margin-top: 30px;
}
.head {
  display: flex;
  justify-content: space-between;
}
</style>
