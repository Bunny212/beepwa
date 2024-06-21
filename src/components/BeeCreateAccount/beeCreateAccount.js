import React, { Fragment, useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './beeCreateAccount.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { FormattedMessage, useIntl } from 'react-intl';
import Button from '@magento/venia-ui/lib/components/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import EmailVerification from "./emailVerification";
import PhoneVerification from "./phoneVerification";
import MoreAbout from "./moreAbout";
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import CheckIcon from "@mui/icons-material/Check";
import MuiAlert from '@mui/material/Alert';
import { useCreateAccount } from './talons/useCreateAccount';
import GoogleRecaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';
import LoadingButton from '@mui/lab/LoadingButton';
import FormError from '../FormError';
import { first } from "lodash";
import GetDeviceType from "../GetDeviceType/getDeviceType";

const steps = [
    <FormattedMessage id="emailStep" />,
    <FormattedMessage id="phoneNumberStep" />,
    <FormattedMessage id="personalInfoStep" />
];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const QontoConnector = styled(StepConnector)(({ theme, isRTL }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 9,
        left: isRTL ? 'calc(50% + 8px)' : 'calc(-50% + 8px)',
        right: isRTL ? 'calc(-50% + 8px)' : 'calc(50% + 8px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#FFC629',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#FFC629',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 2,
        borderRadius: 1,
    },
}));

const ColoredStepIcon = styled("div")(({ theme, active, completed }) => ({
    width: 17,
    height: 17,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: active ? "#FFC629" : completed ? "#FFC629" : "#FFFFFF",
    border: !active ? `1px solid #FFC629` : "none",
    zIndex: 1,
}));

const QontoStepIcon = (props) => {
    const { active, completed } = props;

    return (
        <ColoredStepIcon active={active} completed={completed}>
            {completed ? <CheckIcon style={{ color: "white", fontSize: 18, padding: 2 }} /> : ""}
        </ColoredStepIcon>
    );
};

