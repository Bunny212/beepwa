import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAccountInformationPage } from './talons/useAccountInformationPage';
import signOutOperation from './talons/signOut.gql';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import { Message } from '@magento/venia-ui/lib/components/Field';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import { useMutation } from "@apollo/client";
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import defaultClasses from './profilePage.module.css';
import GoogleReCaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';
import AccountInformationPageOperations from './accountInformationPage.gql.js';
import 'react-phone-number-input/style.css';

import LoadingButton from '@mui/lab/LoadingButton';
import Image from '@magento/venia-ui/lib/components/Image';
import { Link, useLocation, useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import UpdateEmail from './updateEmail';
import UpdatePhone from './updatePhone';
import PhoneNumberInput from '../PhoneNumberInput/phoneNumberInput.js';
import GetDeviceType from '../GetDeviceType/getDeviceType.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px',
}));

const StyledLink = styled(Link)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 45,
    height: 45,
    boxShadow: 'none', // Box shadow
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    backgroundColor: '#f8f8fa',
    borderRadius: '12px',
    marginBottom: '0px',
}));

const ImageWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledImage = styled(Image)({
    height: '22px',
    width: '22px',
    marginTop: '-5px',
});

const StyledListItemButton = styled(ListItemButton)({
    margin: '0 16px',
    paddingLeft: '0px',
    paddingRight: '0px',
});

const StyledListItemIcon = styled(ListItemIcon)({
    minWidth: '30px',
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'white',
    color: '#000000',
    boxShadow: 'none'
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    "& .MuiInputBase-input": {
        fontSize: '12px',
        "& .MuiInputBase-input": {
            fontSize: '12px',
        },
    }
}));

