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