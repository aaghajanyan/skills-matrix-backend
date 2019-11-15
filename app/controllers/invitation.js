const {
    invitation: invitationModel,
    user: userModel
} = require("../sequelize/models");

const checkInvitationInDB = async function(request, response) {
    const invitation = await invitationModel.findByPk(request.params.id);
    invitation ? response.status(204).send({status: true}) : response.status(404).send("false");
};

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
                response.status(200).json({ id: currInvitation.id });
            } else {
                response.status(409).send("Email already exists in users");
            }
        } else {
            response.status(409).send("Email already exists in invitations");
        }
    } catch(error) {
        response.status(409).send(error);
    }
}

module.exports = {
    addInvitation,
    checkInvitationInDB
};