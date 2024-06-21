import React, { Fragment, useState, useEffect } from "react";
import './phoneNumberInput.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { FormattedMessage, useIntl } from 'react-intl';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import countryNames from 'react-phone-number-input/locale/en';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneInput, usePhoneInput } from 'react-international-phone';
import { GetDefautlCountryData } from "../GetDefaultCountryData/getDefautlCountryData";
import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import flags from '../CurrentCountry/Flags';

const phoneUtil = PhoneNumberUtil.getInstance();

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const StyledTextFieldSearch = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        height: "40px",
        padding: "10px"
    }
}));

const CustomStyledAlert = styled(MuiAlert)({
    '& .MuiAlert-icon': {
        margin: '0', // Remove margin from the icon
    },
    backgroundColor: 'transparent',
    padding: '0px',
    marginTop: '0px',
    marginRight: '0px',
});

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const PhoneNumberInput = ({ mobile, setPhone, setIsNext, setLoading, setPhoneError, isVerified = false, isDisabled = false }) => {
    const { formatMessage } = useIntl();
    const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl'; // Use your logic to determine RTL
    const [open, setOpen] = useState(false);
    const [phoneLocalError, setPhoneLocalError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verifiedPhone, setVerifiedPhone] = useState('');

    const { loading, error, storeConfig } = GetDefautlCountryData();
    const currentCountry = storeConfig?.beesline_default_country?.default_country_code;
    const currentCountryCallingCode = storeConfig?.beesline_default_country?.default_country_calling_code;
    const [disableSelection, setDisableSelection] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const [selectedCountry, setSelectedCountry] = useState('LB');
    const [callingCode, setCallingCode] = useState('961');

    const [phoneInputConfig, setPhoneInputConfig] = useState({
        defaultCountry: selectedCountry.toLowerCase(),
        value: "+" + mobile,
        onChange: ({ phone, inputValue, country }) => {
            if (isVerified || isDisabled) {
                const partAfterSpace = phone.split(' ')[1];
                setVerifiedPhone(partAfterSpace);
                setPhoneLocalError(false);
            }
        },
    });

    // Update siginMethod when currentCountry has a value
    useEffect(() => {
        if (currentCountry) {
            setSelectedCountry(currentCountry);
        }
        if (currentCountry) {
            setCallingCode(currentCountryCallingCode);
        }
        setDisableSelection(true);
    }, [currentCountry, currentCountryCallingCode]);

    useEffect(() => {
        // Update phoneInputConfig when selectedCountry changes
        setPhoneInputConfig({
            ...phoneInputConfig,
            defaultCountry: selectedCountry.toLowerCase(),
            value: "+" + mobile,
        });
        // Manually trigger the onChange function
        phoneInputConfig.onChange({
            phone: "+" + mobile, // Assuming value is the phone number
            inputValue: '', // Provide the appropriate inputValue
            country: selectedCountry.toLowerCase(), // Assuming defaultCountry is the country code
        });
    }, []);

    const handleCountrySelect = (country, code) => {
        setSelectedCountry(country);
        setCallingCode(code);
        setOpen(false);
        setPhoneLocalError(false);
        if (typeof setPhone === 'function') {
            setPhone('');
        }
        setPhoneNumber('');
    };
    
    const handlePhoneChange = (value) => {
        console.log("Typed value: ", value);
        if (value !== undefined) {
            const fullPhone = `+${callingCode}${value}`;
            const fullPhoneWithoutPlus = `${callingCode}${value}`;
            const isValid = isPhoneValid(fullPhone);
            console.log("isValid ", isValid);
            if(isValid) {
                console.log("valid *****");
                setPhoneLocalError(false);
                if (typeof setPhone === 'function') {
                    setPhone(fullPhoneWithoutPlus);
                }
                if (typeof setIsNext === 'function') {
                    setIsNext(true);
                }
                if (typeof setLoading === 'function') {
                    setLoading(false);
                }
                if (typeof setPhoneError === 'function') {
                    setPhoneError(false);
                }
            }else {
                console.log("not valid *****");
                setPhoneLocalError(true);
                if (typeof setIsNext === 'function') {
                    setIsNext(false);
                }
                if (typeof setLoading === 'function') {
                    setLoading(false);
                }
                if (typeof setPhoneError === 'function') {
                    setPhoneError(true);
                }
            }
            setPhoneNumber(value);
        }
    };

    const {
        phone,
        country,
        setCountry,
        handlePhoneValueChange,
        inputRef,
    } = usePhoneInput(phoneInputConfig);

    const CountriesList = ({ value, onChange, labels, onSelect }) => {
        const countryOptions = getCountries().map((country) => ({
            value: country,
            label: labels[country] + ` (+${getCountryCallingCode(country)})`,
            img: flags[country.toLowerCase()],
        }));

        const [searchTerm, setSearchTerm] = useState('');
    
        const filteredCountries = countryOptions.filter((option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const selectedCountry = filteredCountries.find((option) => option.value === value);

        // Filter out the selected country from the list
        const otherCountries = filteredCountries.filter((option) => option.value !== value);

        const handleSearch = (event) => {
            setSearchTerm(event.target.value);
        };

        return (
            <>
                <StyledTextFieldSearch
                    placeholder="Search country"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <List component="nav">
                    {selectedCountry && (
                        <ListItemButton
                            button
                            key={selectedCountry.value}
                            selected={true}
                            onClick={() => onSelect(selectedCountry.value, getCountryCallingCode(selectedCountry.value))}
                        >
                            <ListItemIcon>
                                <img
                                    src={selectedCountry.img}
                                    alt={selectedCountry.value}
                                    style={{ width: '24px', height: 'auto', aspectRatio: '1/1', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={selectedCountry.label} />
                        </ListItemButton>
                    )}
                    {otherCountries.map((option) => (
                        <ListItemButton
                            button
                            key={option.value}
                            selected={value === option.value}
                            onClick={() => onSelect(option.value, getCountryCallingCode(option.value))}
                            >
                            <ListItemIcon>
                                <img
                                src={option.img}
                                alt={option.value}
                                style={{ width: '24px', height: 'auto', aspectRatio: '1/1', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={option.label} />
                        </ListItemButton>
                    ))}
                </List>
            </>
        );
    };

    return (
        <Fragment>
                <Box className="phoneBox">
                    {/* <span className={classes.phoneLabel}>Phone number</span> */}
                    <span className={isVerified || isDisabled || disableSelection ? 'phonelabledisabled' : 'phoneLabel'} onClick={toggleDrawer(true)}>{selectedCountry} +{callingCode}</span>
                    <PhoneInput
                        disabled={isVerified || isDisabled}
                        defaultCountry={selectedCountry.toLowerCase()}
                        placeholder={formatMessage({ id: 'enterPhoneNumber' })}
                        disableDialCodeAndPrefix={true}
                        showDisabledDialCodeAndPrefix={false}
                        value={isVerified || isDisabled ? verifiedPhone : phoneNumber}
                        //onChange={(value) => handlePhoneChange(value)}
                        onChange={(value) => {
                            // Check if the value has actually changed
                            if (value !== (isVerified || isDisabled ? verifiedPhone : phoneNumber)) {
                                handlePhoneChange(value);
                            }
                        }}
                    />
                    {isVerified ? (
                        <CustomStyledAlert sx={{ backgroundColor: 'transparent', padding: '0px', marginTop: '0px', marginRight: '0px', position: 'absolute', right: '6px', ...(isRTL && { left: '6px', right: 'initial' }) }} severity="success"/>
                    ) : null}
                </Box>
                {/* <p>Selected Country: {selectedCountry}</p>
                <p>Selected Country lower :{selectedCountry.toLowerCase()}</p>
                <p>Phone error: {phoneLocalError == true ? '1' : 0}</p>
                <p>Phone = {phone}</p>
                <p>Phone Number = {phoneNumber}</p> */}
                {!phoneNumber || phoneLocalError && <div className="errorText">
                    <FormattedMessage id="invalidPhoneNumber" defaultMessage="Invalid phone number" />    
                </div>}
                <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                            height: `calc(50% - ${drawerBleeding}px)`,
                            overflow: 'visible',
                        },
                    }}
                />
                <SwipeableDrawer
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={false}
                    ModalProps={{
                        keepMounted: false,
                    }}
                >
                    <StyledBox
                        sx={{
                            position: 'absolute',
                            top: -drawerBleeding,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            visibility: 'visible',
                            right: 0,
                            left: 0,
                        }}
                    >
                        <Puller />
                        <Typography sx={{ p: 2, color: 'text.secondary' }}>Select Country</Typography>
                    </StyledBox>
                    <StyledBox
                        sx={{
                            px: 2,
                            pb: 2,
                            height: '100%',
                            overflow: 'auto',
                        }}
                    >
                        <CountriesList value={selectedCountry} onSelect={handleCountrySelect} labels={countryNames} />
                    </StyledBox>
                </SwipeableDrawer>
        </Fragment>
    );
};

export default PhoneNumberInput;
