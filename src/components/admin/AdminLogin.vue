<template>

    <el-row class="row-center">]
        <foo_comp></foo_comp>
        <el-col :xs="{span:22,offset:1}" :sm="{span:12, offset:6}" :md="{span:10, offset:7 }" :lg="{span:6, offset:9}" >

            <el-form
                    :model="AdminloginForm"
                    :rules="rules"
                    ref="AdminloginForm"
                    label-width="100px"
                    class="AdminloginForm box-shadow"
            >
                <p>管理后台登陆</p>
                <hr/>
<!--                <el-form-item >-->
<!--                    <el-input name="csrfmiddlewaretoken"-->
<!--                              type="hidden"-->
<!--                              v-model="AdminloginForm.csrf"-->
<!--                              autocomplete="off"-->
<!--                    ></el-input>-->
<!--                </el-form-item>-->

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="AdminloginForm.email" type="email">

                    </el-input>

                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input
                            type="password"
                            v-model="AdminloginForm.pass"
                            autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('AdminloginForm')">登陆</el-button>
<!--                    <el-button @click="testClick()"></el-button>-->
                    <el-button @click="toregsiter()">忘记密码</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

</template>

<script>
import {adminLoginWithEmail, getCSRFToken} from '@/interfaces/user'
import router from "@/router";
import foo_comp from "@/components/foo_comp";
import {validatePass, checkEmail} from "@/utils/formValidator"
import store from "@/store";
import {setLocalStorege} from "@/utils/common";

// import {getAESKey, encryptAES, decryptAES,} from "@/interfaces/encry";

export default {
    name: 'LoginPage',
    components: {foo_comp},
    data() {


        window.onload = this.setCSRFToken;


        return {
            AdminloginForm: {
                pass: '',
                email: '',
                csrf: ''
            },
            rules: {
                pass: [{ validator: validatePass, trigger: 'blur' }],
                email:[{validator: checkEmail, trigger: 'change'}]
            },
        }
    },
    methods: {
        setCSRFToken(){
            getCSRFToken().then(rep => {

            this.AdminloginForm.csrf = rep.data;
            // this.cookie.set('csrf_token', rep);
            // clean cookie
            // this.$cookies.remove('csrftoken');
        })},

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 提交数据到API.login
                    // 跳转到首页
                    setLocalStorege('isLogin', true);
                    adminLoginWithEmail(this.AdminloginForm.email, this.AdminloginForm.pass).then(rep => {
                        if (rep.data.errcode !== 0 ){

                            this.$alert(rep.data.errmsg, '提示',{
                                confirmButtonText: '确认',
                                center: true,

                            });
                            this.setCSRFToken();

                        }
                        else{
                            // json token
                            store.commit('set_state', {'toLocal':true, 'isLogin':true, 'key': 'isLogin'});
                            router.push({name:'index'});
                        }


                    })



                } else {

                    this.$alert('请填写邮箱和密码！', '提示',{
                        confirmButtonText: '确认',
                        center: true,

                    })
                    return false
                }
            })
        },
        toregsiter(){
            router.push({name:'register'});
        }

    },
}


</script>
<style>

.row-center{
    height: 100%;
    width: 100%;
    align-items: center;
}
hr{
    background-color: lightblue;
    border: none;
    height: 1px;
    margin-bottom: 10px;
}
.AdminloginForm{
    padding:5px 20px 20px 20px;

    box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
    border-radius: 20px;
}

</style>