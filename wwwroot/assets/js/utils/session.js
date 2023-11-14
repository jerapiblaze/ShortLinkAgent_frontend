async function CheckLogin(){
    let token = getCookie("token")
    if (!token){
        return false
    }
    let serverResponse = await call_server(`session/?token=${token}`, "GET", null)
    if (serverResponse.status != 200){
        return false
    }
    return true
}

async function NewSession(){
    let requestBody = get_login_input()
    let serverResponse = await call_server("session/login", "POST", requestBody)
    if (serverResponse.status != 200){
        alert("Login failed.")
        window.location.replace("/signin.html")
        return
    }
    let res = await serverResponse.json()
    setCookie("token", res.token, 7)
    setCookie("user_id", res.user_id, 7)
    window.location.replace("advanced_index.html")
}

async function Logout(force){
    if (force != true){
        if (!confirm("Logout now ?")){
            return
        }
    }
    let token = getCookie("token")
    let serverResponse = await call_server(`session/logout?token=${token}`, "DELETE")
    if (serverResponse.status != 200){
        alert("Logout error")
        return
    }
    eraseCookie("token")
    eraseCookie("token")
    alert("Logged out.")
    window.location.replace("index.html")
}