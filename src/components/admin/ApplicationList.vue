<template>

    <div  v-if="$route.name === 'ApplicationList'" >
        <el-row justify="start">
            <el-col :span="22" :offset="1">
                <el-header style="text-align: left; padding-left:0">应用管理</el-header>
                <el-container style="margin-bottom: 10px;">
                    <el-row>
                        <el-col>
                            <el-button type="danger" size="small" @click="openAppDialog({}, 'add')">
                                <i class="bi-plus-circle" style="color:#e6e6e6; font-size: 1rem;"></i>添加
                            </el-button>
                        </el-col>
                    </el-row>
                </el-container>
                <el-table :data="data_list" stripe style="width: 100%" border >
                    <el-table-column type="index" width="50" />
                    <template  v-for="item in data_headers" :key="item.prop">

                        <el-table-column v-if="item.prop === 'target_url'" :label="item.label">
                            <template v-slot:default="scope" >
                                <el-space wrap>
                                    <el-button link @click="toAppDetail(scope.row)" size="small" type="success">详情</el-button>

                                    <el-popconfirm
                                            confirm-button-text="确认"
                                            cancel-button-text="取消"
                                            title="是否删除该APP信息？"
                                            @confirm="delApp(scope.row)"

                                    >
                                        <template #reference>
                                            <el-button link size="small" type="danger" >删除</el-button>
                                        </template>
                                    </el-popconfirm>
                                    <el-button link @click="openAppDialog(scope.row, 'update')" size="small" type="primary" >编辑</el-button>

                                </el-space>
                                <!--                    <a href={{scope.row.target_url}}></a>-->
                            </template>
                        </el-table-column>
                        <el-table-column v-else :prop="item.prop"  :label="item.label"></el-table-column>
                    </template>


                </el-table>
                <el-dialog  v-model="dialogInfo.dialogOpen" :title="dialogInfo.title" draggable :width="dialogInfo.width" center>
                    <el-form ref="appDetailForm" :model="dialogInfo.app_detail_form" label-position="right" label-width="100px" :rules="dialogInfo.rules">
                        <template v-for="item in data_headers" :key="item.prop" >
                            <el-form-item v-if="item.prop !== 'target_url'" :label="item.label" :prop=item.prop>
                                <el-input v-if="item.prop === 'remark' || item.prop === 'app_name'" v-model="dialogInfo.app_detail_form[item.prop]"></el-input>
                                <el-input v-else v-model="dialogInfo.app_detail_form[item.prop]" disabled></el-input>
                            </el-form-item>
                        </template>
                    </el-form>
                    <template #footer>
                        <el-button type="primary" @click="dialogSubmit(dialogInfo.dialogType)">提交</el-button>
                        <el-button @click="dialogInfo.dialogOpen=false">取消</el-button>
                    </template>
                </el-dialog>


            </el-col>
        </el-row>

    </div>

    <router-view v-else v-slot="{Component}">

        <component :is="Component" :key="$route.name"/>
<!--        <keep-alive>-->
<!--            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>-->
<!--        </keep-alive>-->
<!--        <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>-->
    </router-view>

</template>

<script>


