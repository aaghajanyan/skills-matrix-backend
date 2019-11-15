const rolesGroups = require("../config/config").rolesGroups;

module.exports = (sequelize, DataTypes) => {
    const RoleGroup = sequelize.define(
        "roles_groups",
        {
            name: {
                type: DataTypes.ENUM,
                values: ['super_user', 'team_lead', 'visitor'],
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
    

	let rolesGroupsObjArr = [];
	rolesGroups.forEach((rolegroup) => {
		let roleGroupObj = {};
		roleGroupObj.name=rolegroup
		rolesGroupsObjArr.push(roleGroupObj);
    })
    RoleGroup.bulkCreate(rolesGroupsObjArr).catch(()=>{});

    // console.log("G: ", BulkInsertion.getRoleGroupData());
    // const rolesGroupsData = BulkInsertion.getRoleGroupData();
    // RoleGroup.bulkCreate(rolesGroupsData).catch(()=>{});

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
