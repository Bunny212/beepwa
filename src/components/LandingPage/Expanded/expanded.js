import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';
import { useParams, useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import 'swiper/swiper-bundle.css';

import categoryImage from '../Images/category-image.jpg';
import { ErrorOutline } from '@mui/icons-material';
import defaultClasses from './expanded.module.css';
import { isNonEmptyArray } from '@apollo/client/utilities';
import Skeleton from '@mui/material/Skeleton';
import ProductBox from '../../ProductBox/productBox';
import GetDeviceType from '../../GetDeviceType/getDeviceType';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_PRODUCTS_DATA } from '../queries/GetCategoryProductsData';
import { sendViewItemListEvent } from '../../App/GTMEvents';

const OUT_OF_STOCK_CODE = 'OUT_OF_STOCK';
const IN_STOCK_CODE = 'IN_STOCK';

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

const Expanded = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    //const [isScrolling, setIsScrolling] = useState(false);
    const [eventSent, setEventSent] = useState(false);
    const { name = "", uid } = useParams();
    const location = useLocation();
    const { parentCatName, categoryId, subCatName, categoryDescp, imageUrl, mobImageUrl, viewAll } = location.state || {};

    // useEffect(() => {
    //     console.log("Page loaded, run once");
    //     setIsScrolling(true);
    // }, []); // Empty dependency array ensures it runs only
    
    // const handleTouchScroll = (event) => {
    //     setIsScrolling(true);
    //     // Your touch scroll logic here
    //     console.log('Touch event detected');
    // };

    // useEffect(() => {
    //     //window.addEventListener('scroll', handleScroll);
    //     window.addEventListener('touchmove', handleTouchScroll);
    //     //document.body.addEventListener('touchmove', handleBodyTouchMove);
    
    //     return () => {
    //       //window.removeEventListener('scroll', handleScroll);
    //       window.removeEventListener('touchmove', handleTouchScroll);
    //       //document.body.removeEventListener('touchmove', handleBodyTouchMove);
    //     };
    // }, []);

    const { loading, error, data, refetch } = useQuery(GET_CATEGORY_PRODUCTS_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            uid: uid
        },
    });

    useEffect(() => {
        if (!loading && data && data.getCategoryProducts) {
            const gtmViewItemList = {
                currency: data.getCategoryProducts.currency,
                item_list_id: data.getCategoryProducts.category_info.uid,
                item_list_name: data.getCategoryProducts.category_info.name,
                country: data.getCategoryProducts.country,
                items: data.getCategoryProducts.items.map((item, index) => ({
                    index: index + 1, // Index starts from 1
                    item_id: item.id,
                    quantity: item.stock_status === OUT_OF_STOCK_CODE ? 0 : 1, // Assuming quantity is always 1
                    price: item.price_range.maximum_price.final_price.value,
                    discount: Math.ceil(item.price_range.maximum_price.discount.percent_off), // Assuming no discount for now
                    item_name: item.name,
                    // Assuming other item details are not available in the provided data
                    item_brand: data.getCategoryProducts.brand,
                    item_category: data.getCategoryProducts.category_info.name,
                    item_list_id: data.getCategoryProducts.category_info.uid,
                    item_list_name: data.getCategoryProducts.category_info.name,
                    item_variant: ''
                }))
            };
            sendViewItemListEvent(gtmViewItemList);
        }
    }, [loading, data]);

    const tabsData = useMemo(() => {
        if (data && data.getCategoryProducts) {
            return data.getCategoryProducts;
          }
          return null;
    }, [data]);

    // Use isLoading to track the loading state
    const isLoading = loading || !data;
    const isError = error;

    //const tabsData = data?.getCategoryProducts;

    // useEffect(() => {
    //     refetch();
    // }, []);

    const [selectedType, setSelectedType] = useState('All');

    const handleTabChange = (_, newValue) => {
        setSelectedType(newValue);
    };

    // const _GridItems = ({ data, classes }) => {
    //     const filteredData = useMemo(() => {
    //         if (selectedType === 'All') {
    //             return data.items;
    //         } else {
    //             return data.items.filter(item => item.sale_type === selectedType);
    //         }
    //     }, [data.items, selectedType]);
    
    //     return (
    //         isNonEmptyArray(filteredData) &&
    //         filteredData.map((item, itemIndex) => (
    //             <Grid key={itemIndex} item xs={6} sm={6} md={4} lg={3} xl={2}>
    //                 <ProductBox item={item} />
    //             </Grid>
    //         ))
    //     );
    // };

    const PlaceholderContent = ({ classes }) => {
        return (
            <Box sx={{ margin: '30px 0 0' }}>
                <Grid sx={{ flexGrow: 1, padding: '0px' }} container spacing={2}>
                    {Array(4).fill().map((_, index) => (
                        <Grid key={index} item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Skeleton variant="rounded" width="100%" height={200} />
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Skeleton height={10} style={{ marginTop: 6 }} />
                            </Typography>
                            <Box>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    <Skeleton height={10} width="60%" />
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    const filteredData = selectedType === 'All'
        ? data && data.getCategoryProducts ? data && data.getCategoryProducts.items : null
        : data && data.getCategoryProducts ? data.getCategoryProducts.items.filter(item => item.sale_type === selectedType) : null;

    return (
        <Fragment>
            <div className={classes.root}>
                {tabsData?.category_info?.imageUrl || tabsData?.category_info?.mobImageUrl ? (
                    <Card sx={{ maxWidth: '100%', boxShadow: 'none', borderRadius: '6px' }}>
                        <CardMedia
                            sx={{ minHeight: isDesktop ? 400 : 210, height: isDesktop ? 'auto' : 210 }}
                            image={isDesktop ? tabsData.category_info.imageUrl : tabsData.category_info.mobImageUrl}
                            title="green iguana"
                        />
                    </Card>
                ) : (
                    (imageUrl || mobImageUrl) ? (
                        <Card sx={{ maxWidth: '100%', boxShadow: 'none', borderRadius: '6px' }}>
                            <CardMedia
                                sx={{ minHeight: isDesktop ? 400 : 210, height: isDesktop ? 'auto' : 210 }}
                                image={isDesktop ? imageUrl : mobImageUrl}
                                title="green iguana"
                            />
                        </Card>
                    ) : (
                        !viewAll ? (
                            <Card sx={{ maxWidth: '100%', boxShadow: 'none', borderRadius: '6px' }}>
                                <CardMedia
                                    sx={{ minHeight: isDesktop ? 400 : 210, height: isDesktop ? 'auto' : 210 }}
                                    image={categoryImage}
                                    title="green iguana"
                                />
                            </Card>
                        ) : null // Render null if neither imageUrl nor viewAll is true
                    )
                )}
                {parentCatName && (
                    <>
                        <br />
                        <Typography className={classes.robertFont} variant="h4">
                            {parentCatName}
                        </Typography>
                    </>
                )}
                {subCatName && (
                    <Typography className={classes.robertFont} variant="h6">
                        {subCatName}
                    </Typography>
                )}
                {categoryDescp && (
                    <>
                        <br />
                        <Typography className={classes.robertFont} variant="body2">
                            {categoryDescp}
                        </Typography>
                    </>
                )}
                {/* {isLoading ? (
                    // Render placeholder content while loading
                    <PlaceholderContent classes={classes} />
                ) : isError ? (
                    // Render error content if there's an error
                    <ErrorContent errorMessage={error.message} />
                ) : isNonEmptyArray(tabsData.items) ? ( */}
                {tabsData && (
                    <Box sx={{ margin: '30px 0 0' }}>
                        {tabsData && tabsData.show_tabs && tabsData.sale_category_uid === tabsData.sub_category_uid ? (
                            <Tabs
                                className={classes.tabs}
                                value={selectedType}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                                variant="fullWidth"
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: "#FFFFFF",
                                        top: 0,
                                        height: "100%",
                                        opacity: 1,
                                        zIndex: 0,
                                        borderRadius: "30px",
                                        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.29)",
                                        maxHeight: "35px",
                                        minHeight: "35px"
                                    }
                                }}
                                sx={{ margin: '0 0 15px' }}
                            >
                                <Tab disableRipple className={classes.tab} label={<FormattedMessage id="tab.all" />} value="All" />
                                <Tab disableRipple className={classes.tab} label={<FormattedMessage id="tab.bundles" />} value="bundle" />
                                <Tab disableRipple className={classes.tab} label={<FormattedMessage id="tab.discounts" />} value="simple" />
                            </Tabs>
                        ) : null}
                        <Grid sx={{ flexGrow: 1, padding: '0px' }} container spacing={2}>
                            {/* <GridItems data={tabsData} classes={classes} /> */}
                            {isNonEmptyArray(filteredData) && filteredData.map((item, itemIndex) => (
                                <Grid key={itemIndex} item xs={6} sm={6} md={4} lg={3} xl={2}>
                                    <ProductBox item={item} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
                 {/* ) : (
                     <ErrorContent errorMessage="No data available" />
                 )} */}
            </div>
        </Fragment>
    );
}

Expanded.propTypes = {
    classes: shape({ root: string })
};
Expanded.defaultProps = {};
export default Expanded;