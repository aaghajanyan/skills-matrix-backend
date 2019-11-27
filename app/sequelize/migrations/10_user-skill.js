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
            skillId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "skills",
                    key: "id",
                    as: "skilllId"
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
