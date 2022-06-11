<template>
    <button v-on:click="$emit('welcome')">
        Click me to be welcomed
    </button>
</template>

<script>
import { ref } from 'vue'
// import { Message, Menu as IconMenu, Setting } from '@element-plus/icons-vue'

const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}
const data = ref(Array(20).fill(item))
export default {
    name: "testLayout",
    emits: ['welcome'],
    data(){
        return {tableData: data}
    }
}

</script>


<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
    width: 240px;
    color: var(--el-text-color-primary);
    background: #fff !important;
    border-right: solid 1px #e6e6e6;
    box-sizing: border-box;
}
.layout-container-demo .el-menu {
    border-right: none;
}
.layout-container-demo .el-main {
    padding: 0;
}
.layout-container-demo .toolbar {
    position: absolute;
    display: inline-flex;
    align-items: center;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}
</style>
