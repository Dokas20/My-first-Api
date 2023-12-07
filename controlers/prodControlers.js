const Prod= require('../models/prodModls')
const ProdPopularity= require('../models/prodPopularityModel')
const fs = require('fs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createProd= async (req,res)=> {
    try {
        const {name,description,extraInfo, price, avaliation,priceInCents,
            stock} = req.body
        const files = req.files;
        const arrayFiles = []
        files.map((file)=> {arrayFiles.push(file.path)})


        const prodName = await Prod.findOne({name: name})
        if(prodName)return res.status(404).json({msg: "Produto com nome identico ja criado"})

        const priceToken = jwt.sign({price: priceInCents}, process.env.SECRET)
        const prod = new Prod({
            name,
            description,
            extraInfo,
            price,
            priceInCents:priceToken,
            avaliation,
            popularity: 0,
            stock,
            src: arrayFiles
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

exports.remove = async (req,res)=> {
    try {
        const id = req.params.id
        const product = await Prod.findById({_id:id})

        if(!product){ return res.status(404).json({message: "Produto não encontrado"})}

        
        for(let a = 0; a<4; a++){
            fs.unlinkSync(product.src[a])
        }
        
        await Prod.deleteOne({_id:id})
        
        res.status(200).json({message: "Produto removido com sucesso"})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.addPopularity = async (req,res) => {
    try {
        const id = req.params.id
        const product = await Prod.find({_id:id},'-priceInCents') 
        const popular = product[0].popularity +1

        const modification = await  Prod.updateOne({_id:id},{$set:{popularity:popular}})

        const prodPopularity = await ProdPopularity.find()


        if(prodPopularity[0].popularity [39] === null){
            return console.log('abo')
        }
        else if(prodPopularity[0].popularity [0].popularity > popular+10){
            return console.log(popular+10)
        }
       // return res.status(200).json('Popularity add whit sucesse' + modification)
        
    } catch (error) {
        return res.status(500).json(error)
    }
}


exports.addPordPopularity = async (req,res)=> {
    try {
        const product = await Prod.find()
        product.sort((p1, p2) => (p1.popularity < p2.popularity) ? 1 : (p1.popularity > p2.popularity) ? -1 : 0)
        const productsSorted = []
        
        for(let o = 0; o<40; o++ ){
            productsSorted.push(product[o])
        }

        const prod = new ProdPopularity({
            popularity: productsSorted
        })

        await prod.save()
        return res.json(ProdPopularity) 
        
    } catch (error) {
        return res.status(500).json(error)
    }
}



