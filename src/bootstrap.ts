import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ConfigProvider } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(ConfigProvider).use(router).mount('#app')
