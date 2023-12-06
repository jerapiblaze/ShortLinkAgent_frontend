async function NavBar(){
    document.getElementById("username-label").innerHTML = (await GetUserInfo()).fullname
    document.getElementById("logout-btn").onclick = Logout
    document.getElementById("myurl-btn").onclick = function(){
        window.location.href = "my_urls.html"
    }
    document.getElementById("editinfo-btn").onclick = function(){
        window.location.href = "edit_myinfo.html"
    }
}