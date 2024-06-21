import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { Trash2 as TrashIcon, Edit2 as EditIcon } from 'react-feather';
import { useHistory, useLocation } from "react-router-dom";
import { useStyle } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import Icon from '@magento/venia-ui/lib/components/Icon';
import defaultClasses from './addressCard.module.css';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import MapIcon from '../Icons/mapWhite.svg';
import MapIconBlack from '../Icons/mapBlack.svg';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Chip from '@mui/material/Chip';

const AddressCard = props => {
    const {
        address,
        classes: propClasses,
        countryName,
        isConfirmingDelete,
        isDeletingCustomerAddress,
        onCancelDelete,
        onConfirmDelete,
        onEdit,
        onDelete,
        addressBookCount
    } = props;

    const {
        id,
        city,
        country_code,
        default_shipping,
        email,
        firstname,
        middlename = '',
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
    } = address;

    const classes = useStyle(defaultClasses, propClasses);
    const history = useHistory();
    const { formatMessage } = useIntl();
    const confirmDeleteButtonClasses = {
        root_normalPriorityNegative: classes.confirmDeleteButton
    };
    const cancelDeleteButtonClasses = {
        root_lowPriority: classes.cancelDeleteButton
    };

    const defaultBadge = default_shipping ? (
        <span
            className={classes.defaultBadge}
            data-cy="addressCard-defaultBadge"
        >
            <FormattedMessage
                id={'addressCard.defaultText'}
                defaultMessage={'Default'}
            />
        </span>
    ) : null;

    const handleUpdateGuestAddress = () => {
        const targetPagePath = "/guest-form";
        const stateParams = {
            headerTitle: formatMessage({
                id: 'enterLocation',
                defaultMessage: 'Enter Location'
            }),
            isGuestCheckout: false,
            amAllowGuestCheckout: '',
            isUpdate: true,
            fromAddressBook: true,
            shippingData: address,
            addressBookCount: addressBookCount
        };
        // Redirect the user to the target page with state parameters
        history.push(targetPagePath, stateParams);
    }

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

    const deleteButtonElement = (
        <LinkButton
            classes={{ root: classes.deleteButton }}
            onClick={onDelete}
            data-cy="addressCard-deleteButton"
        >
            {/* <Icon classes={{ icon: null }} size={16} src={TrashIcon} /> */}
            <span className={classes.actionLabelDelete}>
                <FormattedMessage
                    id="addressBookPage.deleteAddress"
                    defaultMessage="Delete"
                />
            </span>
        </LinkButton>
    );

    const maybeConfirmingDeleteOverlay = isConfirmingDelete ? (
        <div className={classes.confirmDeleteContainer}>
            <Button
                classes={confirmDeleteButtonClasses}
                disabled={isDeletingCustomerAddress}
                priority="normal"
                type="button"
                negative={true}
                onClick={onConfirmDelete}
                data-cy="addressCard-confirmDeleteButton"
            >
                <FormattedMessage
                    id={'global.deleteButton'}
                    defaultMessage={'Delete'}
                />
            </Button>
            <Button
                classes={cancelDeleteButtonClasses}
                disabled={isDeletingCustomerAddress}
                priority="low"
                type="button"
                onClick={onCancelDelete}
            >
                <FormattedMessage
                    id={'global.cancelButton'}
                    defaultMessage={'Cancel'}
                />
            </Button>
        </div>
    ) : null;

    return (
        <div className={classes.root} data-cy="addressCard-root">
            <List sx={{ width: '100%', bgcolor: 'background.paper', padding: '0px' }}>
                <ListItem sx={{ paddingRight: '85px', paddingTop: '0px', paddingBottom: '0px' }} secondaryAction={
                    <React.Fragment>
                        <div className={classes.actionContainer}>
                            <LinkButton
                                classes={{ root: classes.editButton }}
                                onClick={handleUpdateGuestAddress}
                                data-cy="addressCard-editButton"
                            >
                                {/* <Icon classes={{ icon: null }} size={16} src={EditIcon} /> */}
                                <span className={classes.actionLabel}>
                                    <FormattedMessage
                                        id="addressBookPage.editAddress"
                                        defaultMessage="Edit"
                                    />
                                </span>
                            </LinkButton>
                            {/* {deleteButtonElement} */}
                            {maybeConfirmingDeleteOverlay}
                        </div>
                    </React.Fragment>
                }>
                    <ListItemAvatar>
                        <Avatar className={default_shipping ? classes.defaultAvatar : classes.normalAvatar}>
                            <img src={MapIconBlack} />
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
                                {streetRows} {additionalAddressString}
                            </Typography>
                        </React.Fragment>
                    } />
                </ListItem>
            </List>
            {/* <div
                className={default_shipping ? classes.contentContainerDefault : classes.contentContainer}
                data-cy="addressCard-contentContainer"
            >
                <img src={MapIcon} alt="Map" />
                <div className={classes.addressBox}>
                    <span className={classes.name}>Home</span>
                    <div>{streetRows}<span className={classes.streetRow}>{additionalAddressString}</span></div>
                </div>
                <div className={classes.actionContainer}>
                    <LinkButton
                        classes={{ root: classes.editButton }}
                        onClick={onEdit}
                        data-cy="addressCard-editButton"
                    >
                        <span className={classes.actionLabel}>
                            <FormattedMessage
                                id="addressBookPage.editAddress"
                                defaultMessage="Edit"
                            />
                        </span>
                    </LinkButton>
                    {deleteButtonElement}
                    {maybeConfirmingDeleteOverlay}
                </div>
            </div>
            <div className={classes.actionContainer}>
                <LinkButton
                    classes={{ root: classes.editButton }}
                    onClick={onEdit}
                    data-cy="addressCard-editButton"
                >
                    <Icon classes={{ icon: null }} size={16} src={EditIcon} />
                    <span className={classes.actionLabel}>
                        <FormattedMessage
                            id="addressBookPage.editAddress"
                            defaultMessage="Edit"
                        />
                    </span>
                </LinkButton>
                {deleteButtonElement}
                {maybeConfirmingDeleteOverlay}
            </div> */}
        </div>
    );
};

export default AddressCard;

AddressCard.propTypes = {
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
        street: arrayOf(string),
        telephone: string
    }).isRequired,
    classes: shape({
        actionContainer: string,
        actionLabel: string,
        additionalAddress: string,
        contentContainer: string,
        country: string,
        defaultBadge: string,
        defaultCard: string,
        deleteButton: string,
        editButton: string,
        flash: string,
        linkButton: string,
        name: string,
        root: string,
        root_updated: string,
        streetRow: string,
        telephone: string
    }),
    countryName: string,
    isConfirmingDelete: bool,
    isDeletingCustomerAddress: bool,
    onCancelDelete: func,
    onConfirmDelete: func,
    onDelete: func,
    onEdit: func
};
