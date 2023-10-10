const btnSubmit = document.getElementById('isubmit')
const token = sessionStorage.getItem('token')


if(!token){  

    btnSubmit.addEventListener('click',async (e) => {
        
        e.preventDefault()
        const firstPass= document.getElementById('iPass1').value
    const secondPass= document.getElementById('iPass2').value
    const thirdPass= document.getElementById('iPass3').value
    
    loginDev(firstPass, secondPass,thirdPass).then(data => (devData = data)).catch((e)=>console.log(e))
    devData =await  loginDev(firstPass, secondPass,thirdPass)
    if(devData.token){
       sessionStorage.setItem('token', `${devData.token}`)
       
       const url = document.createElement('a')
        url.setAttribute('href', `devInterface.html`)
        window.location = url.href
    }else{
        document.getElementById('apiResponse').innerText= devData
    }
    
})
} else if(token && document.getElementById('Destaqued')){
    
    menuHamburguer()
    showTheFirstInformations()
}

function menuHamburguer(){
    const btnMenu = document.getElementById('menuDiv')
    btnMenu.addEventListener('click', ()=> {
        document.getElementById('menu').classList.toggle('menuShow')
    })
    document.getElementById('imain').addEventListener('click', ()=> {
        document.getElementById('menu').classList.remove('menuShow')
    })
}
function showTheFirstInformations(){
    const Destaqued= document.getElementById('Destaqued')
    const allProducts= document.getElementById('allProducts')
    
    getAllDestaquedProducts().then((prod)=> {
        for(let a = 0; a< prod.length; a++){
            createProdPost(prod[a],Destaqued )
        }
    })
    
    getAllProducts().then((prod)=> {
        for(let c = 0; c< prod.length; c++){
            createProdPost(prod[c],allProducts)
        }
        
    })
    
}

function createProdPost(prod, apendConst){
    const div = document.createElement('div')
    const divForImg = document.createElement('div')
    const divForInfo = document.createElement('div')
    const h1 = document.createElement('h1')
    const description = document.createElement('p')
    const src = prod.src.slice(7);
    const  newImg = new Image()
    newImg.src= `../${src}`

    // Test
    newImg.setAttribute('width', '300px');
    newImg.setAttribute('height', '300px');


    
    h1.innerText= prod.name
    description.innerText = prod.description
   
    
    divForInfo.appendChild(h1)
    divForInfo.appendChild(description)
    divForImg.append(newImg)
    div.append(divForImg)
    div.append(divForInfo)
  //  div.appendChild(img)
  div.classList.add('productsDiv')
  apendConst.appendChild(div)
}


async function loginDev(firstPass, secondPass,thirdPass) {
    const result = await fetch(`http://localhost:3000/dev/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstPass: firstPass,
            secondPass: secondPass,
            thirdPass: thirdPass
        })
    }).catch(e => {
        console.log(e.error)
    })
    const LoginDevReturn = await result.json()
    return LoginDevReturn
}/*
async function regenerateToken (refreshtoken){
    const result = await fetch(`http://localhost:3000/dev/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: refreshtoken
        })
    }).catch(e => {
        console.log(e.error)
    })
    const regeneratedToken = await result.json()
    return regeneratedToken
}

regenerateToken(refreshToken).then(data=> (secondToken = data)).catch((e)=> console.log(e))
secondToken = regenerateToken(refreshToken)
console.log(secondToken)


async function logoutDev (token){
    const result = await fetch(`http://localhost:3000/dev/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token
        })
    }).catch(e => {
        console.log(e.error)
    })
    const logoutMessage = await result.json()
    console.log(logoutMessage)
}
async function logoutAllDev (token){
    const result = await fetch(`http://localhost:3000/dev/logoutAll`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            token: token,
            Authorization: `Bearer ${token}`
        })
    }).catch(e => {
        console.log(e.error)
    })
    const logoutMessage = await result.json()
    console.log(logoutMessage)
}*/

// Products 


async function getAllProducts() {
    const result = await fetch("http://localhost:3000/products").catch(e => { console.log(e.error) })
    
    const dataAllProducts = await result.json()
    if (dataAllProducts) return dataAllProducts
}
async function getAllDestaquedProducts() {
    const result = await fetch("http://localhost:3000/products/destaqued").catch(e => {
        console.log(e.error)
    })
    const dataAllDestaquedProducts = await result.json()
    if (dataAllDestaquedProducts) return dataAllDestaquedProducts
}
