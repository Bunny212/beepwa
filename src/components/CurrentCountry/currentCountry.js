import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { node, shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from "react-router-dom";
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './currentCountry.module.css';
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
import flags from './Flags';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useQuery } from '@apollo/client';
import { GET_BEESLINE_COUNTRIES } from './currentCountry.qql';

import Button from '@magento/venia-ui/lib/components/Button';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';

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
    height: '22px',
    width: '22px',
    marginTop: '-5px',
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

const getDialogContent = (showLanguages, countriesList, languagesList) => {
    return showLanguages ? languagesList : countriesList;
};

/**
 * A component that show info icon.
 */
const CurrentCountry = props => {
    const { formatMessage } = useIntl();
    const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl'; // Use your logic to determine RTL
    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const [checked, setChecked] = React.useState(['']);
    const [selectedCountry, setSelectedCountry] = useState(''); // Default selected country
    const [selectedLanguage, setSelectedLanguage] = useState(''); // Default selected language
    const [selectedLanguageCode, setSelectedLanguageCode] = useState(''); // Default selected language Code
    const [selectedCountryUrl, setSelectedCountryUrl] = useState(''); // Default selected country url
    const [showLanguages, setShowLanguages] = useState(false); // Default show languages
    const [showList, setShowList] = useState(true); // Default show languages
    const [defaultCountry, setDefaultCountry] = useState('');
    const [defaultLanguage, setDefaultLanguage] = useState('');

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        if(!newOpen) {
            setShowList(true);
            setSelectedCountry('');
            setSelectedLanguage('');
        }
    };

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
      const handleCloseDialog = () => {
        setOpenDialog(false);
        setShowList(true);
        setSelectedCountry('');
        setSelectedLanguage('');
    };

    const openCountriesList = () => {
        if (isDesktop) {
          handleClickOpenDialog();
        } else {
          setOpen(true);
        }
        setShowLanguages(false);
    };

    const handleChangeCountry = (event) => {
        const countryCode = event.target.value;
        const country = beeslineCountries.countries.find((c) => c.country_code === countryCode);
        if (country) {
            setSelectedCountry(country);
            setSelectedCountryUrl(country.url);
            setDefaultLanguage(country.languages[0]?.code);
            //setShowLanguages(true);
            setShowList(true);
            setSelectedLanguage('');
        }
    };

    const __handleChangeCountry = (event) => {
        const countryCode = event.target.value;
        const country = beeslineCountries.countries.find((c) => c.country_code === countryCode);
        console.log("country = ", country);
        console.log("countryCode = ", countryCode);
        if (country) {
            setSelectedCountry(countryCode);
            if(country.url) {
                window.open(country.url, '_self');
            }
        }
    };

    const handleChangeLanguage = (event) => {
        const languageCode = event.target.value;
        const language = selectedCountry.languages.find((c) => c.code === languageCode);
        if (language) {
            setSelectedLanguage(language);
            setSelectedLanguageCode(languageCode);
            if(selectedCountry && selectedCountryUrl) {
                setShowList(true);
                // Check if the URL already contains a query string
                const separator = selectedCountryUrl.includes('?') ? '&' : '?';
                // Append the language code as a query parameter
                const urlWithLanguage = `${selectedCountryUrl}${separator}lng=${languageCode}`;
                //setShowLanguages(true);
                //window.open(urlWithLanguage, '_self');
            }
        }
    };

    const handleChangeCountryAction = () => {
        if(selectedCountry && selectedLanguage && selectedCountryUrl) {
            const language = selectedCountry.languages.find((c) => c.code === selectedLanguage.code);
            // Check if the URL already contains a query string
            const separator = selectedCountryUrl.includes('?') ? '&' : '?';
            // Append the language code as a query parameter
            const urlWithLanguage = `${selectedCountryUrl}${separator}lng=${language.code}`;
            window.open(urlWithLanguage, '_self');
        }
    };

    const handleShowCountries = () => {
        setShowLanguages(false);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleSelectCountry = () => {
        setShowList(false);
        setShowLanguages(false);
    };

    const handleSelectlanguage = () => {
        setShowList(false);
        setShowLanguages(true);
    };

    const { loading, error, data } = useQuery(GET_BEESLINE_COUNTRIES, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const beeslineCountries = useMemo(() => {
        if (data && data.beeslineCountries) {
            return data.beeslineCountries;
        }
        return null;
    }, [data]);

    useEffect(() => {
        // Check if beeslineCountries data is available
        if (beeslineCountries && beeslineCountries.default_country_code) {
            //setSelectedCountry(beeslineCountries.default_country_code);
            setDefaultCountry(beeslineCountries.default_country_code);
        }
    }, [beeslineCountries]);

    const getDialogTitle = () => {
        if(!selectedCountry) {
            return (
                <Typography sx={{ p: 0, color: 'text.secondary', fontWeight: 'Bold', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>           
                    <FormattedMessage id="selectCountry" defaultMessage="Select Country" />
                </Typography>
              );
        }
        if (showLanguages) {
          return (
            <Typography sx={{ p: 0, color: 'text.secondary', fontWeight: 'Bold', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>           
                <FormattedMessage id="selectLanguage" defaultMessage="Select Language" />
                {!isDesktop && (
                    <img
                        //onClick={handleShowCountries}
                        src={flags[selectedCountry.country_code.toLowerCase()]}
                        alt={selectedCountry.country_name}
                        style={{ width: '25px', aspectRatio: '1/1', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
                    />
                )}
            </Typography>
          );
        } else if(selectedCountry) {
          return (
            <Typography sx={{ p: 0, color: 'text.secondary', fontWeight: 'Bold', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormattedMessage id="selectCountry" defaultMessage="Select Country" />
                {!isDesktop && (
                    <img
                        //onClick={handleShowCountries}
                        src={flags[selectedCountry.country_code.toLowerCase()]}
                        alt={selectedCountry.country_name}
                        style={{ width: '25px', aspectRatio: '1/1', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
                    />
                )}
            </Typography>
          );
        }
    };

    const _getDialogTitle = () => {
        if (showLanguages && selectedCountry) {
          return (
            <Typography sx={{ p: 0, color: 'text.secondary', fontWeight: 'Bold', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>           
                <FormattedMessage id="selectLanguage" defaultMessage="Select Language" />
              <img
                onClick={handleShowCountries}
                src={flags[selectedCountry.country_code.toLowerCase()]}
                alt={selectedCountry.country_name}
                style={{ width: '25px', aspectRatio: '1/1', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
                />
            </Typography>
          );
        } else {
          return (
            <Typography sx={{ p: 0, color: '#000', fontWeight: '500' }}>
                <FormattedMessage id="selectCountry" defaultMessage="Select Country" />
            </Typography>
          );
        }
    };

    // if (loading && beeslineCountries && beeslineCountries.countries) {
    //     return (
    //         <StyledAvatar>
    //             <ImageWrapper>
    //                 <Skeleton variant="circular" width={25} height={25} />;
    //             </ImageWrapper>
    //         </StyledAvatar>
    //     );
    // }

    if (error) {
        return <ErrorContent errorMessage={error.message} />;
    }

    let countriesList = null;
    if (beeslineCountries && beeslineCountries.countries && beeslineCountries.countries.length > 0) {
        countriesList = (
            <RadioGroup value={selectedCountry ? selectedCountry.country_code : defaultCountry} onChange={handleChangeCountry}>
                {beeslineCountries.countries.map((country, index) => {
                    let code = country.country_code.toLowerCase();
                    let statusLabel = '';
                    let normalizedStatus = country.status.toLowerCase();
                    let currentCountry = selectedCountry ? selectedCountry.country_code : defaultCountry;
                    switch (normalizedStatus) {
                        case 'coming soon':
                            statusLabel = formatMessage({ id: 'comingSoonLabel' });
                        break;
                        case 'open':
                            statusLabel = formatMessage({ id: 'openLabel' });
                        break;
                        case 'closed':
                            statusLabel = formatMessage({ id: 'closedLabel' });
                        break;
                        default:
                            statusLabel = country.status;
                    }
                    return (
                        <Fragment key={index}>
                            <FormControlLabel
                                sx={{ position: 'relative', ...(isRTL && { marginLeft: '16px', marginRight: '-11px' }) }}
                                value={country.country_code}
                                control={<Radio style={{ color: 'black' }} />}
                                label={
                                    <div className={classes.countryList}>
                                        <img
                                            src={flags[code]}
                                            alt={country.country_name}
                                            style={{ width: '25px', aspectRatio: '1/1', borderRadius: '50%', objectFit: 'cover' }}
                                            />
                                        {/* {country.country_name} {country.status === 'Coming Soon' && `(${country.status})`} */}
                                        {country.country_name}{' '}
                                        {country.status === 'Coming Soon' && (
                                            <span className={classes.comingSoonLabel}>{`(${statusLabel})`}</span>
                                        )}
                                        {/* {country.country_name}{' '}
                                        {country.status === 'Coming Soon' && (
                                            <div style={{ position: 'absolute', right: '0' }}>
                                                <img
                                                    src={ComingSoonIcon}
                                                    alt={country.status} />
                                            </div>
                                        )} */}
                                    </div>
                                }
                                disabled={country.status === 'Coming Soon'}
                                checked={currentCountry === country.country_code}
                            />
                            {index < beeslineCountries.countries.length - 1 && <Divider />}
                        </Fragment>
                    );
                })}
            </RadioGroup>
        );
    }

    let languagesList = null;
    if (selectedCountry) {
        languagesList = (
            <RadioGroup value="" onChange={handleChangeLanguage}>
                {selectedCountry.languages.map((language, index) => {
                    let code = language.code;
                    let languageLabel = '';
                    let normalizedLabel = language.label.toLowerCase();
                    switch (normalizedLabel) {
                        case 'arabic':
                            languageLabel = formatMessage({ id: 'arabicLngLabel' });
                        break;
                        case 'english':
                            languageLabel = formatMessage({ id: 'englishLngLabel' });
                        break;
                        default:
                            languageLabel = language.label;
                    }
                    return (
                        <Fragment key={index}>
                            <FormControlLabel
                                sx={{ position: 'relative', ...(isRTL && { marginLeft: '16px', marginRight: '-11px' }) }}
                                value={code}
                                control={<Radio />}
                                label={
                                    <div className={classes.countryList}>
                                        {`${languageLabel}`}
                                    </div>
                                }
                                checked={selectedLanguageCode === language.code}
                            />
                            {index < selectedCountry.languages.length - 1 && <Divider />}
                        </Fragment>
                    );
                })}
            </RadioGroup>
        );
    }

    let dialogContent = getDialogContent(showLanguages, countriesList, languagesList);

    return (
        <>
            <LinkButton
                aria-label='New'
                onClick={openCountriesList}
                data-cy="current-country"
            >
                {defaultCountry ? (
                    <StyledAvatar>
                        <ImageWrapper>
                            <img
                                src={flags[defaultCountry.toLowerCase()]}
                                alt={beeslineCountries.default_country_name}
                                style={{ width: '25px', aspectRatio: '1/1', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        </ImageWrapper>
                    </StyledAvatar>
                ) : (
                    beeslineCountries && beeslineCountries.countries ? (
                        // Render a loading state or fallback UI when defaultCountry is null
                        <StyledAvatar>
                            <ImageWrapper>
                                {/* Display a loading indicator */}
                                <Skeleton variant="circular" width={25} height={25} />;
                            </ImageWrapper>
                        </StyledAvatar>
                    ) : null
                )}
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
                    <Typography sx={{ p: 2, color: 'text.secondary', fontWeight: 'Bold' }}>{getDialogTitle()}</Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    {!showList ? (
                        dialogContent
                    ) : (
                        <>
                            <List
                                sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <ListItemButton sx={{ padding: '8px 0px' }} onClick={handleSelectCountry}>
                                    <ListItemIcon>
                                        <PublicIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<FormattedMessage id="selectCountry" defaultMessage="Select Country" />} secondary={selectedCountry.country_name} />
                                </ListItemButton>
                                <Divider />
                                <ListItemButton disabled={!selectedCountry} sx={{ padding: '8px 0px' }} onClick={handleSelectlanguage}>
                                    <ListItemIcon>
                                        <LanguageIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<FormattedMessage id="selectLanguage" defaultMessage="Select Language" />} secondary={selectedLanguage.label} />
                                </ListItemButton>
                            </List>
                            {/* {selectedCountry && selectedLanguage ? ( */}
                            <Button onClick={handleChangeCountryAction} className={classes.actionBtn} variant="contained" size="small" disabled={!selectedCountry || !selectedLanguage}>
                                <FormattedMessage id="confirmCountrytext" defaultMessage="Confirm" />
                            </Button>
                            {/* ) : null} */}
                        </>
                    )}
                </StyledBox>
            </SwipeableDrawer>
            <Dialog
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
                aria-labelledby="countries-dialog-title"
                maxWidth="md"
                open={openDialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="countries-dialog-title">
                    <Typography sx={{ p: 0, color: 'text.secondary', fontWeight: 'Bold' }}>{getDialogTitle()}</Typography>
                </DialogTitle>
                <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{minWidth: '500px'}}>
                    {!showList ? (
                        dialogContent
                    ) : (
                        <>
                            <List
                                sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <ListItemButton sx={{ padding: '8px 0px' }} onClick={handleSelectCountry}>
                                    <ListItemIcon>
                                        <PublicIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<FormattedMessage id="selectCountry" defaultMessage="Select Country" />} secondary={selectedCountry.country_name} />
                                </ListItemButton>
                                <Divider />
                                <ListItemButton sx={{ padding: '8px 0px' }} onClick={handleSelectlanguage}>
                                    <ListItemIcon>
                                        <LanguageIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<FormattedMessage id="selectLanguage" defaultMessage="Select Language" />} secondary={selectedLanguage.label} />
                                </ListItemButton>
                            </List>
                            {/* {selectedCountry && selectedLanguage ? ( */}
                            <Button onClick={handleChangeCountryAction} className={classes.actionBtn} variant="contained" size="small" disabled={!selectedCountry || !selectedLanguage}>
                                <FormattedMessage id="confirmCountrytext" defaultMessage="Confirm" />
                            </Button>
                            {/* ) : null} */}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

CurrentCountry.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default CurrentCountry;
