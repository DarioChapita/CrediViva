const express = require("express");
const helmet = require('helmet');
const rateLimit = require('./config/rateLimit');
const cors = require('cors');
const logger = require('./config/logger');
const errorHandler = require('./middleweres/errorHandler');
const connectDB = require("./services/connectDB");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const Product = require("./models/Product");
const productsMock = require("./mock/products");
const { PORT } = require('./config/config');

const app = express();

// Connect to the database
connectDB();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Security middleware
app.use(helmet());

// Rate limit middleware
app.use(rateLimit);

// Logger middleware
app.use(logger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

async function insertMockProducts() {
  try {
    const value = await Product.countDocuments();
    
    if (value === 0) {
      await Product.insertMany(productsMock);
      console.log("Mock products inserted successfully");
    } else {
      console.log("Products already exist in the database");
    }
  } catch (error) {
    console.error("Error inserting mock products:", error);
  }
}

insertMockProducts();

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;