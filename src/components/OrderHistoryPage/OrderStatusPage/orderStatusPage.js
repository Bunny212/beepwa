import React from 'react';
import { useLocation } from 'react-router-dom';
import { useOrderRow } from '@magento/peregrine/lib/talons/OrderHistoryPage/useOrderRow';
import ShippingInformation from '../OrderDetails/shippingInformation';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useIntl } from 'react-intl';
import CollapsedImageGallery from '../collapsedImageGallery';
import Button from '@magento/venia-ui/lib/components/Button';
import defaultClasses from '../orderRow.module.css';

import ItemsTitle from '../OrderDetails/itemsTitle';
import CheckoutAddressMapIcon from '../../Icons/address_map_icon.svg';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

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
    padding: '0px',
}));

const OrderStatusPage = props => {
    // const { order } = props;
    const location = useLocation();
    const { orderNumber,
        derivedStatus,
        formattedDate,
        imagesData,
        items,
        shipping_address } = location.state || {};
    // const { formatMessage } = useIntl();
    // const {
    //     invoices,
    //     items,
    //     number: orderNumber,
    //     order_date: orderDate,
    //     shipments,
    //     shipping_address,
    //     status,
    //     total
    // } = order;

    // // Convert date to ISO-8601 format so Safari can also parse it
    // const isoFormattedDate = orderDate.replace(' ', 'T');
    // const formattedDate = new Date(isoFormattedDate).toLocaleDateString(
    //     undefined,
    //     {
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric'
    //     }
    // );

    // const hasInvoice = !!invoices.length;
    // const hasShipment = !!shipments.length;
    // let derivedStatus;
    // if (status === 'Complete') {
    //     derivedStatus = formatMessage({
    //         id: 'orderRow.deliveredText',
    //         defaultMessage: 'Delivered'
    //     });
    // } else if (hasShipment) {
    //     derivedStatus = formatMessage({
    //         id: 'orderRow.shippedText',
    //         defaultMessage: 'Shipped'
    //     });
    // } else if (hasInvoice) {
    //     derivedStatus = formatMessage({
    //         id: 'orderRow.readyToShipText',
    //         defaultMessage: 'Ready to ship'
    //     });
    // } else {
    //     derivedStatus = formatMessage({
    //         id: 'orderRow.processingText',
    //         defaultMessage: 'Processing'
    //     });
    // }

    // const talonProps = useOrderRow({ items });
    // const { loading, isOpen, handleContentToggle, imagesData } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div className={classes.orderStatusRoot}>
            <div className={classes.orderStatusBox}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{ alignItems: 'start', padding: '1rem 0 0', marginBottom: '4px' }}>
                        <Grid item xs={4} sx={{ paddingTop: '0px' }}>
                            <Item sx={{ padding: '0px' }}>
                                <CollapsedImageGallery items={imagesData} />
                            </Item>
                        </Grid>
                        <Grid item xs={8} sx={{ paddingTop: '0px' }}>
                            <Item>
                                <span className={classes.orderNumber}>Order #{orderNumber}</span>
                                <div className={classes.orderStatusRow}>
                                    <span className={classes.orderStatus}>{derivedStatus}</span>
                                    <span className={classes.orderDate}>{formattedDate}</span>
                                </div>
                                <div className={classes.orderItemsTitle}>
                                    <ItemsTitle classes={classes} data={{ imagesData, items }} />
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <div className={classes.orderStatusBox}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{ alignItems: 'center', marginBottom: '10px' }}>
                        <Grid item xs={4}>
                            <Item sx={{ padding: '0px' }}>
                                <img src={CheckoutAddressMapIcon} />
                            </Item>
                        </Grid>
                        <Grid item xs={8}>
                            <div className={classes.orderAddress}>
                                <ShippingInformation data={shipping_address} />
                            </div>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={2} sx={{ alignItems: 'center', marginTop: '4px' }}>
                        <Grid item xs={4}>
                            <Item sx={{ padding: '0px' }}>
                                <span className={classes.deliveryNoteTitle}>Delivery note:</span>
                            </Item>
                        </Grid>
                        <Grid item xs={8} sx={{ paddingRight: '0px', paddingLeft: '0px' }}>
                            <Item sx={{ padding: '0px' }}>
                                <span className={classes.deliveryNote}>Call me when you get  to the bilding...</span>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <div className={classes.orderStatusActions}>
                <Button
                    className={classes.fullBtn}
                    disabled={true}
                    priority="normal"
                    data-cy="OrderStatusPage-GetSupportButton"
                >
                    Get Support
                </Button>
                <br/>
                <Button
                    className={classes.fullBtn}
                    disabled={true}
                    priority="normal"
                    data-cy="OrderStatusPage-GetSupportButton"
                >
                    Re-order
                </Button>
            </div>
        </div>
    );
};

export default OrderStatusPage;