import React, { useEffect, useState } from 'react';
import './StaticMapStyles.css';

const StaticMap = ({ coordinates, zoom, size }) => {
    const [staticMapUrl, setStaticMapUrl] = useState('');

    useEffect(() => {
        // Replace "YOUR_GOOGLE_MAPS_API_KEY" with your actual API key
        const apiKey = 'AIzaSyBmWv-32VTwgmywIuWTzlYkZZ0BIPYHHi0';
        const { lat, lng } = coordinates;
        const mapZoom = zoom ? zoom : 15;
        const mapSize = size ? size : '350x150'; // Image size in pixels

        // Construct the URL for the static map image
        const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${mapZoom}&size=${mapSize}&markers=${lat},${lng}&key=${apiKey}`;

        // Update the state with the generated URL
        setStaticMapUrl(staticMapUrl);
    }, [coordinates]);

    return (
        <div className="static-map">
            <img src={staticMapUrl} alt="Static Map" />
        </div>
    );
};

export default StaticMap;
