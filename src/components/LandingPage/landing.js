import React, { Fragment, useMemo } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useLocation } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
// import Button from '@magento/venia-ui/lib/components/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { ErrorOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CategoriesIcon from './Icons/categories.svg';
import faceBodyConcernIcon from './Icons/face_body_concern.svg';
import hairConcernIcon from './Icons/hair_concern.svg';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_QUICK_ACCESS_DATA } from './queries/GetQuickAccessData';
import { GET_CATEGORY_SHOP_BY_DATA } from './queries/GetShopByData';
import defaultClasses from './landing.module.css';

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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const BeeTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: '#000000',
    '&:hover': {
        color: '#40a9ff',
        opacity: 1,
    },
    '&.Mui-selected': {
        color: '#ffffff',
        backgroundColor: '#ffc629',
        fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#ffc629',
    },
}));

const getTemplatePath = (template, category) => {
    switch (template) {
        case 'main':
            let mainUrl = `/category-details/${category.category_uid}`;
            return mainUrl;
        case 'top10':
            return '/categories/top10/';
        case 'expanded':
            let expandUrl = `/expand/${category.category_urlkey}/${category.category_uid}`;
            return expandUrl;
        default:
            let defaultUrl = `/category-details/${category.category_uid}`;
            return defaultUrl;
    }
};

const QuickAccess = ({ data, classes }) => {
    if (!data || !data.getCategoryQuickAccessTabs) {
        return null; // Return null when there is no data
    }
    return (
        <>
        <Box sx={{ padding: '0 0 10px' }}>
            <Typography variant="h2" className={classes.heading}>
                <FormattedMessage
                    id="productCategories.quickAccess"
                    defaultMessage="Quick Access"
                />
            </Typography>
            <div className={classes.quickAccessList}>
                <List>
                    {data && data.getCategoryQuickAccessTabs.map((category) => (
                        <QuickAccessItem key={category.position} category={category} classes={classes} />
                    ))}
                </List>
            </div>
        </Box>
        </>
    );
};

const QuickAccessItem = ({ category, classes }) => (
    <ListItem key={category.position}>
        <Link
            aria-label={category.title}
            className={classes.link}
            to={{
                pathname: resourceUrl(getTemplatePath(category.template, category)),
                state: {
                    parentCatName: category.title,
                    categoryId: category.category_uid,
                    subCatName: '',
                    categoryDescp: category.description,
                    imageUrl: category.imageUrl,
                    mobImageUrl: category.mobImageUrl
                }
            }}
            data-cy="Categories-quickAccess"
        >
            <img
                classes=""
                height="40px"
                src={category.iconUrl}
                alt={category.title}
                title={category.title}
                width="40px"
            />
        </Link>
        <Link
            aria-label={category.title}
            to={resourceUrl(getTemplatePath(category.template, category))}
            className={classes.link}
            data-cy="Categories-quickAccess"
        >
            {category.title}
        </Link>
    </ListItem>
);

