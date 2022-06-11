
import {JSEncrypt} from "jsencrypt/lib/JSEncrypt"; // rsa
// import {Base64} from "jsencrypt/lib/lib/asn1js/base64";

const CryptoJS = require("crypto-js");


// SHA256
function encryptDataRSA(data){

    
    let pk = localStorage.getItem('server_pk');
    let encrypt_data = '';
    let crypt = new JSEncrypt();

    crypt.setPublicKey(pk);
    encrypt_data = crypt.encrypt(data)
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
    * :params data: base64 format encrypt data
    * return: string
    * */
    //let encryptedArray = CryptoJS.enc.Base64.parse(data); // type: WordArray
    let decode_base64= CryptoJS.enc.Base64.parse(data)
    let encryptedArray = CryptoJS.enc.Utf8.stringify(decode_base64); // type: WordArray
    
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
    // base64 不能用于aes,原因与python的aes解码有出入
    // let encode_utf8 = CryptoJS.enc.Utf8.parse(encrypt_data.toString());
    // return CryptoJS.enc.Base64.stringify(encode_utf8);
    return encrypt_data.toString(); // utf8
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
        // 将json数据转换为字符串进行摘要，去掉多余的字符串
        data = JSON.stringify(data, null, ' ').replace('\n ','')
            .replaceAll('\n', '')
        console.log(data)
    }
    hash = CryptoJS.SHA256(data)
    
    console.log(hash.toString(CryptoJS.enc.Base64))
    return hash.toString(CryptoJS.enc.Base64);
    
}


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
        let val = data[arr_key[i]];
        if(!isNaN(data[arr_key[i]])){
            val = String(data[arr_key[i]]);
        }
        new_json[arr_key[i]] = val;
        
    }
    return new_json;
    
}




export {

    encryptDataRSA,
    getAESKey,
    decryptAES,
    encryptAES,
    hash_string,
    sorted
    
}