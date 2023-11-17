const btn = document.getElementById('btnDiv')
const navId = document.getElementById('navId')
const contain = document.getElementById('menuContain')
const prodContainer = document.getElementById('container')
const products = localStorage 

btn.addEventListener('click', ()=> {

    if(navId.classList.value){
        navId.style.display = 'none'
        document.getElementById('main').classList.remove('opacicity')
    } else{
        navId.style.display = 'block'
        document.getElementById('main').classList.toggle('opacicity')
    }
    navId.classList.toggle('navShow')
    contain.classList.toggle('navMenu')
    document.getElementById('menuLeave').classList.toggle('notNav')

    document.getElementById('menuLeave').addEventListener('click', ()=> {
        navId.classList.remove('navShow')
        contain.classList.remove('navMenu')
        document.getElementById('menuLeave').classList.remove('notNav')
        navId.style.display = 'none'
        document.getElementById('main').classList.remove('opacicity')

    })

})

document.getElementById('btnLupa').addEventListener('click',() => {
    window.location = 'http://localhost:3000/tryhard/products.html'
})

if(products){
    const idStoredNumber = localStorage.length
    for( let a = 0; a< idStoredNumber; a++){
        const item = localStorage.getItem(`id_${a}`)
        findOneProduct(item)
    }
    
}else{
    
}
async function findOneProduct(id) {
    const result = await fetch(`http://localhost:3000/products/${id}`).catch(e => {
        console.log(e.error)
    })
    const data = await result.json()
    createProdPost(data, prodContainer)
}

function createProdPost(prod, apendConst){

    console.log(prod)
    const div = document.createElement('div')
    const divForImg = document.createElement('div')
    const divForInfo = document.createElement('div')
    const h1 = document.createElement('p')
    const price = document.createElement('p')
    const src = prod.src[0].slice(7);
    const  newImg = new Image()
    newImg.src= `../${src}`


    h1.setAttribute('id', 'h1Prod')
    
    h1.innerText= prod.name
    price.innerHTML = `<p>${prod.price} $</p>` 
   
    divForInfo.appendChild(h1)
    divForInfo.appendChild(price)
    divForImg.append(newImg)
    div.append(divForImg)
    div.append(divForInfo)
    apendConst.appendChild(div)
    div.classList.add('productsContainer')
    
    div.addEventListener('click', ()=> {
        sessionStorage.setItem('prodId', `${prod._id}`)
        window.location = 'http://localhost:3000/tryhard/productSingel.html'
        addPopularity(prod._id)
    })   
}
