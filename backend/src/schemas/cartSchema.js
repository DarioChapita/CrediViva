const Joi = require('joi');

const addItemSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required()
});

const updateItemSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required()
});

const checkoutSchema = Joi.object({
    paymentMethod: Joi.string().valid('credit_card', 'paypal').required(),
    shippingAddress: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});

module.exports = {
    addItemSchema,
    updateItemSchema,
    checkoutSchema
};