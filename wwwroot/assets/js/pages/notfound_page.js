async function NotFoundPage(){
    for (let i = 30; i>=0; i--){
        document.getElementById("msg-box").innerHTML = `Going back in <strong>${i}</strong>...`
        await sleep(1000)
    }
    window.location.replace("index.html")
    document.getElementById("msg-box").innerHTML = "It looks like we can't take you back automatically... Please, go back on your own. Sorry."
}