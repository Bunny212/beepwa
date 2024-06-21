import { useIntl } from 'react-intl';

export const useToastMessages = props => {

    const formatMessage = (id, defaultMessage) => {
        const { formatMessage } = useIntl();
        return formatMessage({ id, defaultMessage });
    };
            
    const TOAST_MESSAGES = {
        success: formatMessage('toastMessages.success', 'Item added to cart!'),
        info: formatMessage('toastMessages.info', 'Item updated in cart!'),
        warning: formatMessage('toastMessages.warning', 'Item removed from cart!'),
    };

    return {
        TOAST_MESSAGES
    };

}