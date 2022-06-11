import {httpRequest} from "@/httpservic/http";
// import store from "@/store";


async function  getServerRSAPK(){
    // 获取服务端公钥
    await httpRequest({
        url:'/api/rsa_pk/'
    }).then(rep => {
        localStorage.setItem('server_pk', rep.data['data']);
        
        // store.commit('set_state', {'server_pk'})
        // store.commit('set_state', '')
    })
}

function gen_app_key(){
    
    return httpRequest({
        url: '/api/admin/application/gen_key/'
    }).then((rep) => {
        return rep.data;
    })
}

function APIMenuList(query_params={limit:10, offset:0}){
    let url = '/api/admin/menu-list/';
    
    return httpRequest({
        params:query_params,
        method:'get',
        url:url,
        
    }).then(rep => {
       
        return rep
    })
    
}

// function ApplicationList(query_params={limit:10, offset:0}){
//     let url = '/api/admin/application/';
//     return httpRequest({
//         params:query_params,
//         method:'get',
//         url:url
//     }).then(rep => {
//         return rep;
//     })
//
// }



export  {
    APIMenuList,
    getServerRSAPK,
    gen_app_key
}