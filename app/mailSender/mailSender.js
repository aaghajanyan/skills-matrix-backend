const nodemailer = require("nodemailer");
const adminData = require(__dirname + "/../../config/nodeMailer").nodeMailer;

class MailSender {
    static async sendEmail(host, token) {
        let username = new Buffer(adminData.username, 'base64').toString('ascii');
        let password = new Buffer(adminData.password, 'base64').toString('ascii');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: username,
              pass: password
            }
          });

        let info = await transporter.sendMail({
            from: 'albert1993aghajanyan@gmail.com',
            to: "albert93aghajanyan@mail.ru",
            subject: "Skill Matrix",
            html: `<h3> The url is active 7 days.</h3><br>
                    <h3>Please register your account for the link bellow:</h3><br>
                    <a href='http://'+${host}+${token}>${host}${token}</a>`
        });
        console.log("Message sent: ", info.messageId);
        console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
    }
}

  module.exports = MailSender;