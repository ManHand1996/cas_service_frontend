<template>
    <el-table :data="tableData" stripe style="width: 100%" border >
        <template  v-for="item in tb_headers" :key="item.prop">
            <el-table-column :prop="item.prop" :label="item.label"></el-table-column>
        </template>


    </el-table>
</template>

<script>
export default {
    name: "CommonTable",
    props: {
        data_list:{
            type: Array
        },
        data_headers: {
            type: Array
        }
    },
    data(){
        return {
            tableData: this.data_list,
            tb_headers: this.data_headers
        }
    },
    watch: {
        // 监听props.children 对象
        data_list: function (newVal){

            this.tableData = newVal;


        }
    }
}
</script>

<style scoped>

</style>