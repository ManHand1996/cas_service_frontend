<template>
    <el-row class="row-center">
        <el-col :xs="{span:22,offset:1}" :sm="{span:12, offset:6}" :md="{span:10, offset:7 }" :lg="{span:6, offset:9}" >

            <el-form
                    :model="loginForm"
                    :rules="rules"
                    ref="loginForm"
                    label-width="100px"
                    class="loginForm box-shadow"
            >
                <p>登陆</p>
                <hr/>
                <el-form-item >
                    <el-input name="csrfmiddlewaretoken"
                            type="hidden"
                            v-model="loginForm.csrf"
                            autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email" type="email">

                    </el-input>

                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input
                            type="password"
                            v-model="loginForm.pass"
                            autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
                    <el-button @click="testClick()"></el-button>
                    <el-button @click="toregsiter()">注册</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

</template>

<script>
import {userLoginWithEmail, getCSRFToken} from '@/interfaces/user'
import { sorted} from "@/interfaces/encry";
import router from "@/router";


// import {getAESKey, encryptAES, decryptAES,} from "@/interfaces/encry";

export default {
    name: 'LoginPage',
    data() {
        window.onload = () =>{getCSRFToken().then(rep => {
            console.log(rep)
            this.loginForm.csrf = rep;
            // this.cookie.set('csrf_token', rep);
        })}

        let checkEmail = (rule, value, callback) => {
            // 正则表达式验证
            const reg =  /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            if (value === '' || value === undefined || value === null) {
                return callback(new Error('登陆邮箱不能为空'));
            } else {
                if (!reg.test(value)) {
                    return callback(new Error('请输入正确的邮箱地址'));
                } else {
                    return callback();
                }
            }
        }

        let validatePass = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请输入密码'))
            } else {

                return callback()
            }
        }

        return {
            loginForm: {
                pass: '',
                email: '',
                csrf: 'rqr'
            },
            rules: {
                pass: [{ validator: validatePass, trigger: 'blur' }],
                email:[{validator: checkEmail, trigger: 'change'}]
            },
        }
    },
    methods: {

        testClick(){
            let d = {'csc':24,'a':1,'xbv2tgt': 24, 'ggg':12};
            console.log(sorted(d));
            // let aes_key = getAESKey();
            // let text = "helloworld";
            // let encrydata = encryptAES( aes_key, text);
            // let decrydata = decryptAES(aes_key, encrydata);
            // console.log('aeskey: '+ aes_key);
            // console.log('encrydata: '+encrydata);
            // console.log('decrydata: '+decrydata);

        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(valid);
                    // 提交数据到API.login
                    // 跳转到首页
                    userLoginWithEmail(this.loginForm.email, this.loginForm.pass, this.loginForm.csrf).then(rep => {
                        console.log('userLoginWithEmail: ',rep)
                        if (rep.data.errcode !== 0 ){

                            this.$alert(rep.data.errmsg, '提示',{
                                confirmButtonText: '确认',
                                center: true,

                            })
                        }
                        else{
                            // json token
                            // localStorage.setItem('jwt', rep.data.access);
                            // router.push({name:'index'});
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
.loginForm{
    padding:5px 20px 20px 20px;

    box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
    border-radius: 20px;
}

</style>