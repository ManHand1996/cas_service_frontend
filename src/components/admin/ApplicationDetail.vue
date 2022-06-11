<template>


    <el-main>

        <el-row justify="start">
            <el-col :span="22" :offset="1" >
                <el-header style="text-align: left; padding-left: 0;">
                    {{tab_config.header_title}}
                </el-header>
                <el-tabs v-model="tab_config.tab_active"  @tab-change="tab_config.method.handlerTabClick">

                    <el-tab-pane label="应用配置" name="app_setting">
                        <el-form v-model="app_setting_config.data" label-position="top" :rules="[{required:true,trigger:'change', message:'填写应用名称'}]">
                            <el-form-item label="应用名称"  prop="app_name" >
                                <el-input v-model="app_setting_config.data.app_name" style="width: 400px"></el-input>
                            </el-form-item>
                            <el-form-item label="应用ID" >
                                <el-input disabled v-model="app_setting_config.data.app_id" style="width: 400px"></el-input>
                            </el-form-item>
                            <el-form-item label="应用密钥" disabled="">
                                <el-input disabled v-model="app_setting_config.data.app_secret"  style="width: 400px"></el-input>
                            </el-form-item>
                            <el-form-item label="备注" >
                                <el-input v-model="app_setting_config.data.remark"  style="width: 400px"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="app_setting_config.method.save_app">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="资源管理" name="app_resource">
                        <el-row>
                            <el-col :span="24">
                                    <el-tabs v-model="tab_config.tab_resource_active" type="border-card" @tab-change="tab_config.method.handlerResourceTabClick">
                                        <el-tab-pane name="resource_menu">
                                            <template v-slot:label>
                                                <el-icon><Menu /></el-icon>
                                                <span>菜单资源</span>
                                            </template>
                                            <div class="table-div">

                                                <el-table :data="tab_config.app_resource_config.resrc_menu_list" stripe class="app-detail-table" border>
                                                    <el-table-column type="index" width="50" >
                                                        <template v-slot:default="scope">
                                                            {{setTableIndex(scope.$index, tab_config.app_resource_config.menu_table_info.current_page, tab_config.app_resource_config.menu_table_info.limit)}}
                                                        </template>
                                                    </el-table-column>
                                                    <template v-for="(val,key,index) in tab_config.app_resource_config.menu_table_info.columns" :key="index">
                                                        <el-table-column :prop="key" :label="val" ></el-table-column>
                                                    </template>
                                                </el-table >
                                                <el-pagination
                                                        v-model:currentPage="tab_config.app_resource_config.menu_table_info.current_page"
                                                        v-model:page-size="tab_config.app_resource_config.menu_table_info.limit"
                                                        :page-sizes="[10, 50, 100, 150, 200]"
                                                        small
                                                        :disabled="false"
                                                        :background="true"
                                                        layout="prev, pager, next, sizes"
                                                        :page-count="tab_config.app_resource_config.menu_table_info.page_count"
                                                        @size-change="tab_config.app_resource_config.menu_table_info.method.handleSizeChange"
                                                        @current-change="tab_config.app_resource_config.menu_table_info.method.handleCurrentChange"
                                                />
                                            </div>

                                        </el-tab-pane>
                                        <el-tab-pane name="resource_element">
                                            <template v-slot:label>
                                                <el-icon><ElementPlus /></el-icon>
                                                <span>元素资源</span>
                                            </template>
                                            <div class="table-div">

                                                <el-table :data="tab_config.app_resource_config.resrc_element_list" stripe class="app-detail-table" border>
                                                    <el-table-column type="index" width="50" >
                                                        <template v-slot:default="scope">
                                                            {{setTableIndex(scope.$index, tab_config.app_resource_config.element_table_info.current_page, tab_config.app_resource_config.element_table_info.limit)}}
                                                        </template>
                                                    </el-table-column>
                                                    <template v-for="(val,key,index) in tab_config.app_resource_config.element_table_info.columns" :key="index">
                                                        <el-table-column :prop="key" :label="val" ></el-table-column>
                                                    </template>
                                                </el-table >
                                                <el-pagination
                                                        v-model:currentPage="tab_config.app_resource_config.element_table_info.current_page"
                                                        v-model:page-size="tab_config.app_resource_config.element_table_info.limit"
                                                        :page-sizes="[10, 50, 100, 150, 200]"
                                                        small
                                                        :disabled="false"
                                                        :background="true"
                                                        layout="prev, pager, next, sizes"
                                                        :page-count="tab_config.app_resource_config.element_table_info.page_count"
                                                        @size-change="tab_config.app_resource_config.element_table_info.method.handleSizeChange"
                                                        @current-change="tab_config.app_resource_config.element_table_info.method.handleCurrentChange"
                                                />
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane name="resource_file">
                                            <template v-slot:label>
                                                <el-icon><Files /></el-icon>
                                                <span>文件资源</span>
                                            </template>
                                            <div class="table-div">

                                                <el-table :data="tab_config.app_resource_config.resrc_file_list" stripe class="app-detail-table" border>
                                                    <el-table-column type="index" width="50" >
                                                        <template v-slot:default="scope">
                                                            {{setTableIndex(scope.$index, tab_config.app_resource_config.file_table_info.current_page, tab_config.app_resource_config.file_table_info.limit)}}
                                                        </template>
                                                    </el-table-column>
                                                    <template v-for="(val,key,index) in tab_config.app_resource_config.file_table_info.columns" :key="index">
                                                        <el-table-column :prop="key" :label="val" ></el-table-column>
                                                    </template>
                                                </el-table >
                                                <el-pagination
                                                        v-model:currentPage="tab_config.app_resource_config.file_table_info.current_page"
                                                        v-model:page-size="tab_config.app_resource_config.file_table_info.limit"
                                                        :page-sizes="[10, 50, 100, 150, 200]"
                                                        small
                                                        :disabled="false"
                                                        :background="true"
                                                        layout="prev, pager, next, sizes"
                                                        :page-count="tab_config.app_resource_config.file_table_info.page_count"
                                                        @size-change="tab_config.app_resource_config.file_table_info.method.handleSizeChange"
                                                        @current-change="tab_config.app_resource_config.file_table_info.method.handleCurrentChange"
                                                />
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane name="resource_data">
                                            <template v-slot:label>
                                                <el-icon><DataAnalysis /></el-icon>
                                                <span>数据资源</span>
                                            </template>
                                            <div class="table-div">

                                                <el-table :data="tab_config.app_resource_config.resrc_data_list" stripe class="app-detail-table" border>
                                                    <el-table-column type="index" width="50" >
                                                        <template v-slot:default="scope">
                                                            {{setTableIndex(scope.$index, tab_config.app_resource_config.data_table_info.current_page, tab_config.app_resource_config.data_table_info.limit)}}
                                                        </template>
                                                    </el-table-column>
                                                    <template v-for="(val,key,index) in tab_config.app_resource_config.data_table_info.columns" :key="index">
                                                        <el-table-column :prop="key" :label="val" ></el-table-column>
                                                    </template>
                                                </el-table >
                                                <el-pagination
                                                        v-model:currentPage="tab_config.app_resource_config.data_table_info.current_page"
                                                        v-model:page-size="tab_config.app_resource_config.data_table_info.limit"
                                                        :page-sizes="[10, 50, 100, 150, 200]"
                                                        small
                                                        :disabled="false"
                                                        :background="true"
                                                        layout="prev, pager, next, sizes"
                                                        :page-count="tab_config.app_resource_config.data_table_info.page_count"
                                                        @size-change="tab_config.app_resource_config.data_table_info.method.handleSizeChange"
                                                        @current-change="tab_config.app_resource_config.data_table_info.method.handleCurrentChange"
                                                />
                                            </div>
                                        </el-tab-pane>
                                    </el-tabs>

                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="权限管理" name="app_control">
                        <el-row>
                            <el-col :span="1" >
                                <el-button type="success" @click="tab_config.app_control_config.drawer.method.showDrawer" :style="{'marginBottom':'15px'}"> 添加权限</el-button>

                            </el-col>
                        </el-row>
                        <el-row justify="start">
                            <el-col :span="24" >
                                <div class="table-div">
                                    <el-tag class="table-tag"  size="large">{{app_name}} 用户组权限</el-tag>
                                    <el-table :data="tab_config.app_control_config.ctrl_group_list" stripe class="app-detail-table" border>
                                        <el-table-column type="index" width="50" >
                                            <template v-slot:default="scope">
                                                {{setTableIndex(scope.$index, tab_config.app_control_config.group_table_info.current_page, tab_config.app_control_config.group_table_info.limit)}}
                                            </template>
                                        </el-table-column>
                                        <template v-for="(val,key,index) in tab_config.app_control_config.group_table_info.columns" :key="index">
                                            <el-table-column :prop="key" :label="val" ></el-table-column>
                                        </template>
                                    </el-table >
                                    <el-pagination
                                            v-model:currentPage="tab_config.app_control_config.group_table_info.current_page"
                                            v-model:page-size="tab_config.app_control_config.group_table_info.limit"
                                            :page-sizes="[10, 50, 100, 150, 200]"
                                            small
                                            :disabled="false"
                                            :background="true"
                                            layout="prev, pager, next, sizes"
                                            :page-count="tab_config.app_control_config.group_table_info.page_count"
                                            @size-change="tab_config.app_control_config.group_table_info.method.handleSizeChange"
                                            @current-change="tab_config.app_control_config.group_table_info.method.handleCurrentChange"
                                    />
                                </div>

                                <div class="table-div">
                                    <el-tag class="table-tag"  size="large">{{app_name}} 用户权限</el-tag>
                                    <el-table :data="tab_config.app_control_config.ctrl_user_list" stripe class="app-detail-table" border >
                                        <el-table-column type="index" width="50"  >
                                            <template v-slot:default="scope">
                                                {{setTableIndex(scope.$index, tab_config.app_control_config.user_table_info.current_page, tab_config.app_control_config.user_table_info.limit)}}
                                            </template>
                                        </el-table-column>
                                        <template v-for="(val,key,index) in tab_config.app_control_config.user_table_info.columns" :key="index">
                                            <el-table-column :prop="key" :label="val"></el-table-column>
                                        </template>
                                    </el-table>
                                    <el-pagination
                                            v-model:currentPage="tab_config.app_control_config.user_table_info.current_page"
                                            v-model:page-size="tab_config.app_control_config.user_table_info.limit"
                                            :page-sizes="[10, 50, 100, 150, 200]"
                                            small
                                            :disabled="false"
                                            :background="true"
                                            layout="prev, pager, next, sizes"
                                            :page-count="tab_config.app_control_config.user_table_info.page_count"
                                            @size-change="tab_config.app_control_config.user_table_info.method.handleSizeChange"
                                            @current-change="tab_config.app_control_config.user_table_info.method.handleCurrentChange"
                                    />
                                </div>
                                <div class="table-div">
                                    <el-tag class="table-tag" size="large" >{{app_name}} 角色权限</el-tag>
                                    <el-table :data="tab_config.app_control_config.ctrl_role_list" stripe class="app-detail-table"  border>

                                        <el-table-column type="index" width="50" >
                                            <template v-slot:default="scope">
                                                {{setTableIndex(scope.$index, tab_config.app_control_config.role_table_info.current_page,
                                                    tab_config.app_control_config.role_table_info.limit)}}
                                            </template>
                                        </el-table-column>



                                        <el-table-column v-for="(val,key,index) in tab_config.app_control_config.role_table_info.columns" :key="index" :prop="key" :label="val" ></el-table-column>

                                    </el-table>
                                    <el-pagination
                                            v-model:currentPage="tab_config.app_control_config.role_table_info.current_page"
                                            v-model:page-size="tab_config.app_control_config.role_table_info.limit"
                                            :page-sizes="[10, 50, 100, 150, 200]"
                                            small
                                            :disabled="false"
                                            :background="true"
                                            layout="prev, pager, next, sizes"
                                            :page-count="tab_config.app_control_config.role_table_info.page_count"
                                            @size-change="tab_config.app_control_config.role_table_info.method.handleSizeChange"
                                            @current-change="tab_config.app_control_config.role_table_info.method.handleCurrentChange"

                                    />
                                </div>
                            </el-col>
                        </el-row>

                        <el-drawer direction="rtl" v-model="tab_config.app_control_config.drawer.isShow" title="权限添加"
                                   :modal="false" :size="tab_config.app_control_config.drawer.size"
                                   custom-class="ctrl-drawer"
                                   @close="tab_config.app_control_config.drawer.ctrl_card.form_ref.resetFields()"

                        >
                            <div id="ctrl_drawer" style="padding: 10px; text-align: left ;width: 100%;"  >
                                <el-space direction="horizontal"  fill wrap fillRatio="100" style="width: 100%;" :spacer="spacer" >
                                    <el-form
                                            :model="tab_config.app_control_config.drawer.ctrl_card.forms"
                                            :ref="tab_config.app_control_config.drawer.method.set_form_ref"

                                    >
                                        <el-container >
                                            <el-header >
                                                <el-tag effect="light" size="large">授权主体类型</el-tag>
                                            </el-header>
                                            <el-main >

                                                <el-form-item style="display: flex" prop="authorize_type_val"
                                                              :rules="tab_config.app_control_config.drawer.ctrl_card.form_ruls.authorize_type_val">
                                                    <label class="form_label"></label>
                                                    <el-radio-group v-model="tab_config.app_control_config.drawer.ctrl_card.forms.authorize_type_val"
                                                                    @change="tab_config.app_control_config.drawer.method.authorize_type_change">
                                                        <template v-for="(val,key,index) in tab_config.app_control_config.drawer.authorize_types" :key="index">
                                                            <el-radio :label="key">{{val}}</el-radio>
                                                        </template>
                                                    </el-radio-group>
                                                </el-form-item>

                                            </el-main>
                                        </el-container>
                                        <el-container>
                                            <el-header><el-tag  effect="light" size="large">授权对象</el-tag></el-header>
                                            <el-main>

                                                <el-form-item style="display: flex" :prop="['authorize_option_val']"
                                                              :rules="tab_config.app_control_config.drawer.ctrl_card.form_ruls.authorize_option_val">
                                                    <label class="form_label"></label>
                                                    <el-select
                                                            v-model="tab_config.app_control_config.drawer.ctrl_card.forms.authorize_option_val"
                                                            multiple
                                                            collapse-tags
                                                            collapse-tags-tooltip="collapse-tags-tooltip"
                                                            placeholder="选择授权对象"
                                                            style="width:80%"
                                                    >
                                                        <el-option
                                                                v-for="item in tab_config.app_control_config.drawer.authorize_options[tab_config.app_control_config.drawer.ctrl_card.forms.authorize_type_val]"
                                                                :key="item.code" :label="item.label"
                                                                :value="item.code"
                                                        >

                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>

                                            </el-main>
                                        </el-container>
                                        <el-container>
                                            <el-header>
                                                <el-tag effect="light" size="large">授权内容</el-tag>
                                            </el-header>
                                            <el-main>
                                                <el-row justify="center">
                                                    <el-col :span="22" ref="card_col">

                                                        <template v-for="(item,index) in tab_config.app_control_config.drawer.ctrl_card.forms.data_list" :key="index">
                                                            <el-card class="ctrl_card" body-style="text-align:left;margin-bottom:15px;">
                                                                <template v-slot:header>
                                                                    <div style="text-align: right; padding-top:5px">
                                                                        <el-button link @click="tab_config.app_control_config.drawer.method.remove_form(index)" >
                                                                            <el-icon><Close /></el-icon></el-button>

                                                                    </div>

                                                                </template>

                                                                <!--                                                     :rules="tab_config.app_control_config.drawer.method.set_form_rule(form)"-->

                                                                <el-form-item label="资源类型"
                                                                              :prop="['data_list', index, 'resrc_type']"
                                                                              :rules="tab_config.app_control_config.drawer.ctrl_card.form_ruls.resrc_type">
                                                                    <el-select v-model="item.resrc_type"
                                                                               placeholder="选择资源类型"
                                                                               @change="tab_config.app_control_config.drawer.method.resrc_type_change(index)"
                                                                    >
                                                                        <el-option
                                                                                v-for="type in tab_config.app_control_config.drawer.resourc_types"
                                                                                :key="type.label"
                                                                                :label="type.label"
                                                                                :value="type.label"
                                                                        >

                                                                        </el-option>

                                                                    </el-select>
                                                                </el-form-item>

                                                                <el-form-item label="资源"
                                                                              :prop="['data_list', index, 'resrc']"
                                                                              :rules="tab_config.app_control_config.drawer.ctrl_card.form_ruls.resrc">
                                                                    <el-select v-model="item.resrc"
                                                                               multiple
                                                                               collapse-tags
                                                                               collapse-tags-tooltip="collapse-tags-tooltip"
                                                                               placeholder="选择资源"
                                                                    >
                                                                        <el-option
                                                                                v-for="resrc in tab_config.app_control_config.drawer.resources"
                                                                                :key="resrc.code"
                                                                                :label="resrc.label"
                                                                                :value="resrc.code"
                                                                        >

                                                                        </el-option>

                                                                    </el-select>
                                                                </el-form-item>
                                                                <el-form-item label="操作"
                                                                              :prop="['data_list', index, 'oper']"
                                                                              :rules="tab_config.app_control_config.drawer.ctrl_card.form_ruls.oper">
                                                                    <el-select v-model="item.oper"
                                                                               multiple
                                                                               collapse-tags
                                                                               collapse-tags-tooltip="collapse-tags-tooltip"
                                                                               placeholder="选择操作"
                                                                    >
                                                                        <el-option v-for="oper in tab_config.app_control_config.drawer.operations"
                                                                                   :key="oper.code"
                                                                                   :label="oper.name"
                                                                                   :value="oper.code"
                                                                        >
                                                                        </el-option>
                                                                    </el-select>
                                                                </el-form-item>
                                                                <el-form-item label="是否启用"
                                                                              :prop="['data_list', index, 'is_on']"

                                                                              :rules="tab_config.app_control_config.drawer.ctrl_card.form_ruls.is_on">
                                                                    <el-radio-group v-model="item.is_on">
                                                                        <el-radio :label="true">是</el-radio>
                                                                        <el-radio :label="false">否</el-radio>
                                                                    </el-radio-group>
                                                                </el-form-item>
                                                                <el-form-item label="期限"
                                                                              :prop="['data_list', index, 'have_expire']"
                                                                              :rules="tab_config.app_control_config.drawer.ctrl_card.form_ruls.have_expire">
                                                                    <el-radio-group v-model="item.have_expire">
                                                                        <el-radio :label="true">有</el-radio>
                                                                        <el-radio :label="false">无</el-radio>
                                                                    </el-radio-group>
                                                                </el-form-item>
                                                                <el-form-item label="到期时间"
                                                                              :prop="['data_list', index, 'expire_time']"
                                                                              :rules="tab_config.app_control_config.drawer.ctrl_card.form_ruls.expire_time(index)"
                                                                >
                                                                    <el-date-picker v-model="item.expire_time"
                                                                                    size="small"
                                                                                    editable
                                                                                    type="datetime"
                                                                                    :default-value="tab_config.app_control_config.drawer.ctrl_card.defalut_datetime"
                                                                                    :shortcuts="tab_config.app_control_config.drawer.ctrl_card.datetime_shorcuts"
                                                                    >

                                                                    </el-date-picker>
                                                                </el-form-item>


                                                            </el-card>
                                                        </template>

                                                    </el-col>
                                                </el-row>
                                                <el-row justify="center">
                                                    <el-col :span="22">

                                                        <el-button text style="width: 100%" @click="tab_config.app_control_config.drawer.method.add_form">
                                                            <el-icon><CirclePlusFilled /></el-icon>添加授权内容
                                                        </el-button>
                                                    </el-col>
                                                </el-row>

                                            </el-main>
                                        </el-container>
                                    </el-form>
                                </el-space>
                            </div>
                            <template v-slot:footer>
                                <el-button size="small" @click="tab_config.app_control_config.drawer.isShow=false">取消</el-button>
                                <el-button type="primary" size="small" @click="tab_config.app_control_config.drawer.method.submit_forms">确定</el-button>

                            </template>
                        </el-drawer>
                    </el-tab-pane>
                </el-tabs>

            </el-col>

        </el-row>

    </el-main>