import {httpRequest} from "@/httpservic/http";
import {getScreenW} from "@/utils/common";
import { ElMessage } from 'element-plus'
import {validateUnicodeRequired} from "@/utils/formValidator";
import {gen_app_key} from "@/interfaces/data"
// import resolve from "@babel/core"
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "ApplicationList",
    data(){


        return {
            data_list: [],
            data_headers: [],
            dialogInfo: {
                dialogOpen: false,
                title: '',
                width: '50%',
                dialogType: 'update',
                app_detail_form: {
                    'app_name': '',
                    'app_id': '',
                    'app_secret': '',
                    'remark': '',
                    'target_url': ''
                },
                rules:{
                    app_name:[{
                        validator:validateUnicodeRequired, trigger:'blur'
                    }],
                }
            }

        }
    },
    beforeMount() {
        // 避免重复加载数据。 判断当前路由
        if(this.$route.name === 'ApplicationList'){
            this.fetchApplicationList();
        }
    },

    methods:{
        toAppDetail(row){
            // navtabs..
            // this.$emit('handlerDetail', {
            //     route_name: 'ApplicationDetail',
            //     route_params: {app_id: row.app_id},
            //     route_query:{
            //         'app_name': row.app_name,
            //         'title': '权限详情：' + row.app_name
            //     },
            //     tab_url: row.target_url,
            //     tab_title: '权限详情：' + row.app_name,
            //     parent_menu_url: this.$route.fullPath  // 详情页父级菜单url使用绝对路径（数据库存的是绝对路径）
            //
            // });

            // nav bread
            // this.$emit('handlerNavBread', {
            //     'target_url':row.target_url
            // })
            this.$router.push({name: 'ApplicationDetail', params: {app_id: row.app_id}, query: {'app_name': row.app_name}});
        },
        delApp(app_detail){

            httpRequest({
                url: '/api/admin/application/' + app_detail.app_id + '/',
                method: 'delete'
            }).then(rep => {
                ElMessage({
                    message: rep.data['data'],
                    type: 'success',
                    duration: 2000
                });
                let index = this.$data.data_list.indexOf(app_detail)
                this.$data.data_list.splice(index,1);
            }).catch(error => {
                ElMessage({
                    message: error.response.data['errmsg'],
                    type: 'error',
                    duration: 2000
                })
            })
        },
        openAppDialog(app_detail, type){
            console.log(app_detail);
            let w = getScreenW();
            this.$data.dialogInfo.dialogOpen = true;
            this.$data.dialogInfo.dialogType = type;

            if (type === 'add'){

                this.$data.dialogInfo.title= '新增应用';
                let app_data = gen_app_key();
                app_data.then(rep => {
                    this.$data.dialogInfo.app_detail_form.app_id = rep.data.app_id;
                    this.$data.dialogInfo.app_detail_form.app_secret = rep.data.app_secret;
                })


            }
            else{
                this.$data.dialogInfo.title= '应用' + app_detail.app_name + '详情';
                this.$data.dialogInfo.app_detail_form = app_detail;
            }
            if (w < 800){
                this.$data.dialogInfo.width = "80%";
            }
            else if( w > 1200) {
                this.$data.dialogInfo.width = "30%";
            }
            else {
                this.$data.dialogInfo.width = "60%";
            }

        },

        dialogSubmit(submit_type){

            this.$refs.appDetailForm.validate((valid) => {
                if (valid){
                    // 获取vue3中element ui 3.x 的表单里的数据
                    // 使用表单中:model的对象获取，修改了也能获取， 因为form-item里面的数据是v-model(双向绑定)绑定的

                    if (submit_type === 'update'){
                        httpRequest({
                            url: '/api/admin/application/' + this.$data.dialogInfo.app_detail_form['app_id'] +'/',
                            method: 'put',
                            data: this.$data.dialogInfo.app_detail_form

                        }).then(() => {
                            this.$data.dialogInfo.dialogOpen = false;
                            ElMessage({
                                type:'success',
                                message: '更新成功',
                                duration: 2000,
                            });

                        }).catch(error =>{
                            ElMessage({
                                type:'error',
                                message: error.response.data['errmsg'],
                                duration: 2000,
                            })
                        })
                    }
                    else{
                        httpRequest({
                            url: '/api/admin/application/',
                            method: 'post',
                            data: this.$data.dialogInfo.app_detail_form

                        }).then((rep) => {
                            this.$data.dialogInfo.dialogOpen = false;
                            ElMessage({
                                type:'success',
                                message: '新增成功',
                                duration: 2000,
                            });
                            this.$data.data_list.push(rep.data.data)

                        }).catch(error =>{
                            ElMessage({
                                type:'error',
                                message: error.response.data['errmsg'],
                                duration: 2000,
                            })
                        })
                    }



                }
                else{
                    console.log('invalid')
                }
            })
        },
        fetchApplicationList(query_params={limit:10, offset:0}){
            let url = '/api/admin/application/';
            return httpRequest({
                params:query_params,
                method:'get',
                url:url
            }).then(rep => {
                let labels = {
                    'target_url' : '详情',
                    "app_name": "应用名称",
                    "app_id": "应用ID",
                    "app_secret": "应用密钥",
                    "remark": "备注"

                }
                this.$data.data_list = rep.data['data']['results'];


                if (this.$data.data_list .length > 0){
                    let row = this.$data.data_list[0];
                    for(let key in row){
                        this.$data.data_headers.push({'prop':key, 'label':labels[key]});
                    }
                }

            })

        }

    },
    activated() {
        console.log('foo activated');

    },
    deactivated() {
        console.log('foo deactivated')
    }

    // beforeRouteLeave(to, from, next){
    //     // from.meta.keepAlive = false;
    //     // to.meta.keepAlive = false;
    //     // next();
    //     // if(from.name === to.meta.parent){
    //     //     to.meta.keepAlive = false;
    //     // }
    //     // from.meta.keepAlive = true;
    //     console.log('AppList beforeRouteLeave:', to);
    //
    //     next();
    // },
    // beforeRouteEnter(to, from, next){
    //     console.log('AppList beforeRouteEnter:', to);
    //     next();
    //
    // },
    // beforeRouteUpdate(to, from, next){
    //     console.log('AppList beforeRouteUpdate:', to);
    //     next();
    //
    // },
}
</script>

<style scoped>
.el-input /deep/ .el-button{ text-align: center; }
</style>