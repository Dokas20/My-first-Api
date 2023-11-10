const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    /*destaque: {type: Boolean, require: true},*/
    name: {type: String, require: true},
    description: {type: String, require: true},
    extraInfo: {type: String, require:true},
    price: {type: Number, require: true},
    priceInCents: {type: String, require: true},
    avaliation: {type: Number, require: true},
    popularity: {type: Number, require: true},
    stock: {type: Array, require: true},
    src: {type: Array, require: true},
})
module.exports = mongoose.model("Prod", ProductSchema)