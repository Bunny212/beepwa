import React, { Suspense } from 'react';
import { Link, Route, useLocation, useHistory } from 'react-router-dom';
import { useAccountInformationPage } from '@magento/peregrine/lib/talons/AccountInformationPage/useAccountInformationPage';
import AccountInformationPageOperations from '@magento/venia-ui/lib/components/AccountInformationPage/accountInformationPage.gql.js';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import IconButton from '@mui/material/IconButton';
import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';

import MegaMenu from '@magento/venia-ui/lib/components/MegaMenu';
import PageLoadingIndicator from '../PageLoadingIndicator';
import { FormattedMessage, useIntl } from 'react-intl';
import InfoIcon from '../InfoIcon';
import ChatIcon from '../ChatIcon';
import NotificationsHeaderIcon from '../NotificationsHeaderIcon/notificationsHeaderIcon';
import CurrentCountry from '../CurrentCountry/currentCountry';
import Image from '@magento/venia-ui/lib/components/Image';
import Badge from '@mui/material/Badge';
import BackIcon from '../Icons/BackIcon.svg';
import CloseIcon from '../Icons/CloseIcon.svg';
import Typography from '@mui/material/Typography';
import Icon from '../CustomIcons/CustomIcons';
import { styled } from '@mui/material/styles';
import StoreSwitcher from './storeSwitcher';

const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar'));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 8,
        backgroundColor: '#F00',
        color: '#fff'
    },
}));

