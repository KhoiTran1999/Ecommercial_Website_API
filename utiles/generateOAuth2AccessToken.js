const { google } = require("googleapis");
const { env } = require("../config/env");

const generateOAuth2AccessToken = () => {
  const OAuth2 = google.auth.OAuth2;

  const OAuth2_client = new OAuth2(env.CLIENT_ID, env.CLIENT_SECRET);

  OAuth2_client.setCredentials({ refresh_token: env.REFRESH_TOKEN });

  const accessToken = OAuth2_client.getAccessToken();

  return accessToken;
};

module.exports = generateOAuth2AccessToken;
