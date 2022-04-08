// import {Vue} from 'vue';
import { createStore} from 'vuex'

// Vue.use(Vuex)
// 用于vue组件之间的通讯
const store = createStore({
    state: {
        jwt:'',
        server_pk: '',
        key_source: '',
    },
    mutations: {
        // 同步方式设置全局值
        // 调用: this.$index.commit('set_jwt', {})
        set_jwt(state, payload){
            state.jwt = payload.jwt;
        },
        set_server_pk(state, payload){
            state.server_pk = payload.server_pk;
        },
        set_key_source(state, payload){
            state.key_source = payload.key_source;
        }
    },
    getters: {
        get_jwt: state => {
            return state.jwt
        },
        get_server_pk: state => {
            return state.server_pk;
        },
        get_key_source: state => {
            return state.key_source;
        }
    },
    actions: {
        // 异步
        // 调用: this.$index.dispatch('async_set_jwt',{})
        async_set_jwt(context, payload){
            context.commit('set_jwt', payload);
        },
        
        async_set_server_pk(context, payload){
            context.commit('set_server_pk', payload);
        }
    }
    
    
    
})

export default store
