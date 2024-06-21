import React, { Fragment, Suspense, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAccountInformationPage } from '@magento/peregrine/lib/talons/AccountInformationPage/useAccountInformationPage';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import { Message } from '@magento/venia-ui/lib/components/Field';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import defaultClasses from './accountInformationPage.module.css';
import AccountInformationPageOperations from '@magento/venia-ui/lib/components/AccountInformationPage/accountInformationPage.gql.js';

const EditModal = React.lazy(() => import('@magento/venia-ui/lib/components/AccountInformationPage/editModal'));

import Image from '@magento/venia-ui/lib/components/Image';
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import AccountIcon from '../Icons/AccountIcon.svg';
import BoxIcon from '../Icons/BoxIcon.svg';
import HeartIcon from '../Icons/HeartIcon.svg';
import PreferencesIcon from '../Icons/PreferencesIcon.svg';
import AddressesIcon from '../Icons/AddressesIcon.svg';
import NotificationIcon from '../Icons/NotificationIcon.svg';
import CommunityIcon from '../Icons/CommunityIcon.svg';
import ChatIcon from '../Icons/ChatIcon.svg';
import CurrentCountry from '../CurrentCountry/currentCountry';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import { sendSignUpEvent, sendLoginEvent } from '../App/GTMEvents';
import { GetUserDataEvent } from '../App/getUserDataEvent';

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

const StyledNoLink = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    cursor: 'default'
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

const StyledListItemIcon = styled(ListItemIcon) ({
    minWidth: '30px',
});

const AccountInformationPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const { loadingUserData, errorUserData, gtmUserData } = GetUserDataEvent();
    const history = useHistory();
    const location = useLocation();
    const { signUp, login } = location.state || {};
    const { formatMessage } = useIntl();

    const handleItemClick = (link) => {
        // Navigate to the link when the button is clicked
        history.push(link); // Assuming you have access to the history object
    };

    useEffect(() => {
        if(signUp) {
            sendSignUpEvent(gtmUserData);
        }
    }, [signUp, gtmUserData]);

    useEffect(() => {
        if(login) {
            sendLoginEvent(gtmUserData);
        }
    }, [login, gtmUserData]);

    let pageContent = (
            <Fragment>
                <div className={isDesktop ? classes.desktopAccountDetails : classes.accountDetails}>
                    <Box className={classes.accountQuickAccess}>
                        <Grid className={classes.mainGrid} sx={{ padding: '0px' }} container spacing={4}>
                            <Grid sx={{ padding: '0px' }} item xs={4}>
                                <Item>
                                    <StyledLink
                                        aria-label='New'
                                        to={{
                                            pathname: resourceUrl('/profile')
                                        }}
                                        data-cy="profile-Account"
                                    >
                                        <StyledAvatar>
                                            <ImageWrapper>
                                                <StyledImage
                                                    src={AccountIcon}
                                                    alt={formatMessage({
                                                        id: 'profile',
                                                        defaultMessage: 'Profile'
                                                    })}
                                                    title={formatMessage({
                                                        id: 'profile',
                                                        defaultMessage: 'Profile'
                                                    })}
                                                />
                                            </ImageWrapper>
                                        </StyledAvatar>
                                        <Typography className={classes.title} variant="subtitle1" gutterBottom>
                                            <FormattedMessage id="profile" defaultMessage="Profile" />
                                        </Typography>
                                    </StyledLink>
                                </Item>
                            </Grid>
                            <Grid sx={{ padding: '0px' }} item xs={4}>
                                <Item>
                                    <StyledLink
                                        aria-label='New'
                                        to={{
                                            pathname: resourceUrl(`/get-support`),
                                            state: { headerTitle: formatMessage({id: 'getSupport',defaultMessage: 'Get Support'}) }
                                        }}
                                        data-cy="support-Account"
                                    >
                                        <StyledAvatar>
                                            <ImageWrapper>
                                                <StyledImage
                                                    src={ChatIcon}
                                                    alt={formatMessage({
                                                        id: 'getSupport',
                                                        defaultMessage: 'Get Support'
                                                    })}
                                                    title={formatMessage({
                                                        id: 'getSupport',
                                                        defaultMessage: 'Get Support'
                                                    })}
                                                />
                                            </ImageWrapper>
                                        </StyledAvatar>
                                        <Typography className={classes.title} variant="subtitle1" gutterBottom>
                                            <FormattedMessage id="support" defaultMessage="Support" />
                                        </Typography>
                                    </StyledLink>
                                </Item>
                            </Grid>
                            <Grid sx={{ padding: '0px' }} item xs={4}>
                                <Item>
                                    <StyledNoLink
                                        aria-label='Country'
                                        data-cy="country-Account"
                                    >
                                        {/* <StyledAvatar>
                                            <ImageWrapper>
                                                <StyledImage
                                                    src={CommunityIcon}
                                                    alt="country"
                                                    title="country"
                                                />
                                            </ImageWrapper>
                                        </StyledAvatar> */}
                                        <CurrentCountry />
                                        <Typography className={classes.title} variant="subtitle1" gutterBottom>
                                            <FormattedMessage id="country.label" defaultMessage="Country" />
                                        </Typography>
                                    </StyledNoLink>
                                </Item>
                            </Grid>
                            {/* <Grid sx={{ padding: '0px' }} item xs={3}>
                                <Item>
                                    <StyledLink
                                        aria-label='New'
                                        to={{
                                            pathname: resourceUrl('/profile')
                                        }}
                                        data-cy="language-Account"
                                        className={classes.disabledLink}
                                    >
                                        <StyledAvatar>
                                            <ImageWrapper>
                                                <StyledImage
                                                    src={CommunityIcon}
                                                    alt="language"
                                                    title="language"
                                                />
                                            </ImageWrapper>
                                        </StyledAvatar>
                                        <Typography className={classes.title} variant="subtitle1" gutterBottom>
                                            Language
                                        </Typography>
                                    </StyledLink>
                                </Item>
                            </Grid> */}
                        </Grid>
                    </Box>
                    <div className={classes.mainGrid}>
                        <List
                            sx={{ width: '100%' }}
                            component="nav"
                            aria-labelledby="bee-account-details-section"
                            subheader={
                                <ListSubheader className={classes.sectionTitle} component="div" id="bee-account-details-section">
                                    <FormattedMessage id="accountDetails" defaultMessage="Account Details" />
                                </ListSubheader>
                            }
                        >
                            <StyledListItemButton onClick={() => handleItemClick('/notifications')} divider>
                                <StyledListItemIcon>
                                    <StyledImage
                                        src={NotificationIcon}
                                        alt={formatMessage({
                                            id: 'notifications',
                                            defaultMessage: 'Notifications'
                                        })}
                                        title={formatMessage({
                                            id: 'notifications',
                                            defaultMessage: 'Notifications'
                                        })}
                                    />
                                </StyledListItemIcon>
                                <Link to="/notifications"><span className={classes.dashboardTitle}>
                                        <FormattedMessage id="notifications" defaultMessage="Notifications" />
                                    </span></Link>
                            </StyledListItemButton>
                            <StyledListItemButton onClick={() => handleItemClick('/address-book')} divider>
                                <StyledListItemIcon>
                                    <StyledImage
                                        src={AddressesIcon}
                                        alt={formatMessage({
                                            id: 'addresses',
                                            defaultMessage: 'Addresses'
                                        })}
                                        title={formatMessage({
                                            id: 'addresses',
                                            defaultMessage: 'Addresses'
                                        })}
                                    />
                                </StyledListItemIcon>
                                <Link to="/address-book"><span className={classes.dashboardTitle}>
                                    <FormattedMessage id="addresses" defaultMessage="Addresses" />
                                </span></Link>
                            </StyledListItemButton>
                            <StyledListItemButton onClick={() => handleItemClick('/order-history')} divider>
                                <StyledListItemIcon>
                                    <StyledImage
                                        sx={{ height: '18px' }}
                                        src={BoxIcon}
                                        alt={formatMessage({
                                            id: 'myOrders',
                                            defaultMessage: 'My Orders'
                                        })}
                                        title={formatMessage({
                                            id: 'myOrders',
                                            defaultMessage: 'My Orders'
                                        })}
                                    />
                                </StyledListItemIcon>
                                <Link to="/order-history"><span className={classes.dashboardTitle}>
                                    <FormattedMessage id="myOrders" defaultMessage="My Orders" />
                                </span></Link>
                            </StyledListItemButton>
                            {/* <StyledListItemButton onClick={() => handleItemClick('/wishlist')} divider>
                                <StyledListItemIcon>
                                    <StyledImage
                                        src={HeartIcon}
                                        alt="Addresses"
                                        title="Addresses"
                                    />
                                </StyledListItemIcon>
                                <Link to="/wishlist"><span className={classes.dashboardTitle}>Favorites</span></Link>
                            </StyledListItemButton> */}
                            {/* <StyledListItemButton disabled>
                                <StyledListItemIcon>
                                    <StyledImage
                                        src={PreferencesIcon}
                                        alt="Addresses"
                                        title="Addresses"
                                    />
                                </StyledListItemIcon>
                                <Link to="/settings"><span className={classes.dashboardTitle}>Preferences</span></Link>
                            </StyledListItemButton> */}
                        </List>
                    </div>
                    <div className={classes.mainGrid}>
                    <List
                            sx={{ width: '100%' }}
                            component="nav"
                            aria-labelledby="bee-account-details-section"
                            subheader={
                                <ListSubheader className={classes.sectionTitle} component="div" id="bee-account-details-section">
                                    <FormattedMessage id="helpCenter" defaultMessage="Help Center" />
                                </ListSubheader>
                            }
                        >
                            <StyledListItemButton divider>
                                <StyledListItemIcon>
                                    <StyledImage
                                        src={NotificationIcon}
                                        alt={formatMessage({
                                            id: 'getSupport',
                                            defaultMessage: 'Get Support'
                                        })}
                                        title={formatMessage({
                                            id: 'getSupport',
                                            defaultMessage: 'Get Support'
                                        })}
                                    />
                                </StyledListItemIcon>
                                <Link to={{
                                    pathname: resourceUrl(`/get-support`),
                                    state: { headerTitle: formatMessage({id: 'getSupport',defaultMessage: 'Get Support'}) }
                                }} ><span className={classes.dashboardTitle}>
                                        <FormattedMessage id="getSupport" defaultMessage="Get Support" />
                                    </span></Link>
                            </StyledListItemButton>
                            <StyledListItemButton>
                                <StyledListItemIcon>
                                    <StyledImage
                                        sx={{ height: '18px' }}
                                        src={BoxIcon}
                                        alt={formatMessage({
                                            id: 'faq',
                                            defaultMessage: 'FAQ'
                                        })}
                                        title={formatMessage({
                                            id: 'faq',
                                            defaultMessage: 'FAQ'
                                        })}
                                    />
                                </StyledListItemIcon>
                                <Link to={{
                                    pathname: resourceUrl(`/faq`),
                                    state: { headerTitle: formatMessage({id: 'faq',defaultMessage: 'FAQ'}) }
                                }} ><span className={classes.dashboardTitle}>
                                        <FormattedMessage id="faq" defaultMessage="FAQ" />
                                    </span></Link>
                            </StyledListItemButton>
                        </List>
                    </div>
                    {/* <div className={classes.lineItemsContainer}>
                        <span className={classes.nameLabel}>
                            <FormattedMessage
                                id={'global.name'}
                                defaultMessage={'Name'}
                            />
                        </span>
                        <span className={classes.nameValue}>
                            {customerName}
                        </span>
                        <span className={classes.emailLabel}>
                            <FormattedMessage
                                id={'global.email'}
                                defaultMessage={'Email'}
                            />
                        </span>
                        <span className={classes.emailValue}>
                            {customer.email}
                        </span>
                        <span className={classes.passwordLabel}>
                            <FormattedMessage
                                id={'global.password'}
                                defaultMessage={'Password'}
                            />
                        </span>
                        <span className={classes.passwordValue}>
                            {passwordValue}
                        </span>
                    </div>
                    <div className={classes.editButtonContainer}>
                        <Button
                            className={classes.editInformationButton}
                            disabled={false}
                            onClick={showUpdateMode}
                            priority="normal"
                            data-cy="AccountInformationPage-editInformationButton"
                        >
                            <FormattedMessage
                                id={'global.editButton'}
                                defaultMessage={'Edit'}
                            />
                        </Button>
                    </div> */}
                </div>
                {/* <Suspense fallback={null}>
                    <EditModal
                        formErrors={formErrors}
                        initialValues={customer}
                        isDisabled={isDisabled}
                        isOpen={isUpdateMode}
                        onCancel={handleCancel}
                        onChangePassword={handleChangePassword}
                        onSubmit={handleSubmit}
                        shouldShowNewPassword={shouldShowNewPassword}
                        recaptchaWidgetProps={recaptchaWidgetProps}
                    />
                </Suspense> */}
            </Fragment>
        );

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'accountInformationPage.titleAccount',
                    defaultMessage: 'Account Information'
                })}
            </StoreTitle>
            {pageContent}
        </div>
    );
};

export default AccountInformationPage;
