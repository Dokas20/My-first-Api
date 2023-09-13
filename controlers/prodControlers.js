const Prod= require('../models/prodModls')
const fs = require('fs')


exports.createProd= async (req,res)=> {
    try {
        const {name,description, price, stock} = req.body
        const file = req.file;

        const prod = new Prod({
            name,
            description,
            price,
            stock,
            src: file.path
        })
        await prod.save()
        res.status(200).json({prod, msg: "Produto guardado com sucesso"})
    } catch (error) {
        res.status(500).json({message: `Erro ao salvar produto ${error}`})
    }
    
} 
exports.findAll = async (req,res)=> {
    try {
        const products = await Prod.find() 
        res.status(200).json(products)
        if(!products){
            res.status(402).json({message:"Não existe produtos"})
        }
        
    } catch (error) {
        res.status(500).json({message: `Produtos não encontrado ${error}`})
    }
}
exports.findOne = async (req,res)=> {
    try {
        const id = req.params.id
        const product = await Prod.findOne({_id: id})
        res.status(200).json(product) 
        if(!product){
            res.status(402).json({message: "Produto não encontrado"})
        }
        
    } catch (error) {
        res.status(500).json({message: `Produto não encontrado ${error}`})
    }
}

exports.remove = async (req,res)=> {
    try {
        const id = req.params.id
        const product = await Prod.findById({_id:id})

        if(!product){ return res.status(404).json({message: "Imagen não encontrada"})}

        fs.unlinkSync(product.src)

        await Prod.deleteOne({_id:id})

        res.status(200).json({message: "Produto removido com sucesso"})
    } catch (error) {
        res.status(500).json({message: error})
    }
}
exports.uploadStock = async (req,res)=> {

    try {
        const id = req.params.id
        const stockNumber = req.params.stn

        const updatedProd = await Prod.updateOne({_id:id},{$set:{stock:stockNumber}})

        res.status(200).json(updatedProd)
        
    } catch (error) {
        res.status(500).json({message: `Produto não encontrado ${error}`})
    }
}





