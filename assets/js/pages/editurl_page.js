async function EditUrlPage(){
    if (!(await CheckLogin())){
        window.location.replace("index.html")
        return
    }
    await NavBar();
    
    let params = new URLSearchParams(document.location.search)
    let url_id = params.get("l")
    let result = await GetURL(url_id)
    
    if (!result){
        window.location.href = "404.html"
        return
    }
    
    let url_info = result
    let url_stats = result.url_stat
    document.getElementById("urlid-box-info").value = url_info.url_id
    document.getElementById("urlid-box-stats").value = url_info.url_id
    document.getElementById("urlid-box-edit").value = url_info.url_id
    
    document.getElementById("orginalurl-box-info").value = url_info.original_url
    document.getElementById("customid-box-info").value = GetCustomIdList(result)
    document.getElementById("notes-box-info").value = url_info.notes
    document.getElementById("protected-box-info").value = url_info.require_login ? "Logged in users" : "Everyone"
    document.getElementById("created-box-info").value = url_info.createdAt
    document.getElementById("modified-box-info").value = url_info.updatedAt
    
    document.getElementById("urlid-box-stats").value = url_stats.url_id
    document.getElementById("totalclick-box-stats").value = url_stats.total_clicks
    document.getElementById("created-box-stats").value = url_stats.createdAt
    document.getElementById("modified-box-stats").value = url_stats.updatedAt
    
    document.getElementById("notes-box-edit").placeholder = url_info.notes
    document.getElementById("notes-box-edit").value = url_info.notes
    document.getElementById("protected-box-edit").value = url_info.require_login
    document.getElementById("edit-btn").onclick = DoEditUrl;
    
    document.getElementById("urlid-box-customid").value = url_info.url_id
    document.getElementById("customid-box-current").value = GetCustomIdList(result)
    document.getElementById("add-customid-btn").onclick = DoAddCustomId;
}

async function DoEditUrl(){
    let info = GetEditInput();
    let serverResponse = await call_server("url", "PUT", info)
    if (serverResponse.status != 200){
        alert(serverResponse.status);
        return
    } else {
        window.location.reload();
        return
    }
}

async function DoAddCustomId(){
    let info = GetCustomIdInput()
    let serverResponse = await call_server(`url/customid?l=${info.id}`, "PUT", info.info)
    if (serverResponse.status != 200){
        alert(serverResponse.status);
        return
    } else {
        window.location.reload();
        return
    }
}

function GetCustomIdInput(){
    let new_custom_id = document.getElementById("urlid-box-customid").value
    if (!new_custom_id){
        alert("New ID cannot be blank!")
        return
    }
    let info = {
        id: new_custom_id,
        info: {
            url_id: document.getElementById("customid-box-add").value
        }
    }
    return info
}

function GetEditInput(){
    let info = {
        url_id: document.getElementById("urlid-box-edit").value,
        require_login: document.getElementById("protected-box-edit").value,
        notes: document.getElementById("notes-box-edit").value
    };
    return info;
}