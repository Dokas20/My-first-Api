const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    destaque: {type: Boolean, require: true},
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    priceInCents: {type: String, require: true},
    stock: {type: Number, require: true},
    src: {type: String, require: true},
})
module.exports = mongoose.model("Prod", ProductSchema)