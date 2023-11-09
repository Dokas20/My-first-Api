const router = require('express').Router()
const Prod= require('../models/prodModls')

const carControler= require('../controlers/carControler')
const userControler = require('../controlers/userControlers')
const devControler = require('../controlers/devControler')
const prodControler = require('../controlers/prodControlers')
const upload = require('../config/multer')
const paymentControler = require('../controlers/paymentControler')


// Car routs

router.post('/car' ,userControler.checktoken,carControler.createCar)
router.patch('/car/addProduct',userControler.checktoken,carControler.addProduct)
router.patch('/car/delete/:prodId',userControler.checktoken, carControler.removeProdByCar)
router.patch('/car/quantity/:prodId/:qut',userControler.checktoken, carControler.quantityChange)
router.get('/car',userControler.checktoken, carControler.findCar)

// User Routs

router.post('/user/register', userControler.create)
router.post('/user/login', userControler.login)
router.get('/user', devControler.checktoken, userControler.findAllUsers)

// Dev routs

router.post('/dev/login', devControler.loginDev)/*
router.post('/dev/refresh', devControler.generateAcessToken)
router.delete('/dev/logout', devControler.checktoken,devControler.logoutDev)
router.delete('/dev/logoutAll',devControler.checktoken, devControler.logoutAllDev)*/

// Prod Routs

router.post('/products' ,devControler.checktoken,upload.array("files"),prodControler.createProd)
router.get('/products', prodControler.findAll )
router.patch('/products/:id', prodControler.addPopularity)
/*
router.get('/products/destaqued', prodControler.sercheAllDestaquedProducts )*/
router.get('/products/:id', prodControler.findOne)
router.delete('/products/:id',devControler.checktoken, prodControler.remove)
/*
router.patch('/products',devControler.checktoken,prodControler.uploadDestaqued)
*/
// Payment Routs
router.post('/create-checkout-session' ,userControler.checktoken, paymentControler.generatePaymentLink)
router.get('/checkout-session', paymentControler.checkoutSession)



module.exports = router