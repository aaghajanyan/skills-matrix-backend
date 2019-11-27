const Joi = require("joi");

const addBodySchema = Joi.object().keys({
    name: Joi.string().required(),
    categoriesId: Joi.array().required()
});
const updateBodySchema = Joi.object().keys({
    name: Joi.string(),
    addCategories: Joi.array(),
    deleteCategories: Joi.array()
});

const validateAddBody = (request, response, next) => {
    validateBody(request, response, next, addBodySchema);
};

const validateUpdateBody = (request, response, next) => {
    validateBody(request, response, next, updateBodySchema);
};

function validateBody(request, response, next, schema) {
    const result = Joi.validate(request.body, schema);
    if (result.error) {
        return response.status(400).json(result.error.details);
    }
    next();
}

module.exports = {
    validateAddBody,
    validateUpdateBody
};
