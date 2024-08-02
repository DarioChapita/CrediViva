const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 75,
    message: 'Too many requests from this IP, please try again after 10 minutes',
});

module.exports = limiter;