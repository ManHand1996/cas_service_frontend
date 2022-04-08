import axios from "axios";
// import {myfetch} from "@/httpservic/http_fetch";

import {sorted, hash_string, getAESKey, encryptAES, encryptDataRSA,} from "@/interfaces/encry";
const PrivateKey = ['password'];
const domain = 'http://127.0.0.1'
const instance = axios.create(
    {
        baseUrl: domain,
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            // 'X-Requested-With': 'XMLHttpRequest'
        },
        validateStatus: function (status) {
            return status >= 200 && status < 300 || status === 302; // 默认值
        },
        maxRedirects: 0,

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
    console.log("mergeJson",new_json);
    return new_json
}



function httpGet(url, data, config){
    config.params = mergeJson(config.params, getBaseData())
    let resp_data = instance.get(url, data, config)
    // let resp = instance(url, {method: 'get', body: data, headers: config.headers});
    return resp_data
}

function httpPost(url, data, config){

    let new_data = mergeJson(data,getBaseData());
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
    console.log(hash_str);
   let new_headers = {};
   
    new_headers['X-SIGN'] = encryptAES(aes_key, iv, hash_str);
    new_headers['X-KEY'] = encryptDataRSA(aes_key);
   // let x_sign = ;
   // let x_key = ;
   return new_headers
}

function encryptPrivateField(data, aes_key){
    // var iv =  aes_key.slice(0,15);
    let iv = aes_key.split('').reverse().join('')
    for(let key in data){
        if (PrivateKey.indexOf(key) > -1){
            data[key] = encryptAES(aes_key, iv, data[key]);
        }
    }
    return data;
}

export {
    httpGet,
    httpPost,
    custom_headers
}