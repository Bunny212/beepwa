import React, { Fragment, useEffect } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './homePage.module.css';
import HomePageSlider from '../HomePageSlider/homePageSlider';
import FeaturedCategories from '../FeaturedCategories/featuredCategories';
import ProductTabs from '../ProductTabs/productTabs';
import MiddleSectionHomePage from '../MiddleSectionHomePage/middleSectionHomePage';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import DesktopNotice from '../DesktopNotice/desktopNotice';
import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';
import { useCart } from 'react-use-cart';

const ProfilePage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const rootClass = isDesktop ? classes.desktopRoot : classes.root;

    const {
        itemCount,
    } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });

    const {
        emptyCart
    } = useCart();

    useEffect(() => {
        if (itemCount === 0) {
            emptyCart(); // Empty local cart
        }
    }, [itemCount]);

    let pageContent = (
        <Fragment>
            <HomePageSlider/>
            <FeaturedCategories/>
            <ProductTabs tabNumber={1} />
            <ProductTabs tabNumber={2} />
            <MiddleSectionHomePage/>
            {/* <RecommendedForYou/> */}
        </Fragment>
    );

    let pageContentNotice = (
        <Fragment>
            <DesktopNotice />
        </Fragment>
    );

    return (
        <div className={rootClass}>
            {pageContent}
            {/* {isDesktop ? (
                pageContentNotice
            ) : (
                pageContent
            )} */}
        </div>
    );
};

export default ProfilePage;
