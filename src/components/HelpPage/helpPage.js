import React, { Fragment } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Link } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import defaultClasses from './helpPage.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import QuestionCircle from '../Icons/bi_question_circle.svg';
import FeedbackIcon from '../Icons/FeedbackIcon.svg';
import WhatsappIcon from '../Icons/whatsapp.svg';
import RefundIcon from '../Icons/refund.svg';
import { ErrorOutline } from '@mui/icons-material';

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

const HelpPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl';
    let helpContent = (
        <>
            {/* <ListItemButton
                className={classes.listItemBtn}
            >
                <ListItemIcon>
                    <img
                        height='40px'
                        src={ChatYellow}
                        alt='Chat'
                        title='Chat'
                        width='42px'
                    />
                </ListItemIcon>
                <ListItemText primary="Chat" secondary="Need help or facing an issue?" />
            </ListItemButton> */}
            {/* <ListItemButton
                className={classes.listItemBtn}
            >
                <ListItemIcon>
                    <img
                        height='34px'
                        src={TalkIcon}
                        alt='Talk'
                        title='Talk'
                        width='38px'
                    />
                </ListItemIcon>
                <ListItemText primary="Talk with a skin expert" secondary="Book a skin consultation" />
            </ListItemButton> */}
            {/* <ListItemButton
                className={classes.listItemBtn}
            >
                <ListItemIcon>
                    <img
                        height='34px'
                        src={InboxIcon}
                        alt='Inbox'
                        title='Inbox'
                        width='33px'
                    />
                </ListItemIcon>
                <ListItemText primary="Your Inbox" secondary="Check and manage your messages" />
            </ListItemButton> */}
            <ListItemButton
                component={Link}
                to={{
                    pathname: resourceUrl('/faq'),
                    state: { headerTitle: formatMessage({
                        id: 'faq',
                        defaultMessage: 'FAQ'
                    })}
                }}
                className={classes.listItemBtn}
            >
                <ListItemIcon>
                    <img
                        height='33px'
                        src={QuestionCircle}
                        alt={formatMessage({
                            id: 'faq',
                            defaultMessage: 'FAQ'
                        })}
                        title={formatMessage({
                            id: 'faq',
                            defaultMessage: 'FAQ'
                        })}
                        width='33px'
                    />
                </ListItemIcon>
                <ListItemText primary={<FormattedMessage id="faq" defaultMessage="FAQ" />} secondary={<FormattedMessage id="learnAboutPolicies" defaultMessage="Learn about our policies and more." />}/>
            </ListItemButton>
            <ListItemButton
                className={classes.listItemBtn}
                component="a" // Use "a" for external links
                href={resourceUrl('https://beesline.zendesk.com/hc/en-us/requests/new')}
                target="_blank" // Open in a new tab
                rel="noopener noreferrer" // Recommended for security
            >
                <ListItemIcon>
                    <img
                        height='39px'
                        src={FeedbackIcon}
                        alt={formatMessage({
                            id: 'submitInquiry',
                            defaultMessage: 'Submit Inquiry'
                        })}
                        title={formatMessage({
                            id: 'submitInquiry',
                            defaultMessage: 'Submit Inquiry'
                        })}
                        width='38px'
                    />
                </ListItemIcon>
                <ListItemText primary={<FormattedMessage id="submitInquiry" defaultMessage="Submit Inquiry" />} secondary="" />
            </ListItemButton>
            <ListItemButton
                className={classes.listItemBtn}
                component={Link}
                to={{
                    pathname: resourceUrl(`/faq/refund`),
                    state: { headerTitle: 'FAQ', faqCategoryId: isRTL ? 10 : 5 }
                }}
                rel="noopener noreferrer" // Recommended for security
            >
                <ListItemIcon>
                    <img
                        height='32px'
                        src={RefundIcon}
                        alt={formatMessage({
                            id: 'refund',
                            defaultMessage: 'Request Refund'
                        })}
                        title={formatMessage({
                            id: 'refund',
                            defaultMessage: 'Request Refund'
                        })}
                        width='35px'
                    />
                </ListItemIcon>
                <ListItemText primary={<FormattedMessage id="refund" defaultMessage="Request Refund" />} secondary="" />
            </ListItemButton>
            <ListItemButton
                className={classes.listItemBtn}
                component="a" // Use "a" for external links
                href={resourceUrl('https://api.whatsapp.com/send?phone=+96181926476&text=Hello')}
                target="_blank" // Open in a new tab
                rel="noopener noreferrer" // Recommended for security
            >
                <ListItemIcon>
                    <img
                        height='32px'
                        src={WhatsappIcon}
                        alt={formatMessage({
                            id: 'whatsappSupport',
                            defaultMessage: 'WhatsApp Support'
                        })}
                        title={formatMessage({
                            id: 'whatsappSupport',
                            defaultMessage: 'WhatsApp Support'
                        })}
                        width='32px'
                    />
                </ListItemIcon>
                <ListItemText primary={<FormattedMessage id="whatsappSupport" defaultMessage="WhatsApp Support" />} secondary="" />
            </ListItemButton>
        </>
    );
    

    let pageContent = (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {helpContent}
                    </List>
                </Grid>
            </Box>
        </Fragment>
    );

    return (
        <div className={classes.root}>
            {pageContent}
        </div>
    );
};

export default HelpPage;
