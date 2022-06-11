function checkEmail(rule, value, callback){
    // 正则表达式验证
    const reg =  /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (value === '' || value === undefined || value === null) {
        return callback(new Error('登陆邮箱不能为空'));
    } else {
        if (!reg.test(value)) {
            return callback(new Error('请输入正确的邮箱地址'));
        } else {
            return callback();
        }
    }
}

function validatePass(rule, value, callback){
    // 数字，字符，英文 其中两种组合
    const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
    if (value === '') {
        return callback(new Error('请输入密码'))
    } else {
        if (!reg.test(value)){
            return callback(new Error('密码需要6-20位数字，字符，英文其中两种组合'))
        }
        return callback()
    }
}

function validateUnicodeRequired(rule, value, callback){
    // const reg = new RegExp("^[\\w.@()|?!#$%^&*+-]+")
    
    if (value === '' || value === undefined || value === null){
        return callback(new Error('必须填写该内容'))
    }
    else{
        
        return callback()
    }
}

function validateUserNameRequired(rule, value, callback){
    const reg = /^[\w]{6,20}$/
    if (value === '' || value === undefined || value === null){
        return callback(new Error('必须填写该内容'))
    }
    else{
        if (!reg.test(value)){
            return  callback(new Error('用户命只能包含数字，字母和`_`'))
        }
        return callback()
    }
}



export {
    checkEmail,
    validatePass,
    validateUserNameRequired,
    validateUnicodeRequired
    
    
    
}