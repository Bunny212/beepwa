import React from 'react';
import { node, shape, string } from 'prop-types';
import { MessageSquare as MessageSquare } from 'react-feather';
import { Link } from 'react-router-dom';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useIntl } from 'react-intl';

import Icon from '@magento/venia-ui/lib/components/Icon';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './chatIcon.module.css';
import Image from '@magento/venia-ui/lib/components/Image';
import ChatIcon from '../Icons/ChatIcon.svg';
import NewChatIcon from '../Icons/chat.svg';

/**
 * A component that show info icon.
 */
const ChatNavigationTrigger = props => {
    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, props.classes);
    return (
        <Link
            className={classes.root}
            data-cy="Header-ChatNavigationTrigger-root"
            aria-label={formatMessage({
                id: 'help',
                defaultMessage: 'Help'
            })}
            to={{
                pathname: resourceUrl('/help'),
                state: { headerTitle: formatMessage({
                    id: 'help',
                    defaultMessage: 'Help'
                })}
            }}
        >
            <img
                height='20px'
                src={NewChatIcon}
                alt={formatMessage({
                    id: 'help',
                    defaultMessage: 'Help'
                })}
                title={formatMessage({
                    id: 'help',
                    defaultMessage: 'Help'
                })}
                width='20px'
            />
            {/* <Icon src={MessageSquare} /> */}
        </Link>
    );
};

ChatNavigationTrigger.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default ChatNavigationTrigger;
