const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


// adicionar um index ao nome 

// Criar a conta de um usuario

exports.create = async (req, res) => {

    const { name, email, password } = req.body

    if (!name) {
        return res.status(422).json({ error: 'O nome é obrigatorio' })
    } else if (!email) {
        return res.status(422).json({ error: 'O Email é obrigatorio' })
    } else if (!password) {
        return res.status(422).json({ error: 'A Password é obrigatorio' })
    }

    const userExists = await User.findOne({ email: email })

    if(userExists){
        res.status(402).json({msg: "Email já utilizado"})
        return
    }

    // create passWord

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)


    const user = {
        name,
        email,
        password: passwordHash,
    }
    try {
        await User.create(user)
        res.status(200).json({ message: "User inserido com sucesso" })



    } catch (error) {
        res.status(500).json({ message: `User não criado ${error}` })
    }
}

// Fazer login da conta de usuario e atribuir um token de acesso


exports.login = async (req,res) => {

    const {email, password} = req.body
    
    if(!email){ return res.status(422).json({msg: "email Obrigatório"})}
    else if(!password){ return res.status(422).json({msg: "password Obrigatório"})}

    const user = await User.findOne({email:email})
    
    if(!user){
    return  res.status(404).json({msg: "Email inválido, usuário não encontrado"})
        
    }
    
    // check if password match
    
    const checkPassword = await bcrypt.compare(password, user.password)
    
    if(!checkPassword){
        return res.status(422).json({msg: "Senha inválida, usuário não encontrado"})
    }
    try {
        
        const secret = process.env.SECRET
    //    const refreshApiSecret = process.env.REFRESH_API_SECRET

        const _id = {
            id: user._id
        }

        const token = jwt.sign(_id, secret,  {expiresIn: '30m'})
  /*      const refreshToken = jwt.sign(_id, refreshApiSecret)
        refreshTokens.push(refreshToken)
*/
        res.status(200).json({msg: "Login de Usuario com sucesso   ", token: token })
       //refreshtoken: refreshToken
    } catch (error) {
        res.status(500).json({err: error}) 
    }
} /*
exports.generateAcessToken = async (req,res)=> {
   const refreshToken = req.body.token
    if(refreshToken == null) return res.status(401)
    if(refreshTokens.includes(refreshToken)) return res.status(403)

    jwt.verify(refreshToken, process.env.REFRESH_API_SECRET, (err, user)=> {
       if(err) return res.status(403).json(err)
    //   res.json({_id: user.id, refreshToken: refreshTokens})
         const acessToken = jwt.sign({_id: user.id}, process.env.REFRESH_API_SECRET,{ expiresIn: '20s'})
        res.status(200).json(acessToken)
    }) 
}
*/

// Procurar o usuario atraves do seu token

exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password')

        return res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ message: `User não encontrado ${error}` })
    }
}

// veririfcar se os tokebs de acesso são validos

exports.checktoken = async (req,res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({msg:"Acesso negado!"})
    }
    try {
        jwt.verify(token, process.env.SECRET, (err, _id)=> {
            if(err) return res.status(403).json({msg: "expired Token"})
            req.id = _id.id 
        next()
        })    

    } catch (error) {
        res.status(400).json({msg: "Token inválido"})
    } 
}
 