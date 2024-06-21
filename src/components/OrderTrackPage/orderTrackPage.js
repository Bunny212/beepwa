import React, { Fragment, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStyle } from '@magento/venia-ui/lib/classify';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import defaultClasses from './orderTrackPage.module.css';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FFC629", // Replace with your desired border color
    },
}));


const OrderTrackPage = props => {

    const classes = useStyle(defaultClasses, props.classes);
    const history = useHistory();
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [done, setDone] = React.useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const [orderNumber, setOrderNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(true);
    const [typingTimeout, setTypingTimeout] = React.useState(null);

    const handleInput = (event) => {
        // Allow only numbers (0-9) and backspace key (8)
        const orderNumber = event.target.value;
        const isValidInput = /^[0-9\b]+$/.test(orderNumber);
        console.log("isValidInput = ", isValidInput);
        if (!isValidInput) {
            // Prevent input if not valid
            event.preventDefault();
            setDone(false);
        } else {
            setDone(true);
            setOrderNumber(orderNumber);
        }
    };

    const handleChangeEmail = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        setEmailError(!isValidEmail(email)); // Validate email and set error state accordingly
        // Clear the previous timeout if exists
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout for email validation after 2 seconds (adjust the duration as needed)
        setTypingTimeout(setTimeout(() => {
            setEmailError(!isValidEmail(email));
        }, 3000));

        if (isValidEmail(email)) {
            setDone(true);
        } else {
            setDone(false);
        }
    };

    const isValidEmail = (value) => {
        // Basic email validation regex (you can use a more robust regex if needed)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const pageContent = (
        <Box>
            <Typography className={classes.title} variant="h4">
                Look it up with<br />your order number
            </Typography>
            <Typography className={classes.topLabel} variant="subtitle2">
                Find an individual order
            </Typography>
            <FormControl sx={{ width: '100%' }}>
                <Box className={classes.inputBox}>
                    <TextField
                        required
                        fullWidth
                        id="order-number"
                        label=""
                        placeholder="Order number"
                        defaultValue=""
                        className={classes.inputField}
                        onInput={handleInput}
                    //disabled={done} // The TextField will be disabled if done is true
                    //inputRef={otpFieldRefs[index]} // Assign the ref to the TextField
                    //onInput={(event) => handleOtpInput(index, event)} // Handle input and move to the next TextField
                    //onChange={(event) => handleOtpInput(index, event)}
                    //onBlur={index === otpFieldRefs.length - 1 ? handleBlur : undefined} // Add the onBlur event to the last OTP field
                    />
                </Box>
                <Box className={classes.inputBox}>
                    <StyledTextField
                        fullWidth
                        id="outlined-required"
                        label=""
                        placeholder="Email address (optional)"
                        defaultValue=""
                        value={email}
                        error={emailError && email.length > 0} // Show error only when email is invalid and there is an input
                        onChange={handleChangeEmail} // Handle email input change
                        helperText={emailError && email.length > 0 ? 'Invalid email address' : ''} // Display error message if email is invalid and there is an input
                    />
                </Box>
                {/* {props.phoneNumber && !isValidPhoneNumber(props.phoneNumber) && <div style={{ color: 'red', fontSize: '10px' }}>Invalid phone number</div>} */}
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: "transparent", zIndex: "999", padding: '1rem' }} elevation={0}>
                    {loading ? (
                        <LoadingButton className={classes.nextBtn} disabled loading size="small" variant="outlined">
                            Submit
                        </LoadingButton>
                    ) : (
                        <Button component={Link} to={{
                                pathname: resourceUrl(`/track-order/order-status`),
                                state: { headerTitle: 'Order Status', incrementId: orderNumber, email: email}
                            }}
                            className={classes.nextBtn} variant="outlined" size="small" disabled={!done} >
                            Continue
                        </Button>
                    )}
                </Paper>
            </FormControl>
        </Box>
    );

    return (
        <Fragment>
            <div className={classes.root} data-cy="BeeSignInAccountPage-root">
                {pageContent}
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
        </Fragment>
    );
};

export default OrderTrackPage;
