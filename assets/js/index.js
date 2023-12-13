let path = window.location.pathname
let page = path.split("/").pop();
let bg_ping_id = setInterval(BackgroundServerPing, PING_INTERVAL*1000)

window.onload = async function(){
    BackgroundServerPing()
    let params = new URLSearchParams(document.location.search)
    let url_id = params.get("l")
    if (!page || page=="index.html"){
        if (url_id){
            window.location.href = `goto.html?l=${url_id}`
            return
        }
        IndexPage()
        return
    }
    if (page == "advanced_index.html"){
        if (url_id){
            window.location = `goto.html?l=${url_id}`
            return
        }
        AdvancedIndexPage()
        return
    }
    if (page.startsWith("goto")){
        GoPage()
    }
    if (page == "signin.html"){
        LoginPage()
        return
    }
    if (page == "signup.html"){
        SignupPage()
        return
    }
    if (page == "404.html"){
        NotFoundPage()
        return
    }
    if (page == "my_urls.html"){
        MyUrlsPage()
        return
    }
    if (page == "edit_myinfo.html"){
        EditMyInfoPage()
        return
    }
    if (page.startsWith("edit_url.html")){
        EditUrlPage()
        return
    }
}

async function BackgroundServerPing(){
    if (!(await CheckServerOnline())){
        if (page != "maintaince.html"){
            window.location.replace("maintaince.html")
        } else {
            await MaintaincePage()    
        }
        return
    }
}