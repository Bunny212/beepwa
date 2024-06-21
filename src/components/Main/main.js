import React, { useEffect } from 'react';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Footer from '../Footer';
import Header from '../Header';
import defaultClasses from '@magento/venia-ui/lib/components/Main/main.module.css';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import { createTheme } from '@mui/material/styles';
import Icon from '../CustomIcons/CustomIcons';
import { styled } from '@mui/material/styles';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import { useCart } from "react-use-cart";
import GTMEvents from '../App/GTMEvents';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 8,
        backgroundColor: '#F00',
        color: '#fff'
    },
}));

const CustomBottomNavigation = styled(BottomNavigation)({
    '& .Mui-selected': {
      color: '#000000', // Custom color for the selected item
      fontSize: '8px',
      fontWeight: 'bold !important',
    },
    '& .MuiBottomNavigationAction-root': {
        color: '#000', // Default color for unselected items
        fontSize: '8px',
    },
    '& .MuiBottomNavigationAction-label': {
        lineHeight: '0',
        fontSize: '8px !important',
        fontWeight: '500',
        fontStyle: 'normal',
        lineHeight: '12px',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    '&.Mui-selected .MuiBottomNavigationAction-label': {
        fontWeight: 'bold',
    },
});

const theme = createTheme({
    overrides: {
      MuiBottomNavigationAction: {
        label: {
          fontSize: '0.75rem',
          fontFamily: 'Roobert'
        },
        selected: {
          fontSize: '0.75rem !important',
          color: '#ffcd25 !important'
        },
      }
    },
  });

const isProductPage = () => {
    const location = useLocation();
    const url = location.pathname; // Get the current URL path
    const urlParts = url.split('/'); // Split the URL by slashes
    const lastUrlPart = urlParts[urlParts.length - 1]; // Get the last part of the URL
    // Check if the last URL part ends with ".html"
    // You can modify this condition based on your specific URL structure
    if (lastUrlPart.endsWith('.html')) {
      const productKey = lastUrlPart.replace('.html', ''); // Remove the ".html" extension
      // Perform any necessary checks or actions with the productKey
      console.log('Product Key:', productKey);
  
      return true; // It's a product page
    }
  
    return false; // It's not a product page
};

const isLandingPage = () => {
    const url = location.pathname; // Get the current URL path
    if(url.includes('/categories/')) {
        return true;
    }
    return false;
};

const isCategoryPage = () => {
    return location.pathname === '/categories';
};

const isHomePage = () => {
    return location.pathname === '/';
};

const isCartPage = () => {
    return location.pathname === '/cart';
}

const isCheckoutPage = () => {
    return location.pathname === '/checkout';
}

const isSearchPage = () => {
    return location.pathname === '/search';
}

const isCreateAccountPage = () => {
    return location.pathname === '/bee-create-account';
}

const isSignInAccountPage = () => {
    return location.pathname === '/bee-signin-account';
}

const isAccountInformationPage = () => {
    return location.pathname === '/account-information';
}

const Main = props => {
    const { children, isMasked } = props;
    const location = useLocation();
    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;
    const [value, setValue] = React.useState(0);

    const {
        isEmpty,
        totalItems,
    } = useCart();

    // const {
    //     itemCount,
    // } = useCartTrigger({
    //     queries: {
    //         getItemCountQuery: GET_ITEM_COUNT_QUERY
    //     }
    // });

    const onProductPage = isProductPage();
    const onLandingage = isLandingPage();
    const onCategoryPage = isCategoryPage();
    const onHomePage = isHomePage();
    const onCartPage = isCartPage();
    const onSearchPage = isSearchPage();
    const onCheckoutPage = isCheckoutPage();
    const onCreateAccountPage = isCreateAccountPage();
    const onSignInAccountPage = isSignInAccountPage();
    const onAccountInformationPage = isAccountInformationPage();

    const pagesArray = [onHomePage, onAccountInformationPage, onSearchPage];

    const itemCountDisplay = totalItems > 9 ? '9+' : totalItems;
    const maybeItemCounter = totalItems ? (
        <span className={classes.counter} data-cy="CartTrigger-counter">
            {itemCountDisplay}
        </span>
    ) : null;

    // const itemCountDisplay = itemCount > 9 ? '9+' : itemCount;
    // const maybeItemCounter = itemCount ? (
    //     <span className={classes.counter} data-cy="CartTrigger-counter">
    //         {itemCountDisplay}
    //     </span>
    // ) : null;
    
    // Set the value based on the current page
    useEffect(() => {
        if (location.pathname === '/') {
            setValue(0);
        } else if (location.pathname === '/search') {
            setValue(1);
        } else if (location.pathname === '/product-categories') {
            setValue(2);
        } else if (location.pathname === '/cart') {
            setValue(3);
        } else if (location.pathname === '/account-information') {
            setValue(4);
        } else {
            setValue(0); // Set a default value for other pages
        }
    }, [location.pathname]);

    useScrollLock(isMasked);
    console.log("Value == ", value);
    return (
        <main className={rootClass}>
            <GTMEvents/>
            <Header />
            <div className={pageClass}>{children}</div>
            <Footer />
                {/* <Paper sx={{ position: 'fixed', bottom: "70px", left: 0, right: 0, background: "transparent", zIndex: "9999" }} elevation={0}>
                    {!(onHomePage) && (
                        <FloatingCart/>
                    )}
                </Paper> */}
                {!isDesktop && pagesArray.includes(true) && (
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: '99999999' }} elevation={3}>
                        {/* <ThemeProvider theme={theme}> */}
                            <CustomBottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            >
                                <BottomNavigationAction component={Link} to="/" label={
                                    <span>
                                        <FormattedMessage
                                            id="bottomNavigation.homePage"
                                            defaultMessage="Home"
                                        />
                                    </span>
                                } icon={
                                    <Icon name="home" fontSize="20px" color="#000" selectedColor="#000" selected={true} />
                                    // <img
                                    //     height='20px'
                                    //     src={AddressesIcon}
                                    //     alt='Category'
                                    //     title='Category'
                                    //     width='25px'
                                    // />
                                } />
                                <BottomNavigationAction component={Link} to="/search" label={
                                    <span>
                                        <FormattedMessage
                                            id="bottomNavigation.search"
                                            defaultMessage="Search"
                                        />
                                    </span>
                                } icon={
                                    <Icon name="search" fontSize="20px" color="#000" selectedColor="#000" selected={true} />
                                    // <img
                                    //     height='20px'
                                    //     src={SearchIcon}
                                    //     alt='Search'
                                    //     title='Search'
                                    //     width='22px'
                                    // />
                                } />
                                <BottomNavigationAction component={Link} to="/product-categories" label={
                                    <span>
                                        <FormattedMessage
                                            id="bottomNavigation.categories"
                                            defaultMessage="Categories"
                                        />
                                    </span>
                                } icon={
                                    <Icon name="category" fontSize="20px" color="#000" selectedColor="#000" selected={true} />
                                    // <img
                                    //     height='20px'
                                    //     src={CategoryIcon}
                                    //     alt='Category'
                                    //     title='Category'
                                    //     width='20px'
                                    // />
                                } />
                                <BottomNavigationAction component={Link} to="/cart" label={
                                    <span>
                                        <FormattedMessage
                                            id="bottomNavigation.cart"
                                            defaultMessage="Cart"
                                        />
                                    </span>
                                } icon={
                                    <StyledBadge badgeContent={maybeItemCounter} color="primary">
                                        <Icon name="bag" fontSize="20px" color="#000" selectedColor="#000" selected={true} />
                                        {/* <img
                                            height='20px'
                                            src={BagIcon}
                                            alt='Search'
                                            title='Search'
                                            width='25px'
                                        /> */}
                                    </StyledBadge>
                                } />
                                <BottomNavigationAction component={Link} to="/account-information" label={
                                    <span>
                                        <FormattedMessage
                                            id="bottomNavigation.account"
                                            defaultMessage="Account"
                                        />
                                    </span>
                                } icon={
                                    <Icon name="user" fontSize="20px" color="#000" selectedColor="#000" selected={true} />
                                    // <img
                                    //     height='20px'
                                    //     src={AccountIcon}
                                    //     alt='Search'
                                    //     title='Search'
                                    //     width='25px'
                                    // />
                                } />
                            </CustomBottomNavigation>
                        {/* </ThemeProvider> */}
                    </Paper>
                )}
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};