</template>

<script>
// import router from "@/router";
import {ref, onBeforeMount, watch, h} from "vue";
import {ElDivider , ElMessage} from "element-plus";

import {CirclePlusFilled,Close, Menu} from "@element-plus/icons-vue"
import {useRoute} from "vue-router"
import {httpRequest} from "@/httpservic/http";
import {getScreenW} from "@/utils/common";
import {validateUnicodeRequired} from "@/utils/formValidator";
export default {
    name: "ApplicationDetail",
    // props:['isSend'],
    components:[
        ElDivider,
        CirclePlusFilled,
        Close,
        Menu

    ],
    setup(){
        // defineEmits()
        // const {emit} = context;
        // const {isSend} = toRefs(props);
        const spacer = ref(h(ElDivider, {'style':'margin:0;'}));

        const tab_config = ref({
            header_title: '',
            tab_active: 'app_setting',
            tab_resource_active: 'resource_menu',
            method:{
                handlerTabClick:(tabName)=>{
                    // 第一次点击加载
                    if (tabName === 'app_control' && tab_config.value.app_control_config.ctrl_group_list.length <= 0){

                        getTableDataList(app_id.value, 'app_control_config', 'group_table_info', 'ctrl_group_list');


                    }
                    else if(tabName === 'app_resource' && tab_config.value.app_resource_config.resrc_menu_list.length <= 0){
                        getTableDataList(app_id.value, 'app_resource_config', 'menu_table_info', 'resrc_menu_list');

                    }
                    console.log(tabName);
                },
                handlerResourceTabClick(tabName){
                  if(tabName === 'resource_element' ){
                      getTableDataList(app_id.value, 'app_resource_config', 'element_table_info', 'resrc_element_list');

                  }
                  else if(tabName === 'resource_menu' ){
                      getTableDataList(app_id.value, 'app_resource_config', 'menu_table_info', 'resrc_menu_list');

                  }
                  else if(tabName === 'resource_file' ){
                      getTableDataList(app_id.value, 'app_resource_config', 'file_table_info', 'resrc_file_list');

                  }
                  else{
                      getTableDataList(app_id.value, 'app_resource_config', 'data_table_info', 'resrc_data_list');

                  }
                }
            },
            app_control_config: ref({
                drawer : {
                    isShow: false,
                    size: "40%",
                    authorize_types: {
                        'user':'用户',
                        'role':'角色',
                        'group':'用户组'
                    },
                    authorize_options: {
                        /*
                        * 数据格式    {'label':'', 'code':''}
                        */
                        'user': [],
                        'role': [],
                        'group': []
                    },
                    operations: [
                        // {
                        //     code:'',
                        //     label:''
                        // }
                    ],
                    resources: [
                        // {
                        //     code:'',
                        //     label:''
                        // }
                    ],
                    resourc_types: [

                    ],

                    ctrl_card: {
                        form_ref: null,
                        forms: {
                            data_list:[{
                                oper: '',
                                resrc: '',
                                resrc_type: '',
                                is_on: '',
                                have_expire: '',
                                expire_time: null,
                            }],
                            authorize_type_val: '',
                            authorize_option_val: '',
                        }
                        ,
                        form_ruls: {
                            oper: {message:'必须选择操作', required:true, trigger: 'blur'},
                            resrc: {message:'必选选择资源', required:true, trigger: 'blur'},
                            resrc_type: {message:'必选选择资源类型', required:true, trigger: 'blur'},
                            authorize_type_val: {message: '请选择授权主体类型', required:true, trigger: 'change'},
                            authorize_option_val: {message:'请选择授权对象', required:true, trigger: 'blur'},
                            is_on: {message:'必选选择资源', required:true, trigger: 'change', validator:validateUnicodeRequired},
                            have_expire: {message:'必须选择是否有期限', required:true,
                                trigger: 'change', validator:validateUnicodeRequired},
                            expire_time: (form_index) =>{
                                return {
                                    message: '选择了期限，必须设置过期时间',
                                    trigger: 'change',
                                    validator: (rule, value, callback)=>{
                                        if(tab_config.value.app_control_config.drawer.ctrl_card.forms.data_list[form_index].have_expire
                                                && value === null){
                                            return callback(new Error(rule.message));
                                        }
                                        else{
                                            return callback();
                                        }
                                    }}
                            },
                        },

                        defalut_datetime: new Date(),
                        datetime_shorcuts:[
                            {
                                text: '今天',
                                value: new Date(),
                            },
                            {
                                text: '一个月后',
                                value: () => {
                                    const date = new Date()
                                    date.setMonth(date.getMonth() + 1)
                                    return date
                                },
                            },
                        ],
                    },


                    method: {
                        submit_forms:  ()=>{

                            tab_config.value.app_control_config.drawer.ctrl_card.form_ref.validate((isvalid)=>{
                                if(isvalid){
                                    // 授权类型
                                    let ctrl_type = tab_config.value.app_control_config.drawer.ctrl_card.forms.authorize_type_val;
                                    // 授权对象
                                    let to_options = tab_config.value.app_control_config.drawer.ctrl_card.forms.authorize_option_val;

                                    let form_coentent = tab_config.value.app_control_config.drawer.ctrl_card.forms.data_list;
                                    let post_info = [];
                                    let post_info_main = [];

                                    form_coentent.map((item) => {
                                        item.oper.map((oper_item) => {
                                            item.resrc.map( (resrc_item) => {
                                                post_info.push({
                                                    has_expire: item.have_expire,
                                                    expire_time: item.expire_time,
                                                    is_on: item.is_on,
                                                    oper: oper_item,
                                                    resrc: resrc_item
                                                })
                                            })

                                        })
                                    });
                                    to_options.map((to_obj) => {
                                        post_info.map((info) => {
                                            info[ctrl_type] = to_obj
                                            post_info_main.push(info)
                                        })
                                    });

                                    console.log(post_info_main);
                                    httpRequest({
                                        url: '/api/admin/control/'+ ctrl_type +'/',
                                        method: 'post',
                                        data: {
                                            'info': post_info_main
                                        }
                                    }).then(rep => {
                                        console.log(rep);
                                        if (rep.status === 200){
                                            ElMessage({
                                                type: 'success',
                                                message: '权限添加成功',
                                                duration: 2000,
                                            });
                                        }
                                        tab_config.value.app_control_config.value.drawer.isShow = false;


                                        // console.log(rep.data['data']);
                                    });
                                    getTableDataList(app_id.value, 'app_control_config', 'role_table_info', 'ctrl_role_list');
                                    getTableDataList(app_id.value, 'app_control_config', 'group_table_info', 'ctrl_group_list');
                                    getTableDataList(app_id.value, 'app_control_config', 'user_table_info', 'ctrl_user_list');
                                }

                            })

                        },
                        set_form_ref: (form_ref)=>{

                            tab_config.value.app_control_config.drawer.ctrl_card.form_ref = form_ref;
                        },

                        add_form: ()=>{
                            // let col = h(ElCard, {}, 'asfasfas');
                            //
                            // let sub_comp = vue

                            tab_config.value.app_control_config.drawer.ctrl_card.forms.data_list.push(
                                    {
                                        oper: '',
                                        resrc: '',
                                        is_on: '',
                                        have_expire: '',
                                        expire_time: '',
                                    }
                            );
                        },
                        remove_form: (index) =>{
                            if(tab_config.value.app_control_config.drawer.ctrl_card.forms.data_list.length > 1){
                                tab_config.value.app_control_config.drawer.ctrl_card.forms.data_list.splice(index, 1);

                            }
                        },

                        authorize_type_change: (val)=>{
                            // 根据类型加载 select option
                            // 清楚已选

                            tab_config.value.app_control_config.drawer.ctrl_card.forms.authorize_option_val = '';
                            let url = '/api/admin/' + val + '/list_option/';
                            httpRequest({
                                url: url,
                                method: 'get',

                            }).then(rep => {
                                if(tab_config.value.app_control_config.drawer.authorize_options[val].length === 0){
                                    tab_config.value.app_control_config.drawer.authorize_options[val]= rep.data['data'];
                                }

                            })
                        },
                        resrc_type_change: (index) =>{
                            tab_config.value.app_control_config.drawer.ctrl_card.forms.data_list[index].resrc = '';
                            let type = tab_config.value.app_control_config.drawer.ctrl_card.forms.data_list[index].resrc_type;
                            httpRequest({
                                url: '/api/admin/resources/' + type + '/list_option/',
                                method: 'get',
                                params: {
                                    app_id: app_id.value
                                }
                            }).then(rep => {
                                tab_config.value.app_control_config.drawer.resources = rep.data['data'];
                            })
                        },
                        showDrawer: (event) =>{

                            if(event.type === 'click'){
                                // 添加权限按钮 点击
                                tab_config.value.app_control_config.drawer.isShow = true;
                                // 加载drawer里options的数据， 判断有没有数据没有则加载
                                if(!tab_config.value.app_control_config.drawer.operations.length > 0){
                                    httpRequest({
                                        url: '/api/admin/operation/list_option/',
                                        method: 'get'
                                    }).then(rep => {
                                        tab_config.value.app_control_config.drawer.operations = rep.data['data'];
                                    })
                                }
                                if(!tab_config.value.app_control_config.drawer.resourc_types.length > 0){
                                    httpRequest({
                                        url: '/api/admin/resource_type/list_option/',
                                        method: 'get'
                                    }).then(rep => {
                                        tab_config.value.app_control_config.drawer.resourc_types = rep.data['data'];
                                    })
                                }

                            }
                            let win_width = getScreenW();

                            if (win_width > 1500){
                                tab_config.value.app_control_config.drawer.size =  '40%';
                            }
                            else if (win_width > 1200){
                                tab_config.value.app_control_config.drawer.size = '60%';
                            }
                            else{
                                tab_config.value.app_control_config.drawer.size = '80%';
                            }
                        }

                    }

                },
                role_table_info: ref( {
                    limit: 10,
                    offset: 0,
                    page_count:0,
                    current_page: 0,
                    page_link:'/api/admin/control/role/',
                    columns:{
                        'app_name':'应用',
                        'role_name':'角色',
                        'ctrl_name':'权限',
                        'ctrl_code':'权限代码',
                        'has_expire':'是否有期限',
                        'expire_time':'到期时间',
                        'is_on':'启用',
                        'remark':'备注',
                    },
                    method: {
                        handleSizeChange: (page_size) =>{

                            // 更改每页显示数量
                            console.log('handleSizeChange',page_size);

                            tab_config.value.app_control_config.role_table_info.limit = page_size;
                            tab_config.value.app_control_config.role_table_info.offset = 0;

                            // fetchData
                            getTableDataList(app_id.value, 'app_control_config', 'role_table_info', 'ctrl_role_list');
                            // app_control_config.value.role_table_info.page_count = 2;
                        },
                        handleCurrentChange : (curren_page) => {
                            //
                            console.log('handleCurrentChange',curren_page);
                            tab_config.value.app_control_config.role_table_info.offset = (curren_page -1 ) * tab_config.value.app_control_config.role_table_info.limit;
                            getTableDataList(app_id.value, 'app_control_config', 'role_table_info', 'ctrl_role_list');


                        }
                    }
                }),
                user_table_info: ref({
                    limit: 10,
                    offset: 0,
                    page_count:0,
                    current_page: 0,
                    page_link:'/api/admin/control/user/',
                    columns:{
                        'app_name':'应用',
                        'user_name':'用户',
                        'ctrl_name':'权限',
                        'ctrl_code':'权限代码',
                        'has_expire':'是否有期限',
                        'expire_time':'到期时间',
                        'is_on':'启用',
                        'remark':'备注',
                    },
                    method: {
                        handleSizeChange : (page_size) =>{

                            tab_config.value.app_control_config.user_table_info.limit = page_size;
                            tab_config.value.app_control_config.user_table_info.offset = 0;

                            getTableDataList(app_id.value, 'app_control_config', 'user_table_info', 'ctrl_user_list');


                            // user_table_info.value.page_count = 2;
                        },
                        handleCurrentChange : (curren_page) => {
                            //
                            tab_config.value.app_control_config.user_table_info.offset = (curren_page-1) * tab_config.value.app_control_config.user_table_info.limit;
                            getTableDataList(app_id.value, 'app_control_config', 'user_table_info', 'ctrl_user_list');


                        }
                    }
                }),
                group_table_info:ref({
                    limit: 10,
                    offset: 0,
                    page_count:0,
                    current_page: 0,
                    page_link:'/api/admin/control/group/',
                    columns:
                            {
                                'app_name':'应用',
                                'group_name':'用户组',
                                'ctrl_name':'权限',
                                'ctrl_code':'权限代码',
                                'has_expire':'是否有期限',
                                'expire_time':'到期时间',
                                'is_on':'启用',
                                'remark':'备注',
                            },
                    method: {
                        handleSizeChange : (page_size) =>{

                            tab_config.value.app_control_config.group_table_info.limit = page_size;
                            tab_config.value.app_control_config.group_table_info.offset = 0;
                            getTableDataList(app_id.value, 'app_control_config', 'group_table_info', 'ctrl_group_list');


                            // app_control_config.value.group_table_info.page_count = 2;

                        },
                        handleCurrentChange : (curren_page) => {
                            //
                            tab_config.value.app_control_config.group_table_info.offset = (curren_page - 1) * tab_config.value.app_control_config.group_table_info.limit;
                            getTableDataList(app_id.value, 'app_control_config', 'group_table_info', 'ctrl_group_list');

                        }

                    }

                }),
                ctrl_user_list: ref([]),
                ctrl_role_list: ref([]),
                ctrl_group_list: ref([]),

            }),
            app_resource_config: ref({
                menu_table_info: ref({
                    limit: 10,
                    offset: 0,
                    page_count:0,
                    current_page: 0,
                    page_link:'/api/admin/resources/menu/',
                    columns:
                            {
                                'resrc_name':'资源名称',
                                'menu_name':'菜单名',
                                'target_url':'菜单路径',
                                'parent':'父级菜单',
                                'icon_tag':'菜单icon',
                                'is_on':'启用',
                                'remark':'备注',
                            },
                    method: {
                        handleSizeChange : (page_size) =>{

                            tab_config.value.app_resource_config.menu_table_info.limit = page_size;
                            tab_config.value.app_resource_config.menu_table_info.offset = 0;
                            getTableDataList(app_id.value, 'app_resource_config', 'menu_table_info', 'resrc_menu_list');

                            // app_control_config.value.group_table_info.page_count = 2;

                        },
                        handleCurrentChange : (curren_page) => {
                            //
                            tab_config.value.app_resource_config.menu_table_info.offset = (curren_page - 1) * tab_config.value.app_resource_config.menu_table_info.limit;
                            getTableDataList(app_id.value, 'app_resource_config', 'menu_table_info', 'resrc_menu_list');

                        }

                    }

                }),
                resrc_menu_list: ref([]),
                data_table_info: ref({
                    limit: 10,
                    offset: 0,
                    page_count:0,
                    current_page: 0,
                    page_link:'/api/admin/resources/data/',
                    columns:
                            {
                                'resrc_name':'资源名称',
                                'data_name':'数据名称',
                                'api_url':'api接口',
                                'remark':'备注',
                            },
                    method: {
                        handleSizeChange : (page_size) =>{

                            tab_config.value.app_resource_config.data_table_info.limit = page_size;
                            tab_config.value.app_resource_config.data_table_info.offset = 0;
                            getTableDataList(app_id.value, 'app_resource_config', 'data_table_info', 'resrc_data_list');


                            // app_control_config.value.group_table_info.page_count = 2;

                        },
                        handleCurrentChange : (curren_page) => {
                            //
                            tab_config.value.app_resource_config.menu_table_info.offset = (curren_page - 1) * tab_config.value.app_resource_config.menu_table_info.limit;
                            getTableDataList(app_id.value, 'app_resource_config', 'data_table_info', 'resrc_data_list');

                        }

                    }

                }),
                resrc_data_list: ref([]),
                file_table_info: ref({
                    limit: 10,
                    offset: 0,
                    page_count:0,
                    current_page: 0,
                    page_link:'/api/admin/resources/file/',
                    columns:
                            {
                                'resrc_name':'资源名称',
                                'file_name':'文件名称',
                                'file_path':'文件路径',
                                'remark':'备注',
                            },
                    method: {
                        handleSizeChange : (page_size) =>{

                            tab_config.value.app_resource_config.file_table_info.limit = page_size;
                            tab_config.value.app_resource_config.file_table_info.offset = 0;
                            getTableDataList(app_id.value, 'app_resource_config', 'file_table_info', 'resrc_file_list');


                            // app_control_config.value.group_table_info.page_count = 2;

                        },
                        handleCurrentChange : (curren_page) => {
                            //
                            tab_config.value.app_resource_config.file_table_info.offset = (curren_page - 1) * tab_config.value.app_resource_config.file_table_info.limit;
                            getTableDataList(app_id.value, 'app_resource_config', 'file_table_info', 'resrc_file_list');

                        }

                    }

                }),
                resrc_file_list: ref([]),
                element_table_info: ref({
                    limit: 10,
                    offset: 0,
                    page_count:0,
                    current_page: 0,
                    page_link:'/api/admin/resources/element/',
                    columns:
                            {
                                'resrc_name':'资源名称',
                                'ele_name':'元素名称',
                                'target_url':'菜单路径',
                                'ele_id': '元素ID',
                                'ele_class': '样式类',
                                'ele_tag': '元素前端标签',
                                'remark':'备注',
                            },
                    method: {
                        handleSizeChange : (page_size) =>{

                            tab_config.value.app_resource_config.element_table_info.limit = page_size;
                            tab_config.value.app_resource_config.element_table_info.offset = 0;
                            getTableDataList(app_id.value, 'app_resource_config', 'element_table_info', 'resrc_element_list');


                            // app_control_config.value.group_table_info.page_count = 2;

                        },
                        handleCurrentChange : (curren_page) => {
                            //
                            tab_config.value.app_resource_config.element_table_info.offset = (curren_page - 1) * tab_config.value.app_resource_config.element_table_info.limit;
                            getTableDataList(app_id.value, 'app_resource_config', 'element_table_info', 'resrc_element_list');

                        }

                    }

                }),
                resrc_element_list: ref([]),
            })
        });
        // const isSendEmit = ref(isSend);
        // const isSendHandler = inject("isSendHandler");
        const route = useRoute();

        const app_id = ref('');
        const app_name = ref('');
        app_id.value = route.params.app_id;
        app_name.value = route.query.app_name;

        // config



        // data..


       
        const app_setting_config = ref({
             data:{
                 app_id: '',
                app_name: '',
                app_secret: '',
                remark: '',
             },
            method:{
             save_app: ()=>{

             }
            }
        })

        // eslint-disable-next-line no-unused-vars
        const getTableDataList = (appId, config_name, table_name, list_name) =>{

            httpRequest({
                url: tab_config.value[config_name][table_name].page_link,
                params: {
                    'app_id': appId,
                    'limit': tab_config.value[config_name][table_name].limit,
                    'offset': tab_config.value[config_name][table_name].offset,
                },
                mehod: 'get'
            }).then(rep => {
                tab_config.value[config_name][list_name] = rep.data['data']['results'];
                tab_config.value[config_name][table_name].page_count = rep.data['data']['page_count'];
                tab_config.value[config_name][table_name].current_page = rep.data['data']['current_page'];
            })

        }
        const setTableIndex = (rowIndex, page, page_size) => {
            return (page - 1) * page_size + (rowIndex + 1);
        }


        const fetchAppSetting = (appId) => {
            httpRequest({
                url: '/api/admin/application/' + appId +'/',
                method: 'get'
            }).then(rep => {
                app_setting_config.value.data = rep.data['data'];
                tab_config.value.header_title = rep.data['data']['app_name'];

            });
        }

        onBeforeMount(()=>{
            if(tab_config.value.tab_active === 'app_setting'){
                fetchAppSetting(app_id.value);
            }
            // if(app_id.value){
            //     // 资源， 权限数据
            //     getTableDataList(app_id.value, 'app_control_config', 'role_table_info', 'ctrl_role_list');
            //     getTableDataList(app_id.value, 'app_control_config', 'group_table_info', 'ctrl_group_list');
            //     getTableDataList(app_id.value, 'app_control_config', 'user_table_info', 'ctrl_user_list');
            //
            //  getTableDataList(app_id.value, 'app_resource_config', 'menu_table_info', 'resrc_menu_list');
            //     // getTableDataList(app_id.value, 'app_resource_config', 'data_table_info', 'resrc_data_list');
            //     // getTableDataList(app_id.value, 'app_resource_config', 'file_table_info', 'resrc_file_list');
            //     // getTableDataList(app_id.value, 'app_resource_config', 'element_table_info', 'resrc_element_list');
            // }
            window.addEventListener('resize', (event)=>{
                tab_config.value.app_control_config.drawer.method.showDrawer(event);
            })
        });


        watch(()=>route.params.app_id, (new_app_id)=>{
            // console.log('watch....')
            if(new_app_id ){
                app_id.value = new_app_id;

            }
        });
        // 取消navtab
        // watch( isSend, ()=>{
        //     emit('handlerDetailTitle', route.query.title, route.fullPath);
        //
        // })

        return {

            app_name,
            // app_control_config.drawer,
            tab_config,
            app_setting_config,
            spacer,

            setTableIndex


        }
    //
    //     return {app_id}
    },


}
</script>

<style scoped>
.app-detail-table{
    width: 100%;

}
.table-tag{
    float: left;
    font-size: 14px;
}
.table-div{
    padding-bottom: 50px;
}

.el-container /deep/ .el-header{
    height: 25px;
    padding: 0;
}
.el-container /deep/ .el-main{

    padding: 20px 10px 0 10px;
    margin-top:5px;
}
.ctrl_card {
    width: 100%;
    background-color: #f0f4ff;
    margin-bottom: 10px;
}
.ctrl_card /deep/ .el-select{
    width: 100%;
}
.ctrl_card /deep/ .el-card__header{
    border: none;
    padding: 0;
}
.form_label:before{
    content: "*";
    color: var(--el-color-danger);
    margin-right: 4px;

}
</style>