async function EditMyInfoPage(){
    if (!(await CheckLogin())){
        window.location.replace("index.html")
        return
    }
    await NavBar();
    let userInfo = await GetUserInfo();
    document.getElementById("fullname-box").value = userInfo.fullname;
    document.getElementById("uid-box").value = userInfo.user_id;
    document.getElementById("protect-box").value = userInfo.protect_level;
    document.getElementById("created-box").value = userInfo.createdAt;
    document.getElementById("avatar-box").value = JSON.stringify(userInfo.avatar);
    document.getElementById("token-box").value = getCookie("token");
    
    document.getElementById("fullname-input").placeholder = userInfo.fullname;
    document.getElementById("avatar-input").placeholder = userInfo.avatar;
    document.getElementById("protect-input").value = userInfo.protect_level;
    
    document.getElementById("save-btn").onclick = DoEditInfo;
    
    document.getElementById("changepwd-submit-btn").onclick = DoChangePassword;
    
    document.getElementById("delete-account-btn").onclick = DoAccountDelete;
}

async function DoChangePassword(){
    let old_pwd = document.getElementById("oldpwd-input").value
    let new_pwd = document.getElementById("newpwd-input").value
    let cf_new_pwd = document.getElementById("cf-newpwd-input").value
    
    if (!old_pwd || !new_pwd || !cf_new_pwd){
        alert("Please fill out the fields.");
        return
    }
    if (new_pwd != cf_new_pwd){
        alert("New passwords mismatch.");
        return
    }
    let info = {
        hashed_password_old:old_pwd,
        hashed_password_new:new_pwd
    }
    let serverResponse = await call_server("user/changepwd", "PUT", info)
    if (serverResponse.status != 200){
        alert("Error.");
        window.location.reload();
        return
    }
    Logout(force=true)
    alert("Password changed.")
}

async function DoEditInfo(){
    let fullname = document.getElementById("fullname-input").placeholder;
    let avatar = document.getElementById("avatar-input").placeholder;
    let new_fullname = document.getElementById("fullname-input").value;
    let new_avatar = document.getElementById("avatar-input").value;
    let new_protect_level = document.getElementById("protect-input").value;
    
    let edit_info = {
        fullname: new_fullname ? new_fullname : fullname,
        protect_level: new_protect_level,
        avatar: new_avatar ? new_avatar :   avatar
    }
    
    let serverResponse = await call_server("user", "PUT", edit_info)
    if (serverResponse.status != 200){
        alert("Error.");
        return
    }
    window.location.reload();
    return
}

async function DoAccountDelete(){
    let pwd = document.getElementById("pwd-input").value;
    let re_pwd = document.getElementById("re-pwd-input").value;
    let cf = document.getElementById("del-cf-input").value;
    if (!pwd || !re_pwd){
        alert("Please fill out the fileds.");
        return
    }
    if (pwd != re_pwd){
        alert("Password mismatch.");
        return
    }
    if (cf == "0"){
        window.location.reload();
        return
    }
    let info = {
        hashed_password: pwd,
        wipe_data: cf=="2"
    }
    let uid = document.getElementById("uid-box").value;
    let cf2 = prompt(`You are going to delete your account. Please type the account id ${uid} to confirm deletion.`)
    if (!cf2 || cf2 != uid){
        alert("UID mismatch or user canceled.");
        window.location.reload();
        return
    }
    let serverResponse = await call_server(`user`, "DELETE", info)
    if (serverResponse.status != 200){
        alert("Action failed.")
        return null
    }
    eraseCookie("token")
    eraseCookie("user_id")
    alert("Account deleted. Your data is ours now ;)")
    window.location.replace("index.html")
}