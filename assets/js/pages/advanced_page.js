async function AdvancedIndexPage(){
    if (!(await CheckLogin())){
        window.location.replace("index.html")
        return
    }
    await NavBar();
    document.getElementById("submit_btn").onclick = CreateNewURL
}