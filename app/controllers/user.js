const { user: userModel, invitation: invitationModel } = require("../sequelize/models");
const User = require("../models/user");

const getUsers = async function(_, response) {
    const users = await userModel.findAll({ attributes: { exclude: ["password"] } });
    response.status(200).json(users);
};

const getUser = async function(request, response) {
    const user = await userModel.findByPk(request.params.userId, {
        attributes: { exclude: ["password"] }
    });
    response.status(200).json(user);
};

const updateUser = async function(request, response) {
    await User.update(request.params.userId, request.body);
    response.status(202).send();
};

const signUp = async function(request, response) {
    try {
        const invitation = await invitationModel.findByPk(request.body.invitationId);
        if (!invitation) {
            return response.status(404).send("Invitation doesn't exist");
        }
        request.body.email = invitation.email;
        request.body["uuid"] = invitation.id;        
        const user = await User.create(request.body);
        await invitation.destroy();
        response.status(201).json({ id: user.id, isActive: user.isActive})
    } catch(error) {
        response.status(409).json(error);
    }  
};

module.exports = {
    getUsers,
    getUser,
    updateUser,
    signUp
};
