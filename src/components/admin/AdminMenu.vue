<!--<script setup>-->
<!--/* 组合式API定义， 与模板解耦合，*/-->

<!--// components： 直接导入后可以在模板中使用-->



<!--</script>-->

<template >
    <template v-for="(item) in children_data" :key="item.resrc_uuid" >

        <template v-if="item.childs.length > 0">
        <el-sub-menu   :index="item.index" >

            <template #title>
                <i :class="item.icon_tag"  ></i>
                <span>{{item.menu_name}}</span>
            </template>
            <admin-menu :children="item.childs"></admin-menu>
        </el-sub-menu>

    </template>

    <el-menu-item v-else  :key="item.resrc_uuid" :index="item.index" :route="item.target_url">

        <i :class="item.icon_tag"  ></i>
        <template #title >{{item.menu_name}}</template>
<!--        <router-link to={{item.target_url}}></router-link>-->
    </el-menu-item>
    </template>
</template>





<script >
// import {
//     Document,
//     Menu as IconMenu,j
//
// } from '@element-plus/icons-vue'




// import {getCurrentInstance} from "vue";
import {ref, watch, toRefs, reactive} from "vue";
// import router from "@/router";

export default {

    name: "AdminMenu",
    props: {
        children: {
            type: Array
        }
    },
    setup(props){
        // context: {expose, attrs, }
        // props： 用于就接收父组件传递的数据
        const ref_objs = reactive({
            menuitem1:ref("menuitem1")
        })
        const {children} = toRefs(props); // toRefs 转为响应式引用对象
        // 定义数据使用ref响应式引用， 确保数据会及时改变（引用传递）
        const children_data = ref(Array);
        const clickedItem = ref({});

        // 定义emit, 用于响应数据给父组件
        // const emit = defineEmits(['itemHandel'])

        // context.emit('click', clickedItem.value)

        // watch： 监听父组件传入的变量变化
        watch(children, (newVal, oldVal)=>{
            console.log(newVal);
            console.log(oldVal);
            if (oldVal !== newVal){
                children_data.value = newVal;
            }
        }, {immediate:true})

        // 定义方法

        const testClick = () =>{
            console.log('testClick');

            console.log(ref_objs.menuitem1);
        }


        // 生命周期hook
        // onMounted(()=>{
        //     console.log('adminMenu onMounted...')
        // });
        return {
            clickedItem,children_data,testClick
        }
    },
    beforeRouteUpdate(to, from, next){
        console.log("Menu beforeRouteUpdate");
        next();
    }


}
</script>

<style scoped>
/*.el-menu-item {*/
/*    background-color: #fff;*/
/*}*/

</style>