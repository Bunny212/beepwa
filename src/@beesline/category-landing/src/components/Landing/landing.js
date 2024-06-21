import React, { Fragment, useEffect } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';
import { Link, useParams, useLocation } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
// import Button from '@magento/venia-ui/lib/components/Button';
import Image from '@magento/venia-ui/lib/components/Image';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { ErrorOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import NewIcon from '../Icons/NewIcon.svg';
import DealsIcon from '../Icons/DealsIcon.svg';
import RoutinesIcon from '../Icons/RoutinesIcon.svg';
import Top10Icon from '../Icons/Top10Icon.svg';
import CategoryIcon from '../Icons/CategoryIcon.svg';
import SkinIcon from '../Icons/SkinIcon.svg';
import IncIcon from '../Icons/IncIcon.svg';
import SeasonIcon from '../Icons/SeasonIcon.svg';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_QUICK_ACCESS_DATA } from '../../queries/GetQuickAccessData';
import { GET_CATEGORY_SHOP_BY_DATA } from '../../queries/GetShopByData';
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

const getTemplatePath = (template) => {
    switch (template) {
        case 'main':
            return '/categories/categoryinner/';
        case 'top10':
            return '/categories/top10/';
        case 'expanded':
            return '/categories/expanded/';
        default:
            return '/categories/categoryinner/';
    }
};

const QuickAccess = ({ data, classes }) => {
    if (!data || !data.getCategoryQuickAccessTabs) {
        return null; // Return null when there is no data
    }

    return (
        <Box sx={{ padding: '0 0 10px' }}>
            <Typography variant="h2" className={classes.heading}>
                Quick Access
            </Typography>
            <div className={classes.quickAccessList}>
                <List>
                    {data.getCategoryQuickAccessTabs.map((category) => (
                        <QuickAccessItem key={category.position} category={category} classes={classes} />
                    ))}
                </List>
            </div>
        </Box>
    );
};

const QuickAccessItem = ({ category, classes }) => (
    <ListItem key={category.position}>
        <Link
            aria-label={category.title}
            className={classes.link}
            to={{
                pathname: resourceUrl(getTemplatePath(category.template)),
                state: {
                    parentCatName: category.title,
                    subCatName: '',
                    categoryDescp: category.description,
                    imageUrl: category.imageUrl
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
            to={resourceUrl(getTemplatePath(category.template))}
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
            Quick Access
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
    return (
        <>
            <h2 className={classes.heading}>Shop by:</h2>
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
                        {isLoadingShopBy ? (
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
                        ) : (
                            // Render actual tabs from data
                            data.items.map((tab, index) => (
                                <Tab
                                    key={index}
                                    disableRipple
                                    className={classes.tab}
                                    sx={{ '&.Mui-selected': { color: 'black' } }}
                                    label={tab.title}
                                    {...a11yProps(index)}
                                />
                            ))
                        )}
                    </Tabs>
                </Box>
                {isLoadingShopBy ? (
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
                ) : (
                    // Render actual tab panels from data
                    <div>
                        {data.items.map((tab, index) => (
                            <TabPanel key={index} value={value} index={index}>
                                <List sx={{ width: '100%', padding: 0, bgcolor: 'background.paper' }}>
                                    {tab.category_id && (
                                        <ListItemButton component={Link} to={`/categories/allcategories/${tab.category_id}/0`} className={classes.listItemButton}>
                                            <ListItemIcon>
                                                <Image
                                                    classes=''
                                                    height='36px'
                                                    src={CategoryIcon}
                                                    alt='Category'
                                                    title='Category'
                                                    width='36px'
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary="Sub category" secondary={`Choose from a list of ${tab.title} sub categories`} />
                                        </ListItemButton>
                                    )}
                                    {tab.concern_id && (
                                        <ListItemButton component={Link} to={`/categories/allcategories/${tab.concern_id}/0`} className={classes.listItemButton}>
                                            <ListItemIcon>
                                                <Image
                                                    classes=''
                                                    height='38px'
                                                    src={SkinIcon}
                                                    alt='Skin'
                                                    title='Skin'
                                                    width='38px'
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary="Skin Concern" secondary={`Shop by various ${tab.title} conditions (i.e. acne)`} />
                                        </ListItemButton>
                                    )}
                                </List>
                            </TabPanel>
                        ))}
                    </div>
                )}
            </Box>
        </>
    );
};

const CategoryLanding = props => {
    const [value, setValue] = React.useState(0);
    //const { id = "0" } = useParams();
    const id = 65;
    const location = useLocation();
    const classes = mergeClasses(defaultClasses, props.classes);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { loading: loadingQuickAccess, error: errorQuickAccess, data: dataQuickAccess, refetch: refetchQuickAccess } = useQuery(GET_CATEGORY_QUICK_ACCESS_DATA);
    const { loading: loadingShopBy, error: errorShopBy, data: dataShopBy, refetch: refetchShopBy } = useQuery(GET_CATEGORY_SHOP_BY_DATA);

    // Use isLoading to track the loading state
    const isLoadingQuickAccess = loadingQuickAccess || !dataQuickAccess;
    const isErrorQuickAccess = errorQuickAccess;

    const isLoadingShopBy = loadingShopBy || !dataShopBy;
    const isErrorShopBy = errorShopBy;
    const tabsData = dataShopBy?.getCategoryShopByTabs;

    useEffect(() => {
        refetchQuickAccess();
        refetchShopBy();
    }, []);

    if (isErrorQuickAccess) {
        return <ErrorContent errorMessage={errorQuickAccess.message} />;
    }

    if (isErrorShopBy) {
        return <ErrorContent errorMessage={errorShopBy.message} />;
    }

    return (
        <Fragment>
            <div className={classes.root}>
                {isLoadingQuickAccess ? (
                    <QuickAccessPlaceHolderContent classes={classes} />
                ) : (
                    <QuickAccess data={dataQuickAccess} classes={classes} />
                )}
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
                {isLoadingShopBy ? (
                    <Button disabled className={classes.fullBtn} variant="contained" size="medium">
                        <Skeleton variant="text" height={15} width={120} />
                    </Button>
                ) : (
                    <Button component={Link} to={{
                        pathname: resourceUrl(`/categories/allcategories/${tabsData.viewallcat_id}/1`),
                        state: { headerTitle: 'Categories' }
                    }} className={classes.fullBtn} variant="contained" size="medium">View all categories</Button>
                )}
            </Paper>
        </Fragment>
    );
}

CategoryLanding.propTypes = {
    classes: shape({ root: string })
};
CategoryLanding.defaultProps = {};
export default CategoryLanding;