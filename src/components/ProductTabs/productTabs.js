import React, { useMemo, useState, useEffect, Suspense } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { useHistory } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper'; // Import Swiper modules
import 'swiper/swiper-bundle.css';
import defaultClasses from './productTabs.module.css';
import { ErrorOutline } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import ProductBox from '../ProductBox/productBox';
import Icon from '../CustomIcons/CustomIcons';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import { useQuery } from '@apollo/client';
import { GET_TABS1_DATA, GET_TABS2_DATA } from './productTabs.qql';

SwiperCore.use([Autoplay]);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ padding: "15px 0px" }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `home-section1-tab-${index}`,
        'aria-controls': `home-section1-tabpanel-${index}`,
    };
}

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

const ProductTabs = props => {
    const {
        tabNumber
    } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const [value, setValue] = React.useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const history = useHistory();
    const defaultCount = 6;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const swiperConfig = {
        spaceBetween: 10,
        slidesPerView: isDesktop ? 5 : 1.7,
        centeredSlides: false,
        grabCursor: true,
        loop: false
    };

    const query = tabNumber === 1 ? GET_TABS1_DATA : GET_TABS2_DATA;
    const { loading, error, data, refetch } = useQuery(query, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const handleViewAllClick = ({ title, categoryInfo }) => {
        history.push({
            pathname: resourceUrl(`/expand/${categoryInfo.pathKey}/${categoryInfo.uid}`),
            state: {
                parentCatName: title,
                categoryId: categoryInfo.uid,
                subCatName: '',
                categoryDescp: categoryInfo.catDescp,
                imageUrl: categoryInfo.imageUrl,
                mobImageUrl: categoryInfo.mobImageUrl,
            },
        });
    };

    const tabsData = useMemo(() => {
        if(tabNumber === 1) {
            if (data && data.getTabs1) {
                return data.getTabs1;
            }
        }else {
            if (data && data.getTabs2) {
                return data.getTabs2;
            }
        }
        return null;
    }, [data, tabNumber]);

    //const tabsData = tabNumber === 1 ? data?.getTabs1 : data?.getTabs2;

    // Use isLoading to track the loading state
    const isLoading = loading || !data;
    const isError = error;

    // if (!data) {
    //     return Array.from({ length: 2 }, (_, index) => (
    //         <Tab
    //             key={index}
    //             disableRipple
    //             className={classes.tab}
    //             sx={{ '&.Mui-selected': { color: 'black' } }}
    //             label={<Skeleton variant="text" height={10} width={60} />}
    //         />
    //     ))
    // }

    if (isError) {
        return <ErrorContent errorMessage={error.message} />;
    }

    let tabFallBack = (
        Array.from({ length: 2 }, (_, index) => (
            <Tab
                key={index}
                disableRipple
                className={classes.tab}
                sx={{ '&.Mui-selected': { color: 'black' } }}
                label={<Skeleton variant="text" height={10} width={60} />}
            />
        ))
    );

    let tabContentFallBack = (
        <Swiper {...swiperConfig}>
            {Array.from({ length: 5 }, (_, index) => (
                <SwiperSlide key={index}>
                    <Skeleton variant="rounded" width="100%" height={250} />
                    <Skeleton height={10} style={{ marginTop: 6 }} />
                    <Skeleton height={10} width="60%" />
                </SwiperSlide>
            ))}
        </Swiper>
    );

    let tabsContent = (
        <>
            {tabsData && (
                <Box className={classes.box} sx={{ width: '100%' }}>
                    <Suspense fallback={tabFallBack}>
                        <Box className={classes.tabBox} sx={{ borderBottom: 1, borderColor: 'divider', '&.MuiBox-root': { padding: '0' } }}>
                            <Tabs className={classes.tabs} value={value} onChange={handleChange} TabIndicatorProps={{
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
                            }} aria-label="basic tabs example">
                                {/* {isLoading ? (
                                // Render skeleton tabs while loading
                                Array.from({ length: 2 }, (_, index) => (
                                    <Tab
                                        key={index}
                                        disableRipple
                                        className={classes.tab}
                                        sx={{ '&.Mui-selected': { color: 'black' } }}
                                        label={<Skeleton variant="text" height={10} width={60} />}
                                    />
                                ))
                            ) : ( */}
                                {tabsData && tabsData.map((tab, index) => (
                                    <Tab
                                        key={index}
                                        disableRipple
                                        className={classes.tab}
                                        sx={{ '&.Mui-selected': { color: 'black' } }}
                                        label={tab.title}
                                        {...a11yProps(index)}
                                    />
                                ))}
                                {/* )} */}
                            </Tabs>
                        </Box>
                    </Suspense>
                    {/* {isLoading ? (
                    // Render placeholder content while loading
                    <Box sx={{ margin: '10px 0' }}>
                        <Swiper {...swiperConfig}>
                            {Array.from({ length: 5 }, (_, index) => (
                                <SwiperSlide key={index}>
                                    <Skeleton variant="rounded" width="100%" height={250} />
                                    <Skeleton height={10} style={{ marginTop: 6 }} />
                                    <Skeleton height={10} width="60%" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                ) : isError ? (
                    // Render error content if there's an error
                    <ErrorContent errorMessage={error.message} />
                ) : ( */}
                    {tabsData && tabsData.map((tab, index) => (
                        <Suspense fallback={tabContentFallBack}>
                            <TabPanel key={index} value={value} index={index}>
                                <Box sx={{ margin: '0' }}>
                                    <Swiper {...swiperConfig}>
                                        {tab.items.map((item, itemIndex) => (
                                            <SwiperSlide key={itemIndex}>
                                                <ProductBox item={item} />
                                            </SwiperSlide>
                                        ))}
                                        {tab.count > defaultCount && (
                                            <SwiperSlide className={classes.viewAllBtn} onClick={() => handleViewAllClick({ title: tab.title, categoryInfo: tab.category_info })}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                    <span className={classes.viewAllIconBox}>
                                                        <Icon name="angleRightSmall" fontSize="20px" height="20px" color="#000" selectedColor="#000" selected={true} />
                                                    </span>
                                                    <span className={classes.viewAllText}>View all ({tab.count})</span>
                                                </Box>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                </Box>
                            </TabPanel>
                        </Suspense>
                    ))}
                    {/* )} */}
                </Box>
            )}
        </>
    );

    return (
        <div className={classes.root}>
            {tabsContent}
        </div>
    );
};

export default ProductTabs;
