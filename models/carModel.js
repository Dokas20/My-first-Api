const mongoose = require('mongoose')
const Car = mongoose.model('Car', {
    userId: {type: String, require: true},
    products: {type: Array, require: true},
})
module.exports= Car