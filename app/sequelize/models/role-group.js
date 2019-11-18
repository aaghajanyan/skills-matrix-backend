const rolesGroups = require("../config/config").rolesGroups;

module.exports = (sequelize, DataTypes) => {
    const RoleGroup = sequelize.define(
        "roles_groups",
        {
            name: {
                type: DataTypes.ENUM,
                values: rolesGroups,
                allowNull: {
                    args: false,
                    msg: "Please enter name"
                },
                unique: {
                    args: true,
                    msg: "Role group already exists"
                }
            }
        },
        {
            timestamps: false
        }
    );

    RoleGroup.initDefaultValues = async function(models) {
        let rolesGroupsObjArr = [];
        rolesGroups.forEach(rolegroup => {
            let roleGroupObj = {};
            roleGroupObj.name = rolegroup;
            rolesGroupsObjArr.push(roleGroupObj);
        });
        models.roles_groups.bulkCreate(rolesGroupsObjArr).catch(() => {});
    }

    RoleGroup.associate = models => {
        RoleGroup.belongsToMany(models.roles, {
            through: "roles_relations",
            as: "rols",
            foreignKey: "roleGroupId",
            timestamps: false
        });
    };
    return RoleGroup;
};
