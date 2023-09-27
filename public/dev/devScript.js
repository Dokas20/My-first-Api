const btnSubmit = document.getElementById('isubmit')

const devTokens = []

btnSubmit.addEventListener('click',async (e) => {
    
    e.preventDefault()
    const firstPass= document.getElementById('iPass1').value
    const secondPass= document.getElementById('iPass2').value
    const thirdPass= document.getElementById('iPass3').value

    loginDev(firstPass, secondPass,thirdPass).then(data => (devData = data)).catch((e)=>console.log(e))
    devData =await  loginDev(firstPass, secondPass,thirdPass)
    console.log(devData)
    if(devData.token){
        tokens = {
            token: devData.token,
            refreshtoken :devData.refreshtoken 
        }
        
        devTokens.push(tokens) 
        
    }else{
       return console.log(devData)
    }
    
})
//const idForDelete = '651075750e5c508fde4ff029'
//deleteProduct(devToken, idForDelete)
//getEmails(devToken)
//addProduct(devToken)
/*
*/
// Dev Routs


/*
regenerateToken(devRefreshToken).then(data => (secondToken = data)).catch((e)=> console.log(e))
secondToken = await regenerateToken(devRefreshToken)
console.log(secondToken)
*/



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
}
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
}

// Products 

async function getAllProducts() {
    const result = await fetch("http://localhost:3000/products").catch(e => { console.log(e.error) })
    
    const dataAllProducts = await result.json()
    if (dataAllProducts) return console.log(dataAllProducts)
}
async function getAllDestaquedProducts() {
    const result = await fetch("http://localhost:3000/products/destaqued").catch(e => {
        console.log(e.error)
    })
    const dataAllDestaquedProducts = await result.json()
    if (dataAllDestaquedProducts) return console.log(dataAllDestaquedProducts)
}


async function findOneProduct(id) {
    const result = await fetch(`http://localhost:3000/products/${id}`).catch(e => {
        console.log(e.error)
    })
    const dataOneProduct = await result.json()
    if (dataOneProduct) return console.log(dataOneProduct)
}

async function addProduct(devToken){
    const files = document.getElementById('idimage')
    const destaqued = document.getElementById('destaque').value
    const name = document.getElementById('idname').value
    const description = document.getElementById('iddesc').value
    const price = document.getElementById('idprice').value
    const priceInCents = document.getElementById('idpriceCents').value
    const stock = document.getElementById('idstock').value
    let destaque = (destaqued.toLowerCase() === 'true')

    const formData = new FormData();
    formData.append("destaque",destaque)
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("priceInCents", priceInCents)
    formData.append("stock", stock)
    for(let i =0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }
    
    fetch(`http://localhost:3000/products/`, {
        method: "POST",
        headers: {
//"Content-Type": "application/json",
            Authorization: `Bearer ${devToken}`
        },
        body: formData,

    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(e => {
        console.log(e.error)
    })
}

async function deleteProduct (token, id){
    const result = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }).catch(e => {
        console.log(e.error)
    })
    const logoutMessage = await result.json()
    console.log(logoutMessage)
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
    const dataProducts = await result.json()
    console.log(dataProducts)
}
