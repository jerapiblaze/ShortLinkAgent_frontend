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
    
    let url_info = result.url_info
    let url_stats = result.url_stats
    document.getElementById("urlid-box-info").value = url_info.url_id
    document.getElementById("urlid-box-stats").value = url_info.url_id
    document.getElementById("urlid-box-edit").value = url_info.url_id
    
    document.getElementById("orginalurl-box-info").value = url_info.original_url
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

function GetEditInput(){
    let info = {
        url_id: document.getElementById("urlid-box-edit").value,
        require_login: document.getElementById("protected-box-edit").value,
        notes: document.getElementById("notes-box-edit").value
    };
    return info;
}