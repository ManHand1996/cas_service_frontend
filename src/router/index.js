import {createRouter,createWebHistory} from "vue-router";

import LoginPage from "@/components/user/LoginPage";
import VervifyPage from "@/components/user/VervifyPage";
import RegisterPage from "@/components/user/RegisterPage";
// import IndexPage from "@/components/IndexPage";
const routes = [
    // {
    //     path: '/',
    //     name: 'index',
    //     component: IndexPage,
    //     meta: {auth: true}
    // },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path:'/verify',
        name: 'verify',
        component: VervifyPage
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    }

]
const router = createRouter({
    // history: createWebHashHistory(),// 带 #/ #后面的内容不发送到服务器,所以输入不存在的url也不会报错
    history: createWebHistory(),
    routes: routes,

})

// 通过router.beforeEach 进行全局路由鉴权,
// to: 跳转的地址
// from: 当前地址
// next: 用于跳转的函数 next() -> 允许跳转到to, next(false) 终止跳转
// router.beforeEach((to, from, next) =>{
//
//     let jwt = localStorage.getItem('jwt');
//
//     if (to.meta.auth ){
//         if (jwt !== null && jwt !== 'undefined'){
//             next();
//         }
//         else{
//             next({name:'login'})
//         }
//     }
//     else{
//         next()
//
//     }
//
// })

export default router