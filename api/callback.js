const axios = require('axios');

module.exports = async (req, res) => {
  const code = req.query.code;
  try {
    const tokenRes = await axios.post('https://www.strava.com/oauth/token', {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    });

    // Store access_token in a real DB for production use
    res.setHeader('Set-Cookie', `access_token=${tokenRes.data.access_token}; Path=/; HttpOnly`);
    res.end('Authentication successful. You can return to the app.');
  } catch (error) {
    res.statusCode = 500;
    res.end('Authentication failed.');
  }
};