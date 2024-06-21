import React, { Fragment } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Link } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import defaultClasses from './getSupportPage.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import Image from '@magento/venia-ui/lib/components/Image';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowIcon from '../Icons/Arrow.svg';
import GetSupportIcon from '../Icons/getSupportIcon.svg';
import IconBox from './iconBox';
import { ErrorOutline } from '@mui/icons-material';
import FaqsLoader from './faqsLoader';

import { useQuery } from '@apollo/client';
import { GET_SUPPORT_FAQS } from './talons/supportFaqs.qql';

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

const GetSupportPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const { loading, error, data, refetch } = useQuery(GET_SUPPORT_FAQS);

    // useEffect(() => {
    //     refetch();
    // }, []);

    if (loading) {
        return (
            <FaqsLoader classes={classes} />
        );
    }

    if (error) {
        return <ErrorContent errorMessage={error.message} />;
    }

    const { getSupportFaqs } = data;

    let faqsContent = (
        getSupportFaqs.map(faq => (
            <ListItemButton key={faq.category_id} component={Link}
            to={{
                pathname: faq.identifier == 'orders' ? resourceUrl(`/order-history`) : resourceUrl(`/get-support/${faq.identifier}`),
                state: faq.identifier === 'orders'
                ? { headerTitle: formatMessage({
                    id: 'orderHistory',
                    defaultMessage: 'Order History'
                }), getSupport: true, identifier: faq.identifier, faqCategoryId: faq.category_id }
                : { headerTitle: formatMessage({
                    id: 'faq',
                    defaultMessage: 'FAQ'
                }), faqCategoryId: faq.category_id }
            }}
            className={classes.listItemBtn}>
                <ListItemText primary={faq.title} />
                <ListItemIcon sx={{ justifyContent: 'end' }}>
                    <Image
                        height='25px'
                        src={ArrowIcon}
                        alt='Search'
                        title='Search'
                        width='15px'
                    />
                </ListItemIcon>
            </ListItemButton>
        ))
    );

    let pageContent = (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6}>
                    <IconBox src={GetSupportIcon} />
                    <Typography sx={{ mt: 4, mb: 2 }} className={classes.pageTitle} component="div">
                    <FormattedMessage id="learnMoreAbout" defaultMessage="What are you trying to learn and more about?" />
                    </Typography>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {faqsContent}
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

export default GetSupportPage;
