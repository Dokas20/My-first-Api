const formId = document.getElementById('formId')
const apiResponseContainer= document.getElementById('apiResponse')

document.getElementById('voltarContain').addEventListener('click', ()=> {
    console.log('arrependido')
})

formId.addEventListener('submit', async (e)=> {
    e.preventDefault()
    let email= document.getElementById('iemail')
    const emailVerifyed = validEmails(email.value)
    const pass = document.getElementById('ipass')
    if(emailVerifyed){
        email.style.border= '1px solid black'
        const apiResponse = await LoginUser(emailVerifyed, pass.value)
        console.log(apiResponse)
        if(apiResponse.msg == 'Login de Usuario com sucesso   '){
                /*CONTINBUAR */

        }else if(apiResponse.msg == 'Senha inválida, usuário não encontrado'){
            pass.style.border= '2px solid red'
            apiResponseContainer.innerHTML= apiResponse.msg
        } else {
            email.style.border= '2px solid red'
            apiResponseContainer.innerHTML= apiResponse.msg
        }
    } else {
        email.style.border= '2px solid red'
    }
})


function validEmails(email){
    if(email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)){
        return email
    }else return 
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
    sessionStorage.setItem('token', LoginUserReturn.token)
    return LoginUserReturn
}

