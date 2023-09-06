const router = require('express').Router()
const upload = require('../config/multer')

const prodControler = require('../controlers/prodControlers')
router.post('/',upload.single("file"), prodControler.createProd)
router.get('/', prodControler.findAll )
router.get('/:name', prodControler.findOne)
router.delete('/:id', prodControler.remove)
router.patch('/:id/:stn' , prodControler.uploadStock)

module.exports = router