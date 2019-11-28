const {
    user: userModel, 
    invitation: invitationModel,
    roles: rolesModel,
    "roles_relations": rolesRelationModel,
    "roles_groups": rolesGroupsModel
} = require("../sequelize/models");

const User = require("../models/user");
const tokenSecret = require('../../config/secretKey.json').token_secret;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async function(_, response) {
    const users = await userModel.findAll( 
        { 
            attributes: { exclude: ['password', 'roleGroupId'] } ,
            include: {
                model: rolesGroupsModel,
                as: "roleGroup",
                required: false,
                include: {
                    model: rolesModel,
                    as: "roles",
                    attributes: ["name"],
                    required: false,
                    through: {
                        model: rolesRelationModel,
                        as: "roleRelation",
                        attributes: []
                    }
                }
            }
        });
    response.status(200).json(users);
};

const getUser = async function(request, response) {
    const user = await userModel.findByPk(request.params.userId, 
        { 
            attributes: { exclude: ['password', 'roleGroupId'] } ,
            include: {
                model: rolesGroupsModel,
                as: "roleGroup",
                required: false,
                include: {
                    model: rolesModel,
                    as: "roles",
                    attributes: ["name"],
                    required: false,
                    through: {
                        model: rolesRelationModel,
                        as: "roleRelation",
                        attributes: []
                    }
                }
            }
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
            return response.status(400).send("Invitation doesn't exist");
        }
        request.body.email = invitation.email;
        request.body["guid"] = invitation.id;        
        const user = await User.create(request.body);
        await invitation.destroy();
        response.status(201).json({ guid: user.guid })
    } catch {
        response.status(400).json("Bad request.");
    }
};

const login = async function(request, response) {
    try {
        const user = await userModel.findOne({ where: { email: request.body.email } });
        if(!user) {
            return response.status(400).send({
                success: false,
                message: 'Email does not exists'
            });
        }
        const validPassword = bcrypt.compareSync(request.body.password, user.password);
        if(!validPassword) {
            return response.status(400).send({
                success: false,
                message: 'Password is incorrect'
            });
        }
        const token = jwt.sign(
            {
                guid: user.guid,
                email: user.email,
                isActive: user.isActive,
                roleGroupId: user.roleGroupId,
                createdDate: user.createdDate
            },
            tokenSecret,
            { expiresIn: '1 d' }
        );
        response.header('Authorization', token).send({
            success: true,
            'token': token
        });
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
