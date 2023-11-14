async function GoPage(){
    let params = new URLSearchParams(document.location.search)
    let url_id = params.get("l")
    let result = await GetURL(url_id)
    
    if (!result){
        window.location.href = "404.html"
        return
    }
    
    let go_btn = document.getElementById("go-btn")
    go_btn.innerHTML = result.url_info.url_id
    go_btn.setAttribute("href", result.url_info.original_url)
    
    let original_url_box = document.getElementById("original-url-box")
    original_url_box.setAttribute("value", result.url_info.original_url)
    original_url_box.setAttribute("href", result.url_info.original_url)
    
    let protected_box = document.getElementById("protected-box")
    protected_box.setAttribute("value", result.url_info.require_login)
    
    let total_box = document.getElementById("total-box")
    total_box.setAttribute("value", result.url_stats.total_clicks)
    
    let last_box = document.getElementById("last-box")
    last_box.setAttribute("value", result.url_stats.updatedAt)
    
    let created_by_box = document.getElementById("created-by-box")
    created_by_box.setAttribute("value", result.url_info.user_id)
    
    let created_at_box = document.getElementById("created-at-box")
    created_at_box.setAttribute("value", result.url_info.createdAt)
    
    let redirect_msg_text = document.getElementById("redirect-msg-text")
    for (let i = DEF_DELAY; i >= 0; i--){
        redirect_msg_text.innerHTML = `Redirect in <strong>${i}</strong>...`
        await sleep(1000)
    }
    redirect_msg_text.innerHTML = "Click the <strong>link above</strong> if we can't redirect you automatically."
}