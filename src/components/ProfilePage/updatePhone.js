import React, { Fragment, useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { FormattedMessage, useIntl } from 'react-intl';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import PhoneNumberDisplay from "../BeeCreateAccount/PhoneNumberDisplay";
import Paper from '@mui/material/Paper';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';
import PhoneNumberInput from "../PhoneNumberInput/phoneNumberInput";

const SEND_OTP_BY_SMS = gql`
  mutation SendOtpBySMS($mobile: String, $login: Int) {
    sendOtpBySMS(mobile: $mobile, login: $login) {
        success
        message
    }
  }
`;

const RESEND_OTP_BY_SMS = gql`
  mutation ResendOtpBySMS($mobile: String, $login: Int) {
    resendOtpBySMS(mobile: $mobile, login: $login) {
        success
        message
    }
  }
`;

const VERIFY_OTP_BY_SMS = gql`
  mutation VerifyOtpBySMS($mobile: String, $otp: String, $login: Int) {
    verifyOtpBySMS(mobile: $mobile, otp: $otp, login: $login) {
        success
        message
    }
  }
`;

const UPDATE_PHONE = gql`
  mutation UpdateCustomerPhoneV2($mobile: String!) {
    updateCustomerPhoneV2(mobile: $mobile) {
        customer {
            email
            date_of_birth
            firstname
            gender
            lastname
            mobile
        }
    }
  }
`;

const excludedCountries = ['IL'];
// const countryOptions = countries
//   .filter((country) => !excludedCountries.includes(country))
//   .map((country) => ({
//     value: country,
//     label: country,
//   }));

// const CustomCountrySelect = ({ value, onChange }) => {
//   return (
//     <Select
//       value={{ value, label: value }}
//       options={countryOptions}
//       onChange={(selectedOption) => onChange(selectedOption.value)}
//     />
//   );
// };

const UpdatePhone = props => {

    const classes = props.classes;
    const isDesktop = props.isDesktop;
    const { formatMessage } = useIntl();
    const [showOTPContent, setShowOTPContent] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState(true);
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [emailError, setEmailError] = React.useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [severity, setSeverity] = useState('success'); // Change severity as needed
    const [message, setMessage] = useState('');
    const [otpVerificationStep, setOtpVerificationStep] = useState(false);
    // Create refs for each TextField
    const otpFieldRefs = Array.from({ length: 4 }).map(() => useRef(null));
    // Create a state variable to hold the OTP values entered by the user
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    // Add a new state variable to track if all OTP fields are filled
    const [allOtpFieldsFilled, setAllOtpFieldsFilled] = useState(false);

    // Add state variables for Snackbar properties
    const [resendCounter, setResendCounter] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(false);

    const [sendOtpBySMS] = useMutation(SEND_OTP_BY_SMS);
    const [resendOtpBySMS] = useMutation(RESEND_OTP_BY_SMS);
    const [verifyOtpBySMS] = useMutation(VERIFY_OTP_BY_SMS);
    const [updateCustomerPhoneV2] = useMutation(UPDATE_PHONE);

    useEffect(() => {
        // if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
        //     setLoading(false);
        //     setPhoneError(false);
        // } else {
        //     setLoading(false);
        //     setPhoneError(true);
        // }

        if (allOtpFieldsFilled) {
            setOtpVerificationStep(true);
            console.log("1-->>> allFilled = ", allOtpFieldsFilled);
        }else {
            setOtpVerificationStep(false);
        }

        handleResendCounter();
        //handleChangePhone();
    }, [phoneNumber, resendCounter, allOtpFieldsFilled]);

    // Handle the phone submission when editing ends (focus is removed from the TextField)
    const handlePhoneOTPSubmit = () => {
        // Validate the phone number
        console.log("phone verify");
        if (phoneNumber && isNext) {
            setLoading(true); // Show loader when the mutation is submitted
            const mobile = phoneNumber;
            const login = 0;
            // Submit the mobile by calling the GraphQL mutation
            sendOtpBySMS({ variables: { mobile, login } })
                .then(({ data }) => {
                    const { success, message } = data.sendOtpBySMS;
                    console.error("1- data:", data);
                    console.error("2- success:", success);
                    // Set the message and severity based on the API response
                    if (success) {
                        setShowOTPContent(success);
                        setSubmitted(success); // Set the submitted state to true after successful submission
                        handleShowLocalNotification('success', message);
                        // Start the counter for the resend link
                        setResendCounter(60); // Set the counter to 60 seconds
                        // Disable the resend link
                        setIsResendDisabled(true);
                        setLoading(false);
                        setIsNext(false);
                        setOtpVerificationStep(true);
                    } else if (success == 2) {
                        setShowOTPContent(false);
                        setSubmitted(success); // Set the submitted state to true after successful submission
                    } else {
                        handleShowLocalNotification('error', message);
                    }
                })
                .catch((error) => {
                    // Handle any errors from the mutation
                    console.error("Error sending OTP:", error.message);
                    handleShowLocalNotification('error', error.message);
                    setLoading(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            // If the phone is not valid or it's not the phone step, hide the new content
            setShowOTPContent(false);
        }
    };

    const changePhoneNumber = () => {
        setShowOTPContent(false);
        setIsNext(false);
        setSubmitted(false);
    };

    // Function to check if all OTP fields are filled
    const isAllOtpFieldsFilled = (otpValues) => {
        return otpValues.every((value) => value.trim() !== '');
    };

    const handleShowNotification = (severity, message) => {
        // Call the handleShowNotification function passed from props
        props.handleShowNotification(severity, message);
    };

    const handleClose = () => {
        // Call the handleClose function passed from props
        props.handleClose();
    };

    const handleShowLocalNotification = (severity, message) => {
        setSeverity(severity);
        setMessage(message);
        setShowNotification(true);
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    const handleChangePhone = () => {
        const phoneValue = phoneNumber;
        if (phoneValue) {
            setPhoneError(!isValidPhoneNumber(phoneValue)); // Validate email and set error state accordingly
            setSubmitted(false);

            // Clear the previous timeout if exists
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }

            // Set a new timeout for email validation after 2 seconds (adjust the duration as needed)
            setTypingTimeout(setTimeout(() => {
                setPhoneError(!isValidPhoneNumber(phoneValue));
            }, 3000));

            if (isValidPhoneNumber(phoneValue) && !submitted && !showOTPContent) {
                setIsNext(true);
            } else if(!isValidPhoneNumber(phoneValue)) {
                setIsNext(false);
            }
        }
    };

    // Function to handle input in each OTP TextField and move to the next one if a number is entered
    const handleOtpInput = (index, event) => {
        const value = event.target.value;
        console.log("value = " + value);
        if (/\d/.test(value) && index < otpFieldRefs.length - 1) {
            otpFieldRefs[index + 1].current.focus();
        }

        // Update the otpValues state with the current input value
        setOtpValues((prevOtpValues) => {
            const newOtpValues = [...prevOtpValues];
            console.log("1-newOtpValues = " + newOtpValues);
            newOtpValues[index] = value;
            console.log("index = " + index);
            console.log("2-newOtpValues = " + newOtpValues);
            // Check if all OTP fields are filled
            const allFilled = isAllOtpFieldsFilled(newOtpValues);
            setAllOtpFieldsFilled(allFilled);
            setIsNext(allFilled);
            setOtpVerificationStep(!allFilled);
            setSubmitted(!allFilled);
            console.log("allFilled = " + allFilled);
            console.log("otpValues = " + newOtpValues); // Use newOtpValues instead of otpValues

            console.log("allFilled = " + allFilled);
            console.log("otpValues = " + otpValues);

            return newOtpValues;
        });
        console.log("*****allOtpFieldsFilled = " + allOtpFieldsFilled);
    };

    // Function to handle form submission when all OTP fields are filled
    const handlePhoneFormOTPVerifiyingSubmit = () => {
            setLoading(true); // Show loader when the mutation is submitted
            setSubmitted(false);
            // Add your form submission logic here
            // For example, trigger an API call or any other action you need
            console.log("Form submitted with OTP values:", otpValues.join(''));
            // Submit the phone by calling the GraphQL mutation
            const otp = otpValues.join('');
            const mobile = phoneNumber;
            const login = 0;
            verifyOtpBySMS({ variables: { mobile, otp, login } })
                .then(({ data }) => {
                    const { success, message } = data.verifyOtpBySMS;
                    console.error("1- data:", data);
                    console.error("2- success:", success);
                    // Set the message and severity based on the API response
                    if (success) {
                        handleUpdatePhone();
                    } else {
                        handleShowLocalNotification('error', message);
                        setResendCounter(60);
                        setLoading(false);
                        setIsNext(false);
                        setSubmitted(false);
                    }
                })
                .catch((error) => {
                    // Handle any errors from the mutation
                    console.error("Error sending OTP:", error.message);
                    handleShowLocalNotification('error', error.message);
                    setLoading(false);
                })
                .finally(() => {
                    //setLoading(false);
                });
    };

    const handleResendCode = () => {
        // Your logic to resend the verification code goes here
        // For example, you can call an API to send a new verification code to the user's email/phone
        setIsResendDisabled(true);
        setLoading(true);
        const mobile = phoneNumber;
        const login = 0;
        resendOtpBySMS({ variables: { mobile, login } })
            .then(({ data }) => {
                const { success, message } = data.resendOtpBySMS;
                console.error("1- data:", data);
                console.error("2- success:", success);
                // Set the message and severity based on the API response
                if (success) {
                    handleShowLocalNotification('success', message);
                    setResendCounter(60);
                    setIsResendDisabled(true);
                    setLoading(false);
                    setOtpVerificationStep(true);
                }
            })
            .catch((error) => {
                // Handle any errors from the mutation
                console.error("Error sending OTP:", error.message);
                handleShowLocalNotification('error', error.message);
                setLoading(false);
                setResendCounter(0);
                setIsResendDisabled(false);
                setOtpVerificationStep(false);
            })
            .finally(() => {
                setLoading(false);
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

    const handleUpdatePhone = async () => {
        setLoading(true); // Show loader when the mutation is submitted
        setSubmitted(false);
        const mobile = phoneNumber;
        updateCustomerPhoneV2({ variables: { mobile } })
            .then(({ data }) => {
                console.error("1- data:", data);
                // Set the message and severity based on the API response
                if (data) {
                    returnToProfilePage();
                } else {
                    handleShowLocalNotification('error', message);
                    setLoading(false);
                    setSubmitted(success);
                }
            })
            .catch((error) => {
                // Handle any errors from the mutation
                console.error("Error:", error.message);
                handleShowLocalNotification('error', error.message);
                setLoading(false);
            })
            .finally(() => {
                // Hide the loader after the mutation is completed
                setLoading(false);
            });
    };

    const returnToProfilePage = () => {
        setResendCounter(0);
        setIsResendDisabled(true);
        setSubmitted(true);
        setLoading(false);
        setIsNext(false);
        setOtpVerificationStep(true);
        handleShowNotification('success', 'Phone number updated.');
        handleClose();
    };

    const handleNext = async () => {
        if (!showOTPContent) {
            handlePhoneOTPSubmit();
        } else {
            handlePhoneFormOTPVerifiyingSubmit();
        }
    };

    const phoneStepContent = (
        <Box>
            <Typography className={classes.sectionTopLabel} variant="subtitle2">
                <FormattedMessage id="confirmationEmail" defaultMessage="We'll send you a code to confirm your new phone number." />
            </Typography>
            <FormControl sx={{ width: '100%' }}>
                {/* <Box className={classes.phoneBox}>
                    <span className={classes.phoneLabel}>Phone number</span>
                    <PhoneInput
                        //excludecountries={excludedCountries}
                        placeholder=""
                        international
                        countryOptionsOrder={["LB", "AE", "SA", "KW", "QA", "IQ", "JO", "|", "..."]}
                        countryCallingCodeEditable={false}
                        addInternationalOption={false}
                        defaultCountry="LB"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        //onChange={handleChangePhone}
                        error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : 'Invalid phone number') : 'Phone number required'}
                    />
                </Box>
                {phoneNumber && !isValidPhoneNumber(phoneNumber) && <div style={{ color: 'red', fontSize: '10px' }}>Invalid phone number</div>} */}
                <PhoneNumberInput mobile={phoneNumber} setPhone={setPhoneNumber} setIsNext={setIsNext} setLoading={setLoading} setPhoneError={setPhoneError} />
            </FormControl>
        </Box>
    );

    const otpContent = (
        <Box>
            <Typography className={classes.title} variant="h4">
                <FormattedMessage id="confirmPhoneNumber" defaultMessage="Confirm your phone number" />
            </Typography>
            <Typography className={classes.sectionTopLabel} variant="subtitle2">
                <FormattedMessage id="weSentCodeTo" defaultMessage="We sent a code to" /> <PhoneNumberDisplay phoneNumber={phoneNumber} classes={classes} /> <Link component="button" className={classes.linkBtn} onClick={changePhoneNumber}><span><FormattedMessage id="changePhoneNumber" defaultMessage="Change phone number" /></span></Link>
            </Typography>
            <Typography className={classes.sectionTopLabel} variant="subtitle2">
                <FormattedMessage id="verificationCode" defaultMessage="Verification code:" />
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
                            //disabled={done} // The TextField will be disabled if done is true
                            inputRef={otpFieldRefs[index]} // Assign the ref to the TextField
                            //onInput={(event) => handleOtpInput(index, event)} // Handle input and move to the next TextField
                            onChange={(event) => handleOtpInput(index, event)}
                            //onBlur={index === otpFieldRefs.length - 1 ? handleBlur : undefined} // Add the onBlur event to the last OTP field
                        />
                    ))}
                </div>
            </FormControl>
            <Typography className={classes.topLabel} variant="subtitle2">
                <FormattedMessage id="didntReceiveOTP" defaultMessage="Didn't receive the OTP?" /><br />
                <Link component="button"
                    className={classes.linkBtn}
                    onClick={handleResendCode}
                    disabled={isResendDisabled}
                ><span>{loading ? formatMessage({
                    id: 'resending',
                    defaultMessage: 'Resending'
                }) : formatMessage({
                    id: 'resendCode',
                    defaultMessage: 'Resend Code'
                })} {loading && <CircularProgress size={10} />}</span> {resendCounter > 0 ? `(${resendCounter}s)` : ''}</Link>
            </Typography>
        </Box>
    );

    return (
        <Fragment>
            <div>{showOTPContent ? otpContent : phoneStepContent}</div>
            {isDesktop ? (
                loading ? (
                    <LoadingButton className={classes.loadingButton} loadingIndicator={formatMessage({
                            id: 'loadingButtonText',
                            defaultMessage: 'Loading…'
                        })} disabled loading>
                        <FormattedMessage id="submitButtonText" defaultMessage="Submit" />
                    </LoadingButton>
                ) : (!loading) ? (
                    <Button className={classes.desktopEditInformationButton} onClick={handleNext} disabled={!isNext}>
                        {!showOTPContent ? formatMessage({
                            id: 'nextButtonText',
                            defaultMessage: 'Next'
                        }) : formatMessage({
                            id: 'updatePhone',
                            defaultMessage: 'Update phone'
                        })}
                    </Button>
                ) : null
            ) : (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: "transparent", zIndex: "9999", padding: '1rem' }} elevation={0}>
                    {loading ? (
                        <LoadingButton className={classes.loadingButton} loadingIndicator={formatMessage({
                            id: 'loadingButtonText',
                            defaultMessage: 'Loading…'
                        })} disabled loading>
                            <FormattedMessage id="submitButtonText" defaultMessage="Submit" />
                        </LoadingButton>
                    ) : (!loading) ? (
                        <Button className={classes.editInformationButton} onClick={handleNext} disabled={!isNext}>
                            {!showOTPContent ? formatMessage({
                            id: 'nextButtonText',
                            defaultMessage: 'Next'
                        }) : formatMessage({
                            id: 'updatePhone',
                            defaultMessage: 'Update phone'
                        })}
                        </Button>
                    ) : null}
                </Paper>
            )}
            <CustomSnackbar
                open={showNotification}
                autoHideDuration={3000}
                onClose={handleCloseNotification}
                severity={severity}
                message={message}
            />
        </Fragment>
    );
};

export default UpdatePhone;
