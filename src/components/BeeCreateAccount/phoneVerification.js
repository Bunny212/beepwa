import React, { Fragment, useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Link from '@mui/material/Link';
import { useStyle } from '@magento/venia-ui/lib/classify';
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
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
// import 'react-phone-number-input/style.css';
// import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input';
import Alert from '@mui/material/Alert';
import PhoneNumberDisplay from "./PhoneNumberDisplay";
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

const PhoneVerification = forwardRef((props, ref) => {
    // const {
    //     showNotification,
    //     setShowNotification,
    //     message,
    //     setMessage,
    //     severity,
    //     setSeverity,
    //     loading,
    //     setLoading,
    //     phoneError,
    //     setPhoneError,
    //     submitted,
    //     setSubmitted,
    //     isNext,
    //     setIsNext,
    //     setOtpVerificationStep,
    //     done,
    //     setDone,
    //     handleSetNextStep
    // } = props;

    const classes = props.classes;
    const [showOTPContent, setShowOTPContent] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
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

    useEffect(() => {
        // if (props.phoneNumber && isValidPhoneNumber(props.phoneNumber)) {
        //     props.setLoading(false);
        //     props.setPhoneError(false);
        // } else {
        //     props.setLoading(false);
        //     props.setPhoneError(true);
        // }

        if (allOtpFieldsFilled) {
            props.setOtpVerificationStep(true);
            console.log("1-->>> allFilled = ", allOtpFieldsFilled);
        }else {
            props.setOtpVerificationStep(false);
        }

        handleResendCounter();
        //handleChangePhone();
    }, [props.phoneNumber, resendCounter, allOtpFieldsFilled]);

    // Handle the phone submission when editing ends (focus is removed from the TextField)
    const handlePhoneOTPSubmit = () => {
        // Validate the phone number
        console.log("phone verify");
        if (props.activeStep === 1 && props.phoneNumber) {
            props.setLoading(true); // Show loader when the mutation is submitted
            const mobile = props.phoneNumber;
            const login = 0;
            // props.setSubmitted(true); // Set the submitted state to true after successful submission
            // props.setMessage('success'); // Set success message
            // props.setSeverity('success');
            // // Disable the resend link
            // setIsResendDisabled(true);
            // props.setLoading(false);
            // props.setIsNext(false);
            // props.handleSetNextStep();
            // Submit the mobile by calling the GraphQL mutation
            sendOtpBySMS({ variables: { mobile, login } })
                .then(({ data }) => {
                    const { success, message } = data.sendOtpBySMS;
                    console.error("1- data:", data);
                    console.error("2- success:", success);
                    // Set the message and severity based on the API response
                    if (success) {
                        setShowOTPContent(success);
                        props.setSubmitted(success); // Set the submitted state to true after successful submission
                        props.setMessage(message); // Set success message
                        props.setSeverity('success');
                        // Start the counter for the resend link
                        setResendCounter(60); // Set the counter to 60 seconds
                        // Disable the resend link
                        setIsResendDisabled(true);
                        props.setLoading(false);
                        props.setIsNext(false);
                        props.setOtpVerificationStep(true);
                    } else if (success == 2) {
                        setShowOTPContent(false);
                        props.setSubmitted(success); // Set the submitted state to true after successful submission
                    } else {
                        props.setMessage(message); // Set error message
                        props.setSeverity('error');
                    }
                    props.setShowNotification(true); // Show the Snackbar
                })
                .catch((error) => {
                    // Handle any errors from the mutation
                    console.error("Error sending OTP:", error.message);
                    props.setMessage('Error sending OTP. Please try again.'); // Set error message
                    props.setSeverity('error');
                    props.setShowNotification(true); // Show the Snackbar
                    props.setLoading(false);
                })
                .finally(() => {
                    props.setLoading(false);
                });
        } else {
            // If the phone is not valid or it's not the phone step, hide the new content
            setShowOTPContent(false);
        }
    };

    const changePhoneNumber = () => {
        setShowOTPContent(false);
        props.setIsNext(false);
        props.setSubmitted(false);
    };

    // Function to check if all OTP fields are filled
    const isAllOtpFieldsFilled = (otpValues) => {
        return otpValues.every((value) => value.trim() !== '');
    };

    // const handleChangePhone = () => {
    //     const phoneValue = props.phoneNumber;
    //     if (phoneValue) {
    //         props.setPhoneError(!isValidPhoneNumber(phoneValue)); // Validate email and set error state accordingly
    //         props.setSubmitted(false);

    //         // Clear the previous timeout if exists
    //         if (typingTimeout) {
    //             clearTimeout(typingTimeout);
    //         }

    //         // Set a new timeout for email validation after 2 seconds (adjust the duration as needed)
    //         setTypingTimeout(setTimeout(() => {
    //             props.setPhoneError(!isValidPhoneNumber(phoneValue));
    //         }, 3000));

    //         if (isValidPhoneNumber(phoneValue) && !props.submitted && !showOTPContent) {
    //             props.setIsNext(true);
    //         } else if(!isValidPhoneNumber(phoneValue)) {
    //             props.setIsNext(false);
    //         }

    //         // if(props.submitted && !showOTPContent) {
    //         //     props.setIsNext(false);
    //         // }
    //     }
    // };

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
            props.setIsNext(allFilled);
            props.setOtpVerificationStep(!allFilled);
            props.setSubmitted(!allFilled);
            console.log("allFilled = " + allFilled);
            console.log("otpValues = " + newOtpValues); // Use newOtpValues instead of otpValues

            console.log("allFilled = " + allFilled);
            console.log("otpValues = " + otpValues);

            return newOtpValues;
        });
        console.log("*****allOtpFieldsFilled = " + allOtpFieldsFilled);
    };

    // const handleBlur = () => {
    //     // Check if all OTP fields are filled when focus is removed from the last OTP field
    //     if (!props.done && isAllOtpFieldsFilled(otpValues)) {
    //         handlePhoneOTPSubmit();
    //     }
    // };

    // Function to handle form submission when all OTP fields are filled
    const handlePhoneFormOTPVerifiyingSubmit = () => {
        //if (isAllOtpFieldsFilled(otpValues)) {
            props.setLoading(true); // Show loader when the mutation is submitted
            props.setSubmitted(false);
            // Add your form submission logic here
            // For example, trigger an API call or any other action you need
            console.log("Form submitted with OTP values:", otpValues.join(''));
            // Submit the phone by calling the GraphQL mutation
            const otp = otpValues.join('');
            const mobile = props.phoneNumber;
            const login = 0;
            verifyOtpBySMS({ variables: { mobile, otp, login } })
                .then(({ data }) => {
                    const { success, message } = data.verifyOtpBySMS;
                    console.error("1- data:", data);
                    console.error("2- success:", success);
                    // Set the message and severity based on the API response
                    if (success) {
                        props.setMessage(message); // Set success message
                        props.setSeverity('success');
                        //props.setDone(success);
                        setResendCounter(0);
                        setIsResendDisabled(true);
                        props.setSubmitted(success);
                        props.setLoading(false);
                        props.setIsNext(false);
                        //props.setOtpVerificationStep(true);
                        props.handleSetNextStep();
                        console.log("----****** >>>>>>> ", props.loading);
                    } else {
                        props.setMessage(message); // Set error message
                        props.setSeverity('error');
                        //props.setDone(success);
                        setResendCounter(60);
                        //setIsResendDisabled(true);
                        props.setLoading(false);
                        props.setIsNext(false);
                        props.setSubmitted(false);
                        //props.setOtpVerificationStep(true);
                    }
                    props.setShowNotification(true); // Show the Snackbar
                })
                .catch((error) => {
                    // Handle any errors from the mutation
                    console.error("Error sending OTP:", error.message);
                    props.setMessage('Error sending OTP. Please try again.'); // Set error message
                    props.setSeverity('error');
                    props.setShowNotification(true); // Show the Snackbar
                    props.setLoading(false);
                    props.setDone(false);
                })
                .finally(() => {
                    props.setLoading(false);
                });
        //}
    };

    const handleResendCode = () => {
        // Your logic to resend the verification code goes here
        // For example, you can call an API to send a new verification code to the user's email/phone
        setIsResendDisabled(true);
        props.setLoading(true);
        const mobile = props.phoneNumber;
        const login = 0;
        resendOtpBySMS({ variables: { mobile, login } })
            .then(({ data }) => {
                const { success, message } = data.resendOtpBySMS;
                console.error("1- data:", data);
                console.error("2- success:", success);
                // Set the message and severity based on the API response
                if (success) {
                    props.setMessage(message); // Set success message
                    props.setSeverity('success');
                    setResendCounter(60);
                    setIsResendDisabled(true);
                    props.setLoading(false);
                    props.setOtpVerificationStep(true);
                }
                props.setShowNotification(true); // Show the Snackbar
            })
            .catch((error) => {
                // Handle any errors from the mutation
                console.error("Error sending OTP:", error.message);
                props.setMessage('Error sending OTP. Please try again.'); // Set error message
                props.setSeverity('error');
                props.setShowNotification(true); // Show the Snackbar
                props.setLoading(false);
                setResendCounter(0);
                setIsResendDisabled(false);
                props.setOtpVerificationStep(false);
            })
            .finally(() => {
                props.setLoading(false);
            });
    };

    useImperativeHandle(ref, () => ({
        handlePhoneOTPSubmit,
        handlePhoneFormOTPVerifiyingSubmit,
    }));

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

    const phoneStepContent = (
        <Box>
            <Typography className={classes.title} variant="h4">
                What's your phone number?
            </Typography>
            <Typography className={classes.topLabel} variant="subtitle2">
                Already have an account? <Link sx={{ verticalAlign: 'unset' }} component={Link} to={{
                    pathname: resourceUrl(`/sign-in`),
                    state: { headerTitle: '' }
                }}
                    className={classes.linkBtn}><span>Sign in</span></Link>
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
                        value={props.phoneNumber}
                        onChange={props.setPhoneNumber}
                        //onChange={handleChangePhone}
                        error={props.phoneNumber ? (isValidPhoneNumber(props.phoneNumber) ? undefined : 'Invalid phone number') : 'Phone number required'}
                    />
                </Box>
                {props.phoneNumber && !isValidPhoneNumber(props.phoneNumber) && <div style={{ color: 'red', fontSize: '10px' }}>Invalid phone number</div>} */}
                <PhoneNumberInput mobile={props.phoneNumber} setPhone={props.setPhoneNumber} setIsNext={props.setIsNext} setLoading={props.setLoading} setPhoneError={props.setPhoneError} />
            </FormControl>
        </Box>
    );

    const otpContent = (
        <Box>
            <Typography className={classes.title} variant="h4">
                Confirm your<br />phone number
            </Typography>
            <Typography className={classes.topLabel} variant="subtitle2">
                We sent a code to <PhoneNumberDisplay phoneNumber={props.phoneNumber} classes={classes} /> <Link component="button" className={classes.linkBtn} onClick={changePhoneNumber}><span>Change phone number</span></Link>
            </Typography>
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
                            disabled={props.done} // The TextField will be disabled if done is true
                            inputRef={otpFieldRefs[index]} // Assign the ref to the TextField
                            //onInput={(event) => handleOtpInput(index, event)} // Handle input and move to the next TextField
                            onChange={(event) => handleOtpInput(index, event)}
                            //onBlur={index === otpFieldRefs.length - 1 ? handleBlur : undefined} // Add the onBlur event to the last OTP field
                        />
                    ))}
                </div>
                {props.done && <Alert sx={{ backgroundColor: 'transparent', padding: '0px', marginTop: '0px', marginRight: '4px' }} severity="success">Verified</Alert>}
            </FormControl>
            <Typography className={classes.topLabel} variant="subtitle2">
                Didn't receive the OTP?<br />
                <Link component="button"
                    className={classes.linkBtn}
                    onClick={handleResendCode}
                    disabled={isResendDisabled}
                ><span>{props.loading ? 'Resending' : 'Resend Code'} {props.loading && <CircularProgress size={10} />}</span> {resendCounter > 0 ? `(${resendCounter}s)` : ''}</Link>
            </Typography>
        </Box>
    );

    return (
        <div>{showOTPContent ? otpContent : phoneStepContent}</div>
    );
});

export default PhoneVerification;
