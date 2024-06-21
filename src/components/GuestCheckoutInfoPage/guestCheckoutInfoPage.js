import React, { Fragment, useState, useMemo, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStyle } from '@magento/venia-ui/lib/classify';
import { FormattedMessage, useIntl } from 'react-intl';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import defaultClasses from './guestCheckoutInfoPage.module.css';
import { Link, useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import PhoneNumberDisplay from "../BeeCreateAccount/PhoneNumberDisplay";
import { GetDefautlCountryData } from "../GetDefaultCountryData/getDefautlCountryData";
import validator from "validator";
import PhoneNumberInput from "../PhoneNumberInput/phoneNumberInput";
import GetDeviceType from "../GetDeviceType/getDeviceType";

const SEND_GUEST_OTP_BY_SMS = gql`
  mutation SendGuestOtpBySMS($mobile: String, $firstname: String, $lastname: String, $email: String) {
    sendGuestOtpBySMS(mobile: $mobile, firstname: $firstname, lastname: $lastname, email: $email) {
        success
        message
    }
  }
`;

const RESEND_GUEST_OTP_BY_SMS = gql`
  mutation ResendGuestOtpBySMS($mobile: String) {
    resendGuestOtpBySMS(mobile: $mobile) {
        success
        message
    }
  }
`;

const VERIFY_GUEST_OTP_BY_SMS = gql`
  mutation VerifyGuestOtpBySMS($mobile: String, $otp: String) {
    verifyGuestOtpBySMS(mobile: $mobile, otp: $otp) {
        success
        message
    }
  }
`;

const SET_GUEST_EMAIL_ON_CART = gql`
  mutation SetGuestEmailOnCart($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        email
        id
        is_virtual
        total_quantity
      }
    }
  }
`;

const SEND_GUEST_OTP_BY_EMAIL = gql`
  mutation SendGuestOtpByEmail($mobile: String, $firstname: String, $lastname: String, $email: String) {
    sendGuestOtpByEmail(mobile: $mobile, firstname: $firstname, lastname: $lastname, email: $email) {
        success
        message
    }
  }
`;

const RESEND_GUEST_OTP_BY_EMAIL = gql`
  mutation ResendGuestOtpByEmail($email: String, $login: Int) {
    resendGuestOtpByEmail(email: $email, login: $login) {
        success
        message
    }
  }
`;

const VERIFY_GUEST_OTP_BY_EMAIL = gql`
  mutation VerifyGuestOtpByEmail($email: String, $otp: String, $login: Int) {
    verifyGuestOtpByEmail(email: $email, otp: $otp, login: $login) {
        success
        message
    }
  }
`;

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        border: "none", // Remove border
        boxShadow: "0px 0px 12.139005661010742px 0px rgba(0, 0, 0, 0.12) !important",
        borderRadius: "9.104px",
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
            borderRadius: "9.104px",
        },
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none", // Replace with your desired border color
    }
}));

const GuestCheckoutInfoPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const { formatMessage } = useIntl();
    const { loadingConfig, error, storeConfig } = GetDefautlCountryData();
    const [showNotification, setShowNotification] = useState(false);
    const [severity, setSeverity] = useState('success'); // Change severity as needed
    const [message, setMessage] = useState('');
    const [showOTPContent, setShowOTPContent] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [typingTimeout, setTypingTimeout] = React.useState(null);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [phone, setPhone] = useState('');
    const [guestEmail, setGuestEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(true);
    const [{ cartId }] = useCartContext();
    const history = useHistory();
    const location = useLocation();

    // Create refs for each TextField
    const otpFieldRefs = Array.from({ length: 4 }).map(() => useRef(null));
    // Create a state variable to hold the OTP values entered by the user
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    // Add a new state variable to track if all OTP fields are filled
    const [allOtpFieldsFilled, setAllOtpFieldsFilled] = useState(false);
    const [otpVerificationStep, setOtpVerificationStep] = useState(false);

    // Add state variables for Snackbar properties
    const [resendCounter, setResendCounter] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(false);

    const [sendGuestOtpBySMS] = useMutation(SEND_GUEST_OTP_BY_SMS);
    const [resendGuestOtpBySMS] = useMutation(RESEND_GUEST_OTP_BY_SMS);
    const [verifyGuestOtpBySMS] = useMutation(VERIFY_GUEST_OTP_BY_SMS);
    const [setGuestEmailOnCart] = useMutation(SET_GUEST_EMAIL_ON_CART);
    const [sendGuestOtpByEmail] = useMutation(SEND_GUEST_OTP_BY_EMAIL);
    const [resendGuestOtpByEmail] = useMutation(RESEND_GUEST_OTP_BY_EMAIL);
    const [verifyGuestOtpByEmail] = useMutation(VERIFY_GUEST_OTP_BY_EMAIL);

    // Ensure currentCountry is available and not in loading state
    const currentCountry = storeConfig?.beesline_default_country?.default_country_code;

    const [siginMethod, setSiginMethod] = useState('');

    // Update siginMethod when currentCountry has a value
    useEffect(() => {
        if (currentCountry) {
            setSiginMethod(currentCountry === 'LB' ? 'mobile' : 'email');
        }
    }, [currentCountry]);

    const guestInfo = useMemo(() => {
        // Compute the guestInfo value based on firstName, lastName, and email
        const infoArray = [];
        if (firstname) infoArray.push(firstname);
        if (lastname) infoArray.push(lastname);
        if (guestEmail) infoArray.push(guestEmail);
        return infoArray;
    }, [firstname, lastname, guestEmail]);

    useEffect(() => {

        if (allOtpFieldsFilled) {
            setOtpVerificationStep(true);
        } else {
            setOtpVerificationStep(false);
        }

        handleResendCounter();
    }, [resendCounter]);

    const handleShowNotification = (severity, message) => {
        setSeverity(severity);
        setMessage(message);
        setShowNotification(true);
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;

        // Set the value and clear error when input changes
        if (name === 'firstname') {
            setFirstname(value);
            setFirstnameError(false);
        } else if (name === 'lastname') {
            setLastname(value);
            setLastnameError(false);
        }
    };

    const handleChangeEmail = (event) => {
        const emailValue = event.target.value;

        setGuestEmail(emailValue);
        setEmailError(!isValidEmail(emailValue)); // Validate email and set error state accordingly

        // Clear the previous timeout if exists
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout for email validation after 2 seconds (adjust the duration as needed)
        setTypingTimeout(setTimeout(() => {
            setEmailError(!isValidEmail(emailValue));
        }, 2000));
    };

    const _isValidEmail = (value) => {
        // Basic email validation regex (you can use a more robust regex if needed)
        const _emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const __emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(value);
    };

    const isValidEmail = (value) => {
        if (validator.isEmail(value)) {
            return true;
        }
        return false;
    }

    // const _handlePhoneChange = (value) => {
    //     if(value !== undefined) {
    //         console.log("Phone = ", phone);
    //         try {
    //             const phoneNumber = parsePhoneNumberWithError(`${value}`, {
    //               defaultCountry: selectedCountry
    //             });
    //             if (phoneNumber) {
    //                 console.log("formatNational",phoneNumber.formatNational());
    //                 console.log("formatInternational",phoneNumber.formatInternational());
    //                 console.log("isPossiblePhoneNumber",isPossiblePhoneNumber(value));
    //                 console.log("isValidPhoneNumber",isValidPhoneNumber(value));
    //             }
    //             //setPhone(phoneNumber);
    //           } catch (error) {
    //             if (error instanceof ParseError) {
    //               // Not a phone number, non-existent country, etc.
    //               console.log("Phone error msg = ",error.message)
    //             } else {
    //               //throw error
    //             }
    //           }
    //           setPhone(value);
    //         // const phoneNumber = parsePhoneNumber(`${value}`, selectedCountry);
    //         // if (phoneNumber) {
    //         //     console.log("formatNational",phoneNumber.formatNational());
    //         //     console.log("formatInternational",phoneNumber.formatInternational());
    //         //     console.log("isPossiblePhoneNumber",isPossiblePhoneNumber(value));
    //         //     console.log("isValidPhoneNumber",isValidPhoneNumber(value));
    //         //     setPhone(value);
    //         // }else {
    //         //     console.log("");
    //         // }
    //         //isValidPhoneNumber(value) ? setPhone(value) : null;
    //     }
    // };

    const changePhoneNumber = () => {
        setShowOTPContent(false);
    };

    const changeEmail = () => {
        setShowOTPContent(false);
    };

    const handleSetEmail = async () => {
        try {
            // Replace these values with your actual cart ID and email
            console.log("Email = " + guestEmail + " cartid = "+ cartId);
            const email = guestEmail;
            // Execute the mutation
            const { data } = await setGuestEmailOnCart({
                variables: {
                    cartId,
                    email,
                },
            });

            // Access the result data if needed
            console.log('Mutation Result:', data);
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    // Handle the phone submission when editing ends (focus is removed from the TextField)
    const handlePhoneSubmit = () => {
        // Validate the phone number
        console.log("phone verify");
        setLoading(true); // Show loader when the mutation is submitted
        const mobile = phone.trim();
        const email = guestEmail;
        //setIsResendDisabled(true);
        //setLoading(false);
        //handleContinueCheckout();
        // Submit the mobile by calling the GraphQL mutation
        sendGuestOtpBySMS({ variables: { mobile, firstname, lastname, email } })
            .then(({ data }) => {
                const { success, message } = data.sendGuestOtpBySMS;
                console.error("1- data:", data);
                console.error("2- success:", success);
                // Set the message and severity based on the API response
                if (success == 1) {
                    setShowOTPContent(success);
                    handleShowNotification('success', message);
                    // Start the counter for the resend link
                    setResendCounter(60); // Set the counter to 60 seconds
                    // Disable the resend link
                    setIsResendDisabled(true);
                    setLoading(false);
                } else if (success == 2) {
                    handleContinueCheckout();
                } else {
                    handleShowNotification('error', message);
                    setLoading(false);
                }
            })
            .catch((error) => {
                // Handle any errors from the mutation
                handleShowNotification('error', error.message);
                setShowNotification(true); // Show the Snackbar
                setLoading(false);
            }).finally(() => {
                setLoading(false);
            });
    };

     // Handle the phone submission when editing ends (focus is removed from the TextField)
     const handleEmailSubmit = () => {
        // Validate the phone number
        console.log("Email verify");
        setLoading(true); // Show loader when the mutation is submitted
        const mobile = phone.trim();
        const email = guestEmail;
        //setIsResendDisabled(true);
        //setLoading(false);
        //handleContinueCheckout();
        // Submit the email by calling the GraphQL mutation
        sendGuestOtpByEmail({ variables: { mobile, firstname, lastname, email } })
        .then(({ data }) => {
            const { success, message } = data.sendGuestOtpByEmail;
            console.error("1- data:", data);
            console.error("2- success:", success);
            // Set the message and severity based on the API response
            if (success == 1) {
                setShowOTPContent(success);
                handleShowNotification('success', message);
                // Start the counter for the resend link
                setResendCounter(60); // Set the counter to 60 seconds
                // Disable the resend link
                setIsResendDisabled(true);
                setLoading(false);
            } else if (success == 2) {
                handleContinueCheckout();
            } else {
                handleShowNotification('error', message);
                setLoading(false);
            }
        })
        .catch((error) => {
            // Handle any errors from the mutation
            console.error("Error sending OTP:", error.message);
            handleShowNotification('error', error.message);
            setShowNotification(true); // Show the Snackbar
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    };

    // Function to check if all OTP fields are filled
    const isAllOtpFieldsFilled = (otpValues) => {
        return otpValues.every((value) => value.trim() !== '');
    };

    const handleOtpInput = (index, event) => {
        const value = event.target.value;
        if (/\d/.test(value) && index < otpFieldRefs.length - 1) {
            otpFieldRefs[index + 1].current.focus();
        }

        // Update the otpValues state with the current input value
        setOtpValues((prevOtpValues) => {
            const newOtpValues = [...prevOtpValues];
            newOtpValues[index] = value;
            // Check if all OTP fields are filled
            const allFilled = isAllOtpFieldsFilled(newOtpValues);
            setAllOtpFieldsFilled(allFilled);
            setOtpVerificationStep(allFilled);

            return newOtpValues;
        });
    };

    const handleVerifyOtp = () => {
        //if(siginMethod === 'mobile') {
            handleVerifyMobileOTP();
        // }else {
        //     handleVerifyEmailOTP();
        // }
    }

    // Function to handle form submission when all OTP fields are filled
    const handleVerifyMobileOTP = () => {
        setLoading(true);
        // Add your form submission logic here
        // For example, trigger an API call or any other action you need
        console.log("Form submitted with OTP values:", otpValues.join(''));
        // Submit the phone by calling the GraphQL mutation
        const otp = otpValues.join('');
        const mobile = phone;
        verifyGuestOtpBySMS({ variables: { mobile, otp } })
            .then(({ data }) => {
                const { success, message } = data.verifyGuestOtpBySMS;
                console.error("1- data:", data);
                console.error("2- success:", success);
                // Set the message and severity based on the API response
                if (success) {
                    handleShowNotification('success', 'Verified');
                    setResendCounter(0);
                    setIsResendDisabled(true);
                    setLoading(false);
                    handleContinueCheckout();
                } else {
                    handleShowNotification('error', message);
                    setLoading(false);
                }
            })
            .catch((error) => {
                // Handle any errors from the mutation
                handleShowNotification('error', error.message);
                setLoading(false);
            });
    };

    const handleVerifyEmailOTP = () => {
        setLoading(true);
        // Add your form submission logic here
        // For example, trigger an API call or any other action you need
        console.log("Form submitted with OTP values:", otpValues.join(''));
        // Submit the phone by calling the GraphQL mutation
        const otp = otpValues.join('');
        const email = guestEmail;
        verifyGuestOtpByEmail({ variables: { email, otp } })
            .then(({ data }) => {
                const { success, message } = data.verifyGuestOtpByEmail;
                console.error("1- data:", data);
                console.error("2- success:", success);
                // Set the message and severity based on the API response
                if (success) {
                    handleShowNotification('success', 'Verified');
                    setResendCounter(0);
                    setIsResendDisabled(true);
                    setLoading(false);
                    handleContinueCheckout();
                } else {
                    handleShowNotification('error', message);
                    setLoading(false);
                }
            })
            .catch((error) => {
                // Handle any errors from the mutation
                handleShowNotification('error', error.message);
                setLoading(false);
            });
    };

    const handleResendOtp = () => {
        //if(siginMethod === 'mobile') {
            handleResendCode();
        // }else {
        //     handleResendEmailCode();
        // }
    }

    const handleResendCode = () => {
        // Your logic to resend the verification code goes here
        // For example, you can call an API to send a new verification code to the user's email/phone
        setIsResendDisabled(true);
        setLoading(true);
        const mobile = phone;
        resendGuestOtpBySMS({ variables: { mobile } })
            .then(({ data }) => {
                const { success, message } = data.resendGuestOtpBySMS;
                // Set the message and severity based on the API response
                if (success) {
                    handleShowNotification('success', message);
                    setResendCounter(60);
                    setIsResendDisabled(true);
                    setLoading(false);
                }
                setShowNotification(true); // Show the Snackbar
            })
            .catch((error) => {
                // Handle any errors from the mutation
                handleShowNotification('error', error.message);
                setResendCounter(0);
                setIsResendDisabled(false);
                setLoading(false);
            })
            .finally(() => {
                // Hide the loader after the mutation is completed
                //setTimeout(async () => {
                setLoading(false);
                //}, 10000);
            });
    };

    const handleResendEmailCode = () => {
        // Your logic to resend the verification code goes here
        // For example, you can call an API to send a new verification code to the user's email/phone
        setIsResendDisabled(true);
        setLoading(true);
        const email = guestEmail;
        const login = 0;
        resendGuestOtpByEmail({ variables: { email, login } })
            .then(({ data }) => {
                const { success, message } = data.resendGuestOtpByEmail;
                // Set the message and severity based on the API response
                if (success) {
                    handleShowNotification('success', message);
                    setResendCounter(60);
                    setIsResendDisabled(true);
                    setLoading(false);
                }
                setShowNotification(true); // Show the Snackbar
            })
            .catch((error) => {
                // Handle any errors from the mutation
                handleShowNotification('error', error.message);
                setResendCounter(0);
                setIsResendDisabled(false);
                setLoading(false);
            })
            .finally(() => {
                // Hide the loader after the mutation is completed
                //setTimeout(async () => {
                setLoading(false);
                //}, 10000);
            });
    };

    // Function to handle the resend counter
    const handleResendCounter = () => {
        if (resendCounter > 0) {
            // Set the timer for 1 second
            setTimeout(() => {
                // Decrement the resend counter by 1 second
                setResendCounter((prevCounter) => prevCounter - 1);
            }, 1000);
        } else {
            // If the counter reaches 0, enable the resend link
            setIsResendDisabled(false);
        }
    };

    const handleGuestCheckoutAction = () => {
        setWaiting(true);

        if (firstname.trim() === '') {
            setFirstnameError(true);
            setWaiting(false);
            return;
        }

        if (lastname.trim() === '') {
            setLastnameError(true);
            setWaiting(false);
            return;
        }

        if (phone.trim() === '') {
            //setPhoneError(true);
            setWaiting(false);
            return;
        }

        if (!phone) {
            //setPhoneError(true);
            setWaiting(false);
            return;
        }

        if (!isValidEmail(guestEmail)) {
            setEmailError(true);
            setWaiting(false);
            return;
        }

        handleSetEmail();
        //if(siginMethod === 'mobile') {
            handlePhoneSubmit();
        // }else {
        //     handleEmailSubmit();
        // }
    };

    const handleContinueCheckout = () => {
        setTimeout(async () => {
            //Replace "/target-page" with the path of the page you want to redirect to.
            const queryParams = new URLSearchParams();
            queryParams.append('firstname', firstname);
            queryParams.append('lastname', lastname);
            queryParams.append('email', guestEmail);
            queryParams.append('phone', phone);
            const targetPagePath = "/checkout"; // Example: "/products", "/about", etc.
            const stateParams = {
                headerTitle: 'Checkout'
            };
            const urlWithParams = `${targetPagePath}?${queryParams.toString()}`;
            //Redirect the user to the target page
            history.push(urlWithParams, stateParams);
        }, 2000);
    }

    const pageContent = (
        <div className={classes.root} data-cy="GuestCheckoutInfoPage-root">
            <FormControl sx={{ width: '100%', gap: '14px', marginBottom: '30px' }}>
                <StyledTextField
                    required
                    fullWidth
                    id="guest-firstname"
                    name="firstname"
                    label=""
                    value={firstname}
                    onChange={handleInputChange}
                    placeholder={formatMessage({
                        id: 'global.firstName',
                        defaultMessage: 'First Name'
                    })}
                    defaultValue=""
                    error={firstnameError && firstname.length === 0} // Show error when firstname is empty
                    helperText={firstnameError && firstname.length === 0 ? <div className="errorText"><FormattedMessage id="firstNameRequired" defaultMessage="First name is required" /></div>  : ''}
                    inputProps={{
                        maxLength: 30  // Set the maximum length for the input
                    }}
                />
                <StyledTextField
                    required
                    fullWidth
                    id="guest-lastname"
                    name="lastname"
                    label=""
                    value={lastname}
                    onChange={handleInputChange}
                    placeholder={formatMessage({
                        id: 'global.lastName',
                        defaultMessage: 'Last Name'
                    })}
                    defaultValue=""
                    error={lastnameError && lastname.length === 0} // Show error when lastname is empty
                    helperText={lastnameError && lastname.length === 0 ? <div className="errorText"><FormattedMessage id="lastNameRequired" defaultMessage="Last name is required" /></div> : ''}
                    inputProps={{
                        maxLength: 30  // Set the maximum length for the input
                    }}
                />
                <PhoneNumberInput mobile={phone} setPhone={setPhone} />
                <StyledTextField
                    required
                    fullWidth
                    id="guest-email"
                    label=""
                    placeholder={formatMessage({
                        id: 'global.email',
                        defaultMessage: 'Email'
                    })}
                    defaultValue=""
                    value={guestEmail}
                    error={emailError && guestEmail.length > 0} // Show error only when email is invalid and there is an input
                    onChange={handleChangeEmail} // Handle email input change
                    onBlur={handleChangeEmail}
                    helperText={emailError && guestEmail.length > 0 ? <div className="errorText"><FormattedMessage id="invalidEmail" defaultMessage="Invalid email address" /></div> : ''} // Display error message if email is invalid and there is an input
                />
            </FormControl>
            {isDesktop ? (
                <button className={classes.guestCheckoutBtn} variant="contained" size="medium" onClick={handleGuestCheckoutAction}>
                        {waiting ? formatMessage({
                                    id: 'loadingButtonText',
                                    defaultMessage: 'Loading…'
                                }) : formatMessage({
                        id: 'checkoutPage.guestCheckout',
                        defaultMessage: 'Guest Checkout'
                    })}
                </button>
            ) : (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: "transparent", zIndex: "9999", padding: '1rem' }} elevation={0}>
                    <button className={classes.guestCheckoutBtn} variant="contained" size="medium" onClick={handleGuestCheckoutAction}>
                        {waiting ? formatMessage({
                                    id: 'loadingButtonText',
                                    defaultMessage: 'Loading…'
                                }) : formatMessage({
                        id: 'checkoutPage.guestCheckout',
                        defaultMessage: 'Guest Checkout'
                    })}
                    </button>
                </Paper>
            )}
            
        </div>
    );

    const otpContent = (
        <div className={classes.root} data-cy="GuestCheckoutInfoPage-root">
            {/* {siginMethod === 'mobile' ? ( */}
                <>
                    <Typography className={classes.title2} variant="h4">
                        Confirm your<br />phone number
                    </Typography>
                    <Typography className={classes.topLabel} variant="subtitle2">
                        We sent a code to <PhoneNumberDisplay phoneNumber={phone} classes={classes} /> <Link component="button" className={classes.linkBtn} onClick={changePhoneNumber}><span>Change phone number</span></Link>
                    </Typography>
                </>
            {/* ) : (
                <>
                    <Typography className={classes.title} variant="h4">
                        Confirm your email
                    </Typography>
                    <Typography className={classes.topLabel} variant="subtitle2">
                        We sent a code to <span className={classes.emailValue}>{guestEmail}</span> <Link component="button" className={classes.linkBtn} onClick={changeEmail}><span>Change email</span></Link>
                    </Typography>
                </>
            )} */}
            <Typography className={classes.topLabel} variant="subtitle2">
                Verification code:
            </Typography>
            <FormControl sx={{ width: '100%', margin: '2px auto 40px' }}>
                <div className={classes.otpTextFields}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TextField
                            key={index}
                            required
                            fullWidth
                            id={`otp-phone-field-${index}`}
                            label=""
                            type="tel"
                            placeholder=""
                            defaultValue=""
                            className={classes.otpField}
                            inputProps={{
                                minLength: 1, // Set minimum length to 1
                                maxLength: 1, // Set maximum length to 1
                            }}
                            disabled={loading} // The TextField will be disabled if done is true
                            inputRef={otpFieldRefs[index]} // Assign the ref to the TextField
                            //onInput={(event) => handleOtpInput(index, event)} // Handle input and move to the next TextField
                            onChange={(event) => handleOtpInput(index, event)}
                        //onBlur={index === otpFieldRefs.length - 1 ? handleBlur : undefined} // Add the onBlur event to the last OTP field
                        />
                    ))}
                </div>
            </FormControl>
            <Typography className={classes.topLabel} variant="subtitle2">
                Didn't receive the OTP?<br />
                <Link component="button"
                    className={classes.linkBtn}
                    onClick={handleResendOtp}
                    disabled={isResendDisabled}
                ><span>{loading ? 'Resending' : 'Resend Code'} {loading && <CircularProgress size={10} />}</span> {resendCounter > 0 ? `(${resendCounter}s)` : ''}</Link>
            </Typography>
            {isDesktop ? (
                loading ? (
                    <LoadingButton className={classes.guestCheckoutBtn} disabled loading size="small" variant="outlined">
                        Submit
                    </LoadingButton>
                ) : (
                    <Button className={classes.guestCheckoutBtn} variant="outlined" disabled={!otpVerificationStep} size="small" onClick={handleVerifyOtp}>
                        Next
                    </Button>
                )
            ) : (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: "transparent", zIndex: "9999", padding: '1rem' }} elevation={0}>
                    {loading ? (
                        <LoadingButton className={classes.guestCheckoutBtn} disabled loading size="small" variant="outlined">
                            Submit
                        </LoadingButton>
                    ) : (
                        <Button className={classes.guestCheckoutBtn} variant="outlined" disabled={!otpVerificationStep} size="small" onClick={handleVerifyOtp}>
                            Next
                        </Button>
                    )}
                </Paper>
            )}
        </div>
    );

    return (
        <Fragment>
            <div>{showOTPContent ? otpContent : pageContent}</div>
            <div className={classes.root}>
                <CustomSnackbar
                    open={showNotification}
                    autoHideDuration={3000}
                    onClose={handleCloseNotification}
                    severity={severity}
                    message={message}
                />
            </div>
        </Fragment>
    );
};

export default GuestCheckoutInfoPage;
