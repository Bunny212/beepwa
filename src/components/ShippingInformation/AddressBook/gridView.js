import React, { useMemo } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import { useStyle } from '@magento/venia-ui/lib/classify';
import { shape, string, array, func, number, bool } from 'prop-types';
import defaultClasses from './gridView.module.css';
import AddressCard from './addressCard';
import AddressCardList from './addressCardList';
import Button from '@mui/material/Button';
import { FormattedMessage, useIntl } from 'react-intl';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import CheckoutMapIcon from '../../Icons/checkout_map.svg';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import StaticMap from '../../StaticMap/staticMap';
import EllipsisText from '../../EllipsisText/EllipsisText';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import MapIcon from '../../Icons/mapWhite.svg';
import MapIconBlack from '../../Icons/mapBlack.svg';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Chip from '@mui/material/Chip';
import Logo from '../../Logo';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start',
}));

const GridView = props => {
    const {
        customerAddresses,
        handleAddAddress,
        handleEditAddress,
        handleSelectAddress,
        selectedAddress,
        isUpdating
    } = props;

    const classes = useStyle(defaultClasses, props.classes);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const { formatMessage } = useIntl();
    const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl'; // Use your logic to determine RTL
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Beesline' });

    const hiddenStyles = {
        display: 'none',
    };

    const StyledAppBar = styled(AppBar)(({ theme }) => ({
        backgroundColor: 'white',
        color: '#000000',
        boxShadow: 'none'
    }));

    const fullBtnStyles = {
        background: '#FFC629',
        borderRadius: '12px',
        boxShadow: 'none',
        width: '100%',
        color: '#000000',
        textTransform: 'capitalize',
        height: '46px',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        justifyContent: 'start',
        flexDirection: isRTL ? 'row-reverse': 'row'
    };

    const checkoutLabel = {
        color: "#000",
        fontWeight: "600",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "110%",
        display: "block",
        marginTop: "15px",
        marginBottom: "15px",
    }

    const MapIcon = (
        <img src={CheckoutMapIcon} alt="Map" />
    );

    const addressNicknameOptions = [
        { label: "Home", value: 148 },
        { label: "Work", value: 149 },
        { label: "Other", value: 154 },
    ];

    const addressElements = useMemo(() => {
        let defaultIndex;
        const addresses = customerAddresses.map((address, index) => {
            const isSelected = selectedAddress === address.id;

            if (address.default_shipping) {
                defaultIndex = index;
            }

            return (
                <AddressCard
                    address={address}
                    isSelected={isSelected}
                    key={address.id}
                    onSelection={handleSelectAddress}
                    onEdit={handleEditAddress}
                    setOpen={setOpen}
                />
            );
        });

        // Position the default address first in the elements list
        if (defaultIndex) {
            [addresses[0], addresses[defaultIndex]] = [
                addresses[defaultIndex],
                addresses[0]
            ];
        }

        return [...addresses];
    }, [
        customerAddresses,
        handleEditAddress,
        handleSelectAddress,
        selectedAddress
    ]);

    const rootClassName = isUpdating ? classes.root_updated : classes.root;
    const addressElementLength = addressElements.length;

    return (
        <div className={rootClassName}>
            {addressElementLength ? (
                <>
                    <div className={classes.content}>{addressElements}</div>
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        className={classes.dialog}
                        PaperProps={{
                            style: {
                                borderRadius: '0 0 0 0',
                            },
                        }}
                    >
                        <StyledAppBar sx={{ position: 'relative' }}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                    sx={{ paddingLeft: "11px" }}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                    <FormattedMessage id="whereToDeliver" defaultMessage="Where should we deliver" />
                                </Typography>
                                <Link
                                    aria-label={title}
                                    to={resourceUrl('/')}
                                    className={classes.logoContainer}
                                    data-cy="Header-logoContainer"
                                >
                                    <Logo width={42} classes={{ logo: classes.logo }} />
                                </Link>
                            </Toolbar>
                        </StyledAppBar>
                        <div className={classes.dialogContent}>
                            <h1
                                aria-live="polite"
                                className={classes.heading}
                                data-cy="AddressBookPage-heading"
                            >
                                <FormattedMessage id="whereToDeliver" defaultMessage="Where should we deliver" />
                            </h1>
                            <List sx={{ width: '100%', bgcolor: 'background.paper', padding: '0px' }}>
                                {customerAddresses.map((address, index) => {
                                    const nicknameLabel = address.bee_address_nickname
                                        ? addressNicknameOptions.find(nickname => nickname.value === address.bee_address_nickname)?.label || null
                                        : null;

                                    let displayLabel = nicknameLabel;

                                    if (address.bee_address_nickname && address.bee_address_nickname === 154) {
                                        displayLabel += ' ' + address.bee_nickname;
                                    }

                                    const [latitude, longitude] = address.bee_coordinates ? address.bee_coordinates.split(',') : '';
                                    const coordinatesObject = {
                                        lat: parseFloat(latitude),
                                        lng: parseFloat(longitude)
                                    };

                                    let regionLabel = '';
                                    if (address.region && address.region.label) {
                                        regionLabel = address.region.label !== '-' ? address.region.label : '';
                                    }

                                    const streetRows = address.street.map((row, index) => {
                                        return <span key={index}>{row}</span>;
                                    });

                                    const nameString = `${address.firstname} ${address.lastname}`;
                                    const additionalAddressString = `${address.city} ${address.bee_building_name ? ',' + address.bee_building_name : ''} ${regionLabel ? ',' + regionLabel : ''}`;
                                    const isSelected = selectedAddress === address.id;

                                    return (
                                        <AddressCardList
                                            address={address}
                                            isSelected={isSelected}
                                            key={address.id}
                                            onSelection={handleSelectAddress}
                                            onEdit={handleEditAddress}
                                            handleClose={handleClose}
                                        />
                                    );
                                })}
                            </List>
                        </div>
                    </Dialog>
                </>
            ) : (
                <div>
                    <h5 style={checkoutLabel}><FormattedMessage id="cart.checkout" defaultMessage="Checkout" /></h5>
                    <Button style={fullBtnStyles} className={classes.fullBtn} component={Link} to={{
                        pathname: resourceUrl(`/user-form`),
                        search: '',
                        state: { headerTitle: formatMessage({ id: "enterLocation" }) }
                    }} variant="contained" size="medium" startIcon={!isRTL && MapIcon}endIcon={isRTL && MapIcon}>
                        <FormattedMessage id="addAddress" defaultMessage="Add Address" />
                    </Button>
                </div>
            )}
            <div className={classes.btn}>
                {/* <Button type={'button'} onClick={handleAddAddress}>
                    <FormattedMessage
                        id={'amOsc.addNewAddresstext'}
                        defaultMessage={'New Address'}
                    />
                </Button> */}
            </div>
        </div>
    );
};

GridView.propTypes = {
    customerAddresses: array,
    handleAddAddress: func,
    handleEditAddress: func,
    handleSelectAddress: func,
    selectedAddress: number,
    isLoading: bool,
    classes: shape({
        root: string
    })
};

export default GridView;
