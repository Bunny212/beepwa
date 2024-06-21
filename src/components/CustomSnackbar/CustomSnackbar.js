import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = ({ open, autoHideDuration, onClose, severity, message, vertical = 'top' }) => {
    const backgroundColor = 'rgba(255, 255, 255, 0.22)';
    const boxShadow = '0px 0px 17px 0px rgba(0, 0, 0, 0.09)';
    const backdropFilter = 'blur(27.5px)';
    const color = '#000000';
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: vertical, horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ backgroundColor, boxShadow, backdropFilter, color }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
