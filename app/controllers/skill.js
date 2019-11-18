const {
    skill: skillModel,
    category: categoryModel,
    "skills_relation": skillRelationModel
} = require("../sequelize/models");

const getSkills = async function (_, response) {
    const skills = await skillModel.findAll();
    response.status(200).json(skills);
};

const getSkill = async function (request, response) {
    const skill = await skillModel.findByPk(request.params.skillId);
    response.status(200).json(skill);
};

// const createSkillRelation = async function (skillId, categoryId) {
//     const skillRelation = await skillRelationModel.create({
//         skillId: skillId,
//         categoryId: categoryId
//     });
//     response.status(201).json({
//         id: skill.id,
//         relationId: skillRelation.id
//     });
// }


// const addSkill1 = async function (request, response) {
//     const arr = [1, 2, 3];
//     arr.map(i => {
//         if (i.done == true) {
//             console.log("done i = ", i);


//             response.status(201).json({
//                 id: i
//             });
//         }
//         console.log("i = ", i);

//     });
// }
// const addSkill = async function (request, response) {
//     const {
//         categoriesNames,
//         ...skillData
//     } = request.body;
//     const arr = [];
//     Object.keys(categoriesNames).map(i => arr.push(categoriesNames[i]));
//     let itemsCount = arr.length;

//     const sendedList = [];
//     if (itemsCount) {
//         arr.map(async function (categoryName) {
//             const category = await categoryModel.findOne({
//                 where: {
//                     name: categoryName
//                 }
//             });
//             if (category) {
//                 const existingSkill = await skillModel.findOne({
//                     where: {
//                         name: skillData.name
//                     }
//                 });
//                 if (!existingSkill) {
//                     const skill = await skillModel.create(skillData);
//                     // await createSkillRelation(skill.id, category.id);
//                     const skillRelation = await skillRelationModel.create({
//                         skillId: skill.id,
//                         categoryId: category.id
//                     });
//                     sendedList.push({
//                         id: skill.id,
//                         relationId: skillRelation.id
//                     });
//                     // response.status(201).json({
//                     //     id: skill.id,
//                     //     relationId: skillRelation.id
//                     // });
//                 } else {
//                     try {
//                         // await createSkillRelation(existingSkill.id, category.id);

//                         const skillRelation = await skillRelationModel.create({
//                             skillId: existingSkill.id,
//                             categoryId: category.id
//                         });
//                         sendedList.push({
//                             id: existingSkill.id,
//                             relationId: skillRelation.id
//                         });

//                         // response.status(201).json({
//                         //     id: existingSkill.id,
//                         //     relationId: skillRelation.id
//                         // });
//                     } catch (error) {
//                         response.status(409).send(error);
//                     }
//                 }
//             } else {
//                 response.status(409).send(`${categoryName} category doesn't exist`);
//             }
//         });
//         response.status(201).send(sendedList);
//     } else {
//         response.status(409).send("Required field <category> doesn't exist");
//     }
// };

const addSkill = (request, response) => {
    if (request.body.categoryName) {
        const { categoryName, ...skillData } = request.body;
        categoryModel.findOne({ where: { name: categoryName } }).then(category => {
            if (category) {
                skillModel.findOne({ where: { name: skillData.name } }).then(existingSkill => {
                    if (!existingSkill) {
                        skillModel.create(skillData).then(skill => {
                            skillRelationModel
                                .create({ skillId: skill.id, categoryId: category.id })
                                .then(skillRelation => {
                                    response.status(201).json({
                                        id: skill.id,
                                        relationId: skillRelation.id
                                    });
                                });
                            });
                    } else {
                        skillRelationModel
                            .create({ skillId: existingSkill.id, categoryId: category.id })
                            .then(skillRelation => {
                                response.status(201).json({
                                    id: existingSkill.id,
                                    relationId: skillRelation.id
                                });
                            }).catch(() => {
                                response.status(409).send(`${skillData.name} skill already exists in ${category.name} category`);
                            });
                    }
                });
            } else {
                response.status(409).send(`${categoryName} category doesn't exist`);
            }
        });
    } else {
        response.status(409).send("Required field <category> doesn't exist");
    }
};

// const addSkill = (request, response) => {
//     if (request.body.categoryName) {
//         const { categoryName, ...skillData } = request.body;
//         categoryModel.findOne({ where: { name: categoryName } }).then(category => {
//             if (category !== null) {
//                 skillModel.findOne({ where: { name: skillData.name } }).then(existingSkill => {
//                     if (!existingSkill) {
//                         skillModel.create(skillData).then(skill => {
//                             skillRelationModel
//                                 .create({ skillId: skill.id, categoryId: category.id })
//                                 .then(skillRelation => {
//                                     response.status(201).json({
//                                         id: skill.id,
//                                         relationId: skillRelation.id
//                                     });
//                                 });
//                             });
//                     } else {
//                         response.status(409).send(`${skillData.name} skill already exists`);
//                     }
//                 });
//             } else {
//                 response.status(409).send(`${categoryName} category doesn't exist`);
//             }
//         });
//     } else {
//         response.status(409).send("Required field <category> doesn't exist");
//     }
// };

// const addSkill = (request, response) => {
//     if (request.body.categoryId) {
//         const { categoryId, ...skillData } = request.body;
//         categoryModel.findByPk(categoryId).then(category => {
//             if (category) {
//                 skillModel.create(skillData).then(skill => {
//                     skillRelationModel
//                         .create({ skillId: skill.id, categoryId: categoryId })
//                         .then(skillRelation => {
//                             response.status(201).json({
//                                 id: skill.id,
//                                 relationId: skillRelation.id
//                             });
//                         });
//                 });
//             } else {
//                 response.status(409).send("Category doesn't exist");
//             }
//         });
//     } else {
//         skillModel
//             .create(request.body)
//             .then(skill => response.status(201).json({ id: skill.id }));
//     }
// };

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
    addSkill,
    updateSkill,
    deleteSkill
};