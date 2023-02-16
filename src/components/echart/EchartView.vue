<script setup lang="ts">
import { ref, onMounted, watchEffect, type StyleValue } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  options: EChartsOption | {}
  style: StyleValue
}>()
const echartRef = ref()

// 组件挂载时执行
onMounted(() => {
  const instance = echarts.init(echartRef.value)
  // props 变化就重新设置值
  watchEffect(() => {
    instance.setOption(props.options)
  })
})
</script>

<template>
  <div ref="echartRef" :style="style"></div>
</template>

<style scoped></style>
