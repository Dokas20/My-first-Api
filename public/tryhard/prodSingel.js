const btn = document.getElementById('btnDiv')
const navId = document.getElementById('navId')
const contain = document.getElementById('menuContain')
const addCarBtn = document.getElementById('callToAction')

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
    const avaliationString = avaliation.toString()
    const price = `${dataProd.price} $`
    const src = dataProd.src[0].slice(7);
    const  newImg = new Image()
    newImg.src= `../${src}`
    newImg.setAttribute('id', 'imgProd')

    const nameContain = document.getElementById('nameContain')
    const descriptionContain = document.getElementById('descritionP')
    const priceContain = document.getElementById('priceContain')
    const imgContain = document.getElementById('mainImg')
    const extraInfoContain = document.getElementById('extraInfoContain')
    const img1 = document.getElementById('img1')
    const img2 = document.getElementById('img2')
    const img3 = document.getElementById('img3')
    const img4 = document.getElementById('img4')
    const avaliationContain = document.getElementById('avaliation')
    img1.innerHTML =  `<img class="imgStyle" src="../${dataProd.src[0].slice(7)}" alt="imagen do produto">`
    img2.innerHTML =  `<img class="imgStyle" src="../${dataProd.src[1].slice(7)}" alt="imagen do produto">`
    img3.innerHTML =  `<img class="imgStyle" src="../${dataProd.src[2].slice(7)}" alt="imagen do produto">`
    img4.innerHTML =  `<img class="imgStyle" src="../${dataProd.src[3].slice(7)}" alt="imagen do produto">`
    extraInfoContain.innerText = extraInfo
    nameContain.innerHTML = name
    descriptionContain.innerHTML = description
    priceContain.innerHTML = price
    imgContain.append(newImg)
    
    //const roundAvaliation = Math.round(avaliation)
    const roundAvaliationString = avaliationString.slice(0, -2)
    const roundAvaliation = Number(roundAvaliationString)
    const roundAvaliationPlus = roundAvaliation+1
    const arrayAvaliation = []
    const star1 = document.createElement('span')
    const star2 = document.createElement('span')
    const star3 = document.createElement('span')
    const star4 = document.createElement('span')
    const star5 = document.createElement('span')
    let starDiferent = ''
    for(let i = 1; i<=5; i++){
        if(i <= roundAvaliation){
            arrayAvaliation.push('f')
        }
        else if(roundAvaliationPlus == i){
            starDiferent= i
            arrayAvaliation.push('f')
        }
        else{
            arrayAvaliation.push('')
        }
    }

    star1.innerHTML  = `&star${arrayAvaliation[0]};`
    star2.innerHTML  = `&star${arrayAvaliation[1]};`
    star3.innerHTML  = `&star${arrayAvaliation[2]};`
    star4.innerHTML  = `&star${arrayAvaliation[3]};`
    star5.innerHTML  = `&star${arrayAvaliation[4]};`
 
    star1.classList.add('starStyle')
    star2.classList.add('starStyle')
    star3.classList.add('starStyle')
    star4.classList.add('starStyle')
    star5.classList.add('starStyle')

    if(starDiferent == 1){
        star1.classList.remove('starStyle')
        star1.classList.add('detailedStar')
    }
    if(starDiferent == 2){
        star2.classList.remove('starStyle')
        star2.classList.add('detailedStar')
    }
    if(starDiferent == 3){
        star3.classList.remove('starStyle')
        star3.classList.add('detailedStar')
    }
    if(starDiferent == 4){
        star4.classList.remove('starStyle')
        star4.classList.add('detailedStar')
    }
    if(starDiferent == 5){
        star5.classList.remove('starStyle')
        star5.classList.add('detailedStar')
    }


    avaliationContain.append(star1)
    avaliationContain.append(star3)
    avaliationContain.append(star2)
    avaliationContain.append(star4)
    avaliationContain.append(star5)

    const stock = dataProd.stock
    for(let a = 0 ; a< stock.length; a++){
        let number = stock[a]        
        let disponivel = ''
        let shoeNumber = 37+a 
        if(number > 0){
            disponivel = true
        } else {
            disponivel = false
        }
        printStockShoes(shoeNumber, disponivel)
    }
}
function printStockShoes (number, dis){
    const contain = document.getElementById('stockContain')

    const numberContain = document.createElement('div')
    if(dis == true){

        numberContain.innerHTML = `<div id="i${number}" class="shoeNumberContain"> <p class="shoeNumber">${number}</p></div>`
    }
    else{
        return
    }
    contain.append(numberContain)
}

async function findOneProduct(id) {
    const result = await fetch(`http://localhost:3000/products/${id}`).catch(e => {
        console.log(e.error)
    })
    const data = result.json()
    return data
}

addCarBtn.addEventListener('click', ()=> {
    const arrayProdValid = []
    const idStoredNumber = localStorage.length
    if(idStoredNumber == 0){
        localStorage.setItem('id_0', `${prodId}`);
    } else {

        for( let a = 0; a< idStoredNumber; a++){
            const item = localStorage.getItem(`id_${a}`)
            console.log(item)
            if(item == prodId){
                arrayProdValid.push('1')
            } 
    }

        if(arrayProdValid.length == 0){
            localStorage.setItem(`id_${idStoredNumber}`, `${prodId}`);
        }
    }
})  