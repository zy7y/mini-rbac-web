import { createApp } from 'vue'

import App from './App'
import pinia from './stores'
import router from './router'

import './assets/main.css'
import 'normalize.css'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
