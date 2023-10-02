const multer = require('multer')
const path = require('path')
const Prod= require('../models/prodModls')


const storage = multer.diskStorage({
    destination:async function(req,file,cb){
        const name = req.body.name
        const prodName = await Prod.findOne({name: name})
        if(!prodName){
            //cb(null,__dirname +  "/uploads")
            cb(null,"uploads/")
        }
    },
    
    filename:async function(req, file,cb){
        const name = req.body.name
        const prodName = await Prod.findOne({name: name})
        if(!prodName){
            cb(null,/* file.fieldname*/ Date.now() + path.extname(file.originalname))
        }
    }
})
const upload = multer({storage:storage})
module.exports = upload

