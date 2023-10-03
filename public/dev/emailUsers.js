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
        if(users.length < 10){  
            for(let c = 0; c< users.length; c++){
                printEmails(users[c])
            }
        } else{
            for(let c = 0; c< 10; c++){
                printEmails(users[c])
            }

            
        }
    })
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
    const userLenght = document.getElementById('informations')
    userLenght.innerHTML = `Número de usuários logados:   <strong>${dataUsers.length} </strong>.`
}

