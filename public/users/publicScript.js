
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

btnHamb.addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('menuShow')
})

document.getElementById('main').addEventListener('click', ()=> {
        document.getElementById('menu').classList.remove('menuShow')
    
})
printDestaquedProducts()
async function printDestaquedProducts(){
    const container = document.getElementById('productsContainer')

    const products = await getAllDestaquedProducts()
    products.map((prod) => createProdPost(prod, container))
}
function createProdPost(prod, apendConst){

    const div = document.createElement('div')
    const divForImg = document.createElement('div')
    const divForInfo = document.createElement('div')
    const h1 = document.createElement('h1')
    const description = document.createElement('p')
    const price = document.createElement('p')
    const src = prod.src.slice(7);
    const  newImg = new Image()
    newImg.src= `../${src}`

    newImg.setAttribute('width', '300px');
    newImg.setAttribute('height', '300px');
    divForImg.setAttribute('id', 'prodImg');
    
    h1.innerText= prod.name
    description.innerText = prod.description
    price.innerHTML = `<p> <strong>${prod.price}</strong> </p>` 
   
    divForInfo.appendChild(h1)
    divForInfo.appendChild(description)
    divForInfo.appendChild(price)
    divForImg.append(newImg)
    div.append(divForImg)
    div.append(divForInfo)
    div.classList.add('productsDiv')
    apendConst.appendChild(div)

    div.addEventListener('click', ()=> {
        sessionStorage.setItem('prodId', `${prod._id}`)
        window.location = 'http://localhost:3000/users/oneProd.html'
    })
}




/*
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
checkoutSession(userToken).then(url => window.location = url)*/
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
    return dataAllDestaquedProducts
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


