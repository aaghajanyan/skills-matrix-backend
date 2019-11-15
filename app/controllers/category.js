const {
    category: categoryModel,
    skill: skillModel,
    "categories_relation": categoryRelationModel,
    "skills_relation": skillRelationModel
} = require("../sequelize/models");

const getCategories = (_, response) => {
    categoryModel
        .findAll()
        .then(categories => response.status(200).json(categories));
};

const getAll = (_, response) => {
    categoryModel
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
                        attributes: ["id"]
                    }
                },
                {
                    model: categoryModel,
                    as: "relatedCategoriesRef",
                    required: false,
                    attributes: ["id", "name"],
                    through: {
                        model: categoryRelationModel,
                        as: "categoryRelation",
                        attributes: ["id"]
                    }
                },
                {
                    model: skillModel,
                    as: "skills",
                    required: false,
                    attributes: ["id", "name"],
                    through: {
                        model: skillRelationModel,
                        as: "skillRelation",
                        attributes: ["id"]
                    }
                }
            ]
        })
        .then(categories => {
            response
                .status(200)
                .json(
                    mergeRelatedCategories(
                        JSON.parse(JSON.stringify(categories))
                    )
                );
        });
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

const getCategory = (request, response) => {
    categoryModel
        .findByPk(request.params.categoryId)
        .then(category => response.status(200).json(category));
};

const addCategory = (request, response) => {
    const { relatedCategoryName, ...categoryData } = request.body;
    categoryModel.findOne({ where: { name: categoryData.name} }).then(existingCategory => {
        if (!existingCategory) {
            if(relatedCategoryName) {
                categoryModel.findOne({ where: { name: relatedCategoryName } }).then(relatedCategory => {
                    if (relatedCategory !== null) {
                        categoryModel.create(categoryData).then(category => {
                            categoryRelationModel
                                .create({ categoryId: category.id, relatedCategoryId: relatedCategory.id })
                                .then(categoryRelation => {
                                    response.status(201).json({
                                        categoryId: categoryRelation.categoryId,
                                        relatedCategoryId: categoryRelation.relatedCategoryId
                                    });
                                });
                        });
                    } else {
                        response.status(409).send(`${relatedCategoryName} related category doesn't exist`);
                    }
                });
            } else {
                categoryModel
                .create(request.body)
                .then(category => response.status(201).json({ id: category.id }));
            }
            
        } else {
            response.status(409).send(`${categoryData.name} category already't exists`);
        }
    });
};

const updateCategory = (request, response) => {
    categoryModel
        .update(request.body, {
            where: { id: request.params.categoryId }
        })
        .then(_ => response.status(202).send());
};

const deleteCategory = (request, response) => {
    categoryModel
        .destroy({ where: { id: request.params.categoryId } })
        .then(_ => response.status(202).send());
};

module.exports = {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    getAll
};