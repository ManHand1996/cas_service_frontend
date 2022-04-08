
const baseURL = 'http://127.0.0.1:8000';

async function myfetch (url, conf) {
    var method = conf.method.toLowerCase();
    var data = conf.body || {};
    var headers = conf.headers;
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';

    
    var response = await fetch(baseURL + url,{
        method: method,
        body: JSON.stringify(data),
        headers: headers,
        // credentials: 'include'
        // redirect: 'manual'
    })
    return response
}

export {
    myfetch,
}