const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    popularity: {type: Array, require: true}
})
module.exports = mongoose.model("ProdPopularity", ProductSchema)