const QuickAccessPlaceHolderContent = ({ classes }) => (
    <Box>
        <Typography variant="h2" className={classes.heading}>
            <FormattedMessage
                id="productCategories.quickAccess"
                defaultMessage="Quick Access"
            />
        </Typography>
        <div className={classes.quickAccessList}>
            <List>
                {Array.from({ length: 4 }, (_, index) => (
                    <ListItem>
                        <Link
                            aria-label=''
                            className={classes.link}
                            data-cy="Categories-quickAccess"
                        >
                            <Skeleton variant="circular" width={40} height={40} />
                        </Link>
                        <Link
                            aria-label=''
                            className={classes.link}
                            data-cy="Categories-quickAccess"
                            style={{ width: '100%' }}
                        >
                            <Skeleton variant="text" height={10} width="100%" sx={{ fontSize: '1rem' }} />
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    </Box>
);


const ShopBy = ({ data, classes, isLoadingShopBy, value, handleChange, isErrorShopBy, error, ErrorContent }) => {
    if (!data || !data.items) {
        return null; // Return null when there is no data
    }
    return (
        <>
        <h2 className={classes.heading}>
            <FormattedMessage
                id="productCategories.shopBy"
                defaultMessage="Shop by:"
            />
        </h2>
        <Box className={classes.box} sx={{ width: '100%', padding: '10px 0' }}>
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
                    {/* {isLoadingShopBy ? (
                            // Render skeleton tabs while loading
                            Array.from({ length: 3 }, (_, index) => (
                                <Tab
                                    key={index}
                                    disableRipple
                                    className={classes.tab}
                                    sx={{ '&.Mui-selected': { color: 'black' } }}
                                    label={<Skeleton variant="text" height={10} width={60} />}
                                />
                            ))
                        ) : ( */}
                    {data && data.items.map((tab, index) => (
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
            {/* {isLoadingShopBy ? (
                    // Render placeholder content while loading
                    <Box sx={{ margin: '10px 0' }}>
                        <List sx={{ width: '100%', padding: 0, bgcolor: 'background.paper' }}>
                            {Array.from({ length: 2 }, (_, index) => (
                                <ListItemButton className={classes.listItemButton}>
                                    <ListItemIcon>
                                        <Skeleton variant="rounded" width={40} height={40} />
                                    </ListItemIcon>
                                    <ListItemText primary={<Skeleton variant="text" width={120} />} secondary={<Skeleton height={20} variant="text" />} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Box>
                ) : isErrorShopBy ? (
                    // Render error content if there's an error
                    <ErrorContent errorMessage={error.message} />
                ) : ( */}
            {data && data.items.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    <List sx={{ width: '100%', padding: 0, bgcolor: 'background.paper' }}>
                        {tab.category_uid && (
                            <ListItemButton component={Link}
                                to={{
                                    pathname: resourceUrl(`/all-categories/${tab.category_uid}/0`),
                                    state: { headerTitle: '', categoryId: tab.category_uid, all: 0 }
                                }}
                                className={classes.listItemButton}>
                                <ListItemIcon>
                                    <img
                                        height='36px'
                                        src={CategoriesIcon}
                                        alt='Category'
                                        title='Category'
                                        width='36px'
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<FormattedMessage id="productCategories.subCategory" />}
                                    secondary={<FormattedMessage
                                        id="productCategories.chooseSubCategories"
                                        values={{ title: tab.title }} />}
                                />
                            </ListItemButton>
                        )}
                        {tab.concern_uid && (
                            <ListItemButton
                                component={Link}
                                to={{
                                    pathname: resourceUrl(`/all-categories/${tab.concern_uid}/0`),
                                    state: { headerTitle: '', categoryId: tab.concern_uid, all: 0 }
                                }}
                                className={classes.listItemButton}
                            >
                                <ListItemIcon>
                                    {tab.title && (
                                        (tab.concern_url_key.toLowerCase().replace(/\s/g, '') === 'face' || tab.concern_url_key.toLowerCase().replace(/\s/g, '') === 'body') && (
                                            <img
                                                height='38px'
                                                src={faceBodyConcernIcon}
                                                alt='Skin'
                                                title='Skin'
                                                width='38px'
                                            />
                                        )
                                    )}
                                    {tab.concern_url_key && tab.concern_url_key.toLowerCase().replace(/\s/g, '') === 'hair' && (
                                        <img
                                            height='38px'
                                            src={hairConcernIcon}
                                            alt='Hair'
                                            title='Hair'
                                            width='38px'
                                        />
                                    )}
                                </ListItemIcon>
                                {tab.title && tab.concern_url_key.toLowerCase().replace(/\s/g, '') === 'hair' ? (
                                    <ListItemText
                                        primary={<FormattedMessage id="productCategories.hairConcern" />}
                                        secondary={<FormattedMessage
                                            id="productCategories.shopByConditions"
                                            values={{ title: tab.title }}
                                        />} />
                                ) : (
                                    <ListItemText
                                        primary={<FormattedMessage id="productCategories.skinConcern" />}
                                        secondary={<FormattedMessage
                                            id="productCategories.shopByConditions"
                                            values={{ title: tab.title }}
                                        />} />
                                )}
                            </ListItemButton>
                        )}
                    </List>
                </TabPanel>
            ))}
            {/* )} */}
        </Box>
        </>
    );
};

const CategoryLanding = props => {
    const [value, setValue] = React.useState(0);
    const { formatMessage } = useIntl();
    //const { id = "0" } = useParams();
    const id = 65;
    const location = useLocation();
    const classes = mergeClasses(defaultClasses, props.classes);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { loading: loadingQuickAccess, error: errorQuickAccess, data: dataQuickAccess, refetch: refetchQuickAccess } = useQuery(GET_CATEGORY_QUICK_ACCESS_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });
    const { loading: loadingShopBy, error: errorShopBy, data: dataShopBy, refetch: refetchShopBy } = useQuery(GET_CATEGORY_SHOP_BY_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const quickAccessData = useMemo(() => {
        if (dataQuickAccess && dataQuickAccess) {
            return dataQuickAccess;
        }
        return null;
    }, [dataQuickAccess]);

    const tabsData = useMemo(() => {
        if (dataShopBy && dataShopBy.getCategoryShopByTabs) {
            return dataShopBy.getCategoryShopByTabs;
        }
        return null;
    }, [dataShopBy]);

    // Use isLoading to track the loading state
    const isLoadingQuickAccess = loadingQuickAccess || !dataQuickAccess;
    const isErrorQuickAccess = errorQuickAccess;

    const isLoadingShopBy = loadingShopBy || !dataShopBy;
    const isErrorShopBy = errorShopBy;
    //const tabsData = dataShopBy?.getCategoryShopByTabs;

    // useEffect(() => {
    //     refetchQuickAccess();
    //     refetchShopBy();
    // }, []);

    if (isErrorQuickAccess) {
        return <ErrorContent errorMessage={errorQuickAccess.message} />;
    }

    if (isErrorShopBy) {
        return <ErrorContent errorMessage={errorShopBy.message} />;
    }

    return (
        <Fragment>
            <div className={classes.root}>
                {/* {isLoadingQuickAccess ? (
                    <QuickAccessPlaceHolderContent classes={classes} />
                ) : ( */}
                <QuickAccess data={quickAccessData} classes={classes} />
                {/* )} */}
                <ShopBy
                    data={tabsData}
                    classes={classes}
                    isLoadingShopBy={isLoadingShopBy}
                    value={value}
                    handleChange={handleChange}
                    isErrorShopBy={isErrorShopBy}
                    error={errorShopBy}
                    ErrorContent={ErrorContent}
                />
            </div>
            <Paper sx={{ position: 'fixed', bottom: '10px', left: 0, right: 0, zIndex: '99999999', background: 'transparent', padding: '0 10px' }} elevation={0}>
                {/* {isLoadingShopBy ? (
                    <Button disabled className={classes.fullBtn} variant="contained" size="medium">
                        <Skeleton variant="text" height={15} width={120} />
                    </Button>
                ) : ( */}
                {tabsData && (
                    <Grid className={classes.tagsGrid} container spacing={2}>
                        <Grid item xs={6} sx={{ padding: '8px 0', textAlign: 'center' }}>
                            <Button component={Link} to={{
                                pathname: resourceUrl(`/all-categories/${tabsData.viewallcat_id}/1`),
                                state: { headerTitle: formatMessage({ id: "viewAllCategories.headerTitle" }), categoryId: tabsData.viewallcat_id, all: 1 }
                            }} className={classes.fullBtnGrid} variant="contained" size="medium">
                                <FormattedMessage id="viewAllCategories.buttonText" />
                            </Button>
                        </Grid>
                        <Grid item xs={6} sx={{ padding: '8px 0', textAlign: 'center' }}>
                            <Button component={Link} to={{
                                pathname: resourceUrl(`/expand/${tabsData.viewallcat_urlkey}/${tabsData.viewallcat_id}`),
                                state: { parentCatName: formatMessage({ id: "viewAllProducts.parentCatName" }), categoryId: tabsData.viewallcat_id, subCatName: '', categoryDescp: tabsData.viewallcat_descp, imageUrl: tabsData.viewallcat_img, mobImageUrl: tabsData.viewallcat_mob_img, viewAll: 1 }
                            }} className={classes.fullBtnGrid} variant="contained" size="medium">
                                <FormattedMessage id="viewAllProducts.buttonText" />
                            </Button>
                        </Grid>
                    </Grid>
                )}
                {/* )} */}
            </Paper>
        </Fragment>
    );
}

CategoryLanding.propTypes = {
    classes: shape({ root: string })
};
CategoryLanding.defaultProps = {};
export default CategoryLanding;