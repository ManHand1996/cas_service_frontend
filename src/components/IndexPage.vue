
<template>

    <div class="common-layout top-el-container">
        <el-container class="top-el-container">
<!--            <el-scrollbar max-height="clientH" height="clientH" class="side-bg">-->
<!--            <el-aside width="auto" style="height: 100%"  >-->

                <el-menu
                        ref="index_menu"
                        :default-active="menuDefaultActive"
                        active-text-color="#ffd04b"
                        background-color="#545c64"
                        text-color="#fff"
                        :collapse="indexMenuIsCollapse"
                        @select="handerMenuSelect"
                        height="500px"
                        :router="true"

                >
                    <admin-menu :children="menu_data_list" ></admin-menu>
                </el-menu>


<!--            </el-aside>-->
<!--</el-scrollbar>-->
            <el-drawer custom-class="drawer_style"  direction="ltr"  v-model="menuDrawerDisplay" :show-close="false" title="权限管理系统" size="60%">
                <el-menu
                        ref="drawer_menu"
                        :default-active="menuDefaultActive"
                        active-text-color="#ffd04b"
                        @select="handerMenuSelect"
                        :collapse="false"
                        height="auto"

                >

                    <admin-menu  ref="drawer_menu_item" :children="menu_data_list" ></admin-menu>
                </el-menu>
            </el-drawer>
            <el-container>

                <el-header >

                    <el-row justify="start">
                        <el-col :span="2">
                            <el-button style="border: none;text-align: left " @click="menuCollapse" v-model="indexMenuIsCollapse"  link>
                                <i class="bi-list" style="color:gray; font-size: 1.5rem"  ></i>
                            </el-button>
                        </el-col>
                       <el-col :span="18">
                           {{indexTitle}}
                       </el-col>
                        <el-col :span="2">

                            <el-popconfirm
                                    confirm-button-text="确认"
                                    cancel-button-text="取消"
                                    title="是否退出登陆？"
                                    @confirm="logout"
                            >
                                <template #reference>
                                    <el-button link size="small" type="danger" >退出</el-button>

                                </template>
                            </el-popconfirm>

                        </el-col>

                    </el-row>


                </el-header>
                <el-divider style="margin: 5px 0;" />
                <el-main class="full_width_height">
<!--                    增加访问内容导航栏, 与左侧菜单栏互动： 点击菜单栏开启一个新标签， 同时菜单也展开并选中该菜单栏-->
<!--                    https://element-plus.org/zh-CN/component/tabs.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%A2%9E%E5%8A%A0%E6%A0%87%E7%AD%BE%E9%A1%B5%E8%A7%A6%E5%8F%91%E5%99%A8-->
<!--                    <el-tabs v-model="navTabs.currentIndex" type="card"  @tab-remove="navtabRemove" @tab-click="navtabClick"  >-->

<!--                        <el-tab-pane v-for="item in navTabs.data" :key="item.index" :label="item.title" :name="item.index" :closable="item.closeble" :menu_index="item.menu_index">-->

<!--                        </el-tab-pane>-->
<!--                    </el-tabs>-->
<!--                    <el-breadcrumb :separator-icon="ArrowRight" style="font-size: 20px">-->
<!--                        <el-breadcrumb-item v-for="item in navBread" :key="item.index" :to="item.route">{{item.title}}</el-breadcrumb-item>-->
<!--                    </el-breadcrumb>-->
                    <router-view v-if="$route.path !== '/'" v-slot="{Component}" >

                            <keep-alive>
                                    <component ref="detailComp" :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"

                                    />

                            </keep-alive>
                        <!--                                <component ref="detailComp" :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"-->
                        <!--                                           @handlerDetail="handlerDetailTab" @handlerDetailTitle="handlerDetailTabTitle"-->
                        <!--                                           :isSend="isSend"-->
                        <!--                                />-->
                            <component ref="detailComp" :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"

                            />

                    </router-view>
                    <template v-else>
                        aslksajglksalkgjalkg
                    </template>

                </el-main>

            </el-container>
        </el-container>
    </div>

</template>

<script>

import {ref} from 'vue'

