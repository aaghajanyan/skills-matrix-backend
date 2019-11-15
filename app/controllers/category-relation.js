const {
    category: categoryModel,
    "categories-relation": categoryRelationModel
} = require("../sequelize/models");

const getCategoriesRelations = (_, response) => {
    categoryRelationModel
        .findAll()
        .then(categoriesRelations =>
            response.status(200).json(categoriesRelations)
        );
};

const getCategoryRelation = (request, response) => {
    categoryRelationModel
        .findByPk(request.params.categoryRelationId)
        .then(categoryRelation => response.status(200).json(categoryRelation));
};

const addCategoryRelation = (request, response) => {
    categoryModel.findByPk(request.body.categoryId).then(category => {
        if (category) {
            categoryModel
                .findByPk(request.body.relatedCategoryId)
                .then(category => {
                    if (category) {
                        categoryRelationModel
                            .create(request.body)
                            .then(categoryRelation =>
                                response
                                    .status(201)
                                    .json({ id: categoryRelation.id })
                            );
                    } else {
                        response
                            .status(409)
                            .send("Related category doesn't exist");
                    }
                });
        } else {
            response.status(409).send("Category doesn't exist");
        }
    });
};

const updateCategoryRelation = (request, response) => {
    categoryModel.findByPk(request.body.relatedCategoryId).then(category => {
        if (category) {
            categoryRelationModel
                .update(request.body, {
                    where: { id: request.params.categoryRelationId }
                })
                .then(_ => response.status(202).send());
        } else {
            response.status(409).send("Related category doesn't exist");
        }
    });
};

const deleteCategoryRelation = (request, response) => {
    categoryRelationModel
        .destroy({ where: { id: request.params.categoryRelationId } })
        .then(_ => response.status(202).send());
};

module.exports = {
    getCategoriesRelations,
    getCategoryRelation,
    addCategoryRelation,
    updateCategoryRelation,
    deleteCategoryRelation
};
