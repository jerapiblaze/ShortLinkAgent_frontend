async function CreateNewURL(){
    try{
        let requestBody = get_url_input()
        let serverResponse = await call_server("url", "POST", requestBody)
        let res = await serverResponse.json()
        if (serverResponse.status != 200){
            alert(`Error: ${res.error}`)
            return
          }
        let url_id = res.url_info.url_id
        alert(`Your short url is: ${WEB_ADDRESS}/?l=${url_id}`)
        window.location.replace("/index.html")
    }    
    catch (e){
        console.log(e)
    }
}

async function GetURL(url_id){
let serverResponse = await call_server(`url?l=${url_id}`, "GET")
    if (serverResponse.status != 200){
        return null
    }
    let result = await serverResponse.json()
    return result
}

async function GetURLByUserId(user_id){
    let serverResponse = await call_server(`url/search/?u=${user_id}`)
    if (serverResponse.status != 200){
        return null
    }
    let result = await serverResponse.json()
    return result
}

async function DeleteURL(url_id){
    if (!confirm(`Delete url: ${url_id}`)) {
        return null
    }
    let endpoint = `url/?l=${url_id}`
    let serverResponse = await call_server(endpoint, "DELETE")
    if (serverResponse.status != 200){
        return false
    } else {
        return true
    }
}