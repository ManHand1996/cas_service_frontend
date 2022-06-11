import {httpRequest} from '@/httpservic/http'
import {extractUrlParams} from "@/utils/common";
import router from "@/router";


function userLoginWithEmail(email, password){
    
    var url = '/api/cas/login';
    var param = extractUrlParams(window.location.href.split('?')[1])
    httpRequest({
        data:{
            email: email,
            password: password
        },
        params: param,
        method:'post',
        url : url,
    },).then(function (response){
        console.log('userloginwithemail:', response);
    }).catch(error => {
        console.log(error.response.headers);
        console.log(error.toJSON());
        if(error.response){
            let loc = error.response.headers['location'];
            let redirect = error.response.headers['redirect'] || '';
    
            if (loc !== '' && error.response.status === 401 && redirect !== '' ) {
                console.log(loc);
                window.location.href = loc;
            }
            else{
                console.log(error.response);
            }
        }
        else{
            console.log(error);
        }
        
    })
    // return result;
    
    
}



function adminLoginWithEmail(email, password){
    // 登陆前向服务器请求 CSRFToken
    var url = '/api/admin/login/';
    
    return httpRequest({
        data:{
            email: email,
            password: password
        },
        method: 'post',
        url:url
        
    }).then(function (response){
        return response;
    }).catch(error => {
        // console.log(error.response.headers);
        // console.log(error.toJSON());
        if(error.response){
            let loc = error.response.headers['location'];
            let redirect = error.response.headers['redirect'] || '';
            
            if (loc !== '' && error.response.status === 401 && redirect !== '' ) {
                httpRequest({
                    url: loc,
                    method: 'get'
                }).then(rep => {
                    console.log('redirect loc:request',rep);
                }).catch(error => {
                    console.log('redirect loc:request',error.response);
                })
                window.location.href = loc;
            }
            else{
                return error.response;
            }
        }
        else{
            console.log(error);
        }
        
    })
    // return result;
    
    
}

function userRegister(username, email, password){
    
    return httpRequest({
        url: '/api/cas/register/',
        method: 'post',
        data: {
            email: email,
            password: password,
            username: username,
        }
    },{}).then( rep => {
        
        return rep;
    })
}

function userLogOut(){
    // localStorage.removeItem('jwt');
    var url = '/api/admin/logout/';
    
    httpRequest({
        url:url,
        method: 'get'
    }).then(function (response){
        return response;
    }).catch(error => {
        // console.log(error.response.headers);
        // console.log(error.toJSON());
        if(error.response){
            let loc = error.response.headers['location'];
            let redirect = error.response.headers['redirect'] || '';
            
            if (loc !== '' && error.response.status === 401 && redirect !== '' ) {
                window.location.href = loc;
            }
            else{
                return error.response;
            }
        }
        else{
            console.log(error);
        }
        
    })
    router.push({name:'admin-login'})
    
}

function userVerify(params){
    return httpRequest({
        params: params,
        url: '/api/cas/user/{userid}/verify/',
        method: 'get`'
    },{}).then( rep => {
        
        return rep;
    })
}

function getCSRFToken(){
    
    return httpRequest({
        url: '/api/CSRFToken/',
        method: 'get'
    }).then( rep => {
         
         return rep.data;
    });
}



export {
   userLoginWithEmail,
    userLogOut,
    userRegister,
    userVerify,
    getCSRFToken,
    adminLoginWithEmail,
    
}
