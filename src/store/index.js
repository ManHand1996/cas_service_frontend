// import {Vue} from 'vue';
import { createStore} from 'vuex'
import {setLocalStorege} from "@/utils/common";

// Vue.use(Vuex)
// 用于vue组件之间的通讯
// localStorage

const store = createStore({
    // state: server_pk, isLogin 与 localStorage相同
    state: {
        jwt:'',
        server_pk: '',
        isLogin: false,
    },
    mutations: {
        // 同步方式设置全局值
        // 调用: this.$index.commit('set_jwt', {})
        
        set_state(state, payload){
            /*
            * payload = {'toLocal':true, 'isLogin':true, 'key': 'isLogin'}
            * */
            let key = payload['key'];
            let val = payload[payload['key']];
            if (payload['toLocal']){
                setLocalStorege(key, val);
            }
            state[key] = val;
        }
    },
    getters: {
        get_stateVal: (state) => (key) =>{
            return state[key];
        }
    },
    actions: {
        // 异步
        // 调用: this.$index.dispatch('async_set_jwt',{})
        // async_set_jwt(context, payload){
        //     context.commit('set_jwt', payload);
        // },
        //
        // async_set_server_pk(context, payload){
        //     context.commit('set_server_pk', payload);
        // }
        async_set_state(context, payload){
            context.commit('set_state', payload);
        }
    }
    
    
    
})

export default store
