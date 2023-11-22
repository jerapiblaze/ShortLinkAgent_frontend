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
    let serverResponse = await call_server("user", "POST", info)
    if (serverResponse.status != 200){
        alert("Error.")
        return
    }
    alert("Account created!")
    window.location.replace("signin.html")
}

async function DeleteUser(){
    let user_id = getCookie("user_id")
    let user_id_input = null
    while (user_id_input != user_id){
        user_id_input = prompt(`Do you really want to delete your account? Every trace of your data will be vanished.\nEnter your user_id to continue: ${user_id}`)
        if (user_id_input == null){
            return
        }
    }
    let hashed_password = prompt("Enter your password to continue.")
    let wipe_data = confirm("Do you really want to delete your data?")
    let serverResponse = await call_server(`user`, "DELETE", {
        hashed_password: hashed_password,
        wipe_data: wipe_data
    })
    if (serverResponse.status != 200){
        alert("Action failed.")
        return null
    }
    eraseCookie("token")
    eraseCookie("user_id")
    alert("Account deleted. Your data is ours now ;)")
    window.location.replace("index.html")
}