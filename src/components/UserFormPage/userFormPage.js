import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStyle } from '@magento/venia-ui/lib/classify';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import defaultClasses from './userFormPage.module.css';
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';

import GoogleMaps from "../GoogleMaps/googleMaps";
import StaticMap from "../StaticMap/staticMap";
import 'react-phone-number-input/style.css';
import PhoneInput, {  } from 'react-phone-number-input';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_COUNTRIES } from './queries/countries.qql';
import { SET_SHIPPING_ADDRESSES_ON_CART } from './queries/useAsyncShippingAddress.qql';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const CustomStyledAlert = styled(MuiAlert)({
    '& .MuiAlert-icon': {
        margin: '0', // Remove margin from the icon
    },
    backgroundColor: 'transparent',
    padding: '0px',
    marginTop: '0px',
    marginRight: '0px',
});

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        border: "none", // Remove border
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove notched outline
        },
    },
    "& .MuiOutlinedInput-input.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none", // Replace with your desired border color
    }
}));
const StyledBasicTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        border: "none", // Remove border
        boxShadow: "none !important",
        height: "initial !important",
        "& .MuiInputBase-input": {
            border: "none", // Remove notched outline
            boxShadow: "none !important",
            height: "initial !important"
        },
    }
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        border: "none", // Remove border
        height: "55px",
        borderRadius: "9.104px",
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove notched outline
            boxShadow: "0px 0px 12.139005661010742px 0px rgba(0, 0, 0, 0.12) !important",
        },
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none", // Replace with your desired border color
    }
}));

