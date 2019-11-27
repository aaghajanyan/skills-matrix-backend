const {
    category: categoryModel,
    skill: skillModel,
    "categories_relation": categoryRelationModel,
    "skills_relation": skillRelationModel
} = require("../sequelize/models");  

const Category = require("../models/category");

const getCategories = async function(_, response) {
    const categories = await categoryModel.findAll();
    if(categories && categories.length == 0) {
        response.status(409).send(`Categories does not exist.`);
        return;
    }
    response.status(200).json(categories);
};
 
const getCategory = async function(request, response) {
    const category = await categoryModel.findByPk(request.params.categoryId);
    if(!category) {
        response.status(409).send(`Category with ${request.params.categoryId} id does not exist.`);
        return;
    }
    response.status(200).json(category);
};

const updateCategory = async function(request, response) {
    await categoryModel.update(request.body, 
        { where: { id: request.params.categoryId }
    });
    response.status(202).send();
};

const deleteCategory = async function(request, response) {
    await categoryModel.destroy({ where: { id: request.params.categoryId } })
    response.status(202).send();
};

const includeModel = (modelName, alians, required, attributes, through_modelName, through_alians, through_attributes) => {
    return {
        model: modelName,
        as: alians,
        required: required,
        attributes: attributes,
        through: {
            model: through_modelName,
            as: through_alians,
            attributes: through_attributes
        }
    }
}

const getCategoriesAllData = async function(_, response) {
    const categories = await categoryModel
        .findAll({
            include: [
                {
                    model: categoryModel,
                    as: "relatedCategories",
                    required: false,
                    attributes: ["id", "name"],
                    through: {
                        model: categoryRelationModel,
                        as: "categoryRelation",
                        attributes: []
                    },
                    include: includeModel(skillModel, 'skills', false, ['id', 'name'], skillRelationModel, 'skillRelation', [])
                },
                {
                    model: categoryModel,
                    as: "relatedCategoriesRef",
                    required: false,
                    attributes: ["id", "name"],
                    through: {
                        model: categoryRelationModel,
                        as: "categoryRelation",
                        attributes: []
                    },
                    include: includeModel(skillModel, 'skills', false, ['id', 'name'], skillRelationModel, 'skillRelation', [])
                },
                includeModel(skillModel, 'skills', false, ['id', 'name'], skillRelationModel, 'skillRelation', [])
            ]
        })
        response.status(200).json(mergeRelatedCategories(
            JSON.parse(JSON.stringify(categories))
        ));
};

const getCategoryAllData = async function(request, response) {
    const categories = await categoryModel
        .findByPk(request.params.categoryId, {
            include: [
                {
                    model: categoryModel,
                    as: "relatedCategories",
                    required: false,
                    attributes: ["id", "name"],
                    through: {
                        model: categoryRelationModel,
                        as: "categoryRelation",
                        attributes: []
                    },
                    include: includeModel(skillModel, 'skills', false, ['id', 'name'], skillRelationModel, 'skillRelation', [])
                },
                {
                    model: categoryModel,
                    as: "relatedCategoriesRef",
                    required: false,
                    attributes: ["id", "name"],
                    through: {
                        model: categoryRelationModel,
                        as: "categoryRelation",
                        attributes: []
                    },
                    include: includeModel(skillModel, 'skills', false, ['id', 'name'], skillRelationModel, 'skillRelation', [])
                },
                includeModel(skillModel, 'skills', false, ['id', 'name'], skillRelationModel, 'skillRelation', [])
            ]
        });
        response.status(200).json(categories);
};

const mergeRelatedCategories = categories => {
    categories.forEach(category => {
        category.relatedCategories = category.relatedCategories.concat(
            category.relatedCategoriesRef
        );
        delete category.relatedCategoriesRef;
    });
    return categories;
};

const addCategory = async function (request, response) {
    const sendedList = [];
    const { relatedCategoriesIds, skillsIds, ... categoryData} = request.body;
    const newCategory = await categoryModel.findOrCreate({
        where: { name: categoryData.name }
    });

    if(!newCategory[1]) {
        response.status(409).send(`${categoryData.name} category already exist`);
        return;
    }
    await Category.addRelatedCategories(relatedCategoriesIds, newCategory[0], sendedList);
    await Category.addSkills(skillsIds, newCategory[0], sendedList);
    response.status(201).json({
        'addRelatedCategories': sendedList.addedCategories,
        'addedSkills': sendedList.addedSkills
    }); 
};

const updateCategoryAllData = async function (request, response) {
    try {
        const sendedList = [];
        const { addedCategories, removedCategories, addedskills, removedSkills, ...categoryData} = request.body;
        const existingCategory = await categoryModel.findByPk(request.params.categoryId);
    
        if(!existingCategory) {
            response.status(409).send(`Category with ${request.params.categoryId} id doesn't exist`);
            return;
        }
    
        await categoryModel.update(categoryData, 
            { where: { id: request.params.categoryId }
        });
    
        await Category.addRelatedCategories(addedCategories, existingCategory, sendedList);
        await Category.removeRelatedCategories(removedCategories, existingCategory, sendedList);
        await Category.addSkills(addedskills, existingCategory, sendedList);
        await Category.removeSkills(removedSkills, existingCategory, sendedList);
    
        response.status(201).json({
            'addRelatedCategories': sendedList.addedCategories,
            'removedRelatedCategories': sendedList.removedCategories,
            'addedSkills': sendedList.addedSkills,
            'removedSkills': sendedList.removedSkills
        }); 
    } catch(err) {
        response.status(409).send(`Category with ${request.body.name} name already exists`);
        return;
    }
};

module.exports = {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    updateCategoryAllData,
    deleteCategory,
    getCategoriesAllData,
    getCategoryAllData
};