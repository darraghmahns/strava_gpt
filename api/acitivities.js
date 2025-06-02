const axios = require('axios');

module.exports = async (req, res) => {
  const token = req.headers.cookie?.split('access_token=')[1];
  if (!token) {
    res.statusCode = 401;
    return res.end('Unauthorized: No access token');
  }

  try {
    const result = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result.data));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Failed to fetch activities' }));
  }
};
