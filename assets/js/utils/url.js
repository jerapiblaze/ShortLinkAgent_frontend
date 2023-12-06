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