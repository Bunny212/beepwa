import React, { Fragment } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './loginRegisterLanding.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SignInBgGif from '../Images/logingif.gif';
import DeliveryTruck from '../Icons/delivery_truck.svg';
import EarlyAccess from '../Icons/earlyAccess.svg';
import DealsIcon from '../Icons/DealsIcon.svg';
import BoxIconYellow from '../Icons/BoxIconYellow.svg';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import GetDeviceType from "../GetDeviceType/getDeviceType";

const LoginRegisterLanding = props => {
  const classes = useStyle(defaultClasses, props.classes);
  const { isDesktop, isMobile, isTablet } = GetDeviceType();
  const { formatMessage } = useIntl();
  const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl'; // Use your logic to determine RTL
  const rootClass = isDesktop ? classes.desktopRoot : classes.root;
  const location = useLocation();
  const history = useHistory();
  const { fromCart } = location.state || false;

  const handleContineToGuestForm = () => {
    //Replace "/target-page" with the path of the page you want to redirect to.
    const targetPagePath = "/guest-checkout-info"; // Example: "/products", "/about", etc.
    const stateParams = {
        headerTitle: formatMessage({
          id: 'information',
          defaultMessage: 'Information'
      })
    };
    //Redirect the user to the target page
    history.push(targetPagePath, stateParams);
  }

  const headingImgClass = isDesktop ? classes.headingImgDesktop : fromCart
        ? classes.headingImg2
        : classes.headingImg;

  const labelTopTitleClass = fromCart
        ? classes.topTitle2
        : classes.topTitle;

  const labelBottomTitleClass = fromCart
        ? classes.bottomTitle2
        : classes.bottomTitle;

  const primaryTextStyle = {
    color: '#000',
  };

  const secondaryTextStyle = {
    color: '#000',
  };

  return (
    <Fragment>
      <div className={rootClass}>
        <img className={headingImgClass} src={SignInBgGif} />
      </div>
      <div className={classes.root} data-cy="SignInPage-root">
        <Box sx={{ width: '100%' }}>
        <Typography className={labelTopTitleClass} variant="h4">
            <FormattedMessage id="shopPerks.title" />{' '}
            <span><FormattedMessage id="shopPerks.extraPerks" /></span>
        </Typography>
          {/* <Typography className={labelBottomTitleClass} variant="h4">
            Shop while logged-in
          </Typography> */}
        </Box>
        <Box className={classes.btnAction}>
            <Button component={Link} to={{
                                pathname: resourceUrl(`/bee-create-account`),
                                state: { headerTitle: formatMessage({ id: "createAccount.buttonText" }), fromCart: fromCart}
              }} className={classes.createAccountBtn} variant="contained" size="medium">
              <FormattedMessage id="createAccount.buttonText" />
            </Button>
            <Button component={Link} to={{
                                pathname: resourceUrl(`/bee-signin-account`),
                                state: { headerTitle: formatMessage({ id: "signIn.buttonText" }), fromCart: fromCart}
              }} className={classes.loginBtn} variant="contained" size="medium">
              <FormattedMessage id="signIn.buttonText" />
            </Button>
            {fromCart && (
                <Box className={classes.skipBox}>
                    <Button className={classes.skipBtn} onClick={handleContineToGuestForm}>
                      <FormattedMessage id="skip.buttonText" />
                    </Button>
                </Box>
            )}
        </Box>
        <Box className={classes.boxInfo}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {/* <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'transparent' }}>
                  <img src={DeliveryTruck} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<FormattedMessage id="freeDeliveryOnFirstOrders" />} />
            </ListItem> */}
            {/* <ListItem sx={{ paddingBottom: '0px' }}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'transparent' }}>
                  <img src={BoxIconYellow} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<FormattedMessage id="discountOnFirstOrder" values={{ discount: "40" }}/>}
              secondary={<FormattedMessage id="discountOnFirstOrderSub"/>}
              primaryTypographyProps={{ style: primaryTextStyle }}
              secondaryTypographyProps={{ style: secondaryTextStyle }} />
            </ListItem> */}
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'transparent' }}>
                  <img src={EarlyAccess} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<FormattedMessage id="earlyAccessToNewLaunches" />} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'transparent' }}>
                  <img src={DealsIcon} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<FormattedMessage id="earlyAccessToPromotions" />} />
            </ListItem>
          </List>
        </Box>
      </div>
    </Fragment>
  );
};

export default LoginRegisterLanding;
