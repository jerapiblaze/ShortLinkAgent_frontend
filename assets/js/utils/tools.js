async function call_server(uri = "", method = "GET", body = null, timeout=5000) {
    let requestBody_str = JSON.stringify(body)
    let requestEndpoint = `${SERVER_ADDRESS}/${uri}`
    let token = getCookie("token")
    let requestOptions = {
        method: method,
        // mode: "no-cors",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Content-Length": requestBody_str.length,
            "access_token": token
        },
        body: body ? requestBody_str : null,
        signal: AbortSignal.timeout(timeout)
    }
    return fetch(requestEndpoint, requestOptions)
}

function GetCustomIdList(url){
    let custom_ids = []
    for (let c of url.custom_urlids){
        custom_ids.push(c.custom_id)
    }
    custom_ids = custom_ids.join(", ")
    return custom_ids
}

async function CheckServerOnline(){
    try {
        const url = `${SERVER_ADDRESS}/`
        let serverOnline = true
        let serverResponse = await call_server("ping", "GET", null, 1000)
        return true
    } catch (e){
        return false
    }
}

function promiseState(p) {
  const t = {};
  return Promise.race([p, t])
    .then(v => (v === t)? "pending" : "fulfilled", () => "rejected");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}