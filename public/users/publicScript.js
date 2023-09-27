
const btnHamb = document.getElementById('menuHamburger')
/*
const menuAnimation = btnHamb.addEventListener('click', ()=>{
    document.getElementById('menu').classList.toggle('navShow')
    document.getElementById('header').classList.toggle('headerNav')
    btnHamb.style.display= "none"
    
    document.getElementById('main').addEventListener('click', ()=>{
        document.getElementById('menu').classList.remove('navShow')
        document.getElementById('header').classList.remove('headerNav')
        btnHamb.style.display = "block"
    })
    
}) */


btnHamb.addEventListener('click', async () => {
    //getAllProducts()
    //getAllDestaquedProducts()
    const idForOneProduct = '6509cd333ca238760bdb5e09'
    findOneProduct(idForOneProduct)
    //sigInUser(name,email,password)
    const email = 'duarteffsilva08@gmail.comm'
    const password = 'DOKASdokas'

    LoginUser(email, password).then(token =>(userToken = token) ).catch((e) => console.log(e))

    userToken= await LoginUser(email, password)
    //createCar (userToken)
    const _id = '65045ddb47c8ea5991c51682'
    const quantity = "1"
    //removeProduct (userToken,_id)
    //addProduct (userToken,_id,quantity)
    //quantityChange (userToken,_id,quantity)
    //searchCar (userToken)
    checkoutSession(userToken).then(url => window.location = url)
})

// Public Routs

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

// Login User routs 

async function sigInUser(name, email, password) {
    const result = await fetch(`http://localhost:3000/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    }).catch(e => {
        console.log(e.error)
    })
    const siginReturn = await result.json()
    if (siginReturn) return console.log(siginReturn)
}
async function LoginUser(email, password) {
    const result = await fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).catch(e => {
        console.log(e.error)
    })
    const LoginUserReturn = await result.json()
    return LoginUserReturn.token
}

// Car routs

async function createCar (token){
    const result = await fetch(`http://localhost:3000/car`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).catch(e => {
        console.log(e.error)
    })
    const createCarMessage = await result.json()
    console.log(createCarMessage)
}
async function removeProduct (token,_id){
    const result = await fetch(`http://localhost:3000/car/delete/${_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).catch(e => {
        console.log(e.error)
    })
    const removeProductMessage = await result.json()
    console.log(removeProductMessage)
}

async function addProduct (token,_id,quantity){
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
    console.log(addProductMessage)
}

async function quantityChange (token,_id,quantity){
    const result = await fetch(`http://localhost:3000/car/quantity/${_id}/${quantity}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).catch(e => {
        console.log(e.error)
    })
    const quantityChangeProductMessage = await result.json()
    console.log(quantityChangeProductMessage)
}
async function searchCar (token){
    const result = await fetch(`http://localhost:3000/car/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).catch(e => {
        console.log(e.error)
    })
    const searchCar = await result.json()
    console.log(searchCar)
}


// Payment Routs

async function checkoutSession (token){
    const result = await fetch(`http://localhost:3000/create-checkout-session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }) 
    return await result.json()
}


