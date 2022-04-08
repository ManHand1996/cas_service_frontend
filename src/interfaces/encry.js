
import {JSEncrypt} from "jsencrypt/lib/JSEncrypt"; // rsa
import {httpGet} from "@/httpservic/http";
// import {Base64} from "jsencrypt/lib/lib/asn1js/base64";

const CryptoJS = require("crypto-js");

async function  getServerRSAPK(){
    // 获取服务端公钥
    await httpGet('/api/common/rsa_pk/',{
    }).then(rep => {
        // console.log('rsapk:',rep.data);
        localStorage.setItem('server_pk', rep.data);
    })
}

// SHA256
function encryptDataRSA(data){

    
    let pk = localStorage.getItem('server_pk');
    console.log('pk: ', pk)
    let encrypt_data = '';
    let crypt = new JSEncrypt();

    crypt.setPublicKey(pk);
    encrypt_data = crypt.encrypt(data)

    console.log('encrypt: ', encrypt_data)
    return encrypt_data
}


function getAESKey(){
    /*
    * AES key
    * */
    let key = random(16);

    // let iv = aes.enc.Utf8.parse(random(16));
    return key
}

function decryptAES(key, iv, data){
    /*
    * decrypt AES key
    * return: string
    * */
    //let encryptedArray = CryptoJS.enc.Base64.parse(data); // type: WordArray
    let encryptedArray = data; // type: WordArray

    // let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt_data = CryptoJS.AES.decrypt(encryptedArray,  CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        });
    
    // padding: CryptoJS.pad.Pkcs7
   return decrypt_data.toString(CryptoJS.enc.Utf8);
}

function encryptAES(key, iv ,data, is_json = false){
    console.log(key);
    /*
    * return: base64 encode string
    * */
    let encrypt_data;
    if (is_json){
        data = JSON.stringify(data);
    }
    
    // data = CryptoJS.enc.Utf8.parse(data);
    // , padding: CryptoJS.pad.Pkcs7
    encrypt_data = CryptoJS.AES.encrypt( data,  CryptoJS.enc.Utf8.parse(key),{
        iv:  CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        });
   return encrypt_data.toString();
}

window.onload = function (){
    // let i_key = getAESKey()
    // let i_iv = i_key.split('').reverse().join('');
    // let data = '2524242sagasga'
    //
    // const CryptoJS = require('crypto-js');  //引用AES源码js
    //
    // const key = CryptoJS.enc.Utf8.parse(i_key);  //十六位十六进制数作为密钥
    // const iv = CryptoJS.enc.Utf8.parse(i_iv);   //十六位十六进制数作为密钥偏移量
    //
    // //解密方法
    // function Decrypt(word) {
    //     let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    //     let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    //     let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    //     let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    //     return decryptedStr.toString();
    // }
    //
    // //加密方法
    // function Encrypt(word) {
    //     let srcs = CryptoJS.enc.Utf8.parse(word);
    //     let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    //     return encrypted.ciphertext.toString().toUpperCase();
    // }
    // let encrypt_data = Encrypt(data);
    // console.log(encrypt_data);
    // let decrypt_data = Decrypt(encrypt_data);
    // //
    // console.log(decrypt_data);
    //
    
    let i_key = 'TNTPR8ZzTJhN66BLPJUzzasoFAyQVAtQ'
    let i_iv = i_key.slice(0,15);
    let data = 'f03964cc9256e4a86245048bbea69f172552429a09af0f7b5ffdbc1903316bd9'
    data = 'helloworld';
    // const CryptoJS = require('crypto-js');  //引用AES源码js

    //const key = CryptoJS.enc.Utf8.parse(i_key);  //十六位十六进制数作为密钥
    //const iv = CryptoJS.enc.Utf8.parse(i_iv);   //十六位十六进制数作为密钥偏移量

    let encrypt_data = encryptAES(i_key, i_iv, data);
    console.log(encrypt_data);
    let decrypt_data = decryptAES(i_key, i_iv, encrypt_data);
    //

    console.log(decrypt_data);
    
    
    // test
    // let i_key = 'TNTPR8ZzTJhN66BL'
    // let i_iv ='PJUzzasoFAyQVAtQ';
    // // i_key = i_key.slice(16,31);
    // //const key = CryptoJS.enc.Utf8.parse(i_key);  //十六位十六进制数作为密钥
    // //const iv = CryptoJS.enc.Utf8.parse(i_iv);   //十六位十六进制数作为密钥偏移量
    //
    //
    // var json_data = {email:"214124@qq.com",nonce:"A0pZiOBB13",password:"YYXMUsJughE4IrSTVphmIQ==",t:1647227515};
    // var json_str = JSON.stringify(json_data, null, ' ').replace('\n ','')
    //     .replaceAll('\n', '');
    // console.log('json_str:', json_str)
    // var hash_str = hash_string(json_str);
    // console.log('hash_str:', hash_str);
    //
    // let encrypt_data = encryptAES(i_key, i_iv, '214124@qq.com');
    // console.log('encrypt hashstr: ',encrypt_data);
    // let decrypt_data = decryptAES(i_key, i_iv, encrypt_data);
    //  console.log('de:',decrypt_data)
    //
    // console.log('base64:', )
    
    
}



function random(len){
    /*
    * random string
    * return: string
    * */
    let random_str = "";
    
    let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
   
    for(let i = 0; i < len; i++){
        random_str += arr[Math.floor(Math.random(arr.length) * arr.length)];
    }
    
    return random_str
    
}

function hash_string(data, is_json=false){
    /*
    * type :sha256
    * return:  Base64 string
    * */
    let hash;
    if (is_json){
        
        data = JSON.stringify(data);
        
    }
    
    hash = CryptoJS.SHA256(data)
    console.log('hash hex:', hash.toString())
    return hash.toString(CryptoJS.enc.Base64);
    
}

// window.onload = function (){
//     var s = hash_string('hello')
//     console.log('hash_string:', s);
// }

function sorted(data, reverse=false){

    
    /* json 对象按健值排序 */
    let arr_key = [];
    let new_json = {};
    
    for(let key in data){
       
        arr_key.push(key);
    }
    if (reverse){
        arr_key = arr_key.sort((a,b)=>{return b.charCodeAt() - a.charCodeAt();})
    }
    else{
        arr_key = arr_key.sort((a,b)=>{return a.charCodeAt() - b.charCodeAt();})
    }
    

    for(let i in arr_key){

        new_json[arr_key[i]] = data[arr_key[i]];
        
    }
    return new_json;
    
}




export {
    getServerRSAPK,
    encryptDataRSA,
    getAESKey,
    decryptAES,
    encryptAES,
    hash_string,
    sorted
    
}