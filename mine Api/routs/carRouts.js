const router = require('express').Router()

const carControler= require('../controlers/carControler')

router.post('/', carControler.createCar)
router.patch('/:prodId/:userId', carControler.addProduct)
router.patch('/delete/:userId/:prodId', carControler.removeProdByCar)
router.get('/:userId', carControler.findProduct)

module.exports = router