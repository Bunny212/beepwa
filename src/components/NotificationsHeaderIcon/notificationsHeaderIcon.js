import React, { useState, useMemo } from 'react';
import { node, shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { Link } from "react-router-dom";
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './notificationsHeaderIcon.module.css';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import NotificationIcon from '../Icons/notifications.svg';
import NotificationIconDesk from '../Icons/notificationsDesk.svg';
import Badge from '@mui/material/Badge';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS_DATA } from '../NotificationsPage/notificationsPage.qql';

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 4,
        top: 6,
        background: '#F00',
        maxWidth: '22px',
        maxHeight: '17px',
        fontSize: '11px',
        fontStyle: 'normal',
        fontWeight: '650'
    },
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
});

const StyledImage = styled('img')({
    height: '22px',
    width: '22px',
    marginTop: '-5px',
});

/**
 * A component that show notifications icon.
 */
const NotificationsHeaderIcon = props => {
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);
    const [badgeCount, setBadgeCount] = useState(0); // Initialize badge count
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const { loading, error, data } = useQuery(GET_NOTIFICATIONS_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });
    
    // const notifications = useMemo(() => {
    //     if (data && data.notifications) {
    //         return data.notifications;
    //     }
    //     return null;
    // }, [loading, data]);

    const notificationsCount = useMemo(() => {
        if (!loading && data && data.notifications) {
            return data.notifications.length;
        }
        return 0;
    }, [loading, data]);

    const handleBadgeClick = () => {
        // Clear the badge count when the icon is clicked
        setBadgeCount(0);
    };
    
    return (
        <>
            <Link
                aria-label={formatMessage({
                    id: 'notifications',
                    defaultMessage: 'Notifications'
                })}
                data-cy="notifications"
                to={{
                    pathname: resourceUrl('/notifications'),
                    state: { headerTitle: formatMessage({
                        id: 'notifications',
                        defaultMessage: 'Notifications'
                    })}
                }}
                onClick={handleBadgeClick}
            >
                <StyledAvatar>
                    <ImageWrapper>
                        <StyledBadge variant="dot" badgeContent={notificationsCount}>
                            <img
                                height='30px'
                                src={isDesktop ? NotificationIconDesk : NotificationIcon}
                                alt={formatMessage({
                                    id: 'notifications',
                                    defaultMessage: 'Notifications'
                                })}
                                title={formatMessage({
                                    id: 'notifications',
                                    defaultMessage: 'Notifications'
                                })}
                                width='20px'
                            />
                        </StyledBadge>
                    </ImageWrapper>
                </StyledAvatar>
            </Link>
        </>
    );
};

NotificationsHeaderIcon.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default NotificationsHeaderIcon;
