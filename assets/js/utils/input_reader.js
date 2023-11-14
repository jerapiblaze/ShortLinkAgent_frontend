function get_url_input(){
    let original_url_box = document.getElementById("url_input_box")
    let url_id_box = document.getElementById("custom_alias_input_box")
    let require_login_checkbox = document.getElementById("block_annon_check_box")
    let original_url_value = original_url_box ? original_url_box.value : null
    let url_id_value = url_id_box ? url_id_box.value : null
    let require_login_value = require_login_checkbox ? require_login_checkbox.checked : false
    if (!original_url_value){
        alert("The URL field cannot be empty")
        throw "No input"
    }
    let requestBody = {
        original_url:original_url_value,
        url_id:url_id_value,
        require_login:require_login_value
    }
    return requestBody
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