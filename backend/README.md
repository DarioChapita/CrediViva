# Backend Project

## Setup Instructions

1. **Install Dependencies:**
   Run the following command to install project dependencies:
   ```
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27018/carrito?authSource=admin
   ```

3. **Available Scripts:**
   - Start the server:
   ```
   npm start
   ```

   - Run tests:
   ```
   npm test
   ```

## API Endpoints

- `POST /api/products`: Create a new product.
- `GET /api/products`: Get all products.
- `GET /api/products/:id`: Get a product by ID.

## Testing

Sample test cases have been provided in the `product.test.js` file. You can run tests using `npm test`.

## Additional Notes

- Ensure a MongoDB database is running or adjust the `MONGODB_URI` in the `.env` file as needed.
- Review the controllers and models for a better understanding of the application flow.