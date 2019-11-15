const {
    invitation: invitationModel,
    user: userModel
} = require("../sequelize/models");

const checkInvitationInDB = async function (request, response) {
    let invitation = await invitationModel.findByPk(request.params.id);
    invitation ? response.status(204).send("Failed") : response.status(404).send("Successed");
};

const addInvitation = async function (request, response) {
    try {
        let invitation = await invitationModel.findOne({
            where: { email: request.body.email }
        });
        if (!invitation) {
            let user = await userModel.findOne({
                where: { email: request.body.email }
            });
            if (!user) {
                let currInvitation = await invitationModel.create(request.body);
                response.status(200).json({ id: currInvitation.id });
            } else {
                response.status(409).send("Email already exists in users");
            }
        } else {
            response.status(409).send("Email already exists in invitations");
        }
    } catch(error) {
        response.status(409).send("ERROR: ", error);
    }
}

module.exports = {
    addInvitation,
    checkInvitationInDB
};