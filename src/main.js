import './assets/main.css'

import { createApp } from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'


const app = createApp(App)
app.use(VueCookies, { expires: Infinity})
app.mount('#app')
