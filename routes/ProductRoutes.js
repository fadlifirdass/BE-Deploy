const express = require('express')
const router = express.Router()
const {getProducts, getProductById, saveProduct, deleteProduct, updateProduct} = require('../controllers/ProductController')
const {verifyUser, sellerOnly} = require('../middleware/AuthUser')

router.get('/products',getProducts)
router.get('/productsbyseller',verifyUser,sellerOnly,getProducts)
router.get('/products/:id',getProductById)
router.post('/products',saveProduct)
router.patch('/products/:id',verifyUser,sellerOnly,updateProduct)
router.delete('/products/:id',verifyUser,sellerOnly,deleteProduct)


module.exports = router;