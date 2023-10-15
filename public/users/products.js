const container = document.getElementById('prodContainer')
const btnHamb = document.getElementById('menuHamburger')

btnHamb.addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('menuShow')
})

document.getElementById('main').addEventListener('click', ()=> {
    document.getElementById('menu').classList.remove('menuShow')
    
})

document.getElementById('filterHide').addEventListener('click', ()=> {
    document.getElementById('priceFilter').classList.toggle('menuShow')
})

async function getAllProducts() {
   const result = await fetch("http://localhost:3000/products").catch(e => { console.log(e.error) })

   const dataAllProducts = await result.json()
   return dataAllProducts
}

const products = getAllProducts()
products.then((e)=> {
    if(e.length > 10 ){
        for( let a = 0 ; a < 10 ; a++){
            createProdPost(e[a], container)
        }
    } else{
        e.map((prod)=> {createProdPost(prod, container)})
    }
})


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


const btnSearch = document.getElementById('allProdSubmit')
btnSearch.addEventListener('click', async ()=> {
    const inputSearch = document.getElementById('isearch').value
    console.log(inputSearch)
    container.innerHTML= ''
    const prodNotFound = []
    const product = await products
    const prodLength = product.length

    var regEx = new RegExp(`${inputSearch}`, "i")

    const priceFilter = document.getElementById('priceFilter')
    if(priceFilter.classList == "menuHide") {
            product.map((prod) => {
            const name = prod.name
            if(name.match(regEx)){
                createProdPost(prod, container)
            }else{
                prodNotFound.push('a')
            }
        })
    } else{

        const minPrice = document.getElementById('iPriceMin').value
        const maxPrice = document.getElementById('iPriceMax').value

        product.map((prod) => {
            const name = prod.name
            if(name.match(regEx) && minPrice <= prod.price && maxPrice >= prod.price){
                createProdPost(prod, container)
            } else{
                prodNotFound.push('a')
            }
        })
        

    
    }
    if(prodNotFound.length == prodLength){
        container.innerText = 'Produtos não encontrados'
    }


})

document.getElementById('iPriceMax').addEventListener('input', (e) => {
    const divMax = document.getElementById('maxPiceDiv')
    divMax.innerHTML = e.target.value
})
document.getElementById('iPriceMin').addEventListener('input', (e) => {
    const divMin = document.getElementById('minPiceDiv')
    divMin.innerHTML = e.target.value
})
