const btnSubmit = document.getElementById('loginUser')
const id = sessionStorage.getItem('prodId')

btnSubmit.addEventListener('submit',async (e)=> {
    e.preventDefault()
    const email = document.getElementById('iemail').value
    const emailValid = validEmails(email)
    const pass = document.getElementById('ipass').value
    const response = document.getElementById('apiResponse')
    if(emailValid){

        const result = await LoginUser(email,pass)
        if(result){
           sessionStorage.setItem('token', `${result}`)
           if(id){
               window.location = 'http://localhost:3000/users/oneProd.html'
            }else{
            window.location = 'http://localhost:3000/users/mainPage.html'
           }
           
        } else{
            response.innerText = 'Usuário não encontrado'
        }

    }else{
        response.innerText = 'Email inválido'        
    }

})

function validEmails(email){
    ///([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
    ///^[a-zA-Z\._\-0-9]*[@][a-zA-Z]*[\.][a-z]{2,4}$/
    if(email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)){
        return email
    }else return 
}


async function sigInUser(name, email, password) {
    const result = await fetch(`http://localhost:3000/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    }).catch(e => {
        console.log(e.error)
    })
    const siginReturn = await result.json()
    if (siginReturn) return console.log(siginReturn)
}

async function LoginUser(email, password) {
    const result = await fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).catch(e => {
        console.log(e.error)
    })
    const LoginUserReturn = await result.json()
    return LoginUserReturn.token
}
