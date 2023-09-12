const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// forma de ler json

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// adicionar as rotas á aplicação


const routes = require('./routs')

app.use("/", routes)



//Conectar com mongoDB Atlas 

const DB_PASS = encodeURIComponent(process.env.DB_PASS)
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${DB_PASS}@apisolo.vk6cbkd.mongodb.net/?retryWrites=true&w=majority`).then(()=> {
    app.listen(3000)
    console.log('Connectado Com Sucesso')
})
.catch((err)=> console.log(err))