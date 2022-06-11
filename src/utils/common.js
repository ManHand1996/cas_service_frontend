import store from "@/store";


function getScreenH(){
    let h = document.getElementById('app').clientHeight;
    if (h > document.body.clientHeight){
        h = document.body.clientHeight;
    }
    return h;
}

function getScreenW(){
    let w = document.getElementById('app').clientWidth;
    if (w > document.body.clientWidth){
        w = document.body.clientWidth;
    }
    return w;
}

function extractUrlParams(params_str){
    console.log(params_str);
    let result = {}
    
    
    if (params_str.indexOf('&') < 0){
        let arry_param = params_str.split('=');
        result[arry_param[0]] = decodeURIComponent(arry_param[1]);
        return result;
    }
    else{
        let params = params_str.split('&')
        for(let param in params ){
            let item = param.split('=')
            result[item[0]] =  decodeURIComponent(item[1]);
        }
        return result;
    }
}

function setLocalStorege(key, value){
    localStorage.setItem(key, value);
    localStorage[key] = value;
    console.log('setLocalStorege:', localStorage[key])
}

function getLocalStorege(key){
    let val = localStorage.getItem(key);
    if (val === null || val === undefined){
        return null;
    }
    return val;
}

function loadToState(){
    // localStorage to store.state
    let payload = {};
    for(let i=0; i < localStorage.length; i++){
        
        let key = localStorage.key(i);
        payload['key'] = key
        payload[key] = localStorage.getItem(key);
        payload['toLocal'] = false;
        store.commit('set_state', payload)
    }
}

export {
    getScreenW,
    getScreenH,
    extractUrlParams,
    getLocalStorege,
    setLocalStorege,
    loadToState
}