module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("roles_relations", {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            roleId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "roles",
                    key: "id",
                    as: "roleId"
                }
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
    down: queryInterface => queryInterface.dropTable("roles_relations")
};