import React, { Suspense } from 'react';
import { Link, Route, useLocation, useHistory } from 'react-router-dom';
import { useAccountInformationPage } from '@magento/peregrine/lib/talons/AccountInformationPage/useAccountInformationPage';
import AccountInformationPageOperations from '@magento/venia-ui/lib/components/AccountInformationPage/accountInformationPage.gql.js';

import Logo from '../Logo';
import NavTrigger from '@magento/venia-ui/lib/components/Header/navTrigger';
import SearchTrigger from './searchTrigger';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';

import MegaMenu from '../MegaMenu';
import PageLoadingIndicator from '../PageLoadingIndicator';
import { useIntl } from 'react-intl';
import NotificationsHeaderIcon from '../NotificationsHeaderIcon/notificationsHeaderIcon';
import CurrentCountry from '../CurrentCountry/currentCountry';
import Badge from '@mui/material/Badge';
import Icon from '../CustomIcons/CustomIcons';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar'));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 8,
        backgroundColor: '#F00',
        color: '#fff'
    },
}));

const DesktopHeader = ({ classes }) => {

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
    const isHomePage = () => {
        const location = useLocation();
        return location.pathname === '/';
    };

    const onHomePage = isHomePage();
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
    const history = useHistory();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Beesline' });
    const goBack = () => {
        history.goBack();
    };

    return (
        <header className={rootClass} data-cy="Header-root">
            <div className={classes.toolbar}>
                <div className={classes.primaryActions}>
                    <NavTrigger />
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
                    <CurrentCountry />
                    <SearchTrigger
                        onClick={() => history.push('/search')}
                        ref={searchTriggerRef}
                    />
                    <NotificationsHeaderIcon />
                    <Link
                        aria-label={title}
                        to={resourceUrl('/account-information')}
                        className={classes.accountDesktopIcon}
                        data-cy="Header-Account"
                    >
                        <Icon name="user" fontSize="20px" color="#000" selectedColor="#000" selected={true} />
                    </Link>
                    <Link
                        aria-label={title}
                        to={resourceUrl('/cart')}
                        className={classes.cartHeaderDesktop}
                        data-cy="Header-cartHeader"
                    >
                        <StyledBadge style={{ top: '8px' }} badgeContent={maybeItemCounter} color="primary">
                            <Icon name="bag" fontSize="20px" color="#000" selectedColor="#000" selected={true} />
                        </StyledBadge>
                    </Link>
                </div>
            </div>
            {searchBar}
            <PageLoadingIndicator absolute />
        </header>
    );
};

DesktopHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default DesktopHeader;
