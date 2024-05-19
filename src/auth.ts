import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';

dotenv.config();

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token' 

export const getBearerToken = async () => {
    const url = SPOTIFY_AUTH_URL;
    const data = {
        grant_type: 'client_credentials',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
    };
    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        const response = await axios.post(url, querystring.stringify(data), options);
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching token:', error);
    }
}