<script setup lang="ts">
import type { RowProps } from 'ant-design-vue'
import { ref, type UnwrapNestedRefs } from 'vue'
import FormPlus from '@/components/form/FormPlus'
import type { FormPlusInstance, IFormPlusItem } from '@/components/form/type'

interface searchFormProps<T> {
  row?: RowProps
  searchForm: UnwrapNestedRefs<T>
  columns: IFormPlusItem[]
}

// 父传子
defineProps<searchFormProps<any>>()

// 子传父
const emits = defineEmits(['search', 'reset'])

const formPlusRef = ref<FormPlusInstance>()

const clickSearchBtn = () => {
  console.log('给父组件传递参数')
  emits('search', formPlusRef.value?.antFormInstance.getFieldsValue())
}
const clickResetBtn = () => {
  formPlusRef.value?.antFormInstance.resetFields()
  emits('reset')
}
</script>

<template>
  <a-card>
    <FormPlus
      ref="formPlusRef"
      :row="row"
      layout="inline"
      :model="searchForm"
      :columns="columns"
    />
    <a-space class="btns">
      <a-button type="primary" @click="clickSearchBtn">查询</a-button>
      <a-button @click="clickResetBtn">重置</a-button>
    </a-space>
  </a-card>
</template>

<style scoped>
.btns {
  float: right;
}
</style>
