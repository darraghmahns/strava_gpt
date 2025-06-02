const axios = require('axios');

module.exports = (req, res) => {
  const redirect = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.STRAVA_REDIRECT_URI}&approval_prompt=force&scope=activity:read_all`;
  res.writeHead(302, { Location: redirect });
  res.end();
};
