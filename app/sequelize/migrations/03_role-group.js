module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("roles_groups", {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                unique: true,
                allowNull: false,
                type: Sequelize.ENUM('super_user', 'team_lead', 'visitor')
            }
        });
    },
    down: queryInterface => queryInterface.dropTable("roles_groups")
};