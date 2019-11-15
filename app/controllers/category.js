const {
    category: categoryModel,
    skill: skillModel,
    "categories_relation": categoryRelationModel,
    "skills_relation": skillRelationModel
} = require("../sequelize/models");

const getCategories = async function(_, response) {
    const categories = await categoryModel.findAll();
    response.status(200).json(categories);
};

const getAll = async function(_, response) {
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
        response.status(200).json(mergeRelatedCategories(
            JSON.parse(JSON.stringify(categories))
        ));
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

const getCategory = async function(request, response) {
    const category = await categoryModel.findByPk(request.params.categoryId);
    response.status(200).json(category);
};

const addCategory = async function(request, response) {
    try {
        const { relatedCategoryName, ...categoryData } = request.body;
        const existingCategory = await categoryModel.findOne({ where: { name: categoryData.name} });
        if (!existingCategory) {
            if(relatedCategoryName) {
                const relatedCategory = await categoryModel.findOne({ where: { name: relatedCategoryName } });
                if (relatedCategory) {
                    const category = await categoryModel.create(categoryData);
                    const categoryRelation = await categoryRelationModel
                        .create({ categoryId: category.id, relatedCategoryId: relatedCategory.id });
                    response.status(201).json({
                        categoryId: categoryRelation.categoryId,
                        relatedCategoryId: categoryRelation.relatedCategoryId
                    });
                } else {
                    response.status(409).send(`${relatedCategoryName} related category doesn't exist`);
                }
            } else {
                const category = await categoryModel.create(request.body);
                response.status(201).json({ id: category.id });
            }
        } else {
            response.status(409).send(`${categoryData.name} category already't exists`);
        }
    } catch(error) {
        response.status(409).send(error);
    }
}

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

module.exports = {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    getAll
};