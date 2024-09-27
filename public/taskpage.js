let urlParts = window.location.href.split('/')
var lastPart = urlParts.pop() || urlParts.pop()


const getSingleAndRender = async () => {
    const t = await fetch('/api/v1/tasks/' + lastPart)
    const ob = await t.json()
    //console.log(ob["task"])
    let ida = document.getElementById("uid")
    ida.innerText = ob["task"]._id
    let pn = document.getElementById("pname")
    pn.innerText = ob["task"].name
    if (ob["task"].completed) {
        document.getElementById("rt").checked = true
    } else {
        document.getElementById("rf").checked = true
    }
    document.getElementById("updateText").value = ob["task"].name
}
const goback = () => {
    window.location.href = "/"
}

const reload = () => {
    location.reload()
}

const del = async () => {
    const res = await fetch("/api/v1/tasks/" + lastPart, {
        method: "DELETE"
    })
    if (res.status == 200) {
        alert("Success!!")
        window.location.href = "/"
    }
    else {
        alert("error")
    }
}

const updateData = async () => {
    const text = document.getElementById('updateText').value
    var status = false
    if (document.getElementById('rt').checked == true) {
        status = true
    }
    // console.log(text)
    // console.log(status)
    const t = await fetch('/api/v1/tasks/' + lastPart, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ "name": text, "completed": status }),
        redirect: "follow"
    })
    // console.log(t)
    if (t.status == 200) {
        alert("Success")
        location.reload()
    }
    else {
        alert("error")
    }
}

getSingleAndRender()