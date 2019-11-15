module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("user_skills", {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "users",
                    key: "id",
                    as: "userId"
                }
            },
            skillRelId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "skills_relations",
                    key: "id",
                    as: "skillRelId"
                }
            },
            currentMark: {
                allowNull: false,
                type: Sequelize.INTEGER
            }
        });
    },
    down: queryInterface => queryInterface.dropTable("user_skills")
};
