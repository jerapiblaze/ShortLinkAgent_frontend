async function SignupPage(){
    if (await CheckLogin()){
        window.location.replace("advanced_index.html")
        return
    }
    document.getElementById("signup-btn").onclick = NewUser
}