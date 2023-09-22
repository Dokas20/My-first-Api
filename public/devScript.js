

document.body.addEventListener('onload',async () => {
    const firstPass =   'fmXfsKmbRB52Scm0OLrnJZxoOs9vMbwVtOyzXNbm2YckUMB3MQZzyNDajF9tOhMZvuNOKfgD5fTO7VL1DanFwqhcRCr1GNfgOvVo'
    const secondPass = 'fWeWeF7ajQGVAAiftiIoNONWgGX054BRFqHNM3IezwXXSEeyi5QVqGbn7UOZ696bHHX3RBtI0VQYac2hUSKKSX0Sqbajs8NcCGr3'
    const thirdPass = 'lj1UKAIMjCNqUqFDxzoGCdww5FUsKOtbaLNmBVaTbsRdbw6SWfJ3bGapUmNzHkpV4PyCtfKVjQpPNxCaOX6XwpP9GcNzlhmyN3P2'
    
    loginDev(firstPass, secondPass,thirdPass).then(data => (devData = data)).catch((e)=>console.log(e))
    devData =await  loginDev(firstPass, secondPass,thirdPass)
    
    const devToken = devData.token
    const devRefreshToken = devData.refreshtoken

    const btnSubmit = document.getElementById('idsubmit')
    btnSubmit.addEventListener('click',  (e) => {
        e.preventDefault()
        const file = document.getElementById('idimage').value
        const destaqued = document.getElementById('destaque').value
        const name = document.getElementById('idname').value
        const description = document.getElementById('iddesc').value
        const price = document.getElementById('idprice').value
        const priceInCents = document.getElementById('idpriceCents').value
        const stock = document.getElementById('idstock').value
        console.log(devToken)
        /*
        const result = await fetch(`http://localhost:3000/car/addProduct`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                prodId : _id,
                qut: quantity
            })
        }).catch(e => {
            console.log(e.error)
        })
        const addProductMessage = await result.json()
        console.log(addProductMessage) */
    })
})
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
