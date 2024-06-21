import React, { useState, useRef, Fragment, useEffect } from "react";
import { useStyle } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import { FormattedMessage, useIntl } from 'react-intl';
import Marker from './Marker';
import GoogleMap from './GoogleMap';
import defaultClasses from './googleMaps.module.css';
import { grayMapStyle } from './MapStyle';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Paper from '@mui/material/Paper';
import debounce from 'lodash.debounce';
import SearchBox from './SearchBox';
import GetDeviceType from '../GetDeviceType/getDeviceType';

const GoogleMaps = props => {
  const {
    handleCoordinatesChange,
    setMapCoordinates,
    setSelectedAddress,
    isGuestCheckout,
    amAllowGuestCheckout
  } = props;
  const classes = useStyle(defaultClasses, props.classes);
  const { isDesktop, isMobile, isTablet } = GetDeviceType();
  const apiKey = "AIzaSyBmWv-32VTwgmywIuWTzlYkZZ0BIPYHHi0";
  const libraries = ['places', 'geometry', 'drawing', 'visualization'];
  const [defaultCenter, setDefaultCenter] = useState({ lat: 33.8938, lng: 35.5018 });
  const [center, setCenter] = useState({ lat: 33.8938, lng: 35.5018 });
  const centere = { lat: 33.8938, lng: 35.5018 };
  const [address, setAddress] = useState('');
  const [defaultZoom, setDefaultZoom] = useState(10); // Initial default zoom level
  const [zoom, setZoom] = useState(10); // Initial zoom level
  const [marker, setMarker] = useState({ lat: 33.8938, lng: 35.5018 });
  const mapRef = useRef(null);
  const locationZoom = 15;

  console.log("2- isGuestCheckout ->>>>> ", isGuestCheckout);
  const handleMapDrag = (map) => {
    //debouncedHandleMapDrag(map);
    const newCenter = {
      lat: map.center.lat(),
      lng: map.center.lng(),
    };
    // setCenter(newCenter);
    setMarkerPosition(newCenter);
  };

  const debouncedHandleMapDrag = useRef(
    debounce((map) => {
      const newCenter = {
        lat: map.center.lat(),
        lng: map.center.lng(),
      };
      setCenter(newCenter);
    }, 500) // Adjust the debounce delay as needed
  ).current;

  const handleMapDragEnd = (map) => {
    // Call the function to fetch the address information
    getAddressInfo(center.lat, center.lng);
  };

  const getAddressInfo = (lat, lng) => {
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    fetch(geocodingApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          console.error("data.results[0]:", data.results[0]);
          setAddress(data.results[0].formatted_address);
          //setSelectedAddress(data.results[0].formatted_address);
          console.error("address:", address);
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  };

  const handleMapChange = ({ center }) => {
    setMarkerPosition(center);
    getAddressInfo(center.lat, center.lng);
  };

  // Function to handle the resend counter
  const handleConfirmLocation = () => {
    setMapCoordinates({
      lat: center.lat,
      lng: center.lng
    });
    handleCoordinatesChange(center.lat, center.lng);
  };

  const setMarkerPosition = (position) => {
    setMarker({
      lat: position.lat,
      lng: position.lng,
    });
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLat = position.coords.latitude;
        const currentLng = position.coords.longitude;
        const center = { lat: currentLat, lng: currentLng };
        setCenter(center);
        setZoom(locationZoom);
        handleMapChange({ center });
      });
    }
  };

  useEffect(() => {
    handleGetCurrentLocation(); // Automatically get the user's location when the component mounts
  }, []);

  const handleApiLoaded = (map, maps) => {
    // Now, 'map' is the Google Map instance
    mapRef.current = map;
  };

  const handlePlaceSelect = (placeId) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === 'OK' && results[0].geometry) {
        const newCenter = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        setCenter(newCenter);
        setZoom(locationZoom);
        handleMapChange({ center: newCenter });
      }
    });
  };

  return (
    <Fragment>
      <div style={{ height: '100vh', width: isDesktop ? '100%' : '100vw', position: 'relative' }}>
        <GoogleMap
          bootstrapURLKeys={{ key: apiKey, libraries: libraries }}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          defaultZoom={defaultZoom}
          defaultCenter={defaultCenter}
          zoom={zoom}
          center={center}
          //yesIWantToUseGoogleMapApiInternals
          onDrag={handleMapDrag}
          onDragEnd={handleMapDragEnd}
          onChange={({ center, zoom }) => {
            // Debounced event for handling map changes
            handleMapChange({ center });
            setCenter(center);
            setZoom(zoom);
          }}
          options={{
            draggable: true, // Allow map dragging
            disableDefaultUI: true, // Disable the default UI (zoom control, etc.)
            gestureHandling: "greedy", // Allow map dragging even on touch devices
            //styles: grayMapStyle // Apply the gray map style here
          }}
        >
          <Marker
            key="1234"
            text="Beesline"
            lat={marker.lat}
            lng={marker.lng}
          />
        </GoogleMap>
        {address && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: 'transparent', padding: 10, zIndex: '10000' }}>
            {/* Address: {address} */}
            <SearchBox classes={classes} map={mapRef?.current} setMarker={setMarker} onPlaceSelect={handlePlaceSelect} />
          </div>
        )}
      </div>
      <Paper sx={{ position: 'fixed', bottom: '25px', left: 0, right: 0, backgroundColor: 'transparent', boxShadow: 'none', textAlign: isDesktop ? 'center' : '' }} elevation={3}>
        <div style={{ padding: '0 15px' }}>
          <Button className={classes.currentLocationBtn} onClick={handleGetCurrentLocation} variant="contained" size="medium">
            <MyLocationIcon />
          </Button>
          <Button className={isDesktop ? classes.desktopFullBtn : classes.fullBtn} onClick={handleConfirmLocation} variant="contained" size="medium">
            <FormattedMessage id="global.confirmButton" defaultMessage="Confirm" />
          </Button>
        </div>
      </Paper>
    </Fragment>
  );
};

export default GoogleMaps;
