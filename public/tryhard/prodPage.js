
const btn = document.getElementById('btnDiv')
const navId = document.getElementById('navId')
const serchInputDiv = document.getElementById('searchContainer')
const serchInput = document.getElementById('isearch')
const btnFilter = document.getElementById('filterContainer')
const filterSession = document.getElementById('filterSection')
const prodContain = document.getElementById('prodContainer')
const contain = document.getElementById('menuContain')


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







const setTime = []
const setTimeLenht = setTime.length
serchInput.addEventListener('click', async ()=> {
 setTimeout(()=> {searchForShoes()},3000);
 
})
serchInput.addEventListener('input', ()=> {
    functionAWED()
})

function functionAWED(){
    searchForShoes().then((prod)=> {console.log(prod)})

}

    

async function searchForShoes (){
    const searchValue = serchInput.value
    prodContain.innerHTML= ''
    var regEx = new RegExp(`${searchValue}`, "i")
    const shoes = await getAllProducts()
    

    //console.log(shoes)
}

printAllShoes()
async function printAllShoes (){
    const shoes = await getAllProducts()
    const apendConst = document.getElementById('prodContainer')
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
    /*
    div.addEventListener('click', ()=> {
        sessionStorage.setItem('prodId', `${prod._id}`)
        window.location = 'http://localhost:3000/users/oneProd.html'
    })   */
}

async function getAllProducts() {
    const result = await fetch("http://localhost:3000/products").catch(e => { console.log(e.error) })

    const dataAllProducts = await result.json()
    return dataAllProducts
}


