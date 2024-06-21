import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStyle } from '@magento/venia-ui/lib/classify';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import defaultClasses from './guestFormPage.module.css';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GoogleMaps from "../GoogleMaps/googleMaps";
import StaticMap from "../StaticMap/staticMap";
import Grid from '@mui/material/Unstable_Grid2';
import 'react-phone-number-input/style.css';
import PhoneNumberInput from "../PhoneNumberInput/phoneNumberInput";
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_COUNTRIES } from './queries/countries.qql';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import { SET_SHIPPING_ADDRESSES_ON_CART } from './queries/useAsyncShippingAddress.qql';
import { UPDATE_CUSTOMER_ADDRESS, ADD_NEW_CUSTOMER_ADDRESS } from '../AddressBookPage/talons/AddressBookPage/addressBookPage.gql';

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

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    "& .MuiFormControlLabel-label": {
        fontSize: "12px",
    },
}));

const GuestFormPage = props => {
    const history = useHistory();
    const location = useLocation();
    const { formatMessage } = useIntl();
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const { isGuestCheckout, amAllowGuestCheckout, isUpdate, shippingData, fromAddressBook = false, addressBookCount } = location.state || {};
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
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(!addressBookCount ? true : false);
    const [severity, setSeverity] = useState('success'); // Change severity as needed
    const [message, setMessage] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [newPhone, setNewPhone] = useState('');
    const [{ cartId }] = useCartContext();

    const queryParams = new URLSearchParams(location.search);
    const firstnameVal = queryParams.get('firstname');
    const lastnameVal = queryParams.get('lastname');
    const emailVal = queryParams.get('email');
    const phoneVal = queryParams.get('phone');

    console.log('-->> addressBookCount = ', addressBookCount);
    console.log('-->> fromAddressBook = ', fromAddressBook);
    console.log('-->> isUpdate = ', isUpdate);

    const handleShowMapClick = () => {
        setShowMap(true);
    };

    const { data, loading, error } = useQuery(GET_COUNTRIES, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });
    // Define a mutation function using the SET_SHIPPING_ADDRESSES_ON_CART mutation
    const [setShippingAddressesOnCart] = useMutation(SET_SHIPPING_ADDRESSES_ON_CART, {
        onCompleted: (data) => {
            if (data) {
                // The mutation was successful
                setWaiting(false);
                handleShowNotification('success', 'Your address has been successfully updated!');

                const targetPagePath = fromAddressBook ? "/address-book" : "/checkout"; // Example: "/products", "/about", etc.
                const stateParams = {
                    headerTitle: ''
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

    const [updateCustomerAddress] = useMutation(UPDATE_CUSTOMER_ADDRESS, {
        onCompleted: (data) => {
            if (data) {
                // The mutation was successful
                setWaiting(false);
                handleShowNotification('success', 'Your address has been successfully updated!');

                const targetPagePath = fromAddressBook ? "/address-book" : "/checkout"; // Example: "/products", "/about", etc.
                const stateParams = {
                    headerTitle: ''
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

    const [addCustomerAddress] = useMutation(ADD_NEW_CUSTOMER_ADDRESS, {
        onCompleted: (data) => {
            if (data) {
                // The mutation was successful
                setWaiting(false);
                handleShowNotification('success', 'Your address has been successfully addedd!');

                const targetPagePath = fromAddressBook ? "/address-book" : "/checkout"; // Example: "/products", "/about", etc.
                const stateParams = {
                    headerTitle: ''
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
    const [loadingCountry, setLoadingCountry] = React.useState(false);
    //const loadingCountry = openCountry && countryOptions.length === 0;
    const loadingState = openState && stateOptions.length === 0;
    const loadingCity = openCity && cityOptions.length === 0;
    const floorOptions = [
        { value: 0, label: "0" },
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
        { value: 8, label: "9" },
        { value: 10, label: "10" },
        { value: 11, label: "11" },
        { value: 12, label: "12" },
        { value: 13, label: "13" },
        { value: 14, label: "14" },
        { value: 15, label: "15" },
        { value: 16, label: "16" },
        { value: 17, label: "17" },
        { value: 18, label: "18" },
        { value: 19, label: "19" },
        { value: 20, label: "20" },
        { value: 21, label: "21" },
        { value: 22, label: "22" },
        { value: 23, label: "23" },
        { value: 24, label: "24" },
        { value: 25, label: "25" },
        { value: 26, label: "26" },
        { value: 27, label: "27" },
        { value: 28, label: "28" },
        { value: 29, label: "29" },
        { value: 30, label: "30" }
    ];    
    const loadingFloor = openFloor && floorOptions.length === 0;
    const addressNicknameOptions = [
        { label: formatMessage({id: 'home'}), value: 148 },
        { label: formatMessage({id: 'work'}), value: 149 },
        { label: formatMessage({id: 'other'}), value: 154 },
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
        postcode: '0000',
        country_code: selectedCountryCode,
        telephone: '',
        bee_building_name: '',
        bee_apartment_nb: '',
        bee_address_nickname: '',
        bee_nickname: '',
        bee_address_notes: '',
        bee_floor: 1,
        bee_coordinates: lat + ',' + lng
    });

    const handleDefaultShippingAddressChange = (event) => {
        setDefaultShippingAddress(event.target.checked);
    };

    const defaultShippingElement =
        !isGuestCheckout && (
            <StyledFormControlLabel
                control={
                    <Checkbox
                        checked={defaultShippingAddress}
                        disabled={addressBookCount ? shippingData.default_shipping ? true: false : true}
                        onChange={handleDefaultShippingAddressChange}
                        size="small"
                    />
                }
                label={formatMessage({
                    id: 'customerForm.defaultShipping',
                    defaultMessage: 'Make this my default address'
                })}
            />
    );

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
    }, [loadingCountry]);

    // useEffect(() => {
    //     let active = true;

    //     if (!loadingCountry) {
    //         return undefined;
    //     }

    //     (async () => {
    //         //await sleep(1e3); // For demo purposes.
    //         if (active && data) {
    //             setCountryOptions(data.countries);
    //         }
    //     })();

    //     return () => {
    //         active = false;
    //     };
    // }, [loadingCountry]);

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
                country_code: fromAddressBook ? shippingData.country_code : shippingData.country ? shippingData.country.code : '',
                telephone: shippingData.telephone || phoneVal || '',
                bee_building_name: shippingData.bee_building_name || '',
                bee_apartment_nb: shippingData.bee_apartment_nb || '',
                bee_address_nickname: shippingData.bee_address_nickname || '',
                bee_nickname: shippingData.bee_nickname || '',
                bee_address_notes: shippingData.bee_address_notes || '',
                bee_floor: fromAddressBook ? shippingData.bee_floor : shippingData.bee_floor.value || '',
                bee_coordinates: coordinatesObject || '',
                default_shipping: shippingData.default_shipping || defaultShippingAddress,
                default_billing: shippingData.default_shipping || defaultShippingAddress
            });
            if (countryOptions.length > 0) {
                // Filter the available regions based on the selected country
                const countryCode = fromAddressBook ? shippingData.country_code : shippingData.country ? shippingData.country.code : '';
                const selectedCountry = countryOptions.find(country => country.id === countryCode);
                if (selectedCountry) {
                    const availableRegions = selectedCountry.available_regions || [];
                    // Filter cities based on the selected region ID
                    const filteredCities = shippingData.region.region_id
                        ? availableRegions.find(region => region.id === shippingData.region.region_id)?.cities || []
                        : [];

                    const savedRegion = {
                        code: fromAddressBook ? shippingData.region_code : shippingData.region.code,
                        id: shippingData.region.region_id,
                        name: fromAddressBook ? shippingData.region.region : shippingData.region.label,
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
                    setDefaultShippingAddress(shippingData.default_shipping);
                }
            }
        }
    }, [shippingData, isUpdate, loadingCountry, countryOptions]);

    useEffect(() => {
        setLoadingCountry(loading && countryOptions.length === 0);
    }, [countryOptions, loading]);

    useEffect(() => {
        if (!loadingCountry && countryOptions && countryOptions.length > 0) {
            if (countryOptions.length === 1) {
                // If there's only one country option, select it by default
                setSelectedCountry(countryOptions[0]);
                setSelectedCountryCode(countryOptions[0].two_letter_abbreviation);
            }
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
        setShowMap(false);
    };

    // Function to save the address
    const handleSaveAddress = async () => {
        try {
            console.log("addressInput = ", addressInput);
            console.log('fromAddressBook = ', fromAddressBook);
            console.log('isUpdate = ', isUpdate);
            setWaiting(true);
            // Call the mutation with the appropriate variables
            if(fromAddressBook && isUpdate) {
                const { data } = await updateCustomerAddress({
                    variables: {
                        addressId: parseInt(shippingData.id),
                        updated_address: {
                            firstname: addressInput.firstname,
                            lastname: addressInput.lastname,
                            street: [addressInput.street],
                            city: addressInput.city,
                            postcode: addressInput.postcode,
                            region: {
                                region: addressInput.region.region,
                                region_code: addressInput.region.region_code,
                                region_id: addressInput.region.region_id,
                            },
                            country_code: addressInput.country_code,
                            telephone: addressInput.telephone.trim(),
                            bee_building_name: addressInput.bee_building_name,
                            bee_apartment_nb: addressInput.bee_apartment_nb,
                            bee_address_nickname: addressInput.bee_address_nickname,
                            bee_nickname: addressInput.bee_nickname,
                            bee_address_notes: addressInput.bee_address_notes,
                            bee_address_type: 151,
                            bee_floor: addressInput.bee_floor,
                            bee_coordinates: isUpdate ? shippingData.bee_coordinates : addressInput.bee_coordinates,
                            default_shipping: defaultShippingAddress,
                            default_billing: defaultShippingAddress
                        }
                    }
                });
            }else if(fromAddressBook && !isUpdate) {
                console.log("-->>> address Input = ", addressInput);
                const { data } = await addCustomerAddress({
                    variables: {
                        address: {
                            firstname: addressInput.firstname,
                            lastname: addressInput.lastname,
                            street: [addressInput.street],
                            city: addressInput.city,
                            postcode: addressInput.postcode,
                            region: {
                                region: addressInput.region.region,
                                region_code: addressInput.region.region_code,
                                region_id: addressInput.region.region_id,
                            },
                            country_code: addressInput.country_code,
                            telephone: newPhone.trim(),
                            bee_building_name: addressInput.bee_building_name,
                            bee_apartment_nb: addressInput.bee_apartment_nb,
                            bee_address_nickname: addressInput.bee_address_nickname,
                            bee_nickname: addressInput.bee_nickname,
                            bee_address_notes: addressInput.bee_address_notes,
                            bee_address_type: 151,
                            bee_floor: addressInput.bee_floor,
                            bee_coordinates: isUpdate ? shippingData.bee_coordinates : addressInput.bee_coordinates,
                            default_shipping: defaultShippingAddress,
                            default_billing: defaultShippingAddress
                        }
                    }
                });
            }else {
                console.log("22 addressInput = ", addressInput);
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
                                    bee_coordinates: isUpdate ? shippingData.bee_coordinates : addressInput.bee_coordinates,
                                    save_in_address_book: false
                                },
                            }]
                        }
                    }
                });
            }
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
                disabled
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
                        placeholder={formatMessage({
                            id: 'selectCountry',
                            defaultMessage: 'Select country'
                        })}
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
                            {/* ({option.code}) */}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <StyledBasicTextField
                            {...params}
                            label=""
                            placeholder={formatMessage({
                                id: 'selectState',
                                defaultMessage: 'Select state'
                            })}
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
                            placeholder={formatMessage({
                                id: 'selectCity',
                                defaultMessage: 'Select city'
                            })}
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
                            placeholder={formatMessage({
                                id: 'selectFloor',
                                defaultMessage: 'Select floor'
                            })}
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
                            placeholder={formatMessage({
                                id: 'selectAddressNickname',
                                defaultMessage: 'Select Address Nickname'
                            })}
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
                    clearIcon={null} // Remove the clear (x) button
                />
            ) : null}
            {/* Custom input for "Other" */}
            {selectedAddressNickname && selectedAddressNickname.value === 154 && (
                <>
                    <br/>
                    <StyledTextField
                        required
                        fullWidth
                        id="other-address-nickname"
                        name="bee_nickname"
                        label=""
                        placeholder={formatMessage({
                            id: 'selectAddressNickname',
                            defaultMessage: 'Enter a custom nickname'
                        })}
                        value={addressInput.bee_nickname ? addressInput.bee_nickname : ''}
                        onChange={handleInputChange}
                        inputProps={{
                            maxLength: 30  // Set the maximum length for the input
                        }}
                    />
                </>
            )}
        </div>
    );    

    const pageContent = (
        <div className={isDesktop ? classes.desktopRoot : classes.root} data-cy="GuestFormPage-root">
            <div onClick={handleShowMapClick} className={classes.staticMapLink}>
                <StaticMap coordinates={isUpdate ? addressInput.bee_coordinates : mapCoordinates} />
            </div>
            <Typography className={classes.title} variant="h3" gutterBottom>
                <FormattedMessage id="personalizeLocation" defaultMessage="Personalize location" />
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
                    placeholder={formatMessage({
                        id: 'global.firstName',
                        defaultMessage: 'First Name'
                    })}
                    defaultValue=""
                    inputProps={{
                        maxLength: 30  // Set the maximum length for the input
                    }}
                />
                <StyledTextField
                    required
                    fullWidth
                    id="lastname"
                    name="lastname"
                    label=""
                    value={addressInput.lastname ? addressInput.lastname : lastnameVal}
                    onChange={handleInputChange}
                    placeholder={formatMessage({
                        id: 'global.lastName',
                        defaultMessage: 'Last Name'
                    })}
                    defaultValue=""
                    inputProps={{
                        maxLength: 30  // Set the maximum length for the input
                    }}
                />
                {/* <Box className={classes.phoneBox}>
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
                </Box> */}
                {fromAddressBook && !isUpdate ? (
                    <PhoneNumberInput
                        mobile={newPhone}
                        setPhone={setNewPhone}
                        isVerified={isUpdate ? true : false}
                    />
                ) : (
                    <PhoneNumberInput
                        mobile={shippingData && shippingData.telephone ? shippingData.telephone : addressInput.telephone ? addressInput.telephone : phoneVal}
                        isVerified={isUpdate || isGuestCheckout ? true : false}
                    />
                )}
            </FormControl>
            <Typography className={classes.title} variant="h3" gutterBottom>
                <FormattedMessage id="confirmLocationDetails" defaultMessage="Confirm location details" />
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
                    placeholder={formatMessage({
                        id: 'street',
                        defaultMessage: 'Street'
                    })}
                    defaultValue=""
                    inputProps={{
                        maxLength: 80  // Set the maximum length for the input
                    }}
                />
                <StyledTextField
                    required
                    fullWidth
                    id="bee_building_name"
                    name="bee_building_name"
                    label=""
                    value={addressInput.bee_building_name}
                    onChange={handleInputChange}
                    placeholder={formatMessage({
                        id: 'building',
                        defaultMessage: 'Building'
                    })}
                    defaultValue=""
                    inputProps={{
                        maxLength: 30  // Set the maximum length for the input
                    }}
                />
                <StyledTextField
                    required
                    fullWidth
                    id="bee_apartment_nb"
                    name="bee_apartment_nb"
                    label=""
                    value={addressInput.bee_apartment_nb}
                    onChange={handleInputChange}
                    placeholder={formatMessage({
                        id: 'apartment',
                        defaultMessage: 'Apartment'
                    })}
                    defaultValue=""
                    inputProps={{
                        maxLength: 30  // Set the maximum length for the input
                    }}
                />
                <StyledTextField
                    fullWidth
                    id="bee_address_notes"
                    name="bee_address_notes"
                    label=""
                    value={addressInput.bee_address_notes}
                    onChange={handleInputChange}
                    placeholder={formatMessage({
                        id: 'deliveryInstructions',
                        defaultMessage: 'Instructions for delivery (optional)'
                    })}
                    defaultValue=""
                    inputProps={{
                        maxLength: 60  // Set the maximum length for the input
                    }}
                />
                {defaultShippingElement}
            </FormControl>
            {/* More form inputs */}
            <button className={classes.saveBtn} variant="contained" size="medium" onClick={handleSaveAddress}>
                {waiting ? formatMessage({
                            id: 'loadingButtonText',
                            defaultMessage: 'Loading…'
                        }) : (isUpdate ? formatMessage({
                            id: 'updateAddress',
                            defaultMessage: 'Update Address'
                        }) : formatMessage({
                            id: 'saveAddress',
                            defaultMessage: 'Save Address'
                        }))}
            </button>
        </div>
    );

    return (
        <Fragment>
            <div>
                {showMap ? mapContent : ((mapCoordinates.lat && mapCoordinates.lng) || isUpdate) ? pageContent : mapContent}
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

export default GuestFormPage;
