const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Connects to the MongoDB database using the provided MongoDB URI.
 *
 * @return {Promise<void>} A promise that resolves when the connection is successful,
 * or rejects with an error if the connection fails.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
