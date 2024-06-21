import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const MapWithSearch = () => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      /* Define options */
    },
    debounce: 300,
  });

  const handleLoad = (map) => {
    setMap(map);
  };

  const handlePlaceSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setCenter({ lat, lng });
      setMarkerPosition({ lat, lng });
    } catch (error) {
      console.error('Error selecting place', error);
    }
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setMarkerPosition({ lat, lng });
  };

  return (
    <div>
      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search for a place..."
        />
        {status === 'OK' && (
          <ul>
            {data.map((suggestion) => (
              <li key={suggestion.place_id} onClick={() => handlePlaceSelect(suggestion.description)}>
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      <LoadScript
        googleMapsApiKey="AIzaSyBmWv-32VTwgmywIuWTzlYkZZ0BIPYHHi0"
      >
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          center={center}
          zoom={15}
          onLoad={handleLoad}
          onClick={handleMapClick}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapWithSearch;
