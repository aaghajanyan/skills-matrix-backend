const {
    skill: skillModel,
    category: categoryModel,
    "skills-relation": skillRelationModel
} = require("../sequelize/models");

const getSkillsRelations = (_, response) => {
    skillRelationModel
        .findAll()
        .then(skillsRelations => response.status(200).json(skillsRelations));
};

const getSkillRelation = (request, response) => {
    skillRelationModel
        .findByPk(request.params.skillRelationId)
        .then(skillRelation => response.status(200).json(skillRelation));
};

const addSkillRelation = (request, response) => {
    categoryModel.findByPk(request.body.categoryId).then(category => {
        if (category) {
            skillModel.findByPk(request.body.skillId).then(skill => {
                if (skill) {
                    skillRelationModel
                        .create(request.body)
                        .then(skillRelation =>
                            response.status(201).json({ id: skillRelation.id })
                        );
                } else {
                    response.status(409).send("Skill doesn't exist");
                }
            });
        } else {
            response.status(409).send("Category doesn't exist");
        }
    });
};

const updateSkillRelation = (request, response) => {
    categoryModel.findByPk(request.body.categoryId).then(category => {
        if (category) {
            skillRelationModel
                .update(request.body, {
                    where: { id: request.params.skillRelationId }
                })
                .then(_ => response.status(202).send());
        } else {
            response.status(409).send("Category doesn't exist");
        }
    });
};

const deleteSkillRelation = (request, response) => {
    skillRelationModel
        .destroy({ where: { id: request.params.skillRelationId } })
        .then(_ => response.status(202).send());
};

module.exports = {
    getSkillsRelations,
    getSkillRelation,
    addSkillRelation,
    updateSkillRelation,
    deleteSkillRelation
};
