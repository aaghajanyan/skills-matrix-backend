module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("users", {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            fname: {
                allowNull: false,
                type: Sequelize.STRING
            },
            lname: {
                allowNull: false,
                type: Sequelize.STRING
            },
            branchName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            uuid: {
                unique: true,
                allowNull: false,
                type: Sequelize.UUID
            },
            isActive: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            createdDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            roleGroupId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "roles_groups",
                    key: "id",
                    as: "roleGroupId"
                }
            }
        });
    },
    down: queryInterface => queryInterface.dropTable("users")
};
