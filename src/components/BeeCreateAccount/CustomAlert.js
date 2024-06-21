import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = props => {
  const { severity, title, onClose, children } = props;

  return (
    <Alert severity={severity} action={onClose && <IconButton onClick={onClose}><CloseIcon /></IconButton>}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  );
};

export default CustomAlert;
