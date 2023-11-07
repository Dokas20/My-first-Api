const btn = document.getElementById('btnDiv')
const navId = document.getElementById('navId')
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


const prodId = sessionStorage.getItem('prodId')
setInformations()
async function setInformations (){
    const dataProd = await findOneProduct(prodId)

    const name = dataProd.name
    const description = dataProd.description
    const price = `${dataProd.price} $`
    const src = dataProd.src.slice(7);
    const  newImg = new Image()
    newImg.src= `../${src}`
    newImg.setAttribute('id', 'imgProd')


    const nameContain = document.getElementById('nameContain')
    const descriptionContain = document.getElementById('descritionP')
    const priceContain = document.getElementById('priceContain')
    const imgContain = document.getElementById('mainImg')

    nameContain.innerHTML = name
    descriptionContain.innerHTML = description
    priceContain.innerHTML = price
    imgContain.append(newImg)
}

async function findOneProduct(id) {
    const result = await fetch(`http://localhost:3000/products/${id}`).catch(e => {
        console.log(e.error)
    })
    const data = result.json()
    return data
}