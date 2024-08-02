const Product = require('../models/Product');

const findAllProducts = async (page = 1, limit = 6) => {
  const offset = (page - 1) * limit;

  const [products, totalCount] = await Promise.allSettled([
    Product.find().skip(offset).limit(limit),
    Product.countDocuments()
  ]);

  return { products, totalCount };
};

const findProductById = async (id) => {
  return await Product.findById(id);
};

const createProduct = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
};

const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, { new: true });
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
};