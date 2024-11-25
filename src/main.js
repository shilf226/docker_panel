import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import Terminal from 'vue-web-terminal'
import router from './utils/router/index'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';


const app = createApp(App)
app.use(router)
app.use(ArcoVue);
// app.use(Terminal);
app.mount('#app')






