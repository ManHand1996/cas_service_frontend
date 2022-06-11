
import { createApp } from 'vue'

import ElementPlus from 'element-plus'

import  "./assets/global.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import router from "@/router/router";
import "bootstrap-icons/font/bootstrap-icons.css"
import 'element-plus/dist/index.css'


import App from './App.vue'
import router from '@/router/index'
import store from "@/store";
import VueCookies from 'vue-cookies'
import {getServerRSAPK} from "@/interfaces/data";
import {loadToState} from "@/utils/common";
// import {getLocalStorege} from "@/utils/common";

const app = createApp(App)

app.use(store)
app.use(router) // 全局使用router
app.use(ElementPlus)
app.use(VueCookies)

for(let [key, comp] of Object.entries(ElementPlusIconsVue)){
    app.component(key, comp)
}

// 挂在到index.html#app元素上
app.mount('#app')
// let origin_login_state = localStorage.getItem('isLogin') === null? false : localStorage.getItem('isLogin');
// store.commit('set_isLogin',{'isLogin': origin_login_state});

// 加载localStorage值到state
loadToState();

if (!store.state.server_pk){
    getServerRSAPK();
}
