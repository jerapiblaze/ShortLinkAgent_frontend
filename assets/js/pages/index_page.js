async function IndexPage(){
    if ((await CheckLogin())){
        window.location.replace("advanced_index.html")
        return
    }
    document.getElementById("submit_btn").onclick = CreateNewURL
}