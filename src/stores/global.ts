import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore(
  'global',
  () => {
    // spin 状态
    const loading = ref(false)

    const token = ref('')

    return { loading, token }
  },
  {
    persist: true
  }
)
