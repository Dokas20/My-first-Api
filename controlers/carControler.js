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

// Funciona porem não utilizando a propriedade pull ou funcionalidades de array do mongodb em nodejs, devido a problemas tecnicos e bugs

exports.removeProdByCar = async (req, res) => {
    const userId = req.id

    const car = await Car.find({ userId: userId })
    const prodId = req.params.prodId

    
    if(!car){
        return res.status(500).json({msg: "Carrinho não existe"})
    }

    const carProductsLength = car[0].products.length

    const carProductsUpdated = []
    const prodIdValid = []

    for(let a = 0; a< carProductsLength; a++){
        if(car[0].products[a]._id === prodId){
            prodIdValid.push(a)
        }else{
            const id = car[0].products[a]._id
            const quantity = car[0].products[a].quantity
    
            const carSlote = {_id: id, quantity: quantity}
            carProductsUpdated.push(carSlote)

        }
    }

    if(prodIdValid.length < 1){
        return res.json(404, {msg: "Produto não encontrado"})
    }


    try {
            const updateProduct = await Car.updateOne({ userId: userId }, {$set:{products: carProductsUpdated}})
    
            if (updateProduct.matchedCount === 0) {
                return res.status(422).json({ message: "Produto não removido" })
            }
    
            res.status(200).json({msg: "Produto removido com sucesso"})
        } 
        catch (error) {
            res.status(500).json({ message: 'Erro ao deletar produto' + error })
        }

    } 


exports.findProduct = async (req, res) => {    
    try {
        
        const userId = req.id

        const car = await Car.findOne({ userId: userId })
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
        const prodId = req.body.prodId
        const quanti = req.body.qut

        // Verificar se já não existe o produto

        const prodAdd = await Car.findOne({ userId: userId})
        const prodExist = prodAdd.products.filter((prod) => prod._id == prodId)
        if(prodExist.length < 1) {
            const updateStatus = await Car.updateOne({userId: userId}, {$push:{products:{_id: prodId, quantity: quanti}}}) 
    
            if(updateStatus.matchedCount > 0){
            return res.status(200).json({msg : "Produto adicionado com sucesso"})
            }
            
        } else return res.status(402).json({msg: "Produto já adicionado ao carrinho"})


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

        if(changeQuantity.matchedCount > 0){
            return res.status(200).json({msg: "Quantidade alterada com sucesso"})
        }

    } catch (error) {
        res.status(500).json({ msg: error })
    }

}
