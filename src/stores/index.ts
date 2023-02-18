import { createPinia } from 'pinia'
import { useGlobalStore } from './global'
import { useUserStore } from './user'
import { useRoleStore } from './role'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

export { useGlobalStore, useUserStore, useRoleStore }
