const Prod= require('../models/prodModls')
const fs = require('fs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createProd= async (req,res)=> {
    try {
        const {destaque,name,description, price,priceInCents, stock} = req.body
        const file = req.files;
        const path = file[0].path
        const src = path.slice(7);
        const prodName = await Prod.findOne({name: name})
        if(prodName)return res.status(404).json({msg: "Produto com nome identico ja criado"})

        const priceToken = jwt.sign({price: priceInCents}, process.env.SECRET)
        const prod = new Prod({
            destaque,
            name,
            description,
            price,
            priceInCents:priceToken,
            stock,
            src: src
        })

        await prod.save()
       res.status(200).json({prod, msg: "Produto guardado com sucesso"}) 

    } catch (error) {
        res.status(500).json({message: `Erro ao salvar produto ${error}`})
    }
    
} 
exports.findAll = async (req,res)=> {
    try {
        const products = await Prod.find({},'-priceInCents') 
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
        const product = await Prod.findOne({_id: id},'-priceInCents')
        res.status(200).json(product) 
        if(!product){
            res.status(402).json({message: "Produto não encontrado"})
        }
        
    } catch (error) {
        res.status(500).json({message: `Produto não encontrado ${error}`})
    }
}
exports.findDestaquedAll = async (req,res)=> {
    try {
        const products = await Prod.find({destaque:true},'-priceInCents') 
        res.status(200).json(products)
        if(!products){
            return res.status(402).json({message:"Não existe produtos"})
        }
        
    } catch (error) {
        res.status(500).json({message: `Produtos não encontrado ${error}`})
    }
}


exports.remove = async (req,res)=> {
    try {
        const id = req.params.id
        const product = await Prod.findById({_id:id})

        if(!product){ return res.status(404).json({message: "Produto não encontrado"})}

        fs.unlinkSync(product.src)

        await Prod.deleteOne({_id:id})

        res.status(200).json({message: "Produto removido com sucesso"})
    } catch (error) {
        res.status(500).json({message: error})
    }
}
exports.uploadDestaqued = async (req,res)=> {

    try {
        const {id, destaq} = req.body

        const updatedProd = await Prod.updateOne({_id:id},{$set:{destaque:destaq}})

        res.status(200).json(updatedProd)
        
    } catch (error) {
        res.status(500).json({message: `Produto não encontrado ${error}`})
    }
}

exports.sercheAllDestaquedProducts = async (req,res)=> {
    try {
        const products = await Prod.find({destaque: true},'-priceInCents') 
        if(!products){
            res.status(402).json({message:"Não existe produtos"})
        }
        
        return res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: `Produtos não encontrado ${error}`})
    }
}