const UserFormPage = props => {
    const history = useHistory();
    const location = useLocation();
    const { isGuestCheckout, amAllowGuestCheckout, isUpdate, shippingData } = location.state || {};

    const classes = useStyle(defaultClasses, props.classes);
    const [mapCoordinates, setMapCoordinates] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCountryCode, setSelectedCountryCode] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedAddressNickname, setSelectedAddressNickname] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [severity, setSeverity] = useState('success'); // Change severity as needed
    const [message, setMessage] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [{ cartId }] = useCartContext();

    const queryParams = new URLSearchParams(location.search);
    const firstnameVal = queryParams.get('firstname');
    const lastnameVal = queryParams.get('lastname');
    const emailVal = queryParams.get('email');
    const phoneVal = queryParams.get('phone');

    const { data, loading, error } = useQuery(GET_COUNTRIES);
    // Define a mutation function using the SET_SHIPPING_ADDRESSES_ON_CART mutation
    const [setShippingAddressesOnCart] = useMutation(SET_SHIPPING_ADDRESSES_ON_CART, {
        onCompleted: (data) => {
            if (data) {
                // The mutation was successful
                setWaiting(false);
                handleShowNotification('success', 'Your address has been successfully updated!');

                const targetPagePath = "/checkout"; // Example: "/products", "/about", etc.
                const stateParams = {
                    headerTitle: 'Checkout'
                };
                const urlWithParams = `${targetPagePath}?${queryParams.toString()}`;
                // Redirect the user to the target page with state parameters
                history.push(urlWithParams, stateParams);
            } else {
                // The mutation encountered an error
                setWaiting(false);
                handleShowNotification('error', 'Something went wrong. Please refresh and try again.');
            }
        },
        onError: (error) => {
            // Handle error
            setWaiting(false);
            handleShowNotification('error', error.message);
        },
    });

    const [countryOptions, setCountryOptions] = React.useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [openCountry, setOpenCountry] = React.useState(false);
    const [openState, setOpenState] = React.useState(false);
    const [openCity, setOpenCity] = React.useState(false);
    const [openFloor, setOpenFloor] = React.useState(false);
    const [openAddressNickname, setOpenAddressNickname] = React.useState(false);
    const loadingCountry = openCountry && countryOptions.length === 0;
    const loadingState = openState && stateOptions.length === 0;
    const loadingCity = openCity && cityOptions.length === 0;
    const floorOptions = [
        // { value: 155, label: "-5" },
        // { value: 156, label: "-4" },
        // { value: 157, label: "-3" },
        // { value: 158, label: "-2" },
        // { value: 159, label: "-1" },
        { value: 160, label: "0" },
        { value: 161, label: "1" },
        { value: 162, label: "2" },
        { value: 163, label: "3" },
        { value: 164, label: "4" },
        { value: 165, label: "5" },
        { value: 166, label: "6" },
        { value: 167, label: "7" },
        { value: 168, label: "8" },
        { value: 169, label: "9" },
        { value: 170, label: "10" },
        { value: 171, label: "11" },
        { value: 172, label: "12" },
        { value: 173, label: "13" },
        { value: 174, label: "14" },
        { value: 175, label: "15" },
        { value: 176, label: "16" },
        { value: 177, label: "17" },
        { value: 178, label: "18" },
        { value: 179, label: "19" },
        { value: 180, label: "20" },
        { value: 181, label: "21" },
        { value: 182, label: "22" },
        { value: 183, label: "23" },
        { value: 184, label: "24" },
        { value: 185, label: "25" },
        { value: 186, label: "26" },
        { value: 187, label: "27" },
        { value: 188, label: "28" },
        { value: 189, label: "29" },
        { value: 190, label: "30" }
    ];    
    const loadingFloor = openFloor && floorOptions.length === 0;
    const addressNicknameOptions = [
        { label: "Home", value: 148 },
        { label: "Work", value: 149 },
        { label: "Other", value: 154 },
    ];
    const loadingAddressNickname = openAddressNickname && addressNicknameOptions.length === 0;
    const { lat, lng } = mapCoordinates;
    const [addressInput, setAddressInput] = useState({
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        region: {
            region: 'Beirut',
            region_code: 'beirut',
            region_id: 0,
        },
        postcode: '',
        country_code: selectedCountryCode,
        telephone: '96170800335',
        bee_building_name: '',
        bee_apartment_nb: '',
        bee_address_nickname: '',
        bee_nickname: '',
        bee_address_notes: '',
        bee_floor: '',
        bee_coordinates: lat + ',' + lng
    });

    useEffect(() => {
        let active = true;

        (async () => {
            if (active && data) {
                setCountryOptions(data.countries);
            }
        })();

        return () => {
            active = false;
        };
    }, []);

    /*useEffect(() => {
        let active = true;

        if (!loadingCountry) {
            return undefined;
        }

        (async () => {
            //await sleep(1e3); // For demo purposes.
            if (active && data) {
                setCountryOptions(data.countries);
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingCountry]);*/

    useEffect(() => {
        let active = true;
        setStateOptions([]);
        (async () => {
            if (active) {
                setStateOptions(selectedCountry ? selectedCountry.available_regions : []);
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingState, selectedCountry]);

    useEffect(() => {
        let active = true;
        setCityOptions([]);
        (async () => {
            if (active && selectedState) {
                setCityOptions(selectedState ? selectedState.cities : []);
            }
        })();

        return () => {
            active = false;
        };
    }, [selectedState]);

    // useEffect(() => {
    //     if (!openCountry) {
    //         setCountryOptions([]);
    //     }
    // }, [openCountry]);

    useEffect(() => {
        setAddressInput((prevInput) => ({
            ...prevInput,
            street: selectedAddress,
        }));
    }, [selectedAddress]);

    useEffect(() => {
        if (firstnameVal && lastnameVal) {
            setAddressInput({
                firstname: firstnameVal || '',
                lastname: lastnameVal || '',
                telephone: phoneVal || ''
            });
        }
    }, [firstnameVal, lastnameVal, phoneVal]);

    useEffect(() => {
        if (mapCoordinates.lat && mapCoordinates.lng) {
            setAddressInput((prevInput) => ({
                ...prevInput,
                bee_coordinates: `${mapCoordinates.lat},${mapCoordinates.lng}`
            }));
        }
    }, [mapCoordinates]);

    useEffect(() => {
        console.log("shippingData = ", shippingData);
        if (shippingData && isUpdate) {
            const [latitude, longitude] = shippingData.bee_coordinates ? shippingData.bee_coordinates.split(',') : '';
            const coordinatesObject = {
                lat: parseFloat(latitude),
                lng: parseFloat(longitude)
            };
            // setSelectedState({
            //     region: shippingData.region.label ? shippingData.region.label : selectedState,
            //     region_code: shippingData.region.code ? shippingData.region.code : '',
            //     region_id: shippingData.region.id ? shippingData.region.id : 0,
            // });
            setAddressInput({
                firstname: shippingData.firstname || firstnameVal || '',
                lastname: shippingData.lastname || lastnameVal || '',
                street: shippingData.street.join(' ') || '',
                city: shippingData.city || '',
                region: {
                    region: shippingData.region ? shippingData.region.label : '',
                    region_code: shippingData.region ? shippingData.region.code : '',
                    region_id: shippingData.region ? shippingData.region.region_id : '',
                },
                postcode: shippingData.postcode || '',
                country_code: shippingData.country ? shippingData.country.code : '',
                telephone: shippingData.telephone || phoneVal || '',
                bee_building_name: shippingData.bee_building_name || '',
                bee_apartment_nb: shippingData.bee_apartment_nb || '',
                bee_address_nickname: shippingData.bee_address_nickname || '',
                bee_nickname: shippingData.bee_nickname || '',
                bee_address_notes: shippingData.bee_address_notes || '',
                bee_floor: shippingData.bee_floor ? shippingData.bee_floor.value || '' : '',
                bee_coordinates: coordinatesObject || '',
            });

            if (countryOptions) {
                // Filter the available regions based on the selected country
                const selectedCountry = countryOptions.find(country => country.id === shippingData.country.code);
                if (selectedCountry) {
                    const availableRegions = selectedCountry.available_regions || [];
                    // Filter cities based on the selected region ID
                    const filteredCities = shippingData.region.region_id
                        ? availableRegions.find(region => region.id === shippingData.region.region_id)?.cities || []
                        : [];

                    const savedRegion = {
                        code: shippingData.region.code,
                        id: shippingData.region.region_id,
                        name: shippingData.region.label,
                        cities: filteredCities
                    };
                    const cityId = shippingData.city
                        ? filteredCities.find(city => city.name === shippingData.city)?.id || null
                        : null;
                    const cityCode = shippingData.city
                        ? filteredCities.find(city => city.name === shippingData.city)?.code || null
                        : null;
                    const floorId = shippingData.bee_floor
                            ? floorOptions.find(floor => floor.value === shippingData.bee_floor)?.value || null
                            : null;
                    const floorLabel = shippingData.bee_floor
                            ? floorOptions.find(floor => floor.value === shippingData.bee_floor)?.label || null
                            : null;
                    const nicknameId = shippingData.bee_address_nickname
                            ? addressNicknameOptions.find(nickname => nickname.value === shippingData.bee_address_nickname)?.value || null
                            : null;
                    const nicknameLabel = shippingData.bee_address_nickname
                            ? addressNicknameOptions.find(nickname => nickname.value === shippingData.bee_address_nickname)?.label || null
                            : null;

                    setSelectedState(savedRegion);
                    // Set the selected city based on the found cityId
                    setSelectedCity(cityId ? { id: cityId, name: shippingData.city, code: cityCode } : null);
                    // Set the selected city code based on the found cityCode
                    setAddressInput(prevInput => ({
                        ...prevInput,
                        city: shippingData.city || prevInput.city, // Only update if cityCode is not null
                    }));
                    // Set the selected floor based on the found floorId
                    setSelectedFloor(floorId ? { value: floorId, label: floorLabel } : null);
                    setAddressInput(prevInput => ({
                        ...prevInput,
                        bee_floor: floorId || prevInput.bee_floor, // Only update if bee_floor is not null
                    }));
                    setSelectedAddressNickname(nicknameId ? { value: nicknameId, label: nicknameLabel } : null);
                }
            }
        }
    }, [shippingData, isUpdate, countryOptions]);

    useEffect(() => {
        if (countryOptions.length === 1) {
            // If there's only one country option, select it by default
            setSelectedCountry(countryOptions[0]);
            setSelectedCountryCode(countryOptions[0].two_letter_abbreviation);
        }
    }, [countryOptions, loadingCountry]);

    const handleCountryChange = (event, newValue) => {
        setSelectedCountryCode(null)
        setSelectedCountry(newValue);
        setStateOptions([]);
        setCityOptions([]);
        if (newValue) {
            setSelectedState(newValue.available_regions == null ? null : selectedState);
            setAddressInput((prevInput) => ({
                ...prevInput,
                country_code: newValue.two_letter_abbreviation, // Save the country code
                region: { region: '', region_code: '', region_id: '' }, // Clear region
            }));
            setSelectedCountryCode(newValue.two_letter_abbreviation);
        }
    };

    const handleStateChange = (event, newValue) => {
        setSelectedState(newValue); // Set selectedState, not selectedCountry
        setSelectedCity(null);
        if (newValue) {
            setAddressInput((prevInput) => ({
                ...prevInput,
                region: {
                    region: newValue.name ? newValue.name : selectedState,
                    region_code: newValue.code ? newValue.code : '',
                    region_id: newValue.id ? newValue.id : 0,
                },
            }));
        }
    };

    const handleCityChange = (event, newValue) => {
        setSelectedCity(newValue); // Set setSelectedCity
        if (newValue) {
            setAddressInput((prevInput) => ({
                ...prevInput,
                country_code: selectedCountryCode,
                city: newValue.name
            }));
        }
    };

    const handleFloorChange = (event, newValue) => {
        setSelectedFloor(newValue);
        if (newValue) {
            setAddressInput((prevInput) => ({
                ...prevInput,
                bee_floor: newValue.value,
            }));
        }
    };

    const handleAddressNicknameChange = (event, newValue) => {
        setSelectedAddressNickname(newValue); // Set setSelectedAddressNickname
        if (newValue) {
            setAddressInput((prevInput) => ({
                ...prevInput,
                bee_address_nickname: newValue.value
            }));
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAddressInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleCoordinatesChange = (lat, lng) => {
        setAddressInput((prevInput) => ({
            ...prevInput,
            bee_coordinates: `${lat},${lng}`
        }));
    };

    // Function to save the address
    const handleSaveAddress = async () => {
        try {
            console.log("addressInput = ", addressInput);
            setWaiting(true);
            // Call the mutation with the appropriate variables
            const { data } = await setShippingAddressesOnCart({
                variables: {
                    input: {
                        cart_id: cartId,
                        shipping_addresses: [{
                            address: {
                                firstname: addressInput.firstname,
                                lastname: addressInput.lastname,
                                street: [addressInput.street],
                                city: addressInput.city,
                                postcode: addressInput.postcode,
                                region: addressInput.region.region_id,
                                //region_code: addressInput.region.region_code,
                                //region_id: addressInput.region.region_id,
                                // region: {
                                //     region: addressInput.region.region,
                                //     region_code: addressInput.region.region_code,
                                //     region_id: addressInput.region.region_id,
                                // },
                                country_code: addressInput.country_code,
                                telephone: addressInput.telephone.trim(),
                                bee_building_name: addressInput.bee_building_name,
                                bee_apartment_nb: addressInput.bee_apartment_nb,
                                bee_address_nickname: addressInput.bee_address_nickname,
                                bee_nickname: addressInput.bee_nickname,
                                bee_address_notes: addressInput.bee_address_notes,
                                bee_address_type: 151,
                                bee_floor: addressInput.bee_floor,
                                bee_coordinates: isUpdate ? shippingData.bee_coordinates : addressInput.bee_coordinates
                                //coordinates: `${addressInput.coordinates.lat},${addressInput.coordinates.lng}`
                            },
                        }]
                    }
                }
            });
        } catch (error) {
            // Handle any errors that occur during the mutation
            console.error("Mutation error:", error);
            setWaiting(false);
        }
    };

    const handleShowNotification = (severity, message) => {
        setSeverity(severity);
        setMessage(message);
        setShowNotification(true);
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    const mapContent = (
        <div>
            <GoogleMaps
                handleCoordinatesChange={handleCoordinatesChange}
                setMapCoordinates={setMapCoordinates}
                setSelectedAddress={setSelectedAddress}
                isGuestCheckout={isGuestCheckout}
                amAllowGuestCheckout={amAllowGuestCheckout}
            />
        </div>
    );

    const countryAutoComplete = (
        <div>
            <StyledAutocomplete
                id="country-select"
                name="country_code"
                open={openCountry}
                onOpen={() => {
                    setOpenCountry(true);
                }}
                onClose={() => {
                    setOpenCountry(false);
                }}
                options={countryOptions}
                loading={loadingCountry}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                getOptionLabel={(option) => option.full_name_locale}
                value={selectedCountry}
                onChange={handleCountryChange}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.two_letter_abbreviation.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.two_letter_abbreviation.toLowerCase()}.png 2x`}
                            alt=""
                        />
                        {option.full_name_locale} ({option.two_letter_abbreviation})
                    </Box>
                )}
                renderInput={(params) => (
                    <StyledBasicTextField
                        {...params}
                        label=""
                        placeholder="Select country"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loadingCountry ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    );

    const stateAutocomplete = (
        <div>
            {stateOptions !== null && stateOptions.length > 0 ? (
                <StyledAutocomplete
                    id="state-select"
                    open={openState}
                    onOpen={() => {
                        setOpenState(true);
                    }}
                    onClose={() => {
                        setOpenState(false);
                    }}
                    options={stateOptions}
                    loading={loadingState}
                    getOptionLabel={(option) => option.name}
                    value={selectedState}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    onChange={handleStateChange}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <StyledBasicTextField
                            {...params}
                            label=""
                            placeholder="Select state"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loadingState ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            ) : (
                <StyledTextField
                    fullWidth
                    id="state"
                    label=""
                    placeholder="State, region or province"
                    defaultValue=""
                    value={selectedState}
                    onChange={(event) => {
                        setAddressInput((prevInput) => ({
                            ...prevInput,
                            region: {
                                region: 'Beirut',//addressInput.region.region ? addressInput.region.region : selectedState,
                                region_code: 'beirut',//addressInput.region.region_code ? addressInput.region.region_code : selectedState,
                                region_id: 0,
                            },
                        }));
                    }}
                />
            )}
        </div>
    );

    const cityAutocomplete = (
        <div>
            {cityOptions !== null && cityOptions.length > 0 ? (
                <StyledAutocomplete
                    id="city-select"
                    open={openCity}
                    onOpen={() => {
                        setOpenCity(true);
                    }}
                    onClose={() => {
                        setOpenCity(false);
                    }}
                    options={cityOptions}
                    loading={loadingCity}
                    getOptionLabel={(option) => option.name}
                    value={selectedCity}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    onChange={handleCityChange}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.name} ({option.code})
                        </Box>
                    )}
                    renderInput={(params) => (
                        <StyledBasicTextField
                            {...params}
                            label=""
                            placeholder="Select city"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loadingCity ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            ) : null}
        </div>
    );

    const floorAutocomplete = (
        <div>
            {floorOptions !== null && floorOptions.length > 0 ? (
                <StyledAutocomplete
                    id="floor-select"
                    open={openFloor}
                    onOpen={() => {
                        setOpenFloor(true);
                    }}
                    onClose={() => {
                        setOpenFloor(false);
                    }}
                    options={floorOptions}
                    loading={loadingFloor}
                    getOptionLabel={(option) => option.label}
                    value={selectedFloor}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    onChange={handleFloorChange}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.label}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <StyledBasicTextField
                            {...params}
                            label=""
                            placeholder="Select floor"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loadingFloor ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            ) : null }
        </div>
    );

    const addressNicknameAutocomplete = (
        <div>
            {addressNicknameOptions !== null && addressNicknameOptions.length > 0 ? (
                <StyledAutocomplete
                    id="address-nickname-select"
                    open={openAddressNickname}
                    onOpen={() => {
                        setOpenAddressNickname(true);
                    }}
                    onClose={() => {
                        setOpenAddressNickname(false);
                    }}
                    options={addressNicknameOptions}
                    loading={loadingAddressNickname}
                    getOptionLabel={(option) => option.label}
                    value={selectedAddressNickname ? selectedAddressNickname : null}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    onChange={handleAddressNicknameChange}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            {option.label}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <StyledBasicTextField
                            {...params}
                            label=""
                            placeholder="Select Address Nickname"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loadingAddressNickname ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            ) : null}
            {/* Custom input for "Other" */}
            {selectedAddressNickname.value === 154 && (
                <>
                    <br/>
                    <StyledTextField
                        required
                        fullWidth
                        id="other-address-nickname"
                        name="bee_nickname"
                        label=""
                        placeholder="Enter a custom nickname"
                        value={addressInput.bee_nickname ? addressInput.bee_nickname : ''}
                        onChange={handleInputChange}
                    />
                </>
            )}
        </div>
    );    

    const pageContent = (
        <div className={classes.root} data-cy="GuestFormPage-root">
            <StaticMap coordinates={isUpdate ? addressInput.bee_coordinates : mapCoordinates} />
            <Typography className={classes.title} variant="h3" gutterBottom>
                Personalize location
            </Typography>
            <FormControl sx={{ width: '100%', gap: '14px', marginBottom: '30px' }}>
                {/* <StyledTextField
                    required
                    fullWidth
                    id="bee_address_nickname"
                    name="bee_address_nickname"
                    label=""
                    value={addressInput.bee_address_nickname}
                    onChange={handleInputChange}
                    placeholder="Location name (ex: Home, Work)"
                    defaultValue=""
                /> */}
                {addressNicknameAutocomplete}
                <StyledTextField
                    required
                    fullWidth
                    id="firstname"
                    name="firstname"
                    label=""
                    value={addressInput.firstname ? addressInput.firstname : firstnameVal}
                    onChange={handleInputChange}
                    placeholder="Firstname"
                    defaultValue=""
                />
                <StyledTextField
                    required
                    fullWidth
                    id="lastname"
                    name="lastname"
                    label=""
                    value={addressInput.lastname ? addressInput.lastname : lastnameVal}
                    onChange={handleInputChange}
                    placeholder="Lastname"
                    defaultValue=""
                />
                <Box className={classes.phoneBox}>
                    <span className={classes.phoneLabel}>Phone number</span>
                    <PhoneInput
                        disabled
                        value={addressInput.telephone ? addressInput.telephone : phoneVal}
                        name="telephone"
                        placeholder=""
                        international
                        countryOptionsOrder={["LB", "AE", "SA", "KW", "QA", "IQ", "JO", "|", "..."]}
                        countryCallingCodeEditable={false}
                        addInternationalOption={false}
                        defaultCountry="LB"
                    />
                    <CustomStyledAlert sx={{ backgroundColor: 'transparent', padding: '0px', marginTop: '0px', marginRight: '0px' }} severity="success"></CustomStyledAlert>
                </Box>
            </FormControl>
            <Typography className={classes.title} variant="h3" gutterBottom>
                Confirm location details
            </Typography>
            <FormControl sx={{ width: '100%', gap: '14px' }}>
                {countryAutoComplete}
                {stateAutocomplete}
                {cityAutocomplete}
                {floorAutocomplete}
                <StyledTextField
                    required
                    fullWidth
                    id="street"
                    name="street"
                    label=""
                    //value={isUpdate ? addressInput.street : selectedAddress}
                    value={addressInput.street}
                    onChange={handleInputChange}
                    placeholder="Street"
                    defaultValue=""
                />
                <StyledTextField
                    required
                    fullWidth
                    id="bee_building_name"
                    name="bee_building_name"
                    label=""
                    value={addressInput.bee_building_name}
                    onChange={handleInputChange}
                    placeholder="Building"
                    defaultValue=""
                />
                <StyledTextField
                    required
                    fullWidth
                    id="bee_apartment_nb"
                    name="bee_apartment_nb"
                    label=""
                    value={addressInput.bee_apartment_nb}
                    onChange={handleInputChange}
                    placeholder="Apartment"
                    defaultValue=""
                />
                <StyledTextField
                    fullWidth
                    id="bee_address_notes"
                    name="bee_address_notes"
                    label=""
                    value={addressInput.bee_address_notes}
                    onChange={handleInputChange}
                    placeholder="Instructions for delivery (optional)"
                    defaultValue=""
                />
            </FormControl>
            {/* <input
                    type="text"
                    name="firstname"
                    value={addressInput.firstname}
                    onChange={handleInputChange}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="lastname"
                    value={addressInput.lastname}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                />
                <input
                    type="text"
                    name="street"
                    value={addressInput.street}
                    onChange={handleInputChange}
                    placeholder="Street"
                />
                <input
                    type="text"
                    name="city"
                    value={addressInput.city}
                    onChange={handleInputChange}
                    placeholder="City"
                />
                <input
                    type="text"
                    name="postcode"
                    value={addressInput.postcode}
                    onChange={handleInputChange}
                    placeholder="Postcode"
                />
                <input
                    type="text"
                    name="region"
                    value={addressInput.region.region}
                    onChange={handleInputChange}
                    placeholder="Region"
                />
                <input
                    type="text"
                    name="country_code"
                    value={addressInput.country_code}
                    onChange={handleInputChange}
                    placeholder="Country Code"
                />
                <input
                    type="text"
                    name="telephone"
                    value={addressInput.telephone}
                    onChange={handleInputChange}
                    placeholder="Telephone"
                /> */}
            {/* More form inputs */}
            <button className={classes.saveBtn} variant="contained" size="medium" onClick={handleSaveAddress}>
                {waiting ? "Loading..." : (isUpdate ? "Update Address" : "Save Address")}
            </button>
        </div>
    );

    return (
        <Fragment>
            <div>
                {(mapCoordinates.lat && mapCoordinates.lng) || isUpdate ? pageContent : mapContent}
            </div>
            <div className={classes.root}>
                <CustomSnackbar
                    open={showNotification}
                    autoHideDuration={3000}
                    onClose={handleCloseNotification}
                    severity={severity}
                    message={message}
                />
            </div>
            {/* {coordinates.lat && coordinates.lng ? (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, boxShadow: 'none', zIndex: '9999', padding: '1rem' }} elevation={3}>
                    <Button variant="contained" size="medium">
                        Save Address
                    </Button>
                </Paper>
            ) : null} */}
        </Fragment>
    );
};

export default UserFormPage;
