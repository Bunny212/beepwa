import React, { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  geocodeByAddress
} from 'react-places-autocomplete';
import usePlacesAutocomplete, { getLatLng } from 'use-places-autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import RoomIcon from '@mui/icons-material/Room';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import useOnclickOutside from "react-cool-onclickoutside";
import { GetDefautlCountryData } from "../GetDefaultCountryData/getDefautlCountryData";


const SearchBox = ({ classes, map, setMarker, onPlaceSelect }) => {
  const { formatMessage } = useIntl();
  const [address, setAddress] = useState('');
  const { loading, error, storeConfig } = GetDefautlCountryData();
  const currentCountry = storeConfig?.beesline_default_country?.default_country_code;
  const [selectedCountry, setSelectedCountry] = useState('lb');
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      /* Define options */
      componentRestrictions: { country: selectedCountry.toLowerCase() },
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  // Update siginMethod when currentCountry has a value
  useEffect(() => {
      if (currentCountry) {
          setSelectedCountry(currentCountry);
      }
  }, [currentCountry]);

  const handleSelect = async (value) => {
    setValue(value, false);
    clearSuggestions();
    const results = await geocodeByAddress(value);
    const latLng = getLatLng(results[0]);
    setMarker(latLng);
    onPlaceSelect(results[0].place_id);
  };

  return (
      <div ref={ref}>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
      >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: '12px' }}
        placeholder={formatMessage({
            id: 'searchGoogleMaps',
            defaultMessage: 'Search Google Maps'
        })}
        inputProps={{ 'aria-label': formatMessage({
            id: 'searchGoogleMaps',
            defaultMessage: 'Search Google Maps'
        })}}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className={classes.locationSearchInput}
      />
      <IconButton type="button" sx={{ p: '10px', pointerEvents: 'none' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
        <div className={classes.autocompleteDropdownContainer}>
          {ready && status === 'OK' && (
            <>
            <List>
              {data.map((suggestion, index) => (
                <>
                <ListItem disablePadding>
                <ListItemButton
                sx={{ padding: '0 10px !important' }}
                key={suggestion.place_id}
                onClick={() => handleSelect(suggestion.description)}
                className={suggestion.active ? classes.suggestionItemActive : classes.suggestionItem}
                >
                <ListItemIcon sx={{ minWidth: '35px' }}>
                <RoomIcon sx={{ color: '#000' }} />
              </ListItemIcon>
                <ListItemText primary={
                    <>
                      <Typography
                            sx={{ display: 'inline', fontSize: '13px' }}
                            component="span"
                            variant="caption"
                            color="text.primary"
                        >
                            {suggestion.description}
                        </Typography>
                    </>
                    } />
                </ListItemButton>
                </ListItem>
                {index < data.length - 1 && <Divider light />}
                </>
              ))}
              </List>
            </>
          )}
        </div>
      </div>
  );
};

export default SearchBox;
