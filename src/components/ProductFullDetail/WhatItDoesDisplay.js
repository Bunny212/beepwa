import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ErrorOutline } from '@mui/icons-material';
import Image from '@magento/venia-ui/lib/components/Image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import prodImage2 from '../Images/prod-img2.jpg';
import { useQuery } from '@apollo/client';
import { GET_WHAT_IT_DOES_QUERY } from './whatItDoes.qql.js';

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

const WhatItDoesDisplay = ({ sku, classes }) => {
    // Check if the sku is valid
    if (!sku) {
        return null; // Returning null or an empty fragment is more appropriate than an empty string
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
    }));

    const StyledLink = styled(Link)({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        cursor: 'default',
        pointerEvents: 'none'
    });

    const StyledAvatar = styled(Avatar)(({ theme }) => ({
        width: 65,
        height: 65,
        borderRadius: '50%', // Rounded corners
        boxShadow: '0px', // Box shadow
        border: '1px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        overflow: 'hidden',
    }));

    const _StyledAvatar = styled(Avatar)(({ theme }) => ({
        width: 56,
        height: 56,
        borderRadius: '50%', // Rounded corners
        boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.12)', // Box shadow
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
    }));

    const ImageWrapper = styled('div')({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });

    const StyledImage = styled(Image)({
        height: '100%',
        width: '100%',
        marginTop: '-5px',
        aspectRatio: '1/1'
    });

    // Here, you can place your logic to fetch and display content based on the query result or other conditions.
    // You might use the useQuery hook to fetch data and then render the data accordingly.

    const { loading, error, data } = useQuery(GET_WHAT_IT_DOES_QUERY, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            sku: sku
        }
    });

    // if (loading) {
    //     return <p>loading</p>;
    // }

    const getWhatItDoes = useMemo(() => {
        if (data && data.whatitdoes) {
            return data.whatitdoes;
        }
          return null;
    }, [data]);

    if (error) {
        return <ErrorContent errorMessage={error.message} />;
    }

    return (
        getWhatItDoes && getWhatItDoes.length > 0 ? (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {getWhatItDoes.map((whatitdoes, index) => (
                        <Grid sx={{ paddingTop: '10px', paddingBottom: '0px', display: 'flex', justifyContent: 'center' }} item xs={3} lg={2} xl={2} key={index}>
                            <Item>
                                <StyledLink
                                    aria-label={whatitdoes.title}
                                    data-cy={`productFullDetail-whatItDoesItem-${index}`}
                                >
                                    <StyledAvatar>
                                        <Typography className={classes.whatItDoesTitle} variant="subtitle1" gutterBottom>
                                            {whatitdoes.title}
                                        </Typography>
                                    </StyledAvatar>
                                </StyledLink>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        ) : null
    );

    /*return (
        !loading && getWhatItDoes.length > 0 ? (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {getWhatItDoes.map((whatitdoes, index) => (
                        <Grid sx={{ paddingTop: '10px', paddingBottom: '0px' }} item xs={3} key={index}>
                            <Item>
                                <StyledLink
                                    aria-label={whatitdoes.title}
                                    data-cy={`productFullDetail-whatItDoesItem-${index}`}
                                >
                                    <StyledAvatar>
                                        <ImageWrapper>
                                            <StyledImage
                                                src={whatitdoes.iconUrl ? whatitdoes.iconUrl : prodImage2}
                                                alt={whatitdoes.title}
                                                title={whatitdoes.title}
                                            />
                                        </ImageWrapper>
                                    </StyledAvatar>
                                    <Typography className={classes.subTitle3} variant="subtitle1" gutterBottom>
                                        {whatitdoes.title}
                                    </Typography>
                                </StyledLink>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        ) : null
    );*/
};

export default WhatItDoesDisplay;
