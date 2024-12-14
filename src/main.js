import './assets/main.css'

import { createApp } from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'


const app = createApp(App)
app.use(VueCookies, { expires: '7d'})
app.mount('#app')
