import React, { Fragment, useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { FormattedMessage, useIntl } from 'react-intl';
import { useSignIn } from './talons/useSignIn';
import { GET_CART_DETAILS_QUERY } from './signIn.gql';
// import Link from '@mui/material/Link';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
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
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import validator from "validator";

const SEND_OTP_BY_EMAIL = gql`
  mutation SendOtpByEmail($email: String, $login: Int) {
    sendOtpByEmail(email: $email, login: $login) {
        success
        message
    }
  }
`;

const RESEND_OTP_BY_EMAIL = gql`
  mutation ResendOtpByEmail($email: String, $login: Int) {
    resendOtpByEmail(email: $email, login: $login) {
        success
        message
    }
  }
`;

const VERIFY_OTP_BY_EMAIL = gql`
  mutation VerifyOtpByEmail($email: String, $otp: String, $login: Int) {
    verifyOtpByEmail(email: $email, otp: $otp, login: $login) {
        success
        message
    }
  }
`;

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FFC629", // Replace with your desired border color
    },
}));

const EmailLogin = forwardRef((props) => {
    const {
        showNotification,
        setShowNotification,
        message,
        setMessage,
        severity,
        setSeverity,
        done,
        setDone,
        isDesktop,
        currentCountry,
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
        handleSubmitEmail,
        isBusy,
        setFormApi,
        recaptchaWidgetProps,
        handleCloseNotification
    } = talonProps;

    const classes = props.classes;
    const history = useHistory();
    const { formatMessage } = useIntl();
    const [showOTPContent, setShowOTPContent] = React.useState(false);
    const [typingTimeout, setTypingTimeout] = React.useState(null);
    const [loginEmail, setLoginEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(true);
    // Create refs for each TextField
    const otpFieldRefs = Array.from({ length: 4 }).map(() => useRef(null));
    // Create a state variable to hold the OTP values entered by the user
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    // Add a new state variable to track if all OTP fields are filled
    const [allOtpFieldsFilled, setAllOtpFieldsFilled] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading state
    // Add state variables for Snackbar properties
    const [resendCounter, setResendCounter] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [otpVerificationStep, setOtpVerificationStep] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const [sendOtpByEmail] = useMutation(SEND_OTP_BY_EMAIL);
    const [resendOtpByEmail] = useMutation(RESEND_OTP_BY_EMAIL);
    const [verifyOtpByEmail] = useMutation(VERIFY_OTP_BY_EMAIL);

    // Use useEffect to start the timer when the resendCounter is updated
    useEffect(() => {
        // if (setDone) {
        //     setOtpVerificationStep(true);
        //     console.log("1-->>> allFilled = ", allOtpFieldsFilled);
        // }else {
        //     setOtpVerificationStep(false);
        // }
        handleResendCounter();
    }, [resendCounter]);

    // Function to check if all OTP fields are filled
    const isAllOtpFieldsFilled = (otpValues) => {
        return otpValues.every((value) => value.trim() !== '');
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
            setDone(allFilled);
            setOtpVerificationStep(!allFilled);
            setIsNext(allFilled);
            //setAllOtpFieldsFilled(allFilled);

            console.log("allFilled = " + allFilled);
            console.log("otpValues = " + newOtpValues); // Use newOtpValues instead of otpValues

            console.log("allFilled = " + allFilled);
            console.log("otpValues = " + otpValues);

            return newOtpValues;
        });
    };

    // const handleBlur = () => {
    //     // Check if all OTP fields are filled when focus is removed from the last OTP field
    //     if (isAllOtpFieldsFilled(otpValues)) {
    //         handleFormOTPVerifiyingSubmit();
    //     }
    // };

    // Function to handle form submission when all OTP fields are filled
    const handleFormOTPVerifiyingSubmit = () => {
        //if (isAllOtpFieldsFilled(otpValues)) {
        setLoading(true); // Show loader when the mutation is submitted
        // Add your form submission logic here
        // For example, trigger an API call or any other action you need
        console.log("Form submitted with OTP values:", otpValues.join(''));
        // Submit the email by calling the GraphQL mutation
        const otp = otpValues.join('');
        const email = loginEmail;
        const login = 1;
        verifyOtpByEmail({ variables: { email, otp, login } })
            .then(({ data }) => {
                const { success, message } = data.verifyOtpByEmail;
                console.error("1- data:", data);
                console.error("2- success:", success);
                // Set the message and severity based on the API response
                if (success) {
                    setMessage(message); // Set success message
                    setSeverity('success');
                    setDone(success);
                    setResendCounter(0);
                    setIsResendDisabled(true);
                    setDone(false);
                    //setIsNext(true);
                    setOtpVerificationStep(true);
                    handleLoginSubmit(message);
                } else {
                    setMessage(message); // Set error message
                    setSeverity('error');
                    setDone(success);
                    setIsNext(success);
                    setLoading(false);
                }
                setShowNotification(true); // Show the Snackbar
            })
            .catch((error) => {
                // Handle any errors from the mutation
                console.error("Error sending OTP:", error.message);
                setMessage('Error sending OTP. Please try again.'); // Set error message
                setSeverity('error');
                setShowNotification(true); // Show the Snackbar
                setLoading(false);
                setDone(false);
                setIsNext(false);
            });
        //}
    };

    const handleLoginSubmit = async (message) => {
        //setLoading(true);
        const email = loginEmail;
        const isSubmitted = await handleSubmitEmail(email);
        if(isSubmitted) {
            setResendCounter(0);
            setIsResendDisabled(true);
            //setLoading(false);
            setDone(true);
            setLoading(false);
            // Replace "/target-page" with the path of the page you want to redirect to.
            const targetPagePath = fromCart ? "/checkout" : "/account-information"; // Example: "/products", "/about", etc.
            // Redirect the user to the target page
            const stateParams = {
                login: true
            };
            history.push(targetPagePath, stateParams);
        }else {
            setMessage(message); // Set error message
            setSeverity('error');
            setDone(false);
            setLoading(false);
        }
    }

    const handleChangeEmail = (event) => {
        const emailValue = event.target.value;
        setLoginEmail(emailValue);
        setEmailError(!isValidEmail(loginEmail)); // Validate email and set error state accordingly
        setShowOTPContent(false); // Reset showOTPContent to false when the email is changed

        // Clear the previous timeout if exists
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout for email validation after 2 seconds (adjust the duration as needed)
        setTypingTimeout(setTimeout(() => {
            setEmailError(!isValidEmail(loginEmail));
        }, 3000));

        // if (isValidEmail(loginEmail)) {
        //     setDone(true);
        // } else {
        //     setDone(false);
        // }
    };

    // Handle the email submission when editing ends (focus is removed from the TextField)
    const handleEmailOTPSubmit = () => {
        if (isValidEmail(loginEmail)) {
            setLoading(true); // Show loader when the mutation is submitted
            const email = loginEmail;
            const login = 1;
            //setSeverity('success');
            //handleLoginSubmit("Success");
            // Submit the email by calling the GraphQL mutation
            sendOtpByEmail({ variables: { email, login } })
                .then(({ data }) => {
                    const { success, message } = data.sendOtpByEmail;
                    console.error("1- data:", data);
                    console.error("2- success:", success);
                    // Set the message and severity based on the API response
                    if (success) {
                        setShowOTPContent(success);
                        setMessage(message); // Set success message
                        setSeverity('success');
                        // Start the counter for the resend link
                        setResendCounter(60); // Set the counter to 60 seconds
                        // Disable the resend link
                        setIsResendDisabled(true);
                        setLoading(false);
                        setOtpVerificationStep(true);
                    } else {
                        setShowOTPContent(false);
                        setMessage(message); // Set error message
                        setSeverity('error');
                    }
                    setShowNotification(true); // Show the Snackbar
                })
                .catch((error) => {
                    // Handle any errors from the mutation
                    console.error("Error sending OTP:", error.message);
                    setMessage('Error sending OTP. Please try again.'); // Set error message
                    setSeverity('error');
                    setShowNotification(true); // Show the Snackbar
                    setLoading(false);
                })
                .finally(() => {
                    // Hide the loader after the mutation is completed
                    setLoading(false);
                });
        } else {
            // If the email is not valid or it's not the email step, hide the new content
            setShowOTPContent(false);
        }
    };

    const _isValidEmail = (value) => {
        // Basic email validation regex (you can use a more robust regex if needed)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const isValidEmail = (value) => {
        if (validator.isEmail(value)) {
            return true;
        }
        return false;
    }

    const changeEmail = () => {
        setShowOTPContent(false);
    };

    const handleResendCode = () => {
        // Your logic to resend the verification code goes here
        // For example, you can call an API to send a new verification code to the user's email/phone
        setIsResendDisabled(true);
        //setLoading(true);
        const email = loginEmail;
        const login = 0;
        resendOtpByEmail({ variables: { email, login } })
            .then(({ data }) => {
                const { success, message } = data.resendOtpByEmail;
                console.error("1- data:", data);
                console.error("2- success:", success);
                // Set the message and severity based on the API response
                if (success) {
                    setMessage(message); // Set success message
                    setSeverity('success');
                    setResendCounter(60);
                    setIsResendDisabled(true);
                    setLoading(false);
                }
                setShowNotification(true); // Show the Snackbar
            })
            .catch((error) => {
                // Handle any errors from the mutation
                console.error("Error sending OTP:", error.message);
                setMessage('Error sending OTP. Please try again.'); // Set error message
                setSeverity('error');
                setShowNotification(true); // Show the Snackbar
                setLoading(false);
                setResendCounter(0);
                setIsResendDisabled(false);
            })
            .finally(() => {
                // Hide the loader after the mutation is completed
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

    const handleSinInMethod = () => {
        setSiginMethod('mobile');
    }

    const skeletonLoading = (
        <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
    );

    const emailStepContent = (
        <Box>
            <Typography className={classes.title} variant="h4">
                <FormattedMessage
                    id="signInWithEmail"
                    defaultMessage="Sign in with your email"
                />
            </Typography>
            {/* {currentCountry === 'LB' && ( */}
                <Typography className={classes.topLabel} variant="subtitle2">
                    <FormattedMessage id="cantAccessEmail" defaultMessage="Can't access your email?" />
                    <Button sx={{ verticalAlign: 'unset' }} onClick={handleSinInMethod}
                        className={classes.linkBtn}>
                            <span>
                                <FormattedMessage
                                    id="signInWith"
                                    defaultMessage="Sign in with"
                                />
                            </span> <span className={classes.linkBtnUnderline}>
                                <FormattedMessage
                                    id="global.phoneNumber"
                                    defaultMessage="phone number"
                                />
                            </span>
                    </Button>
                </Typography>
            {/* )} */}
            <FormControl sx={{ width: '100%' }}>
                <StyledTextField
                    required
                    fullWidth
                    id="outlined-required"
                    label=""
                    placeholder={formatMessage({ id: 'global.email' })}
                    defaultValue=""
                    value={loginEmail}
                    error={emailError && loginEmail.length > 0} // Show error only when email is invalid and there is an input
                    onChange={handleChangeEmail} // Handle email input change
                    helperText={emailError && loginEmail.length > 0 ? formatMessage({ id: "invalidEmail" }) : ''} // Display error message if email is invalid and there is an input
                />
            </FormControl>
            {isDesktop ? (
                loading ? (
                    <LoadingButton className={classes.nextBtn} disabled loading size="small" variant="outlined">
                        <FormattedMessage id="submitButtonText" defaultMessage="Submit" />
                    </LoadingButton>
                ) : (
                    <Button className={classes.nextBtn} variant="outlined" size="small" disabled={emailError && !loading} onClick={handleEmailOTPSubmit}>
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
                        <Button className={classes.nextBtn} variant="outlined" size="small" disabled={emailError && !loading} onClick={handleEmailOTPSubmit}>
                           <FormattedMessage id="nextButtonText" defaultMessage="Next" />
                        </Button>
                    )}
                </Paper>
            )}
        </Box>
    );

    const otpContent = (
        <Box>
            <Typography className={classes.title} variant="h4">
                Confirm your email
            </Typography>
            <Typography className={classes.topLabel} variant="subtitle2">
                We sent a code to <span className={classes.emailValue}>{loginEmail}</span> <Link component="button" className={classes.linkBtn} onClick={changeEmail}><span>Change email</span></Link>
            </Typography>
            <Typography className={classes.topLabel} variant="subtitle2">
                Verification code:
            </Typography>
            <FormControl sx={{ width: '100%', margin: '2px auto 40px' }}>
                <div className={isDesktop ? classes.desktopOtpTextFields : classes.otpTextFields}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TextField
                            key={index}
                            required
                            fullWidth

                            id={`otp-field-${index}`}
                            label=""
                            placeholder=""
                            type="tel"
                            defaultValue=""
                            className={classes.otpField}
                            inputProps={{
                                minLength: 1, // Set minimum length to 1
                                maxLength: 1, // Set maximum length to 1
                            }}
                            disabled={isNext} // The TextField will be disabled if done is true
                            inputRef={otpFieldRefs[index]} // Assign the ref to the TextField
                            //onInput={(event) => handleOtpInput(index, event)} // Handle input and move to the next TextField
                            onChange={(event) => handleOtpInput(index, event)}
                        //onBlur={index === otpFieldRefs.length - 1 ? handleBlur : undefined} // Add the onBlur event to the last OTP field
                        />
                    ))}
                </div>
                {/* {isNext && <Alert sx={{ backgroundColor: 'transparent', padding: '0px', marginTop: '0px', marginRight: '4px' }} severity="success">Verified</Alert>} */}
            </FormControl>
            <Typography className={classes.topLabel} variant="subtitle2">
                Didn't get the email? Check your spam/junk.
                <Link component="button"
                    className={classes.linkBtn}
                    onClick={handleResendCode}
                    disabled={isResendDisabled}
                ><span>{props.loading ? 'Resending' : 'Resend Code'} {props.loading && <CircularProgress size={10} />}</span> {resendCounter > 0 ? `(${resendCounter}s)` : ''}</Link>
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
                        disabled={!isNext}
                        size="small"
                        onClick={handleFormOTPVerifiyingSubmit}
                    >
                        <FormattedMessage
                            id="login"
                            defaultMessage="Login"
                        />
                    </Button>
                )
            ) : (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: "white", zIndex: "9999", padding: '1rem', maxWidth: isDesktop ? '960px' : 'initial', margin: isDesktop ? '0 auto' : 'initial' }} elevation={0}>
                    {loading ? (
                        <LoadingButton className={classes.nextBtn} disabled loading size="small" variant="outlined">
                            <FormattedMessage id="submitButtonText" defaultMessage="Submit" />
                        </LoadingButton>
                    ) : (
                        <Button
                            className={classes.nextBtn}
                            variant="outlined"
                            disabled={!isNext}
                            size="small"
                            onClick={handleFormOTPVerifiyingSubmit}
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
        <div>{showOTPContent ? otpContent : emailStepContent}</div>
    );
});

export default EmailLogin;
