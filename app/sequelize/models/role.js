const roles = require("../config/config").roles;

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        "roles",
        {
            name: {
                type: DataTypes.ENUM,
				values: ['create_user', 'create_skill', 'update_skill', 'menage_team', 'visitor'],
				defaultValue: 'visitor',
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

	let rolesObjArr = [];
	roles.forEach((role) => {
		let roleObj = {};
		roleObj.name=role
		rolesObjArr.push(roleObj);
	})
    Role.bulkCreate(rolesObjArr).catch(()=>{});

	// console.log("R: ", BulkInsertion.getRoleData());
    // const rolesData = BulkInsertion.getRoleData();
    // Role.bulkCreate(rolesData).catch(()=>{});
	
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
