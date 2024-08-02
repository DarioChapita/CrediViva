const express = require('express');
const router = express.Router();
const validateRequest = require('../middleweres/validateRequest');
const cartSchema = require('../schemas/cartSchema');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleweres/authMiddleware');

router.get('/', authMiddleware, cartController.getCart);
router.post('/add', authMiddleware, validateRequest(cartSchema), cartController.addToCart);
router.put('/update', authMiddleware, validateRequest(cartSchema), cartController.updateCartItem);
router.post('/checkout', authMiddleware, validateRequest(cartSchema), cartController.checkout);

module.exports = router;