import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';

import { useStoreSwitcher } from './talons/useStoreSwitcher';
import { availableRoutes } from '@magento/venia-ui/lib/components/Routes/routes';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './storeSwitcher.module.css';
import SwitcherItem from './switcherItem';
import Shimmer from './storeSwitcher.shimmer';

import { Link, useLocation } from "react-router-dom";
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Skeleton from '@mui/material/Skeleton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ErrorOutline } from '@mui/icons-material';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CommunityIcon from '../Icons/CommunityIcon.svg';
import LngIcon from '../Icons/lng-icon.svg';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const drawerBleeding = 56;
  
  const StyledBox = styled(Box)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  }));
  
  const Puller = styled(Box)(({ theme }) => ({
      width: 30,
      height: 6,
      backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
      borderRadius: 3,
      position: 'absolute',
      top: 8,
      left: 'calc(50% - 15px)',
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
    backgroundColor: 'transparent',
    borderRadius: '12px',
    marginBottom: '0px',
}));

const ImageWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%'
});

const StyledImage = styled('img')({
    height: '25px',
    width: '25px',
    marginTop: '0px',
});
  
  const ErrorContent = ({ errorMessage }) => {
      return (
          <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="300px"
          >
              <ErrorOutline sx={{ fontSize: 48, color: 'error.main' }} />
              <Typography variant="h6" component="div" align="center" mt={2}>
                  {errorMessage}
              </Typography>
          </Box>
      );
  };

const StoreSwitcher = props => {
    const {
        availableStores,
        currentGroupName,
        currentStoreName,
        handleSwitchStore,
        handleSwitchStoreWithoutLoad,
        storeGroups,
        storeMenuRef,
        storeMenuTriggerRef,
        storeMenuIsOpen,
        handleTriggerClick
    } = useStoreSwitcher({ availableRoutes });

    const classes = useStyle(defaultClasses, props.classes);
    const menuClassName = storeMenuIsOpen ? classes.menu_open : classes.menu;
    const [open, setOpen] = useState(false);
    const { search } = useLocation();
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    if (!availableStores) return <Shimmer />;

    if (availableStores.size <= 1) return null;

    const groups = [];
    const hasOnlyOneGroup = storeGroups.size === 1;

    storeGroups.forEach((group, key) => {
        const stores = [];
        group.forEach(({ storeGroupName, storeName, isCurrent, storeCode }) => {
            let label;
            if (hasOnlyOneGroup) {
                label = `${storeName}`;
            } else {
                label = `${storeGroupName} - ${storeName}`;
            }
            stores.push(
                <li
                    aria-selected={currentStoreName}
                    role="option"
                    key={storeCode}
                    className={classes.menuItem}
                    data-cy="StoreSwitcher-view"
                >
                    <SwitcherItem
                        active={isCurrent}
                        onClick={handleSwitchStore}
                        option={storeCode}
                    >
                        {label}
                    </SwitcherItem>
                </li>
            );
        });

        groups.push(
            <ul
                role="listbox"
                className={classes.groupList}
                key={key}
                data-cy="StoreSwitcher-group"
            >
                {stores}
            </ul>
        );
    });

    let triggerLabel;
    if (hasOnlyOneGroup) {
        triggerLabel = `${currentStoreName}`;
    } else {
        triggerLabel = `${currentGroupName} - ${currentStoreName}`;
    }

    // useEffect(() => {
    //     const urlParams = new URLSearchParams(search);
    //     const languageParam = urlParams.get('lng');

    //     if (languageParam) {
    //         // Assuming 'en' is the language code you want to check
    //             // Trigger handleSwitchStore with the desired store code
    //             handleSwitchStoreWithoutLoad(languageParam);
    //         // Add more conditions for other languages if needed
    //     }
    // }, [search, handleSwitchStoreWithoutLoad]);

    return (
        <div className={classes.root} data-cy="StoreSwitcher-root">
            {/* <button
                data-cy="StoreSwitcher-triggerButton"
                className={classes.trigger}
                aria-label={currentStoreName}
                onClick={handleTriggerClick}
                ref={storeMenuTriggerRef}
                data-cy="StoreSwitcher-trigger"
                aria-expanded={storeMenuIsOpen}
            >
                {triggerLabel}
            </button>
            <div
                ref={storeMenuRef}
                className={menuClassName}
                data-cy="StoreSwitcher-menu"
            >
                <div className={classes.groups}>{groups}</div>
            </div> */}
            <LinkButton
                aria-label='lng'
                onClick={toggleDrawer(true)}
                data-cy="current-lng"
            >
                <StyledAvatar>
                    <ImageWrapper>
                        <StyledImage
                            src={LngIcon}
                            alt={currentStoreName}
                            title={currentStoreName}
                        />
                        {/* <span className={classes.currentLng}>{currentStoreName === 'English' ? 'En' : 'Ar'}</span> */}
                    </ImageWrapper>
                </StyledAvatar>
            </LinkButton>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: false,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                    <Typography sx={{ p: 2, color: 'text.secondary', fontWeight: 'Bold' }}>Select Language</Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    {groups}
                </StyledBox>
            </SwipeableDrawer>
        </div>
    );
};

export default StoreSwitcher;

StoreSwitcher.propTypes = {
    classes: shape({
        groupList: string,
        groups: string,
        menu: string,
        menu_open: string,
        menuItem: string,
        root: string,
        trigger: string
    })
};
