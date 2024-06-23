import React, { useEffect, useState } from 'react';
import './styles.css';

function App() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch('https://livelocation-1.onrender.com/location'); // Update this to your Render backend URL
                const data = await response.json();
                setLocation(data);
            } catch (err) {
                setError('Failed to fetch location');
            }
        };

        fetchLocation();
    }, []);

    const openGoogleMaps = () => {
        if (location) {
            const { lat, lng } = location;
            const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
            window.open(googleMapsUrl, '_blank');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Current Location</h1>
                {error ? (
                    <p>{error}</p>
                ) : location ? (
                    <div>
                        <p>Latitude: {location.lat}, Longitude: {location.lng}</p>
                        <button onClick={openGoogleMaps}>Open in Google Maps</button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </header>
        </div>
    );
}

export default App;
