const express = require('express')
const router = express.Router()
const product = require('../models/product')

router.post('/',  product.createProduct)

router.post('/',  product.createIndexProduct)

router.get('/',  product.searchAllProducts)

router.get('/text/',  product.searchProductsByText)

router.get('/regex/',  product.searchProductsByRegex)

router.get('/:id',  product.searchProductsById)

router.put('/:id',  product.updateProductsById)

router.delete('/:id', product.deleteProductsById)

module.exports = router