const {
    category: categoryModel,
    skill: skillModel,
    "categories_relation": categoryRelationModel,
    "skills_relation": skillRelationModel
} = require("../sequelize/models"); 

class Category {
    static async addRelatedCategories(relatedCategoriesIds, category, sendedList) {
        sendedList.addedCategories = [];
        if (relatedCategoriesIds && relatedCategoriesIds.length) {
            const promise = relatedCategoriesIds.map(async function(categoryId) {
                const relatedCategory = await categoryModel.findByPk(categoryId);
                const obj = {
                    categoryId: category.id,
                    relatedCategoryId: categoryId,
                    success: false
                };
    
                if (relatedCategory) {
                    await categoryRelationModel.findOrCreate({ 
                        where: {
                            categoryId: category.id,
                            relatedCategoryId: relatedCategory.id
                        }
                    });
                    obj.success = true;
                }
                return obj;
            });
            await Promise.all(promise).then((list) => {
                sendedList.addedCategories.push(list);
            });
        }
    }

    static async removeRelatedCategories(removedCategories, category, sendedList) {
        sendedList.removedCategories = [];
        if (removedCategories && removedCategories.length) {
            const promise = removedCategories.map(async function(categoryId) {
                const obj = {
                    categoryId: category.id,
                    relatedCategoryId: categoryId,
                    success: false
                }
                const categoryRelation = await categoryRelationModel.findOne({
                    where: {
                        categoryId: category.id,
                        relatedCategoryId: categoryId
                    }
                });
    
                if (categoryRelation) {
                    obj.status = true;
                    await categoryRelation.destroy();
                }
                return obj;
            })
    
            await Promise.all(promise).then((list) => {
                sendedList.removedCategories.push(list);
            });
        }
    }

    static async addSkills(skillsIds, category, sendedList) {
        sendedList.addedSkills = [];
        if (skillsIds && skillsIds.length) {
            const promise = skillsIds.map(async function(skillId) {
                const obj = {
                    categoryId: category.id,
                    skillId: skillId,
                    success: false
                };
                const existingSkill = await skillModel.findByPk(skillId);
    
                if (existingSkill) {
                    await skillRelationModel.findOrCreate({
                        where: {
                            skillId: skillId,
                            categoryId: category.id
                        }
                    });
                    obj.success = true;
                }
                return obj;
            });
    
            await Promise.all(promise).then((list) => {
                sendedList.addedSkills.push(list);
            });
        }
    }
    
    static async removeSkills(removedSkills, category, sendedList) {
        sendedList.removedSkills = [];
        if (removedSkills && removedSkills.length) {
            const promise = removedSkills.map(async function(delSkillId) {
                const obj = {
                    categoryId: category.id,
                    skillId: delSkillId,
                    success: false
                };
                const skillRelation = await skillRelationModel.findOne({
                    where: {
                        skillId: delSkillId,
                        categoryId: category.id
                    }
                });
    
                if (skillRelation) {
                    obj.status = true;
                    skillRelation.destroy();
                }
                return obj;
            });
    
            await Promise.all(promise).then((list) => {
                sendedList.removedSkills.push(list);
            })
        }
    }
    
}

module.exports = Category;