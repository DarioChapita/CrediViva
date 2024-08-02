/**
 * Middleware function that validates the request against the provided schemas.
 *
 * @param {Object} schemas - An object containing the schemas to validate against.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {void} - If there are validation errors, sends a 400 response with the errors. Otherwise, calls the next middleware function.
 */
const validateRequest = (schemas) => {
    return (req, res, next) => {
        const schemaKeys = Object.keys(schemas);
        const validationResults = schemaKeys.map((key) => {
            return schemas[key].validate(req[key], { abortEarly: false });
        });

        const errors = validationResults.reduce((acc, result) => {
            if (result.error) {
                acc.push(...result.error.details.map((detail) => detail.message));
            }
            return acc;
        }, []);

        if (errors.length > 0) {
            return res.status(400).send({ errors });
        }

        next();
    };
};

module.exports = validateRequest;