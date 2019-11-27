const {
    skill: skillModel,
    category: categoryModel,
    "skills_relation": skillRelationModel
} = require("../sequelize/models");
const Skill = require("../models/skill");

const getSkills = async function (_, response) {
    const skills = await skillModel.findAll();
    response.status(200).json(skills);
};

const getSkill = async function (request, response) {
    const skill = await skillModel.findByPk(request.params.skillId);
    response.status(200).json(skill);
};

const getSkillAllData = async function(request, response) {
    const skills = await skillModel
        .findByPk(request.params.skillId, {
            include: [
                {
                    model: categoryModel,
                    as: "categories",
                    required: false,
                    attributes: ["id", "name"],
                    through: {
                        model: skillRelationModel,
                        as: "skillRelation",
                        attributes: []
                    }
                }
            ]
        });
        response.status(200).json(skills);
};

const getSkillsAllData = async function(request, response) {
    const skills = await skillModel
        .findAll({
            include: [
                {
                    model: categoryModel,
                    as: "categories",
                    required: false,
                    attributes: ["id", "name"],
                    through: {
                        model: skillRelationModel,
                        as: "skillRelation",
                        attributes: []
                    }
                }
            ]
        });
        response.status(200).json(skills);
};

const getStatus = async function(sendedList, keyName) {
    let status = false;
    sendedList[keyName].forEach((item) => {
        if (item.success == true) {
            status = true;
        }
    });
    return status;
}

const addSkill = async function (request, response) {
    const { categoriesId, ...skillData } = request.body;
    const sendedList = [];
    await Skill.addedNewCategories(categoriesId, skillData, sendedList, true);
    let status = await getStatus(sendedList, 'addedCategories') ? 201 : 409;
    response.status(status).json({
        'addedCategories': sendedList.addedCategories
    }); 
};

const updateSkillAllData = async function (request, response) {
    const { addCategories, deleteCategories, ...skillData } = request.body;
    const sendedList = [];
    const existingSkill = await skillModel.findByPk(request.params.skillId);
    
    if(!existingSkill) {
        response.status(409).send(`Skill with ${request.params.skillId} id doesn't exist`);
        return;
    }
    await skillModel.update(skillData, 
        { where: { id: request.params.skillId }
    });
    await Skill.addedNewCategories(addCategories, skillData, sendedList, false);
    await Skill.removeCategories(deleteCategories, sendedList, request.params.skillId);
    response.status(201).json({
        'addedCategories': sendedList.addedCategories,
        'removedCategories': sendedList.removedCategories,
    });
};

const updateSkill = async function (request, response) {
    await skillModel.update(request.body, {
        where: {
            id: request.params.skillId
        }
    });
    response.status(202).send();
};

const deleteSkill = async function (request, response) {
    await skillModel.destroy({
        where: {
            id: request.params.skillId
        }
    });
    response.status(202).send();
};

module.exports = {
    getSkills,
    getSkill,
    getSkillAllData,
    getSkillsAllData,
    addSkill,
    updateSkill,
    updateSkillAllData,
    deleteSkill
};