import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

const GOOGLE_MAPS_API_KEY = 'AIzaSyCDRcDbcOMMMzdu8Vqv35dHjoBjcRlRoNA';  // Replace with your API key
const GOOGLE_MAPS_API_URL = `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_MAPS_API_KEY}`;

app.use(cors());

app.get('/location', async (req, res) => {
    try {
        console.log('Request received for /location');
        const response = await fetch(GOOGLE_MAPS_API_URL, { method: 'POST' });
        const data = await response.json();
        console.log('Data received from Google Maps API:', data);
        const location = data.location;
        res.json(location);
    } catch (error) {
        console.error('Error fetching location:', error);
        res.status(500).json({ error: 'Failed to fetch location' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
