const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { env } = require("./config/env");
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(env.CLIENT_ID, env.CLIENT_SECRET);
OAuth2_client.setCredentials({ refresh_token: env.REFRESH_TOKEN });

const send_mail = (name, recipient) => {
  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: env.EMAIL,
      clientId: env.CLIENT_ID,
      clientSecret: env.CLIENT_SECRET,
      refreshToken: env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mail_options = {
    from: "khoitran",
    to: recipient,
    subject: "from Khoi Tran",
    text: "bi khung",
  };

  transport.sendMail(mail_options, (err, res) => {
    if (err) console.log("err: ", err);
    else console.log("success: ", res);
  });
  transport.close();
};

send_mail("khoi", "majej19748@rc3s.com");
