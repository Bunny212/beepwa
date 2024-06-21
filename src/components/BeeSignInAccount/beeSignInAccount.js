import React, { Fragment, useState, useRef, useEffect } from "react";
import { useStyle } from '@magento/venia-ui/lib/classify';
import { useLocation } from 'react-router-dom';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import defaultClasses from './beeSignInAccount.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import Button from '@magento/venia-ui/lib/components/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import MobileLogin from "./mobileLogin";
import EmailLogin from "./emailLogin";
import Skeleton from '@mui/material/Skeleton';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';
import GetDeviceType from "../GetDeviceType/getDeviceType";
import { GetDefautlCountryData } from "../GetDefaultCountryData/getDefautlCountryData";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BeeSignInAccount = props => {

    const classes = useStyle(defaultClasses, props.classes);
    const { loading, error, storeConfig } = GetDefautlCountryData();
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const [email, setEmail] = React.useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [formattedBirthday, setFormattedBirthday] = useState('');
    const [done, setDone] = React.useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const [activeStep, setActiveStep] = React.useState(3);
    const [skipped, setSkipped] = React.useState(new Set());

    const location = useLocation();
    const { fromCart } = location.state || {};

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    // Ensure currentCountry is available and not in loading state
    const currentCountry = storeConfig?.beesline_default_country?.default_country_code;

    const [siginMethod, setSiginMethod] = useState('mobile');

    // Update siginMethod when currentCountry has a value
    // useEffect(() => {
    //     if (currentCountry) {
    //         setSiginMethod(currentCountry === 'LB' ? 'mobile' : 'email');
    //     }
    // }, [currentCountry]);

    // if (loading) {
    //     return (
    //         <div className={classes.root} data-cy="BeeSignInAccountPage-root">
    //             <Box sx={{ width: '100%' }}>
    //                 {/* Loading Skeleton */}
    //                 <Skeleton />
    //                 <Skeleton />
    //                 <Skeleton />
    //             </Box>
    //         </div>
    //     );
    // }

    return (
        <Fragment>
            <div className={classes.root} data-cy="BeeSignInAccountPage-root">
                <Box sx={{ width: '100%' }}>
                    {siginMethod === "mobile" ? (
                        <MobileLogin
                            classes={classes}
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            showNotification={showNotification}
                            setShowNotification={setShowNotification}
                            message={message}
                            setMessage={setMessage}
                            severity={severity}
                            setSeverity={setSeverity}
                            done={done}
                            setDone={setDone}
                            handleCloseNotification={handleCloseNotification}
                            isDesktop={isDesktop}
                            setSiginMethod={setSiginMethod}
                            fromCart={fromCart}
                        />
                    ) : (
                        <EmailLogin
                            classes={classes}
                            showNotification={showNotification}
                            setShowNotification={setShowNotification}
                            message={message}
                            setMessage={setMessage}
                            severity={severity}
                            setSeverity={setSeverity}
                            done={done}
                            setDone={setDone}
                            handleCloseNotification={handleCloseNotification}
                            isDesktop={isDesktop}
                            currentCountry={currentCountry}
                            setSiginMethod={setSiginMethod}
                            fromCart={fromCart}
                        />
                    )}
                </Box>
            </div>
            {/* Add Snackbar component */}
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

export default BeeSignInAccount;
