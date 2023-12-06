async function MyUrlsPage(){
    if (!(await CheckLogin())){
        window.location.replace("index.html")
        return
    }
    await NavBar();
    let userInfo = await GetUserInfo();
    document.getElementById("user-id-box").innerHTML = `User: <strong>${userInfo.fullname}</strong> (<small><i>${userInfo.user_id})</i></small>`
    
    let url_infos = await GetURLByUserId(userInfo.user_id)
    if (!url_infos){
        document.getElementById("total-links-box").innerHTML = "Total links: 0"
        document.getElementById("table-body").innerHTML = `
    <tr><td>Empty</td></tr>
`
    }
    document.getElementById("total-links-box").innerHTML = `Total links: <strong>${url_infos.length}</strong>`
    document.getElementById("table-body").innerHTML = FormatUrlListAsTable(url_infos)
    return
}

function FormatUrlListAsTable(url_infos){
    let output = ""
    for (let url of url_infos){
        output += `
<tr class="text-break" style="word-wrap:break-all">
    <td style="width:15% word-wrap:break-all" class="font-monospace" col-name="url_id"><a href="${WEB_ADDRESS}/?l=${url.url_id}" target="_blank">${url.url_id}</td>
    <td style="width:35% word-wrap:break-all" class="font-monospace" col-name="original_url">${url.original_url}</td>
    <td style="width:15% word-wrap:break-all" class="font-monospace" col-name="created_at">${url.stats.createdAt.replace("T", " ")}</td>
    <td style="width:15% word-wrap:break-all" class="font-monospace" col-name="last_access">${url.stats.updatedAt.replace("T", " ")}</td>
    <td style="width:5% word-wrap:break-all" class="font-monospace" col-name="total_clicks">${url.stats.total_clicks}</td>
    <td style="width:5% word-wrap:break-all" class="font-monospace" col-name="protected">${url.require_login}</td>
    <td style="width:10%" col-name="actions"><button class="btn btn-info btn-sm" type="button" btn-label="edit_url">Edit</button><button class="btn btn-danger btn-sm" type="button" btn_label="delete_url" onclick="GenerateDeleteFunction('${url.url_id}');">Delete</button></td>
</tr>
`
    }
    return output
    let str = `<tr>
    <td col-name="url_id">Cell 1</td>
    <td col-name="original_url">Cell 2</td>
    <td col-name="created_at">Text</td>
    <td col-name="last_access">Text</td>
    <td col-name="total_clicks">Text</td>
    <td col-name="protected">Text</td>
    <td col-name="actions"><button class="btn btn-info btn-sm" type="button" btn-label="edit_url">Edit</button><button id="delete-btn-${url.url_id}" class="btn btn-danger btn-sm" type="button" btn_label="delete_url"">Delete</button></td>
</tr>`
}

async function GenerateDeleteFunction(url_id){
    let result = await DeleteURL(url_id)
    if (result == false){
        alert("Failed.")
        return
    } 
    if (result == true){
        alert("Success.")
        window.location.reload()
        return
    }
    if (result == null){
        return
    }
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