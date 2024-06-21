import React, { Fragment, useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import gql from "graphql-tag";
import { useSignIn } from './talons/useSignIn';
import { FormattedMessage, useIntl } from 'react-intl';
import { GET_CART_DETAILS_QUERY } from './signIn.gql';
// import Link from '@mui/material/Link';
import { Link, useHistory } from "react-router-dom";
import { useStyle } from '@magento/venia-ui/lib/classify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import Button from '@magento/venia-ui/lib/components/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-phone-number-input/style.css';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input';
import Alert from '@mui/material/Alert';
import PhoneNumberDisplay from "./PhoneNumberDisplay";
import Paper from '@mui/material/Paper';
import PhoneNumberInput from '../PhoneNumberInput/phoneNumberInput';

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

const MobileLogin = props => {
    const {
        phoneNumber,
        setPhoneNumber,
        showNotification,
        setShowNotification,
        message,
        setMessage,
        severity,
        setSeverity,
        done,
        setDone,
        isDesktop,
        setSiginMethod,
        fromCart
    } = props;

    const talonProps = useSignIn({
        getCartDetailsQuery: GET_CART_DETAILS_QUERY
    });

    const {
        errors,
        handleCreateAccount,
        handleEnterKeyPress,
        handleForgotPassword,
        handleSubmit,
        isBusy,
        setFormApi,
        recaptchaWidgetProps,
        handleCloseNotification
    } = talonProps;

    const classes = props.classes;
    const history = useHistory();
    const [phoneError, setPhoneError] = useState(true); // Initialize the phone error state to true (button disabled by default)
    const [showOTPContent, setShowOTPContent] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [loadingResend, setLoadingResend] = useState(false); // State to manage loading state
    const [submitted, setSubmitted] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
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

    const [sendOtpBySMS] = useMutation(SEND_OTP_BY_SMS);
    const [resendOtpBySMS] = useMutation(RESEND_OTP_BY_SMS);
    const [verifyOtpBySMS] = useMutation(VERIFY_OTP_BY_SMS);

    useEffect(() => {
        // if (props.phoneNumber && isValidPhoneNumber(props.phoneNumber)) {
        //     //setLoading(false);
        //     setPhoneError(false);
        // } else {
        //     setLoading(false);
        //     setPhoneError(true);
        // }

        if (allOtpFieldsFilled) {
            setOtpVerificationStep(true);
        }else {
            setOtpVerificationStep(false);
        }
        
        handleResendCounter();
    }, [props.phoneNumber, resendCounter]);

    const handleShowNotification = (severity, message) => {
        setSeverity(severity);
        setMessage(message);
        setShowNotification(true);
    };

    // Handle the phone submission when editing ends (focus is removed from the TextField)
    const handlePhoneSubmit = () => {
        // Validate the phone number
        setLoading(true); // Show loader when the mutation is submitted
        setDone(false);
        const mobile = props.phoneNumber;
        const login = 1;
        //setSubmitted(true);
        //handleLoginSubmit('Success');
        // Submit the mobile by calling the GraphQL mutation
        sendOtpBySMS({ variables: { mobile, login } })
            .then(({ data }) => {
                const { success, message } = data.sendOtpBySMS;
                // Set the message and severity based on the API response
                if (success) {
                    setShowOTPContent(success);
                    setSubmitted(success); // Set the submitted state to true after successful submission
                    handleShowNotification('success', message);
                    // Start the counter for the resend link
                    setResendCounter(60); // Set the counter to 60 seconds
                    // Disable the resend link
                    setIsResendDisabled(true);
                    setLoading(false);
                } else if (success == 2) {
                    setShowOTPContent(false);
                    setSubmitted(success); // Set the submitted state to true after successful submission
                } else {
                    handleShowNotification('error', message);
                    setLoading(false);
                }
            })
            .catch((error) => {
                // Handle any errors from the mutation
                handleShowNotification('error', error.message);
                setLoading(false);
            })
            .finally(() => {
                // Hide the loader after the mutation is completed
                //setTimeout(async () => {
                    //setLoading(false);
                //}, 10000);
            });
    };

    const changePhoneNumber = () => {
        setShowOTPContent(false);
    };

    // Function to check if all OTP fields are filled
    const isAllOtpFieldsFilled = (otpValues) => {
        return otpValues.every((value) => value.trim() !== '');
    };

    // Function to handle input in each OTP TextField and move to the next one if a number is entered
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
            setSubmitted(!allFilled);
            return newOtpValues;
        });
    };

    const handleBlur = () => {
        // Check if all OTP fields are filled when focus is removed from the last OTP field
        if (!props.done && isAllOtpFieldsFilled(otpValues)) {
            handleFormSubmit();
        }
    };

    // Function to handle form submission when all OTP fields are filled
    const handleFormSubmit = () => {
        setLoading(true);
        setDone(false);
        // Add your form submission logic here
        // For example, trigger an API call or any other action you need
        // Submit the phone by calling the GraphQL mutation
        const otp = otpValues.join('');
        const mobile = props.phoneNumber;
        const login = 1;
        //setDone(true);
        //handleLoginSubmit("Success");
        verifyOtpBySMS({ variables: { mobile, otp, login } })
            .then(({ data }) => {
                const { success, message } = data.verifyOtpBySMS;
                // Set the message and severity based on the API response
                if (success) {
                    setDone(true);
                    handleLoginSubmit(message);
                    handleShowNotification('success', message);
                } else {
                    handleShowNotification('error', message);
                    setDone(success);
                    setLoading(false);
                }
            })
            .catch((error) => {
                // Handle any errors from the mutation
                handleShowNotification('error', error.message);
                //setLoading(false);
                setDone(false);
            });
    };

    const handleResendCode = () => {
        // Your logic to resend the verification code goes here
        // For example, you can call an API to send a new verification code to the user's email/phone
        setIsResendDisabled(true);
        setLoadingResend(true);
        const mobile = props.phoneNumber;
        const login = 1;
        resendOtpBySMS({ variables: { mobile, login } })
            .then(({ data }) => {
                const { success, message } = data.resendOtpBySMS;
                // Set the message and severity based on the API response
                if (success) {
                    handleShowNotification('success', message);
                    setResendCounter(60);
                    setIsResendDisabled(true);
                    setLoadingResend(false);
                }
            })
            .catch((error) => {
                // Handle any errors from the mutation
                handleShowNotification('error', error.message);
                setResendCounter(0);
                setIsResendDisabled(false);
                setLoadingResend(false);
            })
            .finally(() => {
                // Hide the loader after the mutation is complete
                setLoadingResend(false);
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

    const handleLoginSubmit = async (message) => {
        //setLoading(true);
        const mobile = props.phoneNumber;
        const isSubmitted = await handleSubmit(mobile);
        props.handleCloseNotification();
        handleShowNotification('info', 'Logging in... Please wait while we redirect you to your account.');
        if(isSubmitted) {
            setResendCounter(0);
            setIsResendDisabled(true);
            //setLoading(false);
            setDone(true);
            // Replace "/target-page" with the path of the page you want to redirect to.
            const targetPagePath = fromCart ? "/checkout" : "/account-information"; // Example: "/products", "/about", etc.
            // Redirect the user to the target page
            const stateParams = {
                login: true
            };
            history.push(targetPagePath, stateParams);
        }else {
            handleShowNotification('error', message);
            setDone(false);
            setLoading(false);
        }
    }

    const handleSinInMethod = () => {
        setSiginMethod('email');
    }

    const phoneStepContent = (
        <Box>
            <Typography className={classes.title} variant="h4">
                <FormattedMessage
                id="logInPhoneNumber"
                defaultMessage="Log in with your {lineBreak} phone number"
                values={{ lineBreak: <br /> }}
                />
            </Typography>
            <Typography className={classes.topLabel} variant="subtitle2">
                <FormattedMessage id="cantAccessPhone" defaultMessage="Can't access your phone?" />
                <Button sx={{ verticalAlign: 'unset' }} onClick={handleSinInMethod}
                        className={classes.linkBtn}><span>
                            <FormattedMessage
                                id="signInWith"
                                defaultMessage="Sign in with"
                            /></span> <span className={classes.linkBtnUnderline}><FormattedMessage
                                id="global.email"
                                defaultMessage="email"
                            /></span></Button>
            </Typography>
            <FormControl sx={{ width: '100%' }}>
                <PhoneNumberInput mobile={props.phoneNumber} setPhone={props.setPhoneNumber} setLoading={setLoading} setPhoneError={setPhoneError} />
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
                        value={props.phoneNumber}
                        onChange={props.setPhoneNumber}
                        error={props.phoneNumber ? (isValidPhoneNumber(props.phoneNumber) ? undefined : 'Invalid phone number') : 'Phone number required'}
                    />
                </Box>
                {props.phoneNumber && !isValidPhoneNumber(props.phoneNumber) && <div style={{ color: 'red', fontSize: '10px' }}>Invalid phone number</div>} */}
                {isDesktop ? (
                    loading ? (
                        <LoadingButton className={classes.nextBtn} disabled loading size="small" variant="outlined">
                            <FormattedMessage id="submitButtonText" defaultMessage="Submit" />
                        </LoadingButton>
                    ) : (
                        <Button className={classes.nextBtn} variant="outlined" size="small" disabled={phoneError && !loading} onClick={handlePhoneSubmit}>
                            <FormattedMessage id="nextButtonText" defaultMessage="Next" />
                        </Button>
                    )
                ) : (
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: "transparent", zIndex: "9999", padding: '1rem', maxWidth: isDesktop ? '960px' : 'initial', margin: isDesktop ? '0 auto' : 'initial' }} elevation={0}>
                        {loading ? (
                            <LoadingButton className={classes.nextBtn} disabled loading size="small" variant="outlined">
                                <FormattedMessage id="submitButtonText" defaultMessage="Submit" />
                            </LoadingButton>
                        ) : (
                            <Button className={classes.nextBtn} variant="outlined" size="small" disabled={phoneError && !loading} onClick={handlePhoneSubmit}>
                                <FormattedMessage id="nextButtonText" defaultMessage="Next" />
                            </Button>
                        )}
                    </Paper>
                )}
            </FormControl>
        </Box>
    );

    const otpContent = (
        <Box>
            <Typography className={classes.title} variant="h4">
                <FormattedMessage
                id="enterFourDigitCode"
                defaultMessage="Enter 4-digit code {lineBreak} sent to you"
                values={{ lineBreak: <br /> }}
                />
            </Typography>
            <Typography className={classes.topLabel} variant="subtitle2">
                <FormattedMessage id="cantAccessPhone" defaultMessage="Can't access your phone?" />
                <Link sx={{ verticalAlign: 'unset' }} component={Link} to={{
                    pathname: resourceUrl(`/bee-signin-account`),
                    state: { headerTitle: '' }
                }}
                    className={classes.linkBtn}><span><FormattedMessage
                    id="signInWithEmail"
                    defaultMessage="Sign in with email"
                /></span></Link>
            </Typography>
            <Typography className={classes.topLabel} variant="subtitle2">
                <FormattedMessage
                    id="verificationCode"
                    defaultMessage="Verification code:"
                />
            </Typography>
            <FormControl sx={{ width: '100%', margin: '2px auto 40px' }}>
                <div className={isDesktop ? classes.desktopOtpTextFields : classes.otpTextFields}>
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
                {props.done && <Alert sx={{ backgroundColor: 'transparent', padding: '0px', marginTop: '0px', marginRight: '4px' }} severity="success">
                    <FormattedMessage
                    id="verified"
                    defaultMessage="Verified"
                    />
                    </Alert>}
            </FormControl>
            <Typography className={classes.topLabel} variant="subtitle2">
                Didn't receive the OTP?<br />
                <Link component="button"
                    className={classes.linkBtn}
                    onClick={handleResendCode}
                    disabled={isResendDisabled}
                ><span>{loadingResend ? 'Resending' : 'Resend Code'} {loadingResend && <CircularProgress size={10} />}</span> {resendCounter > 0 ? `(${resendCounter}s)` : ''}</Link>
            </Typography>
            {isDesktop ? (
                loading ? (
                    <LoadingButton className={classes.nextBtn} disabled loading size="small" variant="outlined">
                        <FormattedMessage id="submitButtonText" defaultMessage="Submit" />
                    </LoadingButton>
                ) : (
                    <Button
                    className={classes.nextBtn}
                    variant="outlined"
                    disabled={!otpVerificationStep}
                    size="small"
                    onClick={handleFormSubmit}
                    >
                        <FormattedMessage
                            id="login"
                            defaultMessage="Login"
                        />
                    </Button>
                )
            ) : (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: "transparent", zIndex: "999", padding: '1rem', maxWidth: isDesktop ? '960px' : 'initial', margin: isDesktop ? '0 auto' : 'initial' }} elevation={0}>
                    {loading ? (
                        <LoadingButton className={classes.nextBtn} disabled loading size="small" variant="outlined">
                            <FormattedMessage id="submitButtonText" defaultMessage="Submit" />
                        </LoadingButton>
                    ) : (
                        <Button
                        className={classes.nextBtn}
                        variant="outlined"
                        disabled={!otpVerificationStep}
                        size="small"
                        onClick={handleFormSubmit}
                        >
                            <FormattedMessage
                                id="login"
                                defaultMessage="Login"
                            />
                        </Button>
                    )}
                </Paper>
            )}
        </Box>
    );

    return (
        <div>{showOTPContent ? otpContent : phoneStepContent}</div>
    );
};

export default MobileLogin;
