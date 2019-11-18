const { user: userModel, invitation: invitationModel } = require("../sequelize/models");
const User = require("../models/user");
const tokenSecret = require("../../config/secretKey.json").token_secret;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const login = async function(request, response) {
    try {
        const user = await userModel.findOne({ where: { email: request.body.email } });
        if(!user) {
            return response.status(400).send("Email does not exists");
        }
        const validPassword = bcrypt.compareSync(request.body.password, user.password);
        if(!validPassword) {
            return response.status(400).send("Password is incorrect");
        }
        const token = jwt.sign({
            uuid: user.uuid,
            email: user.email,
            roleGroupId: user.roleGroupId
        }, tokenSecret);
        response.header("auth-token", token).send(token);
    } catch (err) {
        response.send(err);
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    signUp,
    login
};
