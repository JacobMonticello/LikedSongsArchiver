import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const playlistURL = `https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_ID}/playlists`

export const createPlaylist = async (bearerToken: string) => {
    const data = {
        name: 'generated test playlist',
        description: 'generated test playlist description'
    };
    const options = {
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        }
    };

    try {
        const response = await axios.post(playlistURL, data, options);
        console.log('****')
        console.log(response)
    } catch (error) {
        console.error('Error fetching token:', error);
    }
}