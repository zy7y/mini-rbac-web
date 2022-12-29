import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

import { Spin } from 'ant-design-vue'
import { useGlobalStore } from './stores'
export default defineComponent({
  name: 'App',
  setup() {
    const globalStore = useGlobalStore()
    return () => (
      <div>
        <Spin spinning={globalStore.loading}>
          <RouterView />
        </Spin>
      </div>
    )
  }
})
