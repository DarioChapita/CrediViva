const {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
} = require('../utils/productUtils');

/**
 * Retrieves all products from the database and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
exports.getAllProducts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  try {
    const { products, totalCount } = await findAllProducts(page, limit);
    const totalPages = Math.ceil(totalCount.value / limit);
    
    res.json({
      products: products.value,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    next(new Error('Error al obtener productos: ' + error.message));
  }
};

/**
 * Retrieves a product by its ID from the database and sends it as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
exports.getProductById = async (req, res, next) => {
  try {
    const product = await findProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    next(new Error('Error al obtener el producto: ' + error.message));
  }
};

/**
 * Creates a new product using the data from the request body and sends the saved product as a JSON response.
 *
 * @param {Object} req - The request object containing the product data.
 * @param {Object} res - The response object used to send the saved product.
 * @param {Function} next - The next middleware function to call in case of an error.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If there is an error creating the product.
 */
exports.createProduct = async (req, res, next) => {
  try {
    const savedProduct = await createProduct(req.body);
    res.status(201).json(savedProduct);
  } catch (error) {
    next(new Error('Error al crear el producto: ' + error.message));
  }
};

/**
 * Updates a product by its ID with the data from the request body and sends the updated product as a JSON response.
 *
 * @param {Object} req - The request object containing the product ID and updated data.
 * @param {Object} res - The response object used to send the updated product.
 * @param {Function} next - The next middleware function to call in case of an error.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If there is an error updating the product or if the product is not found.
 */
exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(updatedProduct);
  } catch (error) {
    next(new Error('Error al actualizar el producto: ' + error.message));
  }
};