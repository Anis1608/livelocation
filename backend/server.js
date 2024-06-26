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
        
        // Fetch location from Google Maps Geolocation API
        const response = await fetch(GOOGLE_MAPS_API_URL, { method: 'POST' });
        const data = await response.json();
        const location = data.location;

        // Construct the Google Maps URL with the coordinates
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
        
        // Send a redirection response to the client
        res.redirect(302, googleMapsUrl);
    } catch (error) {
        console.error('Error fetching location:', error);
        res.status(500).json({ error: 'Failed to fetch location' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
