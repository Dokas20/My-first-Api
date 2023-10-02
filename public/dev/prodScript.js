const token = sessionStorage.getItem('token')
const refreshToken = sessionStorage.getItem('refreshToken')

menuHamburguer()
showTheALLProducts()

function menuHamburguer(){
    const btnMenu = document.getElementById('menuDiv')
    btnMenu.addEventListener('click', ()=> {
        document.getElementById('menu').classList.toggle('menuShow')
    })
    document.getElementById('imain').addEventListener('click', ()=> {
        document.getElementById('menu').classList.remove('menuShow')
    })
}

document.getElementById('btnAddProduct').addEventListener('click', ()=> {
    const session = document.getElementById('addProduct')
    session.style.display= "block"
})
document.getElementById('addProductForm').addEventListener('submit', (e)=> {
    e.preventDefault()
    addProduct(token).then((res)=> {
        document.getElementById('apiRespons').style.color= "blue"
        
        return document.getElementById('apiRespons').innerText = res.msg
    })
    document.getElementById('apiRespons').innerText = 'Exite um produto com nome idêntico já criado'
    
    document.getElementById('apiRespons').style.color= "red"
})

function showTheALLProducts (){
    getAllProducts().then((prod)=> {
        for(let c = 0; c< prod.length; c++){
            createProdPost(prod[c])
        }}
)   }

function createProdPost(prod){
    const destaqueStatus= prod.destaque
    const div = document.createElement('div')
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const mainDiv = document.createElement('div')
    const select = document.createElement('select')
    const h1 = document.createElement('h1')
    const description = document.createElement('p')
    const img= document.createElement('img')
    const delet= document.createElement('div')
    const validDtqu = document.createElement('div')

    if(destaqueStatus=== true){
        select.innerHTML= `
        <select name="destaque" id="destaque">
        <option value="True" selected>True</option>
        <option value="False">False</option>
        </select>
        `
    } else{
        select.innerHTML= `
        <select name="destaque" id="destaque">
        <option value="True">True</option>
        <option value="False" selected> False </option>
        </select>
        `
    }

    //stock.innerText = prod.stock
    delet.innerHTML=`<div class="deleteDiv"><img src="#" alt=""></div>`
    h1.innerText= prod.name
    description.innerHTML = `<p>${prod.description}</p><p>Stock: ${prod.stock}</p>`
    img.innerHTML = `<img src='../../${prod.src}' alt="Product Img">`
    validDtqu.innerHTML = `<div id="validBtn"><img src="#" alt=""></div>`

    
    div1.appendChild(h1)
    div1.appendChild(description)
    div.append(img)
    div1.append(div2)
    div1.append(delet)
    div2.append(select)
    div2.append(validDtqu)
    div2.style.display= "flex"
   // div1.appendChild(stock)

    mainDiv.append(div)
    mainDiv.append(div1)
    div1.style.width = '60%' 

    mainDiv.classList.add('productsProd')
    delet.addEventListener('click', ()=> {
        deleteProduct(token, prod._id)
        mainDiv.style.display="none"
    })

    validDtqu.addEventListener('click',()=> {
        const destq = select.value
        changeDestaque(prod._id,destq)
    })

    const container = document.getElementById('container')
    container.appendChild(mainDiv)
}

async function changeDestaque(_id,destq){
    destaque = destq.toLowerCase()

    const result =await fetch(`http://localhost:3000/products`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({
            id: _id,
            destaq: destaque
        })
    })//.then((res)=> {console.log(res.json())})
    .catch((e)=> console.log(e))
    console.log(result.json())

}

async function getAllProducts() {
    const result = await fetch("http://localhost:3000/products").catch(e => { console.log(e.error) })
    
    const dataAllProducts = await result.json()
    if (dataAllProducts) return dataAllProducts
}





async function addProduct(devToken){
    const files = document.getElementById('idimage')
    const destaqued = document.getElementById('destaque').value
    const name = document.getElementById('idname').value
    const description = document.getElementById('iddesc').value
    const price = document.getElementById('idprice').value
    const priceInCents = document.getElementById('idpriceCents').value
    const stock = document.getElementById('idstock').value
    let destaque = (destaqued.toLowerCase() === 'true')
    
    const formData = new FormData();
    formData.append("destaque",destaque)
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("priceInCents", priceInCents)
    formData.append("stock", stock)
    for(let i =0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }
    
    const result = await fetch(`http://localhost:3000/products/`, {
        method: "POST",
        headers: {
//"Content-Type": "application/json",
            Authorization: `Bearer ${devToken}`
        },
        body: formData,

    })
    return result.json()

}

async function deleteProduct (token, id){
    const result = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }).catch(e => {
        console.log(e.error)
    })
    const logoutMessage = await result.json()
    console.log(logoutMessage)
}

