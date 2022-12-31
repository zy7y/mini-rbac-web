import { defineComponent } from 'vue'
import { Button, Result } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
export default defineComponent({
  name: '404View',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    return () => (
      <Result status={404} title={404}>
        {{
          extra: () => (
            <Button
              onClick={() => router.push(userStore.firstMenu.path as string)}
              type={'primary'}
            >
              Back Home
            </Button>
          )
        }}
      </Result>
    )
  }
})
