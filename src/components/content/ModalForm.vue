<script setup lang="ts">
import type { RowProps } from 'ant-design-vue'
import { ref, type UnwrapNestedRefs } from 'vue'
import FormPlus from '../form/FormPlus'
import type { FormPlusInstance, IFormPlusItem } from '../form/type'

interface IModalFormProps<T> {
  row?: RowProps
  modalForm: UnwrapNestedRefs<T>
  columns: IFormPlusItem[]
  modalTitle: string // modal tilte
  modalVisible: boolean // 是否显示
  type: 'add' | 'edit' | 'del' // modal 类型
  width: number
}
defineProps<IModalFormProps<any>>()

const emits = defineEmits(['sure', 'close'])

const formPlusRef = ref<FormPlusInstance>()

const handleOk = () => {
  emits('sure', formPlusRef.value?.antFormInstance)
}

const handleClose = () => {
  emits('close', formPlusRef.value?.antFormInstance)
}
</script>

<template>
  <div>
    <a-modal
      :visible="modalVisible"
      :title="modalTitle"
      @ok="handleOk"
      :maskClosable="false"
      @cancel="handleClose"
      :width="width"
    >
      <template v-if="type != 'del'">
        <FormPlus
          ref="formPlusRef"
          :model="modalForm"
          :row="row"
          :columns="columns"
        />
      </template>
      <template v-else> 请确认删除? </template>
    </a-modal>
  </div>
</template>

<style scoped></style>
