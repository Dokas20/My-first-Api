const btnHamb = document.getElementById('menuHamburger')

const menuAnimation = btnHamb.addEventListener('click', ()=>{
    document.getElementById('menu').classList.toggle('navShow')
    document.getElementById('header').classList.toggle('headerNav')
    btnHamb.style.display= "none"
    
    document.getElementById('main').addEventListener('click', ()=>{
        document.getElementById('menu').classList.remove('navShow')
        document.getElementById('header').classList.remove('headerNav')
        btnHamb.style.display = "block"
    })
    
})