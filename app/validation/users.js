const Joi = require("joi");

const passwordExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,24})/;
const nameExp = /^[a-z]{2,20}$/i;

const addBodySchema = Joi.object().keys({
    invitationId: Joi.string()
        .uuid()
        .required(),
    password: Joi.string()
        .regex(passwordExp)
        .required(),
    fname: Joi.string()
        .regex(nameExp)
        .required(),
    lname: Joi.string()
        .regex(nameExp)
        .required(),
    branchName: Joi.string()
        .regex(nameExp)
        .required(),
    roleGroupId: Joi.number()
        .integer()
        .disallow(Joi.ref("role_group"))
        .required() 
});

const updateBodySchema = Joi.object().keys({
    password: Joi.string().regex(passwordExp)
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