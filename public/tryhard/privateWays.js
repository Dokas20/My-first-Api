const btn = document.getElementById('btnDiv')
const navId = document.getElementById('navId')
const contain = document.getElementById('menuContain')
const prodContainer = document.getElementById('prodContainer')
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


document.getElementById('searchContainer').addEventListener('click',() => {
    window.location = 'http://localhost:3000/tryhard/products.html'
})



if(products.length > 0){
    const idStoredNumber = localStorage.length
    for( let a = 0; a< idStoredNumber; a++){
        let item = JSON.parse(localStorage.getItem(`id_${a}`))
        createProdPost(item , prodContainer, a)
    }
    
}else if(products.length == 0){
    document.getElementById('noProducts').style.display= 'flex'
}

function createProdPost(prod, apendConst, idNumber){
    const div = document.createElement('div')
    const divForImg = document.createElement('div')
    const divForInfo = document.createElement('div')
    const divForSlects = document.createElement('div')
    const moveOutProd= document.createElement('div')
    const spanSize = document.createElement('span')
    const spanQunt = document.createElement('span')
    const h1 = document.createElement('h1')
    const price = document.createElement('p')
    const sizeTrulyOption = prod._size
    const stock = prod._allSize
    const src = prod._src;
    const  newImg = new Image()
    newImg.src= `../${src}`
        const sizeOptions = ['']

    for( let c =0; c< stock.length; c++){
        let number = stock[c]        
        let shoeNumber = 37+c 
        if (sizeTrulyOption == shoeNumber){
            sizeOptions[0] += ` <option value="${shoeNumber}" selected >${shoeNumber}</option>`
        }else if(number > 0){
            sizeOptions[0] += ` <option value="${shoeNumber}">${shoeNumber}</option>`
        }
    }
    const quantityOptions = ['']
    for( let c =1; c< 4; c++){
        let quantity = prod._quantity     
        if (quantity == c){
            quantityOptions[0] += ` <option value="${c}" selected >${c}</option>`
        }else {
            quantityOptions[0] += ` <option value="${c}">${c}</option>`
        }
    }

    spanQunt.innerHTML = ` <label for="iquantity"> Quantidade:</label>
    <select name="quantity" id="iquantity">
    ${quantityOptions[0]}
   </select>`
    spanSize.innerHTML = `    <label for="isize"> Tamanho:</label>        <select name="size" id="isize">
    ${sizeOptions[0]}
    </select>`
    h1.innerText= prod._name
    price.innerHTML = `<p>${prod._price} $</p>` 

   
    divForInfo.appendChild(h1)
    divForInfo.appendChild(price)
    divForSlects.appendChild(spanSize)
    divForSlects.appendChild(spanQunt)
    divForInfo.appendChild(moveOutProd)
    divForImg.append(newImg)
    divForInfo.append(divForSlects)
    div.append(divForImg)
    div.append(divForInfo)
    div.append(moveOutProd)
    moveOutProd.setAttribute('id', 'moveOutProd')
    div.setAttribute('id', 'productContainer')
    divForInfo.setAttribute('id', 'divForInfo')
    apendConst.appendChild(div)
 

    moveOutProd.addEventListener('click', ()=>{
        div.style.display= 'none'
        deleteProd(prod._prodId)
    } )
    spanSize.addEventListener('input', (e)=> {
        let value = e.target.value
        changeSize (value, prod , idNumber)
    })
    spanQunt.addEventListener('input', (e)=> {
        let value = e.target.value
        changeQuantity(value, prod , idNumber)
        
    })

    divForImg.addEventListener('click', ()=> {
        window.location = 'http://localhost:3000/tryhard/productSingel.html'
        sessionStorage.setItem('prod', JSON.stringify(prod._prodId))
    })
}
function deleteProd(prodId){
    const newProductsCar = []
    for( let a = 0; a< products.length; a++){
        let item = JSON.parse(localStorage.getItem(`id_${a}`))
        if(item._prodId != prodId){
            newProductsCar.push(item)
        } 
    }
    localStorage.clear()
    for(let c = 0; c< newProductsCar.length; c++){
        localStorage.setItem(`id_${c}`,  JSON.stringify(newProductsCar[c]));
    }
}
function changeSize (value, prod, idNumber){
    let product = prod
    product._size = value
    localStorage.setItem(`id_${idNumber}`, JSON.stringify(product))    
}
function changeQuantity (value, prod, idNumber){
    let product = prod
    product._quantity = value
    localStorage.setItem(`id_${idNumber}`, JSON.stringify(product))    
}


