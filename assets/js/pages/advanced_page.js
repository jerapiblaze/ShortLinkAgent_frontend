async function AdvancedIndexPage(){
    if (!(await CheckLogin())){
        window.location.replace("index.html")
        return
    }
    document.getElementById("submit_btn").onclick = CreateNewURL
    document.getElementById("username-label").innerHTML = (await GetUserInfo()).fullname
    document.getElementById("logout-btn").onclick = Logout
    document.getElementById("changepwd-btn").onclick = ChangePassword
}