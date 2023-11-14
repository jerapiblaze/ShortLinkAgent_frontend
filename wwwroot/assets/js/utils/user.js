async function GetUserInfo(user_id){
    let endpoint = user_id ? `user?u=${user_id}` : "user"
    let serverResponse = await call_server(endpoint, "GET")
    if (serverResponse.status != 200){
        return null
    }
    let res = await serverResponse.json()
    return res
}

async function ChangePassword(){
    let old_pwd = prompt("Old password")
    if (!old_pwd){
        return
    }
    let new_pwd = null
    let re_new_pwd = null
    while (new_pwd != re_new_pwd || !re_new_pwd){
        new_pwd = prompt("New password")
        if (!new_pwd){
            return
        }
        re_new_pwd = prompt("Confirm new password")
    }
    let info = {
        hashed_password_old:old_pwd,
        hashed_password_new:new_pwd
    }
    let serverResponse = await call_server("user/changepwd", "PUT", info)
    if (serverResponse.status != 200){
        alert("Error.")
        return
    }
    Logout(force=true)
}

async function NewUser(){
    let info = get_signup_input()
    alert(JSON.stringify(info))
    let serverResponse = await call_server("user", "POST", info)
    if (serverResponse.status != 200){
        alert("Error.")
        return
    }
    alert("Account created!")
    window.location.replace("signin.html")
}