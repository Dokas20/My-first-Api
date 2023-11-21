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




if(products){
    const idStoredNumber = localStorage.length
    for( let a = 0; a< idStoredNumber; a++){
        let item = JSON.parse(localStorage.getItem(`id_${a}`))
        createProdPost(item , prodContainer)
    }
    
}else{
    
}

function createProdPost(prod, apendConst){

    console.log(prod)
    const div = document.createElement('div')
    const divForImg = document.createElement('div')
    const divForInfo = document.createElement('div')
    const h1 = document.createElement('p')
    const price = document.createElement('p')
    const quantity = document.createElement('select')
    const size = document.createElement('select')
    const stock = prod._allSize
    const src = prod._src;
    const  newImg = new Image()
    newImg.src= `../${src}`

    quantity.innerHTML= `
        <select name="quantity" id="iquantity">
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        </select>
        `
        const sizeOptions = ['']

    for( let c =0; c< stock.length; c++){
        let number = stock[c]        
        let shoeNumber = 37+c 
        if(number > 0){
            sizeOptions[0] += ` <option value="${shoeNumber}">${shoeNumber}</option>`
        }
    }
    size.innerHTML = `
        <select name="quantity" id="iquantity">
        ${sizeOptions[0]}
        </select>
    `


    
    h1.innerText= prod._name
    price.innerHTML = `<p>${prod._price} $</p>` 
   
    divForInfo.appendChild(h1)
    divForInfo.appendChild(price)
    divForImg.append(newImg)
    div.append(divForImg)
    div.append(divForInfo)
    apendConst.appendChild(div)
    div.classList.add('productsContainer')
 
}
