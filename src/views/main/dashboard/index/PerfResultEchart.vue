<script setup lang="ts">
import EchartView from '@/components/echart/EchartView.vue'
import { computed } from 'vue'

interface PerfEchartProps {
  rps: { value: string[] }[]
  time: { value: string[] }[]
  user: { value: string[] }[]
  style: {}
}

const props = defineProps<PerfEchartProps>()

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: 'RPS',
        type: 'line',
        showSymbol: false,
        data: props.rps
      },
      {
        name: 'RT (ms)',
        type: 'line',
        showSymbol: false,
        data: props.time
      },
      {
        name: 'User',
        type: 'line',
        showSymbol: false,
        data: props.user
      }
    ]
  }
})
</script>

<template>
  <div>
    <EchartView :options="options" :style="style" />
  </div>
</template>

<style scoped></style>
