const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const Product = require('../src/models/Product');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Product.create({
    nombre: 'Test Product',
    sku: 'TEST123',
    descripcion: 'This is a test product'
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Cart API', () => {
  it('should add a product to the cart', async () => {
    const product = await Product.findOne();
    const res = await request(app)
      .post('/api/cart/add')
      .send({
        productId: product.sku, // Changed to product.sku
        quantity: 1
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Producto agregado al carrito');
  });

  it('should get the cart', async () => {
    const res = await request(app).get('/api/cart');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('Products');
    expect(res.body.Products.length).toBeGreaterThan(0);
  });
});