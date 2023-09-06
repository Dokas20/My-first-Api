const Car = require('../models/carModel')

exports.createCar = async (req, res) => {
    try {
        const { userId, products } = req.body

        const car = { userId, products }

        await Car.create(car)

        res.status(200).json(car + 'Produto adicionado ao carrinho com sucesso')
        return

    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho' + error })
    }

}



exports.removeProdByCar = async (req, res) => {
    try {
        const prodId = req.params.prodId
        const userId= req.params.userId

        const updateProduct = await Car.updateOne({ userId: userId }, {$pull:{products:prodId}})

        if (updateProduct.matchedCount === 0) {
            res.status(422).json({ message: "Produto não removido" })
        }

        res.status(200).json({"message": updateProduct})
    } 
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto' + error })
    }
}   

exports.findProduct = async (req, res) => {
    try {

        const userId = req.params.userId

        const car = await Car.find({ userId: userId })
        res.status(200).json(car)

    } catch (error) {
        res.status(500).json({ message: 'Erro ao procurar carrinho' + error })
    }
    
    
}

exports.addProduct = async (req,res)=> {
    try {
        const userId = req.params.userId
        const prodId = req.params.prodId

        const updateStatus = await Car.updateOne({userId: userId}, {$push:{products: prodId}}) 

        res.status(200).json(updateStatus)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho' + error })
    }
}