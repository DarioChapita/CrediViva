const Cart = require('../models/Cart');

const findCartByUser = async (userId) => {
  return await Cart.findOne({ user: userId, status: 'pending' }).populate('items.product');
};

const saveCart = async (cart) => {
  return await cart.save();
};

module.exports = {
  findCartByUser,
  saveCart,
};