const Car = require('../models/carModel')
require('dotenv').config()

exports.createCar = async (req, res) => {
    const userId = req.id

    const car = await Car.findOne({ userId: userId })

    if(car){
        return res.status(500).json({msg: "Carrinho já existe"})
    } 
    
    try {

        const carObj = { userId }

        await Car.create(carObj)

        res.status(200).json('Carrinho criado com sucesso')
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
    
    const car = await Car.findOne({ userId: userId })

    if(!car){
        return res.status(500).json({msg: "Carrinho não existe"})
    }
    try {
        const prodId = req.params.prodId
        const quanti = req.params.qut

        // Verificar se já não existe o produto

        const prodAdd = await Car.findOne({ userId: userId }, {products:{_id: prodId}})

        if(prodAdd) return res.status(402).json({msg: "Já existe esse produto no carrinho"})


        const updateStatus = await Car.updateOne({userId: userId}, {$push:{products:{_id: prodId, quantity: quanti}}}) 

        res.status(200).json(updateStatus)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho' + error })
    }
}

exports.quantityChange = async (req,res) => {

    const userId = req.id
    const prodId = req.params.prodId
    const quanti = req.params.qut

    // Verificar se existe o produto
    
    const prodAdd = await Car.findOne({ userId: userId }, {products:{_id: prodId}})

    if(!prodAdd) return res.status(402).json({msg: "Não existe esse produto no carrinho"})

    try {
        
        const changeQuantity = await Car.updateOne({userId: userId}, {$set:{products:{_id: prodId, quantity: quanti}}}) 
        return res.status(200).json({msg: changeQuantity})

    } catch (error) {
        res.status(500).json({ msg: error })
    }

}
