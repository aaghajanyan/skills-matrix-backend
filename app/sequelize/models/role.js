const roles = require("../config/config").roles;

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        "roles",
        {
            name: {
                type: DataTypes.ENUM,
                values: roles,
                defaultValue: "visitor",
                allowNull: {
                    args: false,
                    msg: "Please enter name"
                },
                unique: {
                    args: true,
                    msg: "Role already exists"
                }
            }
        },
        {
            timestamps: false
        }
    );

    Role.initDefaultValues = async function(models) {
        let rolesObjArr = [];
        roles.forEach(role => {
            let roleObj = {};
            roleObj.name = role;
            rolesObjArr.push(roleObj);
        });
        models.roles.bulkCreate(rolesObjArr).catch(() => {});
    }

    Role.associate = models => {
        Role.belongsToMany(models.roles_groups, {
            through: "role_relation",
            as: "roles",
            foreignKey: "roleId",
            timestamps: false
        });
    };
    return Role;
};