import {APIMenuList} from "@/interfaces/data";
import AdminMenu from "@/components/admin/AdminMenu";
import ApplicationDetail from "@/components/admin/ApplicationDetail";
import {getScreenH, getScreenW} from "@/utils/common";
import {HomeFilled, ArrowRight }from '@element-plus/icons-vue'
import router from "@/router";

import {httpRequest} from "@/httpservic/http";
import store from "@/store";
import IndexContent from "@/components/admin/IndexContent";
// import testLayout from '@/components/testLayout'
export default {
    name: "IndexPage",
    components: {
        IndexContent,
        AdminMenu,
        HomeFilled,
        ApplicationDetail,
        ArrowRight

    },

    data(){

        APIMenuList().then(rep => {
            this.$data.menu_data_list = this.createTreeMenu( rep.data['data']);

        })


        // window.onload = MenuList
        const indexMenuIsCollapse = ref(false);
        const menuDrawerDisplay = ref(false);
        return {
            ApplicationDetail,
            indexMenuIsCollapse: indexMenuIsCollapse,
            menuDrawerDisplay: menuDrawerDisplay,
            smallWidth: 800,
            menu_data_list: [],
            menuDefaultActive: '1',
            clientH: getScreenH(),
            indexTitle: '权限管理系统',
            navTabs:{
                currentIndex: '1',
                data: [{
                    'title': '主页',
                    'index': '1',
                    'closeble': false,
                    'target_url': '/',
                    'menu_index': '1'
                }],
                index_key:{
                    '1': '主页',
                }
            },
            navBread:[
                {
                    route: {name: 'index'},
                    title: '主页'
                },
                {
                    route: {name: 'ApplicationList'},
                    title: '应用列表'
                }
            ],
            // menu_info: {
            //
            // },
            isSend: false  // 传递给子组件，是否需要发送emit
        }
    },

    mounted() {
        // 父组件加载完成后
        window.onunload = ()=>{

            let data = this.$data.navTabs.data;
            localStorage['navtabs_data'] = JSON.stringify(data);
            localStorage['last_loadtime'] = new Date().getTime();
            return "";
        }
        window.addEventListener('resize',  () => {
            this.drawerMenuCollapse();
        });
        window.onload = () =>{

            let current_time = new Date().getTime();
            let last_time = parseInt(localStorage['last_loadtime']);
            if(current_time - last_time >= 6000){
                localStorage['navtabs_data'] = '';
            }

            if (localStorage['navtabs_data']){
                this.$data.navTabs.data = JSON.parse(localStorage.getItem('navtabs_data'));
            }


            // this.setNavtabsByURL();
            this.drawerMenuCollapse();
        };



    },


    watch: {

      //   menuDefaultActive: function (newval, oldval){
      //     console.log(newval, oldval);
      // }
    },
    methods: {
        testClick(){
          this.$data.isSend=true;
        },
        logout(){
            httpRequest({
                url :'/api/admin/logout/'
            }).then(() => {
                store.commit('set_state', {'toLocal':true, 'isLogin':false, 'key': 'isLogin'});
                router.push({name: 'admin-login'});
            })
        },

        createTreeMenu(data){
            let root_tree = [];

            // let sub_tree = []
            data.forEach((item)=>{
                root_tree.push({
                    'resrc_uuid': item.resrc_uuid,
                    'menu_name': item.menu_name,
                    'target_url': item.target_url,
                    'childs': [],
                    'parent_uuid': item.parent_uuid,
                    'icon_tag': item.icon_tag
                });

            });

            return this.getTrees(root_tree)
        },

        getTrees(list, parentId='null', pKey='parent_uuid', cKey='resrc_uuid'){
            // 按照父级id分组
            // 每个分组包含一个节点list[]
            let items = {};
            for (let i = 0; i < list.length; i++){
                let key = list[i][pKey];
                if(!items[key]){
                    items[key] = []
                }
                items[key].push(list[i]);
            }
            // console.log(items)
            return this.formatTree(items, parentId, cKey);
        },

        formatTree(items, parentId, cKey, parentIdx=''){
            // 找出当前parentId的所有子节点
            let result = [];
            // 递归退出条件： 没有该parentId 分组
            if (!items[parentId]){
                return result;
            }

            for (let i = 1; i <= items[parentId].length; i++){

                let item = items[parentId][i-1]
                item['index'] = String(i);
                // el-menu 的index
                if (item.parent_uuid && item['index'] !== ''){
                    item['index'] = parentIdx + '-' + item['index'];
                }

                const children = this.formatTree(items, item[cKey], cKey, parentIdx=item['index']);
                if (children.length > 0){
                    item.childs = children;
                }

                // 记录菜单index,方便navtab调用
                // this.$data.menu_info[item['index']] = {'route': item.target_url, 'title': item.menu_name};
                result.push(item);
            }
            return result;
        },

        findMenuTreeItem(property, value, childs){
            /*
             menu_item = {'resrc_uuid': item.resrc_uuid,
                    'menu_name': item.menu_name,
                    'target_url': item.target_url,
                    'childs': [],
                    'parent_uuid': item.parent_uuid,
                    'icon_tag': item.icon_tag
                    'index': '1-1'
                     }
            * */
            var menu_item = undefined;
            // console.log(value);
            for(let item of childs){
                // console.log("findMenuTreeItem:", item);
                if (value === item[property]){
                    menu_item = item;
                    break
                }
                else if (item.childs.length > 0){
                    menu_item = this.findMenuTreeItem(property, value, item.childs)
                }
            }
            return menu_item;
        },

        menuCollapse(){
            /*
            * 根据屏幕大小，控制菜单按钮弹出的是drawer菜单还是左侧菜单
            * */
            if (getScreenW() < this.$data.smallWidth){
                this.$data.menuDrawerDisplay = !this.$data.menuDrawerDisplay;
            }
            else{
                this.$data.indexMenuIsCollapse = !this.$data.indexMenuIsCollapse;
            }
            // else{
            //
            //     this.$data.indexMenuIsCollapse = !this.$data.indexMenuIsCollapse;
            //
            // }
        },

        drawerMenuCollapse(){
            /*
            * 根据屏幕大小控制左侧菜单隐藏与显示
            * */

            try{
                if (getScreenW() > this.$data.smallWidth) {
                    this.$refs.index_menu.$el.style.display = "";
                    this.$data.indexMenuIsCollapse = false;
                }
                else{
                    this.$refs.index_menu.$el.style.display = "none";
                }
            }
                    // eslint-disable-next-line no-empty
            catch (e){

            }
        },
        navtabRemove(index){
            /*
            * 关闭navtab后，自动退到后一个tab, 并且选中当前菜单
            * 同时跳转路由
            *  */


            let del_data_index = 0;
            this.$data.navTabs.data.map((item, i) =>{
                if (item.index === index){
                    del_data_index = i;
                    this.$data.navTabs.data.splice(i, 1);
                }
            })
            // delete(this.$data.navTabs.index_key[index]);
            let next_item = this.$data.navTabs.data[del_data_index-1];
            router.push(next_item.target_url);

            // 菜单选中， tab选中
            this.$data.navTabs.currentIndex = next_item.index;
            this.$data.menuDefaultActive = next_item.menu_index;

        },

        navtabClick(pane){
            /*
            * 选中navtab后，对应菜单也要选中，切换到当前tab中
            * */
            // console.log(this.$data.navTabs.data);
            let menu_index = '';
            let menu_url = '';
            this.$data.navTabs.data.map((item) =>{
                if(item.index === pane.props.name){
                    menu_index = item.menu_index;
                    menu_url = item.target_url;
                }
            })

            this.$data.menuDefaultActive = menu_index;
            router.push(menu_url);
        },

        handerMenuSelect(index){
            /*
            菜单选中后，新增一个navtab
            * */
            // let menu_item = this.findMenuTreeItem('index', index, this.$data.menu_data_list);
            // this.addNavTab(menu_item.menu_name, menu_item.target_url, menu_item.index);

            // nav bread

            // 设置选中该菜单
            this.$data.menuDefaultActive = index;
        },

        addNavTab(tab_title, tab_url, menu_index){

            let same_tab = false;
            let new_index = '1';
            this.$data.navTabs.data.map((item)=>{
                // 根据menu_index 和 tab_title 判断是否存在同一个tab
                // 同一个菜单，tab_title是详情页的title
                // 多级菜单，但子菜单可能一样的情况下，就判断menu_index.
                if(item.title === tab_title && item.menu_index === menu_index){
                    same_tab = true;
                    new_index = item.index;
                }

            });

            if (!same_tab){
                new_index = (this.$data.navTabs.data.length+1).toString();
                this.$data.navTabs.data.push({
                    'title': tab_title,
                    'index': new_index,
                    'closeble':true,
                    'target_url': tab_url,
                    'menu_index': menu_index

                });

            }
            this.$data.navTabs.currentIndex = new_index;
        },

        handlerNavBread(row){
            this.$router.push(row.target_url);
        },

        handlerDetailTab(info){
            /*
            * info = {
            *   'route_name' : '',
            *   'route_params': {},
            *   'route_query':{},
            *   'tab_title': '',
            *   'tab_url': '',
            *
            *
            * }
            * */
            let parent_menu_item = this.findMenuTreeItem('target_url',
                    info.parent_menu_url, this.$data.menu_data_list
            )
            if(info.route_query){
                info.tab_url += '?'
                for(let key in info.route_query){
                    info.tab_url += key + '=' + info.route_query[key] + '&';
                }
                info.tab_url = info.tab_url.slice(0,info.tab_url.length-1);
            }

            this.addNavTab(info.tab_title, info.tab_url, parent_menu_item.index);
            this.$router.push({
                name: info.route_name,
                params:info.route_params,
                query: info.route_query
            });
        },
        handlerDetailTabTitle(title, url){
            this.$data.navTabs.data.map((item) => {
               if(!item.title && !item.target_url){
                   item.title = title;
                   item.target_url = url;
                   this.$data.menuDefaultActive = item.menu_index;
               }
            });
        },
        setNavtabsByURL(){
            // 加载之前打开的tabs.
            // // let router_info = router.currentRoute.value;
            let router_info = this.$route;

            // let not_tag = true;
            console.log('setNavtabsByURL:',this.$data.navTabs.data);
            this.$data.navTabs.data.map((item) =>{
                let route_path = decodeURIComponent(router_info.fullPath);
                console.log(route_path , item.target_url)
                console.log(route_path === item.target_url)
                if( route_path === item.target_url){
                    this.$data.navTabs.currentIndex = item.index;
                    this.$data.menuDefaultActive = item.menu_index;

                    // not_tag = false;
                }
            })



            this.$data.isSend = true;

        },


    },
    beforeRouteUpdate(to, from, next){
        // indexPage是主页，所有组件在这里加载，
        // 判断是否详情页from.meta.parent


        // console.log('Index:', to.meta.keepAlive );
        console.log('Index beforeRouteUpdate:', to);

        next();
    },
    beforeRouteEnter(to, from, next){
        console.log('Index beforeRouteEnter:', to);
        next();

    },
    beforeRouteLeave(to, from, next){
        console.log('Index beforeRouteLeave:', to);
        next();

    },
}


</script>

<style lang="less" scoped>
.full_width_height{
    width: 100%;
    height: 100%;
}



.top-el-container{
    height: 100%;
}
.common-layout .el-header,
.common-layout .el-footer {

    color: var(--el-text-color-primary);

    line-height: 60px;
}
.common-layout .el-footer {
    line-height: 60px;
}

.common-layout .el-aside {
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
}

.common-layout .el-main {
    /*background-color: #e9eef3;*/
    color: var(--el-text-color-primary);
    text-align: center;
    min-height: inherit;

}

.side-bg{
    background-color: #545c64;
}

.common-layout > .el-container {

}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.common-layout .el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

/* 修改element ui 样式 /deep/ + 类名*/
/deep/ .el-drawer__body{
    padding: 0;
}

.el-tabs__item /deep/ .is-active{
    background-color: #b9e4ff;
}

.el-button:hover {
    background: #e6e6e6;
}
.el-button:active{
    background: #e6e6e6;
}
.el-button:focus{
    background: #e6e6e6;
}
.common-layout .el-main{
    padding: 0 20px;
}

</style>
