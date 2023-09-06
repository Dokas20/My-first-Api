const router = require('express').Router()

const userControler= require('../controlers/userControlers')
router.post('/', userControler.create)
router.get('/', userControler.findAll)
router.get('/:name', userControler.findOne)

module.exports = router