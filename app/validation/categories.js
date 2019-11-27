const Joi = require("joi");

const addBodySchema = Joi.object().keys({
    name: Joi.string().required(),
    relatedCategoriesIds: Joi.array(),
    skillsIds: Joi.array()
});
const updateBodySchema = Joi.object().keys({
    name: Joi.string(),
    addedCategories: Joi.array(),
    removedCategories: Joi.array(),
    addedskills: Joi.array(),
    removedSkills: Joi.array()

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
