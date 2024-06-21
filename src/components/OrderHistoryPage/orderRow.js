import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { ChevronDown, ChevronUp } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';
import Price from '@magento/venia-ui/lib/components/Price';
import { useOrderRow } from '@magento/peregrine/lib/talons/OrderHistoryPage/useOrderRow';
import ShippingInformation from './OrderDetails/shippingInformation';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import CollapsedImageGallery from './collapsedImageGallery';
import OrderProgressBar from './orderProgressBar';
import OrderDetails from './OrderDetails';
import defaultClasses from './orderRow.module.css';

import ItemsTitle from './OrderDetails/itemsTitle';
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

const OrderRow = props => {
    const { order } = props;
    const { formatMessage } = useIntl();
    const {
        invoices,
        items,
        number: orderNumber,
        order_date: orderDate,
        shipments,
        shipping_address,
        status,
        total
    } = order;
    const { grand_total: grandTotal } = total;
    const { currency, value: orderTotal } = grandTotal;

    // Convert date to ISO-8601 format so Safari can also parse it
    const isoFormattedDate = orderDate.replace(' ', 'T');
    const formattedDate = new Date(isoFormattedDate).toLocaleDateString(
        undefined,
        {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }
    );

    const hasInvoice = !!invoices.length;
    const hasShipment = !!shipments.length;
    let derivedStatus;
    const statusStepMap = new Map([
        ["pending", { step: 1, label: 'Order placed' }],
        ["processing", { step: 2, label: 'Processing' }],
        ["complete", { step: 3, label: 'Delivered' }]
    ]);
    if (statusStepMap.has(status.toLowerCase())) {
        derivedStatus = statusStepMap.get(status.toLowerCase()).label;
    }

    const talonProps = useOrderRow({ items });
    const { loading, isOpen, handleContentToggle, imagesData } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    return (
        <li className={classes.root}>
            <Link
                // to={{
                //     pathname: resourceUrl(`/order-status`),
                //     state: {
                //         headerTitle: 'Order Status',
                //         orderNumber: orderNumber,
                //         derivedStatus: derivedStatus,
                //         formattedDate: formattedDate,
                //         imagesData: imagesData,
                //         items: items,
                //         shipping_address: shipping_address
                //     }
                // }}
                to={{
                    pathname: props.getSupport ? resourceUrl(`/get-support/${props.identifier}`) : resourceUrl(`/order-summary`),
                    state: props.getSupport
                    ? { headerTitle: formatMessage({
                        id: 'faq',
                        defaultMessage: 'FAQ'
                    }), faqCategoryId: props.faqCategoryId, stateIncrementId: orderNumber }
                    : { headerTitle: formatMessage({
                        id: 'orderSummary',
                        defaultMessage: 'Order Summary'
                    }), incrementId: orderNumber}
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{ alignItems: 'start', padding: '1rem 0 0', marginBottom: '4px' }}>
                        <Grid item xs={4} md={6} lg={6} xl={6} sx={{ paddingTop: '0px' }}>
                            <Item sx={{ padding: '0px' }}>
                                <CollapsedImageGallery items={imagesData} />
                            </Item>
                        </Grid>
                        <Grid item xs={8} md={6} lg={6} xl={6} sx={{ padding: '0px' }}>
                            <Item>
                                {props.getSupport}
                                <span className={classes.orderNumber}>Order #{orderNumber}</span>
                                <div className={classes.orderStatusRow}>
                                    <span className={classes.orderStatus}>{derivedStatus}</span>
                                    <span className={classes.orderDate}>{formattedDate}</span>
                                </div>
                                <div className={classes.orderItemsTitle}>
                                    <ItemsTitle classes={classes} data={{ imagesData, items }} />
                                </div>
                                <div className={classes.orderAddress}>
                                    <ShippingInformation data={shipping_address} />
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                    {/* <Divider />
                    <Grid container spacing={2} sx={{ alignItems: 'center', marginTop: '4px' }}>
                        <Grid item xs={4} md={6} lg={6} xl={6}>
                            <Item sx={{ padding: '0px' }}>
                                <span className={classes.deliveryNoteTitle}>Delivery note:</span>
                            </Item>
                        </Grid>
                        <Grid item xs={8} md={6} lg={6} xl={6} sx={{ paddingRight: '0px', paddingLeft: '0px' }}>
                            <Item sx={{ padding: '0px' }}>
                                <span className={classes.deliveryNote}>Call me before arrive</span>
                            </Item>
                        </Grid>
                    </Grid> */}
                </Box>
            </Link>
            {/* <div className={classes.orderNumberContainer}>
                <span className={classes.orderNumberLabel}>
                    <FormattedMessage
                        id={'orderRow.orderNumberText'}
                        defaultMessage={'Order #'}
                    />
                </span>
                <span className={classes.orderNumber}>{orderNumber}</span>
            </div>
            <div className={classes.orderDateContainer}>
                <span className={classes.orderDateLabel}>
                    <FormattedMessage
                        id={'orderRow.orderDateText'}
                        defaultMessage={'Order Date'}
                    />
                </span>
                <span className={classes.orderDate}>{formattedDate}</span>
            </div>
            <div className={classes.orderTotalContainer}>
                <span className={classes.orderTotalLabel}>
                    <FormattedMessage
                        id={'orderRow.orderTotalText'}
                        defaultMessage={'Order Total'}
                    />
                </span>
                <div className={classes.orderTotal}>{orderTotalPrice}</div>
            </div>
            <div className={classes.orderItemsContainer}>
                {collapsedImageGalleryElement}
            </div>
            <div className={classes.orderStatusContainer}>
                <span className={classes.orderStatusBadge}>
                    {derivedStatus}
                </span>
                <OrderProgressBar status={derivedStatus} />
            </div>
            <button
                className={classes.contentToggleContainer}
                onClick={handleContentToggle}
                type="button"
                aria-expanded={isOpen}
            >
                {contentToggleIcon}
            </button>
            <div className={contentClass}>{orderDetails}</div> */}
        </li>
    );
};

export default OrderRow;

OrderRow.propTypes = {
    classes: shape({
        root: string,
        cell: string,
        stackedCell: string,
        label: string,
        value: string,
        orderNumberContainer: string,
        orderDateContainer: string,
        orderTotalContainer: string,
        orderStatusContainer: string,
        orderItemsContainer: string,
        contentToggleContainer: string,
        orderNumberLabel: string,
        orderDateLabel: string,
        orderTotalLabel: string,
        orderNumber: string,
        orderDate: string,
        orderTotal: string,
        orderStatusBadge: string,
        content: string,
        content_collapsed: string
    }),
    order: shape({
        billing_address: shape({
            city: string,
            country_code: string,
            firstname: string,
            lastname: string,
            postcode: string,
            region_id: string,
            street: arrayOf(string)
        }),
        items: arrayOf(
            shape({
                id: string,
                product_name: string,
                product_sale_price: shape({
                    currency: string,
                    value: number
                }),
                product_sku: string,
                selected_options: arrayOf(
                    shape({
                        label: string,
                        value: string
                    })
                ),
                quantity_ordered: number
            })
        ),
        invoices: arrayOf(
            shape({
                id: string
            })
        ),
        number: string,
        order_date: string,
        payment_methods: arrayOf(
            shape({
                type: string,
                additional_data: arrayOf(
                    shape({
                        name: string,
                        value: string
                    })
                )
            })
        ),
        shipping_address: shape({
            city: string,
            country_code: string,
            firstname: string,
            lastname: string,
            postcode: string,
            region_id: string,
            street: arrayOf(string),
            telephone: string
        }),
        shipping_method: string,
        shipments: arrayOf(
            shape({
                id: string,
                tracking: arrayOf(
                    shape({
                        number: string
                    })
                )
            })
        ),
        status: string,
        total: shape({
            discounts: arrayOf(
                shape({
                    amount: shape({
                        currency: string,
                        value: number
                    })
                })
            ),
            grand_total: shape({
                currency: string,
                value: number
            }),
            subtotal: shape({
                currency: string,
                value: number
            }),
            total_tax: shape({
                currency: string,
                value: number
            }),
            total_shipping: shape({
                currency: string,
                value: number
            })
        })
    })
};
