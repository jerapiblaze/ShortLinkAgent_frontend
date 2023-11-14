async function MaintaincePage(){
    clearInterval(bg_ping_id)
    for (let i = PING_INTERVAL; i>=0; i--){
        document.getElementById("msg-box").innerHTML = `Retrying in <strong>${i}</strong>...`
        await sleep(1000)
    }
    window.location.href = "index.html"
    return
}