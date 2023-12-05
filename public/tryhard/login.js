const formId = document.getElementById('formId')
const apiResponseContainer= document.getElementById('apiResponse')
const changModeBtn = document.getElementById('sigIn')
const title = document.getElementById('title')
const spanFirstInfo = document.getElementById('firstInfo')
const spanActionDirected = document.getElementById('actionH1')
const nameInput = document.getElementById('inputNameDiv')
const pass = document.getElementById('ipass')
const email= document.getElementById('iemail')

document.getElementById('voltarContain').addEventListener('click', ()=> {
    console.log('arrependido')
})

changModeBtn.addEventListener('click', ()=> {
    changeModeFunction()
})
function changeModeFunction(){
    if(changModeBtn.innerText== 'Criar conta'){
        title.innerHTML = 'Sig In'
        spanFirstInfo.innerHTML= '<label for="iname">nome</label>, <label for="iemail">e-mail </label>e <label for="ipass"> palavra passe</label>'
        spanActionDirected.innerHTML= 'criares a tua conta'
        nameInput.innerHTML='<input type="text" name="nome" id="iname" required placeholder="Nome..."  minlength="8" maxlength="22" autocomplete="given-name">'
        changModeBtn.innerText= 'Iniciar sessão'
        pass.style.border= '1px solid black'
        email.style.border= '1px solid black'
    } else {
        title.innerHTML = 'Log In'
        spanFirstInfo.innerHTML= 'endereço de <label for="iemail">e-mail </label>e a tua<label for="ipass"> palavra passe</label>'
        spanActionDirected.innerHTML= 'iniciares sessão'
        nameInput.innerHTML=''
        changModeBtn.innerText= 'Criar conta'
        pass.style.border= '1px solid black'
        email.style.border= '1px solid black'
    }

}
formId.addEventListener('submit', async (e)=> {

    if(changModeBtn.innerText== 'Criar conta'){
    console.log('uobuFisri')
        e.preventDefault()
    const emailVerifyed = validEmails(email.value)
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
    
    
    
}else 
{   
    
    e.preventDefault()
    
    const emailVerifyed = validEmails(email.value)
    const name = document.getElementById('iname')
    
    if(emailVerifyed){
        email.style.border= '1px solid black'
            const apiResponse = await sigInUser(name.value, emailVerifyed, pass.value)
            console.log(apiResponse)
            if(apiResponse.msg == 'User inserido com sucesso'){
                /*CONTINBUAR */
                
            } else {
                email.style.border= '2px solid red'
                apiResponseContainer.innerHTML= apiResponse.msg
            }
        } else {
            email.style.border= '2px solid red'
        }
    }
    })
    
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
        return siginReturn
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
    
    
    function validEmails(email){
        if(email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)){
            return email
        }else return 
    }