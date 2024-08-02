const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const Product = require('../src/models/Product');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Product.create({
    nombre: 'Test Product',
    sku: 'TEST123',
    descripcion: 'This is a test product',
    precio: 100,
    stock: 10,
    categoria: 'Test',
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Product API', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        nombre: 'New Product',
        sku: 'NEW123',
        descripcion: 'This is a new product',
        precio: 150,
        stock: 20,
        categoria: 'Test',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get a product by ID', async () => {
    const product = await Product.findOne();
    const res = await request(app).get(`/api/products/${product.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nombre', 'Test Product');
  });

  it('should return 404 for a non-existent product', async () => {
    const res = await request(app).get('/api/products/invalidId');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Producto no encontrado');
  });
});