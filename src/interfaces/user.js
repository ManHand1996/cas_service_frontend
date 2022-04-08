import {httpGet, httpPost} from '@/httpservic/http'


function userLoginWithEmail(email, password, csrf){
    
    var url = '/cas/login/?' + window.location.href.split('?')[1];
    
    return httpPost(url,{
        email: email,
        password: password
    },{headers:{'X-CSRFToken': csrf}}).then(function (response){
        return response;
    }).catch(error => {
        console.log(error.response.headers);
        let loc = error.response.headers['location'];
        let redirect = error.response.headers['redirect'] || '';
    
        if (loc !== '' && error.response.status === 401 && redirect !== '' ) {
            window.location.href = loc;
        }
        else{
            return error.response;
        }
    })
    // return result;
    
    
}

function userRegister(username, email, password){
    
    return httpPost('/api/register/',{
        email: email,
        password: password,
        username: username,
    },{}).then( rep => {
        
        return rep;
    })
}

function userLogOut(){
    localStorage.removeItem('jwt');
    
}

function userVerify(params){
    return httpGet('/api/verify/',{
        params:params
    },{}).then( rep => {
        
        return rep;
    })
}

function getCSRFToken(){
    
    return httpGet('/api/common/CSRFToken/',{
    },{}).then( rep => {

         return rep.data;
    });
}



export {
   userLoginWithEmail,
    userLogOut,
    userRegister,
    userVerify,
    getCSRFToken
}
