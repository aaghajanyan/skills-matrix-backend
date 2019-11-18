const db = require("./index");

module.exports = (sequelize, DataTypes) => {
    const RoleRelation = sequelize.define(
        "roles_relations",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            roleGroupId: {
                type: DataTypes.INTEGER,
                allowNull: {
                    args: false,
                    msg: "Please enter roleGroupId id"
                }
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: {
                    args: false,
                    msg: "Please enter role id"
                }
            }
        },
        {
            timestamps: false
        }
    );
    
    const defGroupRel = {
        "super_user": [ "create_user", "create_skill", "update_skill", "manage_team", "visitor"],
        "team_lead": ["manage_team", "visitor"],
        "visitor": ["visitor"]
    }

    RoleRelation.initDefaultValues = async function(models) {
        let roleRelList = [];
        console.log(models);
        Object.keys(defGroupRel).map(async function(group) {
            try {
                const rolesList = defGroupRel[group];        
                const existingRoleGroup = await models.roles_groups.findOne({ where: { name: group } });    
                rolesList.forEach(async function(role) {
                    try{
                        const existingRole = await models.roles.findOne({ where: { name: role } });
                        const currRoleRelObj = {};
                        currRoleRelObj.roleId = existingRole.dataValues.id;
                        currRoleRelObj.roleGroupId = existingRoleGroup.dataValues.id
                        roleRelList.push(currRoleRelObj);
                        const existingRoleRel = await models.roles_relations.findOne({ where: { 
                            roleId: existingRole.dataValues.id,
                            roleGroupId: existingRoleGroup.dataValues.id
                        } });
                        if (!existingRoleRel) {
                            RoleRelation.build({roleId: existingRole.dataValues.id, roleGroupId: existingRoleGroup.dataValues.id }).save();
                        }
                    } catch(error) {
                        console.log(error);
                    }
                })
            } catch(err) {
                console.log(err)
            }
    
        });
        // console.log(" roleRelList : ", roleRelList)
        // await models.roles_relations.bulkCreate(roleRelList).catch((err) => {
        //     console.log("err *** ", err)
        // });

    };
  
    RoleRelation.associate = models => {};
    return RoleRelation;
};