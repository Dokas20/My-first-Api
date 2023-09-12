const mongoose = require('mongoose')
const Dev = mongoose.model('Dev', {
    devRefreshToken: {type: Array, require: true}
})
module.exports = Dev