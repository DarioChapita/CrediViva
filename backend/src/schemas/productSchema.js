const Joi = require('joi');

const addProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    description: Joi.string().optional(),
    category: Joi.string().required(),
    stock: Joi.number().integer().min(0).required()
});

const updateProductSchema = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().positive().optional(),
    description: Joi.string().optional(),
    category: Joi.string().optional(),
    stock: Joi.number().integer().min(0).optional()
});

module.exports = {
    addProductSchema,
    updateProductSchema
};