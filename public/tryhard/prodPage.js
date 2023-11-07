const apendConst = document.getElementById('prodContainer')
const btn = document.getElementById('btnDiv')
const navId = document.getElementById('navId')
const serchInputDiv = document.getElementById('searchContainer')
const serchInput = document.getElementById('isearch')
const btnFilter = document.getElementById('filterContainer')
const filterSession = document.getElementById('filterSection')
const prodContain = document.getElementById('prodContainer')
const contain = document.getElementById('menuContain')

const aplyFilter = document.getElementById('filterForm')
const radioFilter = document.getElementsByName('Ordenar')
const priceFilter = document.getElementsByName('priceLimits')

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



serchInputDiv.addEventListener('click', ()=> {
    document.getElementById('line').classList.remove('navHide')
    
})
btnFilter.addEventListener('click', ()=> {
    filterSession.style.display= 'block'
    prodContain.style.display= 'none'
})

document.getElementById('backContain').addEventListener('click', ()=> {
    filterSession.style.display= 'none'
    prodContain.style.display= 'flex'

})

document.getElementById('iPriceMin').addEventListener('input', (e) => {
    const divMin = document.getElementsByClassName('minPiceDiv')
    divMin[0].innerHTML = e.target.value
    divMin[1].innerHTML = e.target.value
})
document.getElementById('iPriceMax').addEventListener('input', (e) => {
    const divMax = document.getElementsByClassName('maxPiceDiv')
    divMax[0].innerHTML= e.target.value
    divMax[1].innerHTML= e.target.value
})

document.getElementById('resetBtn').addEventListener('click', ()=> {
    const divMax = document.getElementsByClassName('maxPiceDiv')
    divMax[0].innerHTML= '500'
    divMax[1].innerHTML= '500'
    const divMin = document.getElementsByClassName('minPiceDiv')
    divMin[0].innerHTML = '50'
    divMin[1].innerHTML = '50'
})





/*  API AND DEEP JAVASCRIPT*/
const dataShoes = []
atributeShoes()
async function atributeShoes(){
    const shoes = await getAllProducts()
    dataShoes.push(shoes)
}

async function getAllProducts() {
    const result = await fetch("http://localhost:3000/products").catch(e => { console.log(e.error) })

    const dataAllProducts = await result.json()
    return dataAllProducts
}


const shoesValue = []
const filterArray = []
serchInput.addEventListener('click', async ()=> {
    const shoes =  dataShoes[0]
    for(let a = 0; a< 200; a++){
        const time = 3000 + a*3000
        setInterval(time, shoes)
        console.log(a)
    }
})
function setInterval(time, shoes){
        setTimeout(()=> {
            if(serchInput.value != shoesValue){
                searchForShoes(shoes)
            }
        }, time)
    }
    
    async function searchForShoes (shoes){
    const searchValue = serchInput.value
    var regEx = new RegExp(`${searchValue}`, "i")
    shoesValue[0]= searchValue
    prodContain.innerHTML= ''
    console.log(shoes)
    if (filterArray.length == 0){

        shoes.map((shoe) => {
            const name = shoe.name
            if(name.match(regEx)){
                console.log(name)
                createProdPost(shoe, apendConst)
            }
        })
    } else {
        const minPrice = filterArray[0]
        const maxPrice = filterArray[1]
        
        shoes.map((shoe) => {
            let name = shoe.name
            let price = shoe.price
            if(name.match(regEx) && price >= minPrice && price <= maxPrice){
                console.log(name)
                createProdPost(shoe, apendConst)
            }
        })
    }
}

/*  FIlter   */


aplyFilter.addEventListener('submit',async (e)=> {
    e.preventDefault()
    filterSession.style.display= 'none'
    prodContain.style.display= 'flex'
    const radioFilterValue = []
    if(radioFilter[0].checked){
        radioFilterValue[0] ='Recomendado'
    }
    else if(radioFilter[1].checked){
        radioFilterValue[0] ='PreçoMenor'
    }
    else if(radioFilter[2].checked){
        radioFilterValue[0] ='PreçoMaior'
    }
    const minPrice = priceFilter[0].value
    const maxPrice = priceFilter[1].value
    
    const shoes = dataShoes[0]
    const recomendShoes = await getAllProducts()
    
    if(radioFilterValue[0] != 'Recomendado')
    {
        sortPrice(shoes, radioFilterValue[0])
        aplyFilters(shoes , minPrice, maxPrice)
    }else {
        aplyFilters(recomendShoes , minPrice, maxPrice)
    }
})

function aplyFilters(shoes, minPrice, maxPrice){
    prodContain.innerHTML= ''
    shoes.map((prod) => {
        const searchValue = serchInput.value
        var regEx = new RegExp(`${searchValue}`, "i")
        const price = prod.price
        if(prod.name.match(regEx) && price >= minPrice && price <= maxPrice)
        {
            createProdPost(prod, apendConst)
        }
    })
    filterArray[0] = minPrice
    filterArray[1] = maxPrice
}

function sortPrice (shoes, minMax){
    if(minMax == 'PreçoMaior'){
        shoes.sort( (p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0)
        
        
    } else if(minMax == 'PreçoMenor'){
        
        let sortedProducts = shoes.sort( (p1, p2) => (p1.price > p2.price) ? 1 : (p1.price < p2.price) ? -1 : 0)
        return sortedProducts
    }
    
}





printAllShoes()
async function printAllShoes (){
    const shoes = await getAllProducts()
    shoes.map((prod)=> { createProdPost(prod,apendConst)})
}

function createProdPost(prod, apendConst){

    const div = document.createElement('div')
    const divForImg = document.createElement('div')
    const divForInfo = document.createElement('div')
    const h1 = document.createElement('p')
    const price = document.createElement('p')
    const src = prod.src.slice(7);
    const  newImg = new Image()
    newImg.src= `../${src}`

    newImg.setAttribute('width', '300px');
    newImg.setAttribute('height', '300px');
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
    })   
}


