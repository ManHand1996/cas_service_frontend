import axios from "axios/dist/axios";
// import {myfetch} from "@/httpservic/http_fetch";

import {sorted, hash_string, getAESKey, encryptAES, encryptDataRSA,} from "@/interfaces/encry";
// import router from "@/router";
const PrivateKey = ['password'];
// const domain = '/'
const instance = axios.create(
    {
        // baseUrl: domain,
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            // 'X-Requested-With': 'XMLHttpRequest',
            // 'X-CSRFToken':'yZnzugbnLL0cNKlBfcmqJRFhh4EbH0do5pyV1WVIBzBF1hdW6wUUTebTWzhMjGDy'
    },
        validateStatus: function (status) {
            return status >= 200 && status < 300 // 默认值
        },
        withCredentials: true, // 是不是不要加上CAS才能重定向， 之前没有添加，可以重定向到目标服务器
        maxRedirects: 0,
        xsrfCookieName: 'X-CSRFToken',
        xsrfHeaderName: 'X-CSRFToken'

    }
)

// const instance = myfetch

function getBaseData(){
    let times = Date.parse(new Date()).toString();
    return {
        t: parseInt((times.substr(0,10))),
        nonce: randomNonce()
    }
}

function randomNonce(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;

}

function mergeJson(json1, json2){
    
    if (json1 === undefined || JSON.stringify(json1) === "{}"){
        return json2;
    }
    
    let new_json = JSON.parse((JSON.stringify(json1) + JSON.stringify(json2)).replace(/}{/,','))
    // console.log("mergeJson",new_json);
    return new_json
}



function httpGet(url, data={}, config={}){
    /*
    * http GET
    * */
    config.params = mergeJson(config.params, getBaseData())
    let resp_data = instance.get(url, data, config)
    // let resp = instance(url, {method: 'get', body: data, headers: config.headers});
    return resp_data
}

function httpPost(url, data={}, config={}){
    /*
    * http POST
    * */
    let base_query_params = getBaseData();
    
    let new_data = mergeJson(data, base_query_params);
    new_data = sorted(new_data);
    let new_headers = custom_headers(new_data)
    config.headers = mergeJson(config.headers, new_headers)
    
    //
    // // post(url,data,config,Promise) 按顺序赋值................
    let resp_data = instance.post(url,new_data,config)
    
    // fetch
    // console.log('posted: ',new_data);
    // var resp = myfetch( url, {method: 'post', body: new_data, headers: config.headers})
    
    return resp_data
}

function httpRequest(config={
    method:'get',
    params: {},
    headers:{},
    data: {}
}){
    /*
    * config = {
    *   url: '',
    *   method: '',
    *   params: {},
    *   headers:{},
    *   data: {}
    * }
    * */
    
    let base_query_params = getBaseData();
    config.params = mergeJson(config.params, base_query_params);
    
    if (config['method'] === 'post' || config['method'] === 'put'){
        // let new_data = mergeJson(config.data, config.params);
        // new_data = sorted(new_data);
        // config.data = new_data
        // let new_headers = custom_headers(new_data)
        // config.headers = mergeJson(config.headers, new_headers)
        // console.log('config.params: ',config.params);
        let result = encryptRequestData(config.data, config.params);
        config.headers = mergeJson(config.headers, result.headers);
        config.data = result.data;
        // console.log('config.data:', result.data)
    }
    return instance.request(config);
}

// function httpDelete(url, data={}, config={}){
//     config.params = mergeJson(config.params, getBaseData())
//     let resp_data = instance.delete(url, data, config)
//     // let resp = instance(url, {method: 'get', body: data, headers: config.headers});
//     return resp_data
// }
//
// function httpPut(url, data={}, config={}){
//     config.params = mergeJson(config.params, getBaseData())
//     let resp_data = instance.put(url, data, config)
//     // let resp = instance(url, {method: 'get', body: data, headers: config.headers});
//     return resp_data
// }


function custom_headers(data){
    
    if (data === null || data === undefined || JSON.stringify(data) === "{}"){
         return {
            'X-SIGN' : '',
            'X-KEY' : ''
        }
    }
    let aes_key = getAESKey();
    let iv = aes_key.split('').reverse().join('')
    // var iv =  aes_key.slice(0,15);
    
    let new_data = encryptPrivateField(data, aes_key)
    
   let hash_str = hash_string(JSON.stringify(new_data, null, ' ').replace('\n ','')
       .replaceAll('\n', ''));
    // console.log(hash_str);
   let new_headers = {};
   
    new_headers['X-SIGN'] = encryptAES(aes_key, iv, hash_str);
    new_headers['X-KEY'] = encryptDataRSA(aes_key);
   // let x_sign = ;
   // let x_key = ;
   return new_headers
}

function encryptPrivateField(data, aes_key, iv){
    // var iv =  aes_key.slice(0,15);
   
    
    for(let key in data){
        if (PrivateKey.indexOf(key) > -1){
            data[key] = encryptAES(aes_key, iv, data[key]);
        }
    }
    return data;
}

function encryptRequestData(data, params){
    // 生成AESKey
    // AESKey 对body的重要字段加密
    // body与params 组合的数据进行排序
    // 对排序后的body与params的数据字符串 计算摘要
    // 对摘要进行AES加密
    // 对AESKEY进行RSA加密
    let aes_key = getAESKey();
    // console.log('aes_key:',aes_key);
    let iv = aes_key.split('').reverse().join('');
    let new_data = encryptPrivateField(data, aes_key, iv)
    let data_with_params = mergeJson(new_data, params);
    
    let hash_data = sorted(data_with_params)
   
    // console.log('hash_data:', hash_data);
    // console.log('hash_data to str:', JSON.stringify(hash_data, null, ' '))
    let digest = hash_string(hash_data, true)
    let sign = encryptAES(aes_key, iv, digest)
    return {
        'headers':{
            'X-SIGN': sign,
            'X-KEY': encryptDataRSA(aes_key)
        },
        'data': new_data
    }
}


export {
    httpGet,
    httpPost,
    custom_headers,
    httpRequest
}