const ProfilePage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'page.title', defaultMessage: 'Beesline' });
    const [loading, setLoading] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [gender, setGender] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [severity, setSeverity] = useState('success'); // Change severity as needed
    const [message, setMessage] = useState('');
    const [editing, setEditing] = useState(false); // Add this state

    const [open, setOpen] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState('');
    const [dialogContent, setDialogContent] = React.useState('');

    const { signOutMutation } = signOutOperation;
    const history = useHistory();
    const location = useLocation();
    const [revokeToken] = useMutation(signOutMutation);
    const [
        { isSignedIn: isUserSignedIn, currentUser },
        { signOut }
    ] = useUserContext();
    const [, { dispatch }] = useEventingContext();

    const talonProps = useAccountInformationPage({
        ...AccountInformationPageOperations
    });

    const {
        handleCancel,
        formErrors,
        handleChangePassword,
        handleSubmit,
        handleUpdateEmailSubmit,
        initialValues,
        isDisabled,
        isUpdateMode,
        loadDataError,
        shouldShowNewPassword,
        showUpdateMode,
        recaptchaWidgetProps
    } = talonProps;

    useEffect(() => {
        if (initialValues) {
            const { customer } = initialValues;
            setFirstName(customer.firstname);
            setLastName(customer.lastname);
            setGender(customer.gender);
            setEditing(false); // Set editing to false initially
        }
    }, [initialValues]);

    const handleClickOpen = (title, content) => {
        setOpen(true);
        setDialogTitle(title);
        setDialogContent(content);
    };

    const handleUpdateClick = (title, content) => {
        handleClickOpen(title, content);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleShowNotification = (severity, message) => {
        setSeverity(severity);
        setMessage(message);
        setShowNotification(true);
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    const handleFirstNameChange = event => {
        setFirstName(event.target.value);
        setEditing(event.target.value !== initialValues.customer.firstname); // Set editing to true when first name changes
    };

    const handleLastNameChange = event => {
        setLastName(event.target.value);
        setEditing(event.target.value !== initialValues.customer.lastname); // Set editing to true when last name changes
    };

    const handleGenderChange = event => {
        setGender(event.target.value);
        setEditing(event.target.value !== initialValues.customer.gender); // Set editing to true when gender changes
    };

    const handleUpdateProfile = async () => {
        console.log('firstName = ', firstName);
        console.log('lastName = ', lastName);
        console.log('gender = ', gender);
        setLoading(true);
        await handleSubmit(firstName, lastName, gender);
        console.log("isDisabled == ", isDisabled);
        if (!isDisabled) {
            handleShowNotification('success', 'Profile updated.');
        } else {
            handleShowNotification('error', 'Something went wrong. Please refresh and try again.');
        }
    };

    const handleSignOut = useCallback(async () => {
        // Delete cart/user data from the redux store.
        await signOut({ revokeToken });

        // dispatch({
        //     type: 'USER_SIGN_OUT',
        //     payload: {
        //         ...currentUser
        //     }
        // });
        // Refresh the page as a way to say "re-initialize". An alternative
        // would be to call apolloClient.resetStore() but that would require
        // a large refactor.
        history.go(0);
    }, [
        history,
        revokeToken,
        signOut,
        currentUser,
        dispatch
    ]);

    const customStyle = {
        fontSize: '12px', // Set your desired font size
    };

    const errorMessage = loadDataError ? (
        <Message>
            <FormattedMessage
                id={'accountInformationPage.errorTryAgain'}
                defaultMessage={
                    'Something went wrong. Please refresh and try again.'
                }
            />
        </Message>
    ) : null;

    let pageContent = null;
    if (!initialValues) {
        return fullPageLoadingIndicator;
    } else {
        const { customer } = initialValues;
        const firstNamee = "Mahmoudd";//customer.firstname;
        //const customerName = `${customer.firstname} ${customer.lastname}`;
        const passwordValue = '***********';
        //console.log("-->>>> ", customer);
        pageContent = (
            <Fragment>
                <div className={isDesktop ? classes.desktopAccountDetails : classes.accountDetails}>
                    <Typography className={classes.title} variant="h3" gutterBottom>
                        <FormattedMessage id="profileInfo" defaultMessage="Profile Info" />
                    </Typography>
                    <div className={isDesktop ? classes.desktopLineItemsContainer : classes.lineItemsContainer}>
                        <Box className={classes.itemBox}>
                            <div className={classes.profileBox}>
                                <div className={classes.label}>
                                    <FormattedMessage id="global.firstName" defaultMessage="First Name" />
                                </div>
                                <TextField id="firstname" variant="outlined" value={firstName}
                                    onChange={handleFirstNameChange} sx={{ flex: 1 }} />
                            </div>
                            <div className={classes.profileBox}>
                                <div className={classes.label}>
                                    <FormattedMessage id="global.lastName" defaultMessage="Last Name" />
                                </div>
                                <TextField id="lastname" variant="outlined" value={lastName}
                                    onChange={handleLastNameChange} sx={{ flex: 1 }} />
                            </div>
                            <div className={classes.profileBox}>
                                <div className={classes.label}>
                                    <FormattedMessage id="gender" defaultMessage="Gender" />
                                </div>
                                <TextField disabled id="gender" variant="outlined" value={gender === 1 ? formatMessage({
                                            id: 'male',
                                            defaultMessage: 'Male'
                                        }) : gender === 2 ? formatMessage({
                                            id: 'female',
                                            defaultMessage: 'Female'
                                        }) : 'Unknown'} sx={{ flex: 1, display: 'none' }} />
                                <StyledSelect
                                    className={classes.selectStyle}
                                    id="bee-gender-select"
                                    value={gender}
                                    displayEmpty
                                    label=""
                                    onChange={handleGenderChange}
                                >
                                    <MenuItem value={1} style={customStyle}><FormattedMessage id="male" defaultMessage="Male" /></MenuItem>
                                    <MenuItem value={2} style={customStyle}><FormattedMessage id="female" defaultMessage="Female" /></MenuItem>
                                </StyledSelect>
                            </div>
                            {isDisabled ? (
                                <LoadingButton className={classes.loadingButton} disabled loading loadingIndicator={formatMessage({
                                    id: 'loadingButtonText',
                                    defaultMessage: 'Loading…'
                                })} size="small" variant="outlined">
                                    <FormattedMessage id="submitButtonText" defaultMessage="Submit" />
                                </LoadingButton>
                            ) : (
                                <Button
                                    className={classes.editInformationButton}
                                    disabled={isDisabled || !editing}
                                    onClick={handleUpdateProfile}
                                    priority="normal"
                                    data-cy="AccountInformationPage-editInformationButton"
                                >
                                    <FormattedMessage id="global.save" defaultMessage="Save" />
                                </Button>
                            )}
                        </Box>
                        <div className={classes.profileBox}>
                            <div className={classes.label}><FormattedMessage id="global.email" defaultMessage="Email" /></div>
                            <TextField disabled id="email" variant="outlined" value={customer.email} sx={{ flex: 1 }}
                                InputProps={{
                                    readOnly: true,
                                }} />
                            <Link className={classes.updateAction} component="button" onClick={() => handleUpdateClick(formatMessage({
                                            id: 'updateEmail',
                                            defaultMessage: 'Update Email'
                                        }), 'email')}>
                                <FormattedMessage id="global.updateButton" defaultMessage="update" />
                            </Link>
                        </div>
                        <div className={classes.profileBoxInput}>
                            <PhoneNumberInput mobile={customer.mobile} setPhone={props.setPhoneNumber} isDisabled={true} />
                            <Link className={classes.updateAction} component="button" onClick={() => handleUpdateClick(formatMessage({
                                            id: 'updatePhoneNumber',
                                            defaultMessage: 'Update Phone Number'
                                        }), 'phone')}>
                                <FormattedMessage id="global.updateButton" defaultMessage="update" />
                            </Link>
                        </div>
                    </div>
                </div>
                <GoogleReCaptcha {...recaptchaWidgetProps} />
                <CustomSnackbar
                    open={showNotification}
                    autoHideDuration={3000}
                    onClose={handleCloseNotification}
                    severity={severity}
                    message={message}
                />
                <Dialog
                    fullScreen={!isDesktop}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    className={classes.dialog}
                    PaperProps={{
                        style: {
                            borderRadius: isDesktop ? '4px' : '0 0 0 0',
                        },
                    }}
                >
                    <StyledAppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <Typography className={classes.dialogTitle} sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                {dialogTitle}
                            </Typography>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                                sx={{ paddingLeft: "11px" }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </StyledAppBar>
                    <div className={classes.dialogRichContent}>
                        {dialogContent === 'email' ? (
                            <UpdateEmail classes={classes} handleClose={handleClose} handleShowNotification={handleShowNotification} isDesktop={isDesktop} />
                        ) : dialogContent === 'phone' ? (
                            // <UpdatePhone />
                            <UpdatePhone classes={classes} handleClose={handleClose} handleShowNotification={handleShowNotification} isDesktop={isDesktop} />
                        ) : null}

                    </div>
                </Dialog>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: "transparent", zIndex: "9999", padding: '1rem' }} elevation={0}>
                    <Button
                        className={classes.singOutButton}
                        priority="normal"
                        data-cy="AccountInformationPage-editInformationButton"
                        onClick={handleSignOut}
                    >
                        Sign out
                    </Button>
                </Paper>
            </Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'accountInformationPage.titleAccount',
                    defaultMessage: 'Account Information'
                })}
            </StoreTitle>
            {errorMessage ? errorMessage : pageContent}
        </div>
    );
};

export default ProfilePage;
