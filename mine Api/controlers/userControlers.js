const User = require('../models/userModel')


// adicionar um index ao nome 

exports.create = async (req,res) => {
    try {
        const {name, email, password} = req.body

        if (!name) {
            res.status(422).json({ error: 'O nome é obrigatorio' })
        } else if (!email) {
            res.status(422).json({ error: 'O Email é obrigatorio' })
            return
        }else if(!password){
            res.status(422).json({ error: 'A Password é obrigatorio' })  
        }
    
        const user = {
            name,
            email,
            password,
        }

        await User.create(user)
        res.status(200).json({message: "User inserido com sucesso"})



    } catch (error) {
        res.status(500).json({message: `User não criado ${error}`})
    }
}
exports.findAll= async (req,res)=> {
    try {
        const users = await User.find()
        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json({message: `User não encontrado ${error}`})
    }
}
exports.findOne = async (req,res)=> {
    try {
        const name = req.params.name
        const user = await User.findOne({name: name})
        res.status(200).json(user)
        if(!user){
            res.status(402).json({message: "User not Found"})
        }

    } catch (error) {
        res.status(500).json({message: `User não encontrado ${error}`})
    }
}