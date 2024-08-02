const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { findCartByUser, saveCart } = require('../utils/cartUtils');

/**
 * Retrieves the user's cart and adds product details to each item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} A promise that resolves when the cart is retrieved and the response is sent.
 */
exports.getCart = async (req, res, next) => {
  try {
    const cart = await findCartByUser(req.user.id);
    if (!cart) {
      return res.json({ items: [] });
    }

    const productDetails = await Promise.all(cart.items.map(async (item) => {
      const product = await Product.findOne({ sku: item.product });
      return {
        ...item,
        nombre: product.nombre,
        descripcion: product.descripcion
      };
    }));
    res.json({ ...cart, items: productDetails });
  } catch (error) {
    next(new Error('Error getting the cart: ' + error.message));
  }
};

/**
 * Adds a product to the user's cart.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} A promise that resolves when the product is added to the cart and the response is sent.
 */
exports.addToCart = async (req, res, next) => {
  try {
    const { productId: productSku, quantity } = req.body;

    if (!productSku || typeof productSku !== 'string') {
      return res.status(400).json({ message: 'Invalid product SKU' });
    }

    const product = await Product.findOne({ sku: productSku });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await findCartByUser(req.user.id);
    
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const productIndex = cart.items.findIndex(item => item.product === productSku);

    if (productIndex > -1) {
      cart.items[productIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productSku, quantity });
    }

    await saveCart(cart);
    res.json(cart);
  } catch (error) {
    next(new Error('Error adding to cart: ' + error.message));
  }
};

/**
 * Updates the quantity of a specific item in the user's cart.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} A promise that resolves when the cart is updated and the response is sent.
 * @throws {Error} If there is an error updating the cart.
 */
exports.updateCartItem = async (req, res, next) => {
  try {
    let { productId, quantity } = req.body;

    if (typeof productId === 'object') {
      quantity = productId.quantity;
      productId = productId.productSku;
    }

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'productId and quantity are required' });
    }

    const cart = await findCartByUser(req.user.id);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.items.findIndex(item => item.product === productId);

    if (productIndex > -1) {
      cart.items[productIndex].quantity = quantity;

      const updatedCart = await saveCart(cart);
      res.json(updatedCart);
    } else {
      cart.items.push({ product: productId, quantity });
      const updatedCart = await saveCart(cart);
      res.json(updatedCart);
    }
  } catch (error) {
    next(new Error('Error updating cart: ' + error.message));
  }
};



/**
 * Checks out the user's cart.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A promise that resolves when the checkout is complete.
 */
exports.checkout = async (req, res) => {
  try {
    const cart = await findCartByUser(req.user.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: 'The trolley is empty' });
    }

    cart.status = 'completed';
    await saveCart(cart);

    res.json({ message: 'Order completed' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing the order', error: error.message });
  }
};