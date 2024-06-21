import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';

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

const UPDATE_EMAIL = gql`
  mutation UpdateCustomerEmailV2($email: String!) {
    updateCustomerEmailV2(email: $email) {
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

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FFC629", // Replace with your desired border color
    },
}));

const UpdateEmail = props => {

    const classes = props.classes;
    const isDesktop = props.isDesktop;
    const { formatMessage } = useIntl();
    const [showOTPContent, setShowOTPContent] = React.useState(false);
    const [typingTimeout, setTypingTimeout] = React.useState(null);
    const [email, setEmail] = React.useState('');
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

    const [sendOtpByEmail] = useMutation(SEND_OTP_BY_EMAIL);
    const [resendOtpByEmail] = useMutation(RESEND_OTP_BY_EMAIL);
    const [verifyOtpByEmail] = useMutation(VERIFY_OTP_BY_EMAIL);
    const [updateCustomerEmailV2] = useMutation(UPDATE_EMAIL);

    // Use useEffect to start the timer when the resendCounter is updated
    useEffect(() => {
        if (isNext) {
            setOtpVerificationStep(true);
            console.log("1-->>> allFilled = ", allOtpFieldsFilled);
        } else {
            setOtpVerificationStep(false);
        }
        handleResendCounter();
    }, [resendCounter]);

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
            setIsNext(allFilled);
            setOtpVerificationStep(!allFilled);
            setSubmitted(!allFilled);
            //setAllOtpFieldsFilled(allFilled);

            console.log("allFilled = " + allFilled);
            console.log("otpValues = " + newOtpValues); // Use newOtpValues instead of otpValues

            console.log("allFilled = " + allFilled);
            console.log("otpValues = " + otpValues);

            return newOtpValues;
        });
    };

    // Function to handle form submission when all OTP fields are filled
    const handleFormOTPVerifiyingSubmit = () => {
        setLoading(true); // Show loader when the mutation is submitted
        setSubmitted(false);
        // Add your form submission logic here
        // For example, trigger an API call or any other action you need
        console.log("Form submitted with OTP values:", otpValues.join(''));
        // Submit the email by calling the GraphQL mutation
        const otp = otpValues.join('');
        const login = 0;
        verifyOtpByEmail({ variables: { email, otp, login } })
            .then(({ data }) => {
                const { success, message } = data.verifyOtpByEmail;
                console.error("1- data:", data);
                console.error("2- success:", success);
                // Set the message and severity based on the API response
                if (success) {
                    handleUpdateEmail();
                } else {
                    handleShowLocalNotification('error', message);
                    setLoading(false);
                    setSubmitted(success);
                }
            })
            .catch((error) => {
                // Handle any errors from the mutation
                console.error("Error verifying OTP:", error.message);
                handleShowLocalNotification('error', error.message);
                setLoading(false);
            })
            .finally(() => {
                // Hide the loader after the mutation is completed
                //setLoading(false);
            });
    };

    const handleUpdateEmail = async () => {
        console.log("--->>>>>>>>>>>>>>>>>>>> New Email = ", email);
        setLoading(true); // Show loader when the mutation is submitted
        setSubmitted(false);
        updateCustomerEmailV2({ variables: { email } })
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
        handleShowNotification('success', 'Email updated.');
        handleClose();
    };

    const handleChangeEmail = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        setEmailError(!isValidEmail(email)); // Validate email and set error state accordingly
        setShowOTPContent(false); // Reset showOTPContent to false when the email is changed
        setSubmitted(false); // Reset the submitted state when the email changes

        // Clear the previous timeout if exists
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout for email validation after 2 seconds (adjust the duration as needed)
        setTypingTimeout(setTimeout(() => {
            setEmailError(!isValidEmail(email));
        }, 3000));

        if (isValidEmail(email)) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    };

    // Handle the email submission when editing ends (focus is removed from the TextField)
    const handleEmailOTPSubmit = () => {
        if (isValidEmail(email)) {
            setLoading(true); // Show loader when the mutation is submitted
            const login = 0;
            // Submit the email by calling the GraphQL mutation
            sendOtpByEmail({ variables: { email, login } })
                .then(({ data }) => {
                    const { success, message } = data.sendOtpByEmail;
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
                    } else {
                        setShowOTPContent(false);
                        setSubmitted(false);
                        handleShowLocalNotification('error', message);
                    }
                })
                .catch((error) => {
                    // Handle any errors from the mutation
                    console.error("Error sending OTP:", error.message);
                    handleShowLocalNotification('error', 'Error sending OTP. Please try again.');
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

    const isValidEmail = (value) => {
        // Basic email validation regex (you can use a more robust regex if needed)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const changeEmail = () => {
        setShowOTPContent(false);
    };

    const handleResendCode = () => {
        // Your logic to resend the verification code goes here
        // For example, you can call an API to send a new verification code to the user's email/phone
        setIsResendDisabled(true);
        //props.setLoading(true);
        //const email = props.email;
        const login = 0;
        resendOtpByEmail({ variables: { email, login } })
            .then(({ data }) => {
                const { success, message } = data.resendOtpByEmail;
                console.error("1- data:", data);
                console.error("2- success:", success);
                // Set the message and severity based on the API response
                if (success) {
                    handleShowLocalNotification('success', message);
                    setResendCounter(60);
                    setIsResendDisabled(true);
                    setLoading(false);
                }
            })
            .catch((error) => {
                // Handle any errors from the mutation
                console.error("Error sending OTP:", error.message);
                handleShowLocalNotification('error', 'Error sending OTP. Please try again.');
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

    const handleNext = async () => {
        if (!showOTPContent) {
            handleEmailOTPSubmit();
        } else {
            handleFormOTPVerifiyingSubmit();
        }
    };

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
            <Typography className={classes.sectionTopLabel} variant="subtitle2">
                <FormattedMessage id="confirmationEmail" defaultMessage="We'll send you an email to confirm your new email address." />
            </Typography>
            <FormControl sx={{ width: '100%' }}>
                <div className={classes.profileBox}>
                    <div className={classes.label}><FormattedMessage id="global.email" defaultMessage="Email" /></div>
                    <StyledTextField
                        required
                        fullWidth
                        id="outlined-required"
                        label=""
                        placeholder={formatMessage({
                            id: 'global.email',
                            defaultMessage: 'Email'
                        })}
                        defaultValue=""
                        value={email}
                        error={emailError && email.length > 0} // Show error only when email is invalid and there is an input
                        onChange={handleChangeEmail} // Handle email input change
                    />
                </div>
                <p className={classes.errorMsg}>{emailError && email.length > 0 ? <FormattedMessage id="invalidEmail" defaultMessage="Invalid email address" /> : ''}</p>
            </FormControl>
        </Box>
    );

    const otpContent = (
        <Box>
            <Typography className={classes.sectionTitle} variant="h4">
                <FormattedMessage id="confirmEmail" defaultMessage="Confirm your email" />
            </Typography>
            <Typography className={classes.sectionTopLabel} variant="subtitle2">
                <FormattedMessage id="weSentCodeTo" defaultMessage="We sent a code to" /> <span className={classes.emailValue}>{email}</span> <Link component="button" className={classes.linkBtn} onClick={changeEmail}><span><FormattedMessage id="changeEmail" defaultMessage="Change email" /></span></Link>
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

                            id={`otp-field-${index}`}
                            label=""
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
            <Typography className={classes.sectionTopLabel} variant="subtitle2">
                <FormattedMessage id="didntGetEmail" defaultMessage="Didn't get the email? Check your spam/junk." />
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
            <div>{showOTPContent ? otpContent : emailStepContent}</div>
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
                            id: 'updateEmail',
                            defaultMessage: 'Update Email'
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
                            id: 'updateEmail',
                            defaultMessage: 'Update Email'
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

export default UpdateEmail;
