
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import router from "@/router/router";
import 'element-plus/dist/index.css'

import App from './App.vue'
// import testLayout from "@/components/testLayout";
// import IndexPage from "@/components/IndexPage";
import router from '@/router/index'
import store from "@/store";
// import LoginPage from "@/components/user/LoginPage";
// import HelloWorld from "@/components/HelloWorld";

const app = createApp(App)
// eslint-disable-next-line no-unused-vars
const private_key = "safasfassssfasfasfsafasf";
// const app = new Vue(
//     {
//         router,
//     }
// )
app.use(store)
app.use(router) // 全局使用router
app.use(ElementPlus)



app.mount('#app')
