const express = require('express');
const router = express.Router();
const validateRequest = require('../middleweres/validateRequest');
const productSchema = require('../schemas/productSchema');
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateRequest({ body: productSchema.addProductSchema }), productController.createProduct);
router.put('/:id', validateRequest({ body: productSchema.updateProductSchema }), productController.updateProduct);

module.exports = router;