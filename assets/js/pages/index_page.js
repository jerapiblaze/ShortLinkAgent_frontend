async function IndexPage(){
    if ((await CheckLogin())){
        window.location.replace("advanced_index.html")
        return
    }
    document.getElementById("submit_btn").onclick = CreateNewURL
}

function get_url_input(){
    let original_url_box = document.getElementById("url_input_box")
    let url_id_box = document.getElementById("custom_alias_input_box")
    let require_login_checkbox = document.getElementById("block_annon_check_box")
    let notes_box = document.getElementById("notes_box")
    let original_url_value = original_url_box ? original_url_box.value : null
    let url_id_value = url_id_box ? url_id_box.value : null
    let require_login_value = require_login_checkbox ? require_login_checkbox.checked : false
    let notes = notes_box.value
    if (!original_url_value){
        alert("The URL field cannot be empty")
        throw "No input"
    }
    let requestBody = {
        original_url:original_url_value,
        url_id:url_id_value,
        require_login:require_login_value,
        notes: notes
    }
    return requestBody
}

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
        window.location.reload();
    }    
    catch (e){
        console.log(e)
    }
}