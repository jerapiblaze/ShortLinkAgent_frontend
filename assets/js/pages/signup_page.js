async function SignupPage(){
    if (await CheckLogin()){
        window.location.replace("advanced_index.html")
        return
    }
    document.getElementById("signup-btn").onclick = NewUser
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

function get_signup_input(){
    let fullname = document.getElementById("fullname-box").value
    let username = document.getElementById("username-box").value
    let password = document.getElementById("password-box").value
    let re_password = document.getElementById("re-password-box").value
    if (!fullname || !username || !password || !re_password){
        alert("Please complete the form.")
        throw "Form not complete"
    }
    if (password != re_password){
        alert("Password not match")
        throw "Invalid form"
    }
    return {
        username:username,
        hashed_password:password,
        fullname:fullname
    }
}