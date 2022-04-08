
<template>
    <div class="common-layout top-el-container">
        <el-container class="top-el-container">
            <el-header >
                <el-row>
                    <el-col :span="20"><div class="grid-content bg-purple-dark">可视化任务调度管理系统</div></el-col>
                    <el-col :span="4"> <el-button @click="logout" width="100px">登出</el-button></el-col>
                </el-row>


            </el-header>
            <el-container>
                <el-row style="width: 100%">
                    <el-col  :span="4"></el-col>

                    <el-col span="20">

                    </el-col>

                </el-row>
            </el-container>
        </el-container>
    </div>

</template>

<script>
export default {
    name: "IndexPage",
    methods: {
        logout(){
            this.$alert('sfasfasfs', '提示',{
                confirmButtonText: '确认',
                center: true,

            })
        }
    }
}


</script>

<style scoped>



.top-el-container{
    height: 100%;
}
.common-layout .el-header,
.common-layout .el-footer {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
}
.common-layout .el-footer {
    line-height: 60px;
}

.common-layout .el-aside {
    background-color: #d3dce6;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
}

.common-layout .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 160px;
    min-height: inherit;

}

.common-layout > .el-container {
    margin-bottom: 40px;
}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.common-layout .el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>