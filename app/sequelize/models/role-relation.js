module.exports = (sequelize, DataTypes) => {
    const RoleRelation = sequelize.define(
        "roles_relations",
        {
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: {
                    args: false,
                    msg: "Please enter role id"
                }
            },
            roleGroupId: {
                type: DataTypes.INTEGER,
                allowNull: {
                    args: false,
                    msg: "Please enter roleGroupId id"
                }
            }
        },
        {
            timestamps: false
        }
    );
    
    RoleRelation.associate = models => {};
    return RoleRelation;
};