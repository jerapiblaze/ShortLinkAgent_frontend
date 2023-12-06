async function LoginPage(){
    if (await CheckLogin()){
        window.location.replace("advanced_index.html")
        return
    }
    document.getElementById("login-btn").onclick = NewSession
    document.getElementById("forgot-btn").onclick = function(){
        alert("Bye bye your account. No recovery method is available right now.")
        return
    }
}

function get_login_input(){
    let username_box = document.getElementById("username-box")
    let password_box = document.getElementById("password-box")
    let username = username_box.value
    let password = password_box.value
    return {
        username:username,
        hashed_password:password
    }
}