const MobileHeader = ({ classes }) => {

    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useHeader();

    const rootClass = isSearchOpen ? classes.open : classes.closed;

    const talonProps = useAccountInformationPage({
        ...AccountInformationPageOperations
    });

    const {
        initialValues
    } = talonProps;

    let customerName = 'My Account';
    if (initialValues) {
        const { customer } = initialValues;
        customerName = `${customer.firstname} ${customer.lastname}`;
    }

    const location = useLocation();
    const { headerTitle } = location.state || {};

    const isCartPage = () => {
        const location = useLocation();
        return location.pathname === '/cart';
    }
    const isCheckoutPage = () => {
        const location = useLocation();
        return location.pathname === '/checkout';
    }

    const isCategoryPage = () => {
        const location = useLocation();
        return location.pathname === '/categories';
    };

    const isSearchPage = () => {
        const location = useLocation();
        return location.pathname === '/search';
    };

    const isHomePage = () => {
        const location = useLocation();
        return location.pathname === '/';
    };

    const isOrderSummaryPage = () => {
        const location = useLocation();
        return location.pathname === '/order-summary';
    };

    const isAccountInformationPage = () => {
        const location = useLocation();
        return location.pathname === '/account-information';
    };

    const onHomePage = isHomePage();
    const onCartPage = isCartPage();
    const onCategoryPage = isCategoryPage();
    const onSearchPage = isSearchPage();
    const onCheckoutPage = isCheckoutPage();
    const onOrderSummaryPage = isOrderSummaryPage();
    const onAccountInformationPage = isAccountInformationPage();

    const {
        itemCount,
    } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });

    const itemCountDisplay = itemCount > 9 ? '9+' : itemCount;
    const maybeItemCounter = itemCount ? (
        <span className={classes.counter} data-cy="Header-CartTrigger-counter">
            {itemCountDisplay}
        </span>
    ) : null;

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader}>
                    <div className={classes.loaderBefore} />
                    <div className={classes.loaderAfter} />
                </div>
            </div>
        </div>
    );
    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;

    const { formatMessage } = useIntl();
    const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl'; // Use your logic to determine RTL
    const history = useHistory();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Beesline' });
    const goBack = () => {
        history.goBack();
    };

    const goHomePage = () => {
        history.push('/');
    };
    
    const pagesArray = [onHomePage];

    const HeaderContent = (
        pagesArray.includes(true) ? (
            <header className={rootClass} data-cy="Header-root">
                <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <InfoIcon />
                        <ChatIcon />
                    </div>
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <Link
                        aria-label={title}
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                        data-cy="Header-logoContainer"
                    >
                        <Logo classes={{ logo: classes.logo }} />
                    </Link>
                    <MegaMenu />
                    <div className={classes.secondaryActions}>
                        {/* <LoyaltyPointsIcon /> */}
                        {/* <div style={{position: 'relative'}}>
                            <div className={classes.switchers} data-cy="Header-switchers">
                                <StoreSwitcher />
                            </div>
                        </div> */}
                        <CurrentCountry />
                        <NotificationsHeaderIcon />
                        {/* <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        /> */}
                        {/* <AccountTrigger /> */}
                        {/* <CartTrigger /> */}
                    </div>
                </div>
                {searchBar}
                <PageLoadingIndicator absolute />
            </header>
        ) : (
            <header className={rootClass} data-cy="Header-root">
                {onAccountInformationPage ? (
                // Content to render when on "AccountInformation" page
                <div className={classes.accountInformationToolbar}>
                    <div className={classes.accountInformationActions}>
                        <Typography className={classes.headerTitle} variant="body1" gutterBottom>
                            <span className={classes.headerTitleSpan}>{customerName}</span>
                        </Typography>
                    </div>
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                </div>
                ) : (
                // Content to render when NOT on "AccountInformation" page
                <div className={classes.toolbar}>
                    <div className={onOrderSummaryPage || (onCartPage && itemCount === 0) ? classes.primaryActionss : classes.primaryActions}>
                        {onCheckoutPage ? (
                            <IconButton sx={{ padding: '0', minWidth: '17px', marginRight: '10px' }} onClick={goHomePage} aria-label="Back Home Page">
                                <Image
                                    height='9px'
                                    src={CloseIcon}
                                    alt='Continue Shopping'
                                    title='Continue Shopping'
                                    width='15px'
                                />
                            </IconButton>
                        ) : (
                            <IconButton sx={{ padding: '0', minWidth: '17px', marginRight: '10px', ...(isRTL && { marginLeft: '10px', marginRight: '0', transform: 'rotate(180deg)', alignItems: 'flex-end' }), }} onClick={goBack} aria-label="back">
                                <Image
                                    height='16px'
                                    src={BackIcon}
                                    alt='Search'
                                    title='Search'
                                    width='17px'
                                />
                            </IconButton>
                        )}
                        
                        <Typography className={classes.headerTitle} variant="body1" gutterBottom>
                            {onCartPage ? (
                                itemCount === 0 ? (
                                    <FormattedMessage id="headerTitle.emptyCart" />
                                ) : <FormattedMessage id="headerTitle.cart" />
                            ) : onCheckoutPage ? (
                                <span className={classes.headerTitleSpan}><FormattedMessage id="checkoutPage.checkout" /></span>
                            ) : (
                                headerTitle ? <span className={classes.headerTitleSpan}>{headerTitle}</span> : null
                            )}
                        </Typography>
                    </div>
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <div className={classes.secondaryActions}>
                        {!(onCartPage || onCheckoutPage || onOrderSummaryPage) && (
                            <Link
                                aria-label={title}
                                to={resourceUrl('/cart')}
                                className={classes.cartHeader}
                                data-cy="Header-cartHeader"
                            >
                                <StyledBadge style={{ top: '8px' }} badgeContent={maybeItemCounter} color="primary">
                                    <Icon name="bag" fontSize="20px" color="#000" selectedColor="#000" selected={true} />
                                </StyledBadge>
                            </Link>
                        )}
                        <Link
                            aria-label={title}
                            to={resourceUrl('/')}
                            className={classes.logoContainer}
                            data-cy="Header-logoContainer"
                        >
                            <Logo width={42} classes={{ logo: classes.logo }} />
                        </Link>
                    </div>
                </div>
                )}
                <PageLoadingIndicator absolute />
            </header>
        )
      );
      
    return HeaderContent;
};

MobileHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default MobileHeader;
