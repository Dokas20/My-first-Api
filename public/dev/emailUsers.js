const token = sessionStorage.getItem('token')
const refreshToken = sessionStorage.getItem('refreshToken')

menuHamburguer()

function menuHamburguer(){
    const btnMenu = document.getElementById('menuDiv')
    btnMenu.addEventListener('click', ()=> {
        document.getElementById('menu').classList.toggle('menuShow')
    })
    document.getElementById('imain').addEventListener('click', ()=> {
        document.getElementById('menu').classList.remove('menuShow')
    })
}
putAllInformations(token)
function putAllInformations(token){
    getEmails(token).then((users) => {
        printUserslogedNumber(users)
        if(users.length < 20){  
            users.map((a)=>printEmails(a))
        } else{
            sohwAllEmails()
            for(let c = 0; c< 20; c++){
                printEmails(users[c])
                document.getElementById('showAll').addEventListener('click', ()=>{
                    document.getElementById('nameAndProduct').innerHTML= ''
                    users.map((a)=>printEmails(a) )
                })
            }
            
        }
    })
}
function sohwAllEmails(){
    const btn = document.createElement('div')
    btn.innerHTML = ` <div id="showAll">Mostrar todos os emails </div>`

    const container = document.getElementById('informations')
    container.append(btn)
}   

async function getEmails (token){
    const result = await fetch(`http://localhost:3000/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }).catch(e => {
        console.log(e.error)
    })
    const dataUsers = await result.json()
    return dataUsers
}

function printEmails(prod){
    const divEmail = document.createElement('div')
    const mainDiv = document.createElement('div')
    const divName = document.createElement('div')

    divEmail.innerText = `Email: ${prod.email}`
    divName.innerText = `Nome: ${prod.name}`
    
    mainDiv.append(divName)
    mainDiv.append(divEmail)
    mainDiv.classList.add('emailBox')
    divEmail.classList.add('userInfoDivs')

    const container = document.getElementById('nameAndProduct')
    container.append(mainDiv)
}

function printUserslogedNumber(dataUsers){
    const container = document.getElementById('informations')
    const userLenght = document.createElement('p')
    userLenght.innerHTML = `Número de usuários logados: <strong>${dataUsers.length} </strong>.`
    container.append(userLenght)
}

