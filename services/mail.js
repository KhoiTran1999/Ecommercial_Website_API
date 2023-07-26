const nodemailer = require("nodemailer");
const generateOAuth2AccessToken = require("../utiles/generateOAuth2AccessToken");
const { env } = require("../config/env");

class EmailService {
  constructor() {
    this.initTransporter();
  }
  initTransporter() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: env.EMAIL,
        clientId: env.CLIENT_ID,
        clientSecret: env.CLIENT_SECRET,
      },
    });
  }

  async sendMail({ to, subject, text, html }) {
    const accessToken = await generateOAuth2AccessToken();
    this.transporter.sendMail(
      {
        from: "Khoi Tran Shop",
        to,
        subject,
        text,
        html,
        auth: {
          user: env.EMAIL,
          refreshToken: env.REFRESH_TOKEN,
          accessToken,
        },
      },
      (err, res) => {
        if (err) console.log("err: ", err);
        else console.log("success: ", res);
      }
    );
  }
}

module.exports = new EmailService();
