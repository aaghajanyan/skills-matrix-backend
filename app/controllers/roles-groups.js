const {
    "roles_groups": rolesGroupsModel
} = require("../sequelize/models");

const getRoleGroup = async function(request, response) {
    const roleGroup = await rolesGroupsModel.findByPk(request.params.roleGroupId);
    response.status(200).json(roleGroup); 
}

const getRoleGroups = async function(request, response) {
    const roleGroup = await rolesGroupsModel.findAll();
    response.status(200).json(roleGroup); 
}

module.exports = {
    getRoleGroup,
    getRoleGroups
}