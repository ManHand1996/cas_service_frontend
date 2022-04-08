<template>
    <div class="div-container" v-loading="true">


    <el-alert
            v-loading="loading"
            :title="message"
            type="info"
            center
            description=""
            show-icon class="div-item">
    </el-alert>
    </div>
</template>

<script>
import {userVerify} from "@/interfaces/user";
import router from "@/router";
export default {
    name: "VervifyPage",
    data(){
        return {
            message:'',
            loading:true
        }
    },
    created() {
        this.message = '';
        let params = this.$route.query;
        userVerify(params).then((rep) =>{
            this.$alert(rep.errmsg, '提示',{
                confirmButtonText: '确认',
                center: true,
            })
            if (rep.errcode === 0){
                //
                this.loading = false
                setTimeout(()=>{router.push({name:'index'}) },1000)
                ;
            }

        })

    },
    methods:{

    }
}
</script>

<style scoped>


.div-item{
    /*子元素高度未知*/
}
.div-container{
    /*父元素*/
    display: flex;
    align-items: center;
    height: 100%;
}


</style>