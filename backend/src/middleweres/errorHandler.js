/**
 * Handles errors that occur during the request-response cycle.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {void} - Sends a JSON response with the error message and status code.
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const response = {
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };

    console.error({
        message: err.message,
        stack: err.stack,
        statusCode,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        method: req.method,
    });

    res.status(statusCode).json(response);
};

module.exports = errorHandler;