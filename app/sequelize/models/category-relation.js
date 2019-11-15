module.exports = (sequelize, DataTypes) => {
    const CategoryRelation = sequelize.define(
        "categories_relation",
        {
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: {
                    args: false,
                    msg: "Please enter category id"
                }
            },
            relatedCategoryId: {
                type: DataTypes.INTEGER,
                allowNull: {
                    args: false,
                    msg: "Please enter related category id"
                }
            }
        },
        {
            timestamps: false
        }
    );
    CategoryRelation.associate = models => {};
    return CategoryRelation;
};