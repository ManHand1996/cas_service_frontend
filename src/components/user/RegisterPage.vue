<template>
    <el-row class="row-center">
        <el-col :xs="{span:22,offset:1}" :sm="{span:12, offset:6}" :md="{span:10, offset:7 }" :lg="{span:6, offset:9}" >

            <el-form
                    :model="registerForm"

                    :rules="rules"
                    ref="registerForm"
                    label-width="100px"
                    class="registerForm box-shadow"
            >
                <p>注册</p>
                <hr/>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="registerForm.username" >

                    </el-input>

                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerForm.email" type="email">

                    </el-input>

                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input
                            type="password"
                            v-model="registerForm.pass"
                            autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="pass2">
                    <el-input
                            type="password"
                            v-model="registerForm.pass2"
                            autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitRegister()">注册</el-button>
<!--                    <el-button @click="testClick()"></el-button>-->
<!--                    <el-button @click="registerPage('registerForm')">注册</el-button>-->
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

</template>

<script>
import {userRegister} from '@/interfaces/user'
import { sorted} from "@/interfaces/encry";
import router from "@/router";


// import {getAESKey, encryptAES, decryptAES,} from "@/interfaces/encry";

export default {
    name: 'RegisterPage',
    data() {

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

        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请输入密码'))
            } else if (value !== this.registerForm.pass) {

                return callback(new Error('密码不一致'));
            }
            else{
                return callback();
            }
        }

        let checkusername = (rule, value, callback) => {

            var regexp = /^[a-z0-9_-]{3,16}$/;

            if(value === ''){
                return callback(new Error('用户名不能为空'));
            }
            else if (!regexp.test(value)){

                return callback(new Error('用户名格式不正确'));
            }
            else{
                return callback();
            }
        }

        return {
            registerForm: {
                username: '',
                email: '',
                pass: '',
                pass2: '',

            },
            rules: {
                username: [{validator: checkusername, trigger: 'blur'}],
                email:[{validator: checkEmail, trigger: 'change'}],
                pass: [{ validator: validatePass, trigger: 'blur' }],
                pass2:[{validator: validatePass2, trigger: 'blur'}],
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

        submitRegister() {



            this.$refs['registerForm'].validate((valid) => {
                console.log(valid);
                if (valid) {

                    // 提交数据到API.login
                    // 跳转到首页
                    userRegister(this.registerForm.username, this.registerForm.email, this.registerForm.pass).then(rep => {
                        console.log(rep)


                        this.$alert(rep.errmsg, '提示',{
                            confirmButtonText: '确认',
                            center: true,

                        })
                        if (rep.errcode == 0 ){
                            router.push({name:'login'});

                        }

                    })



                } else {

                    this.$alert('请填写正确信息', '提示',{
                        confirmButtonText: '确认',
                        center: true,

                    })
                    return false
                }
            })
        },

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
.registerForm{
    padding:5px 20px 20px 20px;

    box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
    border-radius: 20px;
}

</style>