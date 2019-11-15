module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("history", {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userSkillId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "user_skills",
                    key: "id",
                    as: "userSkillId"
                }
            },
            value: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdDate: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: queryInterface => queryInterface.dropTable("history")
};
