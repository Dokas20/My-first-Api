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

btnHamb.addEventListener('click',async  () =>{ 
    //getAllProducts()
    //getAllDestaquedProducts()
    const idForOneProduct = '6509cd333ca238760bdb5e09'
    //findOneProduct(idForOneProduct)
    //sigInUser(name,email,password)
    const email = 'duarteffsilva08@gmail.comm'
    const password = 'DOKASdokas'
    const UserToken = LoginUser(email,password)
})
// Public Routs

async function getAllProducts(){
    const result = await    fetch("http://localhost:3000/products").catch(e => {
        console.log(e.error)
      })
    const dataAllProducts = await result.json()
    if(dataAllProducts) return console.log(dataAllProducts)
}
async function getAllDestaquedProducts(){
    const result = await    fetch("http://localhost:3000/products/destaqued").catch(e => {
        console.log(e.error)
      })
    const dataAllDestaquedProducts = await result.json()
    if(dataAllDestaquedProducts) return console.log(dataAllDestaquedProducts)
}


async function findOneProduct(id){
    const result = await    fetch(`http://localhost:3000/products/${id}`).catch(e => {
        console.log(e.error)
      })
    const dataOneProduct = await result.json()
    if(dataOneProduct) return console.log(dataOneProduct)
}

// Login routs 

async function sigInUser(name,email,password){
    const result = await    fetch(`http://localhost:3000/user/register`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
            name: name,
            email: email,
            password:password
        })
    }).catch(e => {
        console.log(e.error)
      })
    const siginReturn = await result.json()
    if(siginReturn) return console.log(siginReturn)
}
async function LoginUser(email,password){
    const result = await  fetch(`http://localhost:3000/user/login`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password:password
        })
    }).catch(e => {
        console.log(e.error)
      })
    const LoginUserReturn = await result.json()
    return LoginUserReturn
}

