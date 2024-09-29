
const fetching = async()=>{
    const api = await fetch("api/v1/tasks")
    const ajs = await api.json()
    // console.log(ajs)
    const getLength = ajs.length
    const textarea = document.getElementsByClassName("area")
    const card = document.getElementsByClassName("card")
    let i = 0
    while(i < getLength)
    {
        let uidiv = document.createElement('div')
        uidiv.className = 'task_id'
        uidiv.textContent = ajs[i]._id
        uidiv.style.display = "none"
        let newCard = card[0].cloneNode(true)
        newCard.textContent = ajs[i].name
        if(ajs[i].completed)
        {
            newCard.style.setProperty("text-decoration","line-through");
        }
        newCard.appendChild(uidiv)
        textarea[0].appendChild(newCard)
        i++
    }
    var cards = document.getElementsByClassName("card")
    const remove = cards[0];
    remove.parentNode.removeChild(remove)
}

const handleEvents = () => {
    setTimeout(()=>{
        const c = document.getElementsByClassName('card')
        for( let i  = 0 ; i< c.length ;  i ++ )
        {
            // console.log(c[i].children)
            c[i].addEventListener('click', () => {
                window.location.href = "/task/" + c[i].childNodes[1].textContent 
                // window.location.href = "/api/v1/tasks/"+c[i].childNodes[1].textContent
                // console.log(c[i].childNodes[1].textContent)
            })
        }
        document.getElementById('create').addEventListener('click',async ()=>{
            let val = document.getElementById('tasktext').value
            // console.log(val)
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            const raw = JSON.stringify({
              "name": val
            });
            
            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
            };
            // console.log(requestOptions)
            const t = await fetch("/api/v1/tasks", requestOptions)
            const res = await t.json()
            // console.log(res)
            location.reload()
        })
    },1000) 
}




fetching()
handleEvents()

