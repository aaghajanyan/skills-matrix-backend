const {
    invitation: invitationModel,
    user: userModel
} = require("../sequelize/models");

const tokenSecret = require('../../config/secretKey.json').token_secret;
const jwt = require('jsonwebtoken');

const checkInvitationInDB = async function(request, response) {
    const invitation = await invitationModel.findByPk(request.params.id);
    invitation ? response.status(204).send({status: true}) : response.status(404).send("false");
};

const MailSender = require('../mailSender/mailSender');

const addInvitation = async function(request, response) {
    try {
        const invitation = await invitationModel.findOne({
            where: { email: request.body.email }
        });
        if (!invitation) {
            const user = await userModel.findOne({
                where: { email: request.body.email }
            });
            if (!user) {
                const currInvitation = await invitationModel.create(request.body);
                const token = jwt.sign(
                    {
                        guid: currInvitation.id,
                        createdDate: Date().now
                    },
                    tokenSecret,
                    { expiresIn: '3 m' }
                );
                await MailSender.sendEmail('http://localhost:3002/users/', token).catch((err) => {
                    console.log('Error: ', err);
                });
                return response.status(200).json({
                    success: true,
                    'token': token,
                    guid: currInvitation.id
                });
            } else {
                response.status(409).send('Email already exists in users');
            }
        } else {
            response.status(409).send('Email already exists in invitations');
        }
    } catch(error) {
        console.log("\n\n EEEE \n\n");
        response.status(409).send(error);
    }
}

module.exports = {
    addInvitation,
    checkInvitationInDB
};
