async function AdvancedIndexPage(){
    if (!(await CheckLogin())){
        window.location.replace("index.html")
        return
    }
    await NavBar();
    await ShowHideAdvanced(0)
    document.getElementById("ad_btn").onclick = ShowHideAdvanced
    document.getElementById("submit_btn").onclick = CreateNewURL
}

async function ShowHideAdvanced(){
    let e = document.getElementById("advanced_opt").style.display
    document.getElementById("advanced_opt").style.display = e == "none" ? "" : "none"
}