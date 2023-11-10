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
    const extraInfo = dataProd.extraInfo
    const avaliation = dataProd.avaliation
    const price = `${dataProd.price} $`
    const src = dataProd.src[0].slice(7);
    const  newImg = new Image()
    newImg.src= `../${src}`
    newImg.setAttribute('id', 'imgProd')
/*
    document.getElementById('mainImg').innerHTML = `<img src="../${dataProd.src[0].slice(7)}" alt="imagen do produto">`
*/

    const nameContain = document.getElementById('nameContain')
    const descriptionContain = document.getElementById('descritionP')
    const priceContain = document.getElementById('priceContain')
    const imgContain = document.getElementById('mainImg')
    const extraInfoContain = document.getElementById('extraInfoContain')
    const img1 = document.getElementById('img1')
    const img2 = document.getElementById('img2')
    const img3 = document.getElementById('img3')
    const img4 = document.getElementById('img4')

    img1.style.width= '25px'
    img1.style.height= '25px'

    img1.innerHTML =  `<img id="img1Style" src="../${dataProd.src[1].slice(7)}" alt="imagen do produto">`
    img2.innerHTML =  `<img id="img2Style" src="../${dataProd.src[1].slice(7)}" alt="imagen do produto">`
    img3.innerHTML =  `<img id="img3Style" src="../${dataProd.src[2].slice(7)}" alt="imagen do produto">`
    img4.innerHTML =  `<img id="img4Style" src="../${dataProd.src[2].slice(7)}" alt="imagen do produto">`
    extraInfoContain.innerText = extraInfo
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