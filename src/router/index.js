import {createRouter,createWebHistory} from "vue-router";

import LoginPage from "@/components/user/LoginPage";
import VervifyPage from "@/components/user/VervifyPage";
import RegisterPage from "@/components/user/RegisterPage";
import IndexPage from "@/components/IndexPage";
import AdminLogin from "@/components/admin/AdminLogin";
import ApplicationList from "@/components/admin/ApplicationList";
import ApplicationDetail from "@/components/admin/ApplicationDetail";
import UserManage from "@/components/admin/UserManage";
import RoleManage from "@/components/admin/RoleManage";
import UserGroup from "@/components/admin/UserGroup";

import store from "@/store";
const routes = [
    {
        path: '/',
        name: 'index',
        component: IndexPage,
        meta: {auth: true, keepAlive: true},
        children: [
            {
                path: 'admin/application/',
                name: 'ApplicationList',
                component: ApplicationList,
                meta:{
                    keepAlive: false,
            
                },
                children: [
                    {
                        path: ':app_id/',
                        name: 'ApplicationDetail',
                        component: ApplicationDetail,
                        meta:{
                            keepAlive: false,
                            parent: 'ApplicationList'
                        }
                        
                    },
                ]
            },
            
            {
                path: 'admin/user/',
                name: 'UserManage',
                component: UserManage,
                meta:{
                    keepAlive: true,
            
                }
            },
            {
                path: 'admin/role/',
                name: 'RoleManage',
                component: RoleManage,
                meta:{
                    keepAlive: true,
            
                }
            },
            {
                path: 'admin/usergroup/',
                name: 'UserGroup',
                component: UserGroup,
                meta:{
                    keepAlive: true,
            
                }
            },
        ]
    },

    
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
    },
    {
        path: '/admin/login',
        name: 'admin-login',
        component: AdminLogin
    },
    

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
router.beforeEach((to, from, next) =>{
    console.log(store.state.isLogin);
    if(!store.state.isLogin && to.name !== 'admin-login'){

        next({name: 'admin-login'});
    }
    else{
        if(to.meta.parent){
            // 详情页不缓存
            to.meta.keepAlive = false;
        }
        else{
            // 其他页面缓存，由详情页跳转到parent页面，则不需要缓存
            to.meta.keepAlive = from.meta.parent !== to.name;
            // to.meta.keepAlive = true;
        }
        // console.log(to.fullPath);
        next();

    }
    // if(to.meta.parent){
    //     to.meta.keepAlive = false;
    // }
    // else to.meta.keepAlive = from.meta.parent !== to.name;

    // let jwt = localStorage.getItem('jwt');
    //
    // if (to.meta.auth ){
    //     if (jwt !== null && jwt !== 'undefined'){
    //         next();
    //     }
    //     else{
    //         next({name:'login'})
    //     }
    // }
    // else{
    //     next()
    //
    // }

})

export default router