import React, { Fragment, useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Link } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import defaultClasses from './notificationsPage.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ErrorOutline } from '@mui/icons-material';
import globeYellow from '../Icons/globeYellow.svg';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CustomLink from './customLink';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS_DATA } from './notificationsPage.qql';

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

const NotificationsPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const [invisible, setInvisible] = React.useState(false);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const rootClass = isDesktop ? classes.desktopRoot : classes.root;
    const { loading, error, data } = useQuery(GET_NOTIFICATIONS_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const notifications = useMemo(() => {
        if (data && data.notifications) {
            return data.notifications;
        }
        return null;
    }, [data]);

    // if (loading) {
    //     return (
    //         <div className={rootClass}>
    //             <Fragment>
    //                 <Grid container spacing={2}>
    //                     {Array(2).fill().map((_, index) => (
    //                     <React.Fragment key={index}>
    //                         <Grid item xs={9} sx={{ padding: '8px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    //                         <Skeleton variant="text" width='100%' height={20} />
    //                         <Skeleton variant="text" width='60%' height={10} />
    //                         <Skeleton variant="text" width='20%' height={10} />
    //                         </Grid>
    //                         <Grid item xs={3} sx={{ padding: '8px 0', display: 'flex', justifyContent: 'flex-end' }}>
    //                         <Skeleton variant="rounded" width={70} height={70} />
    //                         </Grid>
    //                     </React.Fragment>
    //                     ))}
    //                 </Grid>
    //         </Fragment>
    //       </div>
    //     );
    // }          

    if (error) {
        return <ErrorContent errorMessage={error.message} />;
    }

    let pageContent = (
        <Fragment>
            {notifications && notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={isDesktop ? 1 : 2} sx={{ padding: '8px 0' }}>
                                <Badge
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                    color="notification"
                                    variant="dot" invisible={invisible}>
                                    <img className={classes.notificationIcon} src={globeYellow} alt={notification.title} />
                                </Badge>
                            </Grid>
                            <Grid item xs={isDesktop ? 8 : 7} sx={{ padding: '8px 0', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <span className={classes.notificationTitle}>{notification.title}</span>
                                <span className={classes.notificationContent}>{notification.content}</span>
                                <span className={classes.notificationTimeAgo}>{notification.created_at}</span>
                                <div className={classes.notificationAction} >
                                    {notification.url_type === 'product' && (
                                        <Button
                                            component={Link}
                                            to={notification.url}
                                            className={classes.fullBtn}
                                            variant="contained"
                                            size="medium"
                                        >
                                            <FormattedMessage id="learnMore" defaultMessage="Learn More" />
                                        </Button>
                                    )
                                    }
                                    {notification.url_type === 'category' && (
                                        <Button
                                            component={Link}
                                            to={{
                                                pathname: resourceUrl(`/expand/${notification.pathKey}/${notification.url}`),
                                                state: {
                                                    parentCatName: notification.title,
                                                    categoryId: notification.url,
                                                    subCatName: '',
                                                    categoryDescp: '',
                                                    imageUrl: notification.category_img,
                                                    mobImageUrl: notification.category_mob_img,
                                                    viewAll: 0
                                                }
                                            }}
                                            className={classes.fullBtn}
                                            variant="contained"
                                            size="medium"
                                        >
                                            <FormattedMessage id="learnMore" defaultMessage="Learn More" />
                                        </Button>
                                    )}
                                    {notification.url_type === 'custom' && (
                                        <CustomLink classes={classes} href={notification.url} />
                                    )}
                                </div>
                            </Grid>
                            <Grid item xs={3} sx={{ padding: '8px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                <img className={classes.notificationImg} src={notification.image_url} srcSet={notification.image_url} alt={notification.title} loading="lazy" />
                            </Grid>
                        </Grid>
                        {index !== notifications.length - 1 && <Divider className={classes.notificationDivider} component="li" />}
                    </>
                ))
            ) : (
                <p><FormattedMessage id="noNotificationsAvailable" defaultMessage="There are no notifications available." /></p>
            )}
        </Fragment>
    );


    return (
        <div className={rootClass}>
            {pageContent}
        </div>
    );
};

export default NotificationsPage;
