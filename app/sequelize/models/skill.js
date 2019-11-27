module.exports = (sequelize, DataTypes) => {
    const Skill = sequelize.define(
        "skill",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: "Please enter name"
                },
                unique: {
                    args: true,
                    msg: "Skill already exists"
                }
            }
        },
        {
            timestamps: false
        }
    );
    Skill.associate = models => {
        Skill.belongsToMany(models.category, {
            through: "skills_relations",
            as: "categories",
            foreignKey: "skillId"
        })
    };
    return Skill;
};
