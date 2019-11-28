module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("invitations", {
            id: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            guid: {
                unique: true,
                allowNull: false,
                type: Sequelize.UUID
            },
            email: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            }
        });
    },
    down: queryInterface => queryInterface.dropTable("invitations")
};
