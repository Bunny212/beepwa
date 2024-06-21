import React from 'react';
import { node, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './errorMessage.module.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ErrorMessage = React.forwardRef((props, ref) => {
    const { children } = props;

    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div className={classes.root} ref={ref} data-cy="ErrorMessage-root">
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert className={classes.errorMessage} severity="error">{children}</Alert>
            </Stack>
        </div>
    );
});

export default ErrorMessage;

ErrorMessage.propTypes = {
    classes: shape({
        root: string,
        errorMessage: string
    }),
    children: node
};