const BeeCreateAccount = props => {
    const talonProps = useCreateAccount({
        initialValues: props.initialValues,
        onSubmit: props.onSubmit,
        onCancel: props.onCancel
    });

    const {
        errors,
        handleCancel,
        handleSubmit,
        handleEnterKeyPress,
        isDisabled,
        initialValues,
        recaptchaWidgetProps
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const { formatMessage } = useIntl();
    const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl'; // Use your logic to determine RTL
    const history = useHistory();
    const location = useLocation();
    const { fromCart } = location.state || {};
    const emailVerificationRef = useRef(null);
    const phoneVerificationRef = useRef(null);
    const moreAboutRef = useRef(null);
    const [email, setEmail] = React.useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [formattedBirthday, setFormattedBirthday] = useState('');
    const [done, setDone] = React.useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [emailError, setEmailError] = React.useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const [otpVerificationStep, setOtpVerificationStep] = useState(false);
    const [password, setPassword] = useState('');
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
    const passwordLength = 12;

    const isStepOptional = (step) => {
        return step === -1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const generateRandomPassword = () => {
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset[randomIndex];
        }
        return password;
    };

    useEffect(() => {
        // Generate the password when the component mounts
        setPassword(generateRandomPassword());
    }, []); // Empty dependency array ensures the effect runs only once

    // Function to render content for each step
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <EmailVerification
                    classes={classes}
                    ref={emailVerificationRef}
                    activeStep={activeStep}
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                    message={message}
                    setMessage={setMessage}
                    severity={severity}
                    setSeverity={setSeverity}
                    done={done}
                    setDone={setDone}
                    email={email}
                    setEmail={setEmail}
                    emailError={emailError}
                    setEmailError={setEmailError}
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                    isNext={isNext}
                    setIsNext={setIsNext}
                    setOtpVerificationStep={setOtpVerificationStep}
                    loading={loading}
                    setLoading={setLoading}
                    handleSetNextStep={handleSetNextStep}
                />;
            case 1:
                return <PhoneVerification
                    classes={classes}
                    ref={phoneVerificationRef}
                    activeStep={activeStep}
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                    message={message}
                    setMessage={setMessage}
                    severity={severity}
                    setSeverity={setSeverity}
                    done={done}
                    setDone={setDone}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    phoneError={phoneError}
                    setPhoneError={setPhoneError}
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                    isNext={isNext}
                    setIsNext={setIsNext}
                    setOtpVerificationStep={setOtpVerificationStep}
                    loading={loading}
                    setLoading={setLoading}
                    handleSetNextStep={handleSetNextStep}
                />
            case 2:
                return <MoreAbout
                    classes={classes}
                    ref={moreAboutRef}
                    activeStep={activeStep}
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                    message={message}
                    setMessage={setMessage}
                    severity={severity}
                    setSeverity={setSeverity}
                    done={done}
                    setDone={setDone}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    gender={gender}
                    setGender={setGender}
                    birthday={birthday}
                    setBirthday={setBirthday}
                    formattedBirthday={formattedBirthday}
                    setFormattedBirthday={setFormattedBirthday}
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                    isNext={isNext}
                    setIsNext={setIsNext}
                    loading={loading}
                    setLoading={setLoading}
                    handleSetNextStep={handleSetNextStep}
                />;
            default:
                return null;
        }
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSetNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleNext = async () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        console.log('isNext = ', isNext);
        console.log('otpVerificationStep = ', otpVerificationStep);
        console.log('!otpVerificationStep = ', !otpVerificationStep);
        console.log("0-submitted = ", submitted);

        if (activeStep === 0) { // Email Verification
            console.log("1-submitted = ", submitted);
            if (isNext && !otpVerificationStep) {
                console.log("Email verification send OTP");
                handleCallEmailVerification();
            }

            if (isNext && otpVerificationStep) {
                console.log("OTP verification in email step");
                handleFormOTPVerifiyingSubmit();
                console.log("submitted = ", submitted);
            }
        }

        if (activeStep === 1) { // Phone Verification
            console.log("11-submitted = ", submitted);
            if (isNext && !otpVerificationStep) {
                console.log("Phone verification send OTP");
                handlePhoneOTPSubmit();
            }

            if (isNext && otpVerificationStep) {
                console.log("OTP verification in phone step");
                handlePhoneFormOTPVerifiyingSubmit();
                console.log("submitted = ", submitted);
            }
        }

        // if (activeStep !== steps.length - 1 && activeStep !== steps.length) {
        //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
        //     setSkipped(newSkipped);
        // }

        if (activeStep === steps.length - 1) {
            setLoading(true);
            const isSubmitted = await handleSubmit(email, firstName, lastName, password, phoneNumber, 1, '', 1); // Empty value is birthday
            console.log("isSubmitted == ", isSubmitted);
            //console.log("formattedBirthday == ", formattedBirthday);
            // Check if the form was successfully submitted
            if (isSubmitted) {
                // Form submission was successful, handle the next step or any other actions
                console.log("Success: Customer Account created");
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);
                setDone(done);
                setLoading(false);
                const userName = firstName + ' ' + lastName;
                console.log("userName == ", userName);
                setMessage('Weclome', userName);
                setSeverity('success');
                setShowNotification(true); // Show the Snackbar
                // Replace "/target-page" with the path of the page you want to redirect to.
                const targetPagePath = fromCart ? "/checkout" : "/account-information"; // Example: "/products", "/about", etc.
                // Redirect the user to the target page
                const stateParams = {
                    signUp: true
                };
                history.push(targetPagePath, stateParams);
            } else {
                // Form submission failed, handle the error or show a message to the user
                console.log("Error: Customer Account not created");
                setDone(false);
                setLoading(false);
            }
        } else if (activeStep === steps.length) {
            console.log("Continue shopping last step");
            console.log("Continue Shopping");
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleCallEmailVerification = () => {
        if (emailVerificationRef.current) {
            emailVerificationRef.current.handleEmailOTPSubmit();
        }
    };

    const handleFormOTPVerifiyingSubmit = () => {
        if (emailVerificationRef.current) {
            emailVerificationRef.current.handleFormOTPVerifiyingSubmit();
        }
    };

    const handlePhoneOTPSubmit = () => {
        if (phoneVerificationRef.current) {
            phoneVerificationRef.current.handlePhoneOTPSubmit();
        }
    };

    const handlePhoneFormOTPVerifiyingSubmit = () => {
        if (phoneVerificationRef.current) {
            phoneVerificationRef.current.handlePhoneFormOTPVerifiyingSubmit();
        }
    };

    return (
        <Fragment>
            <div className={classes.root} data-cy="BeeCreateAccountPage-root">
                <Box sx={{ width: '100%' }}>
                    <FormError errors={Array.from(errors.values())} />
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                Your account has been created.
                            </Typography>
                            {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box> */}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                            <div>
                                {renderStepContent(activeStep)}
                            </div>
                            {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}
                            </Box> */}
                        </React.Fragment>
                    )}
                    <GoogleRecaptcha {...recaptchaWidgetProps} />
                </Box>
            </div>
            {/* Add Snackbar component */}
            <Snackbar
                open={showNotification}
                autoHideDuration={6000}
                onClose={() => setShowNotification(false)}
                severity={severity}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowNotification(false)} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
            {isDesktop ? (
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector isRTL={isRTL} />}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepOptional(index)) {
                                    labelProps.optional = (
                                        <Typography variant="caption">Optional</Typography>
                                    );
                                }
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <span className={classes.indexStepper}>{index + 1}</span>
                                        <StepLabel className={classes.stepLabel} StepIconComponent={QontoStepIcon} {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {loading ? (
                            <LoadingButton className={classes.loadingBtn} loadingIndicator={<FormattedMessage id="loadingButtonText" />} disabled loading>
                                <FormattedMessage id="submitButtonText" />
                            </LoadingButton>
                        ) : (!loading) ? (
                            <Button className={classes.nextBtn} onClick={handleNext} disabled={!isNext}>
                                {activeStep === steps.length - 1 ? <FormattedMessage id="registerButtonText" /> : activeStep === steps.length ? <FormattedMessage id="signInButtonText" /> : <FormattedMessage id="nextButtonText" />}
                            </Button>
                        ) : null}
                    </div>
            ) : (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: "#fff", zIndex: "9999", padding: '1rem', paddingTop: '2.1rem', maxWidth: isDesktop ? '960px' : 'initial', margin: isDesktop ? '0 auto' : 'initial' }} elevation={0}>
                    <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector isRTL={isRTL} />}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">Optional</Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <span className={classes.indexStepper}>{index + 1}</span>
                                    <StepLabel className={classes.stepLabel} StepIconComponent={QontoStepIcon} {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {loading ? (
                        <LoadingButton className={classes.loadingBtn} loadingIndicator={<FormattedMessage id="loadingButtonText" />} disabled loading>
                            <FormattedMessage id="submitButtonText" />
                        </LoadingButton>
                    ) : (!loading) ? (
                        <Button className={classes.nextBtn} onClick={handleNext} disabled={!isNext}>
                            {activeStep === steps.length - 1 ? <FormattedMessage id="registerButtonText" /> : activeStep === steps.length ? <FormattedMessage id="signInButtonText" /> : <FormattedMessage id="nextButtonText" />}
                        </Button>
                    ) : null}

                </Paper>
            )}
        </Fragment>
    );
};

export default BeeCreateAccount;
