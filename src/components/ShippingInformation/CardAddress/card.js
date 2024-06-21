import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './card.module.css';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import CheckoutAddressMapIcon from '../../Icons/address_map_icon.svg';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import StaticMap from '../../StaticMap/staticMap';
import EllipsisText from '../../EllipsisText/EllipsisText';

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

const Card = props => {
    const { classes: propClasses, shippingData, handleUpdateGuestAddress } = props;
    const {
        city,
        country: { label: country },
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
    } = shippingData || {};

    const addressNicknameOptions = [
        { label: "Home", value: 148 },
        { label: "Work", value: 149 },
        { label: "Other", value: 154 },
    ];
    const nicknameLabel = shippingData.bee_address_nickname
        ? addressNicknameOptions.find(nickname => nickname.value === shippingData.bee_address_nickname)?.label || null
        : null;

    let displayLabel = nicknameLabel;

    if (shippingData.bee_address_nickname && shippingData.bee_address_nickname === 154) {
        displayLabel += ' ' + shippingData.bee_nickname;
    }
    
    const [latitude, longitude] = shippingData.bee_coordinates ? shippingData.bee_coordinates.split(',') : '';
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

    const classes = useStyle(defaultClasses, propClasses);

    const nameString = `${firstname} ${lastname}`;
    const additionalAddressString = `${city} ${bee_building_name ? ',' + bee_building_name : ''} ${regionLabel ? ',' + regionLabel : ''}`;

    return (
        <div className={classes.root} data-cy="Card-root">
            <div className={classes.cardHeader}>
                <h5 className={classes.cardTitle}>
                    <FormattedMessage id="deliveryTo" defaultMessage="Delivery to:" />
                </h5>
                <LinkButton
                    onClick={handleUpdateGuestAddress}
                    className={classes.editButton}
                    data-cy="ShippingInformation-editButton"
                >
                    <span className={classes.editText}>
                        <FormattedMessage id="global.updateButton" defaultMessage="Update" /> →
                    </span>
                </LinkButton>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid item xs={4}>
                        <Item sx={{ padding: '0px' }}>
                            <StaticMap coordinates={coordinatesObject} zoom={12} size="120x80" />
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>
                            {shippingData.bee_address_nickname === 154 ? (
                                <span className={classes.addressTitle}>{nicknameLabel}:{shippingData.bee_nickname} Contact: {nameString}</span>
                            ) : (
                                <span className={classes.addressTitle}>{nicknameLabel} Contact: {nameString}</span>
                            )}
                            <div className={classes.address}>
                                {streetRows}
                                <span>{additionalAddressString}</span>
                            </div>
                            <span className={classes.telephone}>{telephone}</span>
                        </Item>
                    </Grid>
                </Grid>
                {bee_address_notes && (
                    <>
                        <Divider />
                        <Grid container spacing={2} sx={{ alignItems: 'center', marginTop: '4px' }}>
                            <Grid item xs={4}>
                                <Item sx={{ padding: '0px' }}>
                                    <span className={classes.deliveryNoteTitle}><FormattedMessage id="deliveryNote" defaultMessage="Delivery note:" /></span>
                                </Item>
                            </Grid>
                            <Grid item xs={8} sx={{ paddingRight: '0px', paddingLeft: '0px' }}>
                                <Item sx={{ padding: '0px' }}>
                                    <span className={classes.deliveryNote}>
                                        <EllipsisText text={bee_address_notes} maxLines="1" ellipsis="..." />
                                    </span>
                                </Item>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Box>
        </div>
    );
};

export default Card;