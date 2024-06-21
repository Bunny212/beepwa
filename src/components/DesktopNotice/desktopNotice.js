import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { node, shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from "react-router-dom";
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './desktopNotice.module.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

  
const DesktopNotice = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // Open the dialog when the component mounts
        handleClickOpen();
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

    return (
        <div className={classes.root}>
            <Stack sx={{ width: '100%', marginBottom: '10px' }} spacing={2}>
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    "Kindly access the website on your mobile device as we are in the process of launching the desktop version today. Enjoy your shopping experience on your mobile device!"
                </Alert>
            </Stack>
            <React.Fragment>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Desktop Version Launch Today."}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    "Kindly access the website on your mobile device as we are in the process of launching the desktop version today.<br/>Enjoy your shopping experience on your mobile device!"
                    </DialogContentText>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        </div>
    );
};


export default DesktopNotice;
