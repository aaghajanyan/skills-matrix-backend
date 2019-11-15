module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("roles", {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                unique: true,
                allowNull: false,
                type: Sequelize.ENUM('create_user', 'create_skill', 'update_skill', 'menage_team', 'visitor')
            }
        });
    },
    down: queryInterface => queryInterface.dropTable("roles")
};
