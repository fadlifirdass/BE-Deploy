const express = require('express')
const router = express.Router()
const {getProducts, getProductById, saveProduct, deleteProduct, updateProduct} = require('../controllers/ProductController')

router.get('/products',getProducts)
router.get('/products/:id',getProductById)
router.post('/products',saveProduct)
router.patch('/products/:id',updateProduct)
router.delete('/products/:id',deleteProduct)


module.exports = router;