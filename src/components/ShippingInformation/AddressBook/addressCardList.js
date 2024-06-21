import React from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import additionalClasses from './addressCard.module.css';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/AddressBook/addressCard.module.css';
import { Edit2 as EditIcon } from 'react-feather';
import { useAddressCard } from '@magento/peregrine/lib/talons/CheckoutPage/AddressBook/useAddressCard';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from '@magento/venia-ui/lib/components/Button';
import { FormattedMessage, useIntl } from 'react-intl';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import { Link, useParams, useLocation } from "react-router-dom";
import CheckoutAddressMapIcon from '../../Icons/address_map_icon.svg';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import StaticMap from '../../StaticMap/staticMap';
import EllipsisText from '../../EllipsisText/EllipsisText';
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
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

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

const AddressCardList = props => {
    const { address, isSelected, onEdit, onSelection, onChangeAddress } = props;

    const talonProps = useAddressCard({
        address,
        onEdit,
        onSelection
    });

    const {
        handleClick,
        handleEditAddress,
        handleKeyPress,
        hasUpdate
    } = talonProps;

    const handleClickChangeAddress = () => {
        onSelection && handleClick();
        props.handleClose();
    };

    const {
        city,
        country_code,
        default_shipping,
        email,
        firstname,
        lastname,
        postcode,
        region,
        street,
        telephone,
        bee_building_name,
        bee_apartment_nb,
        bee_address_notes,
        bee_address_nickname,
        bee_nickname,
        bee_coordinates
    } = address || {};

    const classes = useStyle(defaultClasses, additionalClasses, props.classes);

    const rootClass = isSelected
        ? hasUpdate
            ? classes.root_updated
            : classes.root_selected
        : classes.root;

    const AvatarClass = isSelected
        ? hasUpdate
            ? classes.normalAvatar
            : classes.defaultAvatar
        : classes.normalAvatar;

    const editButton = isSelected ? (
        <button className={classes.editButton} onClick={handleEditAddress}>
            <Icon
                classes={{
                    icon: classes.editIcon
                }}
                size={16}
                src={EditIcon}
            />
        </button>
    ) : null;

    const addressNicknameOptions = [
        { label: "Home", value: 148 },
        { label: "Work", value: 149 },
        { label: "Other", value: 154 },
    ];
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
    if (region && region.label) {
        regionLabel = region.label != '-' ? region.label : '';
    }

    const streetRows = street.map((row, index) => {
        return <span key={index}>{row}</span>;
    });

    const nameString = `${firstname} ${lastname}`;
    const additionalAddressString = `${city} ${bee_building_name ? ',' + bee_building_name : ''} ${regionLabel ? ',' + regionLabel : ''}`;

    const changeAddressButton = onChangeAddress ? (
        <Button type={'button'} onClick={onChangeAddress}>
            <Icon
                classes={{
                    icon: classes.editIcon
                }}
                size={16}
                src={EditIcon}
            />
            <FormattedMessage id={'amOsc.edit'} defaultMessage={'Edit'} />
        </Button>
    ) : null;

    const defaultBadge = default_shipping ? (
        <span className={classes.defaultBadge}>
            <FormattedMessage
                id={'addressCard.defaultText'}
                defaultMessage={'Default'}
            />
        </span>
    ) : null;

    return (
        <div className={classes.root} data-cy="Card-root">
            <ListItem onClick={handleClickChangeAddress} key={address.id} sx={{ padding: '0px', cursor: 'pointer' }}
            // secondaryAction={
            //     <React.Fragment>
            //         <div className={classes.actionContainer}>
            //             <LinkButton
            //                 classes={{ root: classes.editButton }}
            //                 onClick={handleClickChangeAddress}
            //                 data-cy="addressCard-changeButton"
            //             >
            //                 <span className={classes.actionLabel}>
            //                     Select
            //                 </span>
            //             </LinkButton>
            //         </div>
            //     </React.Fragment>
            // }
            >
                <ListItemAvatar>
                    <Avatar className={AvatarClass}>
                        <img src={MapIconBlack} alt="Map Icon" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                    <React.Fragment>
                        {address.bee_address_nickname === 154 ? (
                            <>{nicknameLabel}:{address.bee_nickname}</>
                        ) : (
                            <>{nicknameLabel}</>
                        )}
                    </React.Fragment>
                } secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="caption"
                            color="text.primary"
                        >
                            {streetRows}{additionalAddressString}
                        </Typography>
                    </React.Fragment>
                } />
            </ListItem>
        </div>
    );
};

AddressCardList.propTypes = {
    address: shape({
        city: string,
        country_code: string,
        default_shipping: bool,
        firstname: string,
        lastname: string,
        postcode: string,
        region: shape({
            region_code: string,
            region: string
        }),
        street: arrayOf(string)
    }).isRequired,
    classes: shape({
        root: string,
        root_selected: string,
        root_updated: string,
        editButton: string,
        editIcon: string,
        defaultBadge: string,
        name: string,
        address: string
    }),
    isSelected: bool,
    onEdit: func,
    onSelection: func
};

export default AddressCardList;
