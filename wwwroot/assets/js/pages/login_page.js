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