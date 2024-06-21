/* src/components/SearchPage/searchPage.js */
import React from "react";
import { Link } from "react-router-dom";
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './upSellDrawer.module.css';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Image from '@magento/venia-ui/lib/components/Image';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import CompactUpIcon from '../Icons/CompactUp.svg';
import CompactUpIconBlack from '../Icons/CompactUpBlack.svg';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import prodImage from '../Images/prod-img.jpg';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpSellDrawer = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleDrawerClick = () => {
        handleClickOpen();
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const StyledAppBar = styled(AppBar)(({ theme }) => ({
        backgroundColor: 'white',
        color: '#000000',
        boxShadow: 'none'
    }));

  return (
    <div className={classes.root}>
        <IconButton onClick={() => handleDrawerClick()} className={classes.drawerAction} aria-label="compactUp" size="small">
            <img src={CompactUpIcon} alt="CompactUp" />
        </IconButton>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            className={classes.dialog}
            PaperProps={{
                style: {
                  borderRadius: '0 0 0 0',
                },
            }}
        >
            <StyledAppBar sx={{ position: 'relative' }}>
            <Toolbar sx={{ flexDirection: 'column' }}>
                <IconButton onClick={handleClose} className={classes.drawerAction} aria-label="compactUp" size="small">
                    <img src={CompactUpIconBlack} alt="CompactUp" />
                </IconButton>
                <Typography className={classes.drawerTitle} sx={{ flex: 1 }} variant="h6" component="div">
                      Add to your cart
                </Typography>
            </Toolbar>
            </StyledAppBar>
            <div className={classes.dialogRichContent}>
            <Box sx={{ margin: '0 0 0' }}>
                    <Grid sx={{ flexGrow: 1, padding: '0px' }} container spacing={2}>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Dialog>
    </div>
  );
};

export default UpSellDrawer;
