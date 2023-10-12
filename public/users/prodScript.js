const id = sessionStorage.getItem('prodId')
const token = sessionStorage.getItem('token')
const btnHamb = document.getElementById('menuHamburger')


btnHamb.addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('menuShow')
})

document.getElementById('main').addEventListener('click', ()=> {
        document.getElementById('menu').classList.remove('menuShow')
    
})
findOneProduct(id)

async function findOneProduct(id) {
    const result = await fetch(`http://localhost:3000/products/${id}`).catch(e => {
        console.log(e.error)
    })
    const dataOneProduct = await result.json()
    const infoContainer = document.getElementById('infoContainer')
    const imgContainer = document.getElementById('imgContainer')
    prodContainer(dataOneProduct, infoContainer, imgContainer)
}
function prodContainer(prod, infoContainer, imgContainer){
    
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    const description = document.createElement('p')
    const price = document.createElement('p')
    const src = prod.src.slice(7);
    const  newImg = new Image()
    newImg.src= `../${src}`

    
    newImg.setAttribute('width', '100%');
    newImg.setAttribute('height', '100%');
    
    h1.innerText= prod.name
    description.innerText = prod.description
    price.innerHTML = `<p> <strong>${prod.price}</strong> </p>` 
   
    div.appendChild(h1)
    div.appendChild(description)
    div.appendChild(price)
    imgContainer.append(newImg)
    infoContainer.append(div)
    //div.classList.add('productsDiv')
}
const btnAddCart = document.getElementById('btnAddCart')
btnAddCart.addEventListener('click', ()=> {
const innerBtn = btnAddCart.innerText

if(innerBtn == 'Faça o login de Usuário'){

        console.log('heba')
} else{
     if(!token){
                btnAddCart.innerText = 'Faça o login de Usuário'
     } else {
        const quantity = 1
        addProduct(token,id,quantity)
    }
}
})
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