const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static(__dirname+'/assets/'))

const productController = require('./app/controllers/Product')
app.use('/product', productController)

var server = app.listen(process.env.PORT || 8080, "127.0.0.1",() =>{ 
  var host = server.address().address
  var port = server.address().port
  console.log("http://%s:%s", host, port)
})







