import express from 'express';
import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 8888;

app.get('/login', (req, res) => {
    const scope = 'user-library-read playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        }));
});

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    try {
        const response = await axios.post(authOptions.url, querystring.stringify(authOptions.form), { headers: authOptions.headers });
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;

        res.send('Successfully authenticated! You can close this tab.');

        // Store tokens in environment variables (or handle securely)
        process.env.ACCESS_TOKEN = access_token;
        process.env.REFRESH_TOKEN = refresh_token;
    } catch (error) {
        res.send('Authentication failed!');
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
