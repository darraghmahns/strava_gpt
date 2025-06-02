const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

let access_token = '';

app.get('/auth', (req, res) => {
  const redirect = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&approval_prompt=force&scope=activity:read_all`;
  res.redirect(redirect);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenRes = await axios.post('https://www.strava.com/oauth/token', {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    });

    access_token = tokenRes.data.access_token;
    res.send('Authentication successful. You can return to the app.');
  } catch (error) {
    res.status(500).send('Authentication failed.');
  }
});

app.get('/activities', async (req, res) => {
  try {
    const result = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

module.exports = app;
