<script setup lang="ts">
import EchartView from '@/components/echart/EchartView.vue'
import { computed, type StyleValue } from 'vue'

interface SystemEchartProps {
  cpu: string // cpu占用率
  memory: string // 内存占用率
  disk: string // 磁盘占用率
  style: StyleValue // 样式
}

const props = defineProps<SystemEchartProps>()

const options = computed(() => {
  const gaugeData = [
    {
      value: props.cpu,
      name: 'CPU',
      title: {
        offsetCenter: ['-60%', '80%']
      },
      detail: {
        offsetCenter: ['-60%', '95%']
      }
    },
    {
      value: props.memory,
      name: 'MEMORY',
      title: {
        offsetCenter: ['0%', '80%']
      },
      detail: {
        offsetCenter: ['0%', '95%']
      }
    },
    {
      value: props.disk,
      name: 'DISK',
      title: {
        offsetCenter: ['60%', '80%']
      },
      detail: {
        offsetCenter: ['60%', '95%']
      }
    }
  ]
  return {
    series: [
      {
        type: 'gauge',
        anchor: {
          show: true,
          showAbove: true,
          size: 18,
          itemStyle: {
            color: '#FAC858'
          }
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 8,
          length: '80%',
          offsetCenter: [0, '8%']
        },
        progress: {
          show: true,
          overlap: true,
          roundCap: true
        },
        axisLine: {
          roundCap: true
        },
        data: gaugeData,
        title: {
          fontSize: 14
        },
        detail: {
          width: 40,
          height: 14,
          fontSize: 14,
          color: '#fff',
          backgroundColor: 'inherit',
          borderRadius: 3,
          formatter: '{value}%'
        }
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
