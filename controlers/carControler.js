const Car = require('../models/carModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createCar = async (req, res) => {
    const userId = req.id

    const car = await Car.find({ userId: userId })

    if(car){
        return res.status(500).json({msg: "Carrinho já existe"})
    }

    try {
        const products= req.body

        const car = { userId, products }

        await Car.create(car)

        res.status(200).json(car + 'Produto adicionado ao carrinho com sucesso')
        return

    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho' + error })
    }

}



exports.removeProdByCar = async (req, res) => {
    const userId = req.id

    const car = await Car.find({ userId: userId })

    if(!car){
        return res.status(500).json({msg: "Carrinho não existe"})
    }

    try {
        const prodId = req.params.prodId

        const updateProduct = await Car.updateOne({ userId: userId }, {$pull:{products:prodId}})

        if (updateProduct.matchedCount === 0) {
            return res.status(422).json({ message: "Produto não removido" })
        }

        res.status(200).json({"message": updateProduct})
    } 
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto' + error })
    }
}   

exports.findProduct = async (req, res) => {    
    try {
        
        const userId = req.id

        const car = await Car.find({ userId: userId })
        if(!car){
            return res.json({msg: "Usuário sem carrinho criado"})
        }

        res.status(200).json(car)

    } catch (error) {
        res.status(500).json({ message: 'Erro ao procurar carrinho' + error })
    }
    
}

exports.addProduct = async (req,res)=> {
    const userId = req.id
    
    const car = await Car.find({ userId: userId })

    if(!car){
        return res.status(500).json({msg: "Carrinho não existe"})
    }
    try {
        const prodId = req.params.prodId

        const updateStatus = await Car.updateOne({userId: userId}, {$push:{products: prodId}}) 

        res.status(200).json(updateStatus)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho' + error })
    }
}
