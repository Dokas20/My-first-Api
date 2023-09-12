const jwt = require('jsonwebtoken')
const Dev = require('../models/tokensModel')
require('dotenv').config()

exports.loginDev = async (req,res)=> {
    const {firstPass, secondPass, thirdPass}= req.body

    if(!firstPass || !secondPass || !thirdPass) return res.status(422).json('Prencha as passwords')

    const envPass1 = process.env.FIRST_PASS
    const envPass2 = process.env.SECOND_PASS
    const envPass3 = process.env.THIRD_PASS

    if(firstPass==envPass1 && secondPass == envPass2 && thirdPass==envPass3) {
        try {

            const token = jwt.sign({pass :envPass1},process.env.DEV_API_SECRET,  {expiresIn: '16m'})


            const refreshToken = jwt.sign({pass :envPass2}, process.env.DEV_API_REFRESH_SECRET)
            const id = process.env.ID_DATABASE_DEV
            await Dev.updateOne({_id: id}, {$push:{devRefreshToken: refreshToken}})

            res.status(200).json({msg: "Login de Desenvolvedor com sucesso   ", token: token,refreshtoken: refreshToken })
    } catch (error) { return res.status(500).json(error)
        }
    }
}


exports.generateAcessToken = async (req,res)=> {
    const refreshToken = req.body.token
     if(refreshToken == null) return res.status(401)
     const refreshTokens = await Dev.findOne({devRefreshToken: refreshToken})
    if(!refreshTokens) return res.status(422).json({msg: "Token não encontrado"})

 
     jwt.verify(refreshToken, process.env.DEV_API_REFRESH_SECRET, (err, pass)=> {
        if(err) return res.status(403).json(err)
     //   res.json({_id: user.id, refreshToken: refreshTokens})
          const acessToken = jwt.sign(pass, process.env.DEV_API_SECRET,{ expiresIn: '4h'})
         res.status(200).json(acessToken)
     }) 
 }

 exports.checktoken = async (req,res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({msg:"Acesso negado!"})
    }
    try {
        jwt.verify(token, process.env.DEV_API_SECRET, (err, _id)=> {
            if(err) return res.status(403).json({msg: "expired Token"}) 
        next()
        })    

    } catch (error) {
        res.status(500).json({msg: "Token inválido"})
    } 
}

exports.logoutDev = async (req,res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.status(401)
    const refreshTokens = await Dev.findOne({devRefreshToken: refreshToken})
   if(!refreshTokens) return res.status(422).json({msg: "Token não encontrado"})

   try {
       const id = process.env.ID_DATABASE_DEV
       const logout = await Dev.updateOne({_id: id}, {$pull:{devRefreshToken: refreshToken}})
       return res.status(200).json({msg: "Logout de desenvolvedor com sucesso" + logout})
       
    } catch (error) {
        return res.status(200).json(error)
    }
    
    
}
exports.logoutAllDev = async (req,res) =>{
    
    try {
        
        const id = process.env.ID_DATABASE_DEV
        const Logout = await Dev.updateOne({_id: id}, {$unset: {devRefreshToken: ""}})
        return res.status(200).json({msg: "refreshTokens removidos com sucesso"})

    } catch (error) {
        return res.status(200).json(error)
    }
}
