const {
    skill: skillModel,
    category: categoryModel,
    "skills_relation": skillRelationModel
} = require("../sequelize/models");

class Skill {
    static async addedNewCategories(categoriesId, skillData, sendedList, categoriesRequired) {
        sendedList.addedCategories = [];
    
        const errMessageReqCategory = {
            message: 'Required field <category> doesn\'t exist',
            success: false
        } 
        if (categoriesId && categoriesId.length) {
            const promise = categoriesId.map(async function (categoryId) {
                const category = await categoryModel.findByPk(categoryId);
                const message = {
                    message: `Category with ${categoryId} category doesn't exist`,
                    success: false
                }
    
                if (category) {
                    const skill = await skillModel.findOrCreate({
                        where: { name: skillData.name }
                    });
                    const skillRelation = await skillRelationModel.findOrCreate({
                        where: {
                            skillId: skill[0].id,
                            categoryId: category.id
                        }
                    });
    
                    return {
                        id: skill[0].id,
                        name: skill[0].name,
                        categoryId: category.id,
                        categoryName: category.name,
                        skillRelationId: skillRelation[0].id,
                        success: true
                    }
                }
                return message;
            });
    
            await Promise.all(promise).then((list) => {
                list.forEach(item => {
                    sendedList.addedCategories.push(item);
                })
            });
        } else {
            if (categoriesRequired) {
                sendedList.push(errMessageReqCategory);
            }
        }
    }
    
    static async removeCategories(removedCategories, sendedList, skillId) {
        sendedList.removedCategories = [];
        if (removedCategories && removedCategories.length) {
            const promise = removedCategories.map(async function(categoryId) {
                const obj = {
                    categoryId: categoryId,
                    status: 'failed'
                }
                const existingSkillCategory = await skillRelationModel.findOne({
                    where: {
                        skillId: skillId,
                        categoryId: categoryId
                    }
                });
    
                if (existingSkillCategory) {
                    obj.status = 'passed';
                    await existingSkillCategory.destroy();
                }
                return obj;
            })
    
            await Promise.all(promise).then((list) => {
                sendedList.removedCategories.push(list);
            });
        }
    }
}

module.exports = Skill;