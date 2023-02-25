<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { onUnmounted, reactive } from 'vue'
import SystemEchart from './SystemEchart.vue'
import PerfResultEchart from './PerfResultEchart.vue'

interface IDashboardData {
  systemUsage: {
    cpu: string
    disk: string
    momery: string
  }
  performance: {
    rps: { value: string[] }[]
    time: { value: string[] }[]
    user: { value: string[] }[]
  }
}
let ws_host = 'ws://127.0.0.1:8000/ws'

if (process.env.NODE_ENV === 'production') {
  ws_host = 'ws://49.232.203.244:1855/ws'
}

// 获取数据
/** websocket */
let ws = new WebSocket(ws_host)
// 响应式数据
const data = reactive<IDashboardData>({
  systemUsage: {
    cpu: '0',
    momery: '0',
    disk: '0'
  },
  performance: {
    rps: [],
    time: [],
    user: []
  }
})

// 接收消息
ws.onmessage = (e) => {
  const wsData = JSON.parse(e.data)
  data.systemUsage = wsData.usage
  data.performance.rps.push({
    value: [Date.now(), wsData.performance.rps]
  })
  data.performance.time.push({
    value: [Date.now(), wsData.performance.time]
  })
  data.performance.user.push({
    value: [Date.now(), wsData.performance.user]
  })
}
const style = { width: '100%', height: '300px' }

// 组件卸载 关闭连接
onUnmounted(() => {
  ws.close()
})
</script>

<template>
  <div class="echart">
    <a-card title="资源使用率" class="left">
      <SystemEchart
        :style="style"
        :cpu="data.systemUsage.cpu"
        :disk="data.systemUsage.disk"
        :memory="data.systemUsage.momery"
      />
    </a-card>
    <a-card title="压测结果" class="right">
      <PerfResultEchart
        :style="style"
        :rps="data.performance.rps"
        :time="data.performance.time"
        :user="data.performance.user"
      />
    </a-card>
  </div>
  <div class="foter ant-card">
    <span
      >前端：Vue3 TS Pinia AntdV
      <a href="https://github.com/zy7y/mini-rbac-web.git">&nbsp; 代码获取</a>
    </span>
    <span
      >后端：FastAPI Python MySQL TortoiseORM
      <a href="https://github.com/zy7y/mini-rbac-serve.git">&nbsp; 代码获取</a>
    </span>
  </div>
</template>

<style scoped>
.echart {
  width: 100%;
  display: flex;
}
.left {
  width: 30%;
}
.right {
  margin-left: 20px;
  flex: 1;
}
.foter {
  height: calc(100% - 427px);
  margin: 20px 0;
  font-size: 24px;
  color: palevioletred;
  display: flex;
  justify-content: center; /*水平主轴居中*/
  align-items: center; /*垂直交叉轴居中*/
}

.foter > span {
  margin: 20px;
}
</style>
