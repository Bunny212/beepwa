import React, { useMemo } from "react";
import { FormattedMessage } from 'react-intl';
import { Link } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
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
import { GET_CATEGORY_NAME } from './categoryName.qql.js';

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

const CategoryName = ({ sku, classes, isDesktop }) => {
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

    const { loading, error, data } = useQuery(GET_CATEGORY_NAME, {
        variables: {
            sku: sku
        }
    });

    const category = useMemo(() => {
        if (data && data.getParentCategoryBySku) {
            return data.getParentCategoryBySku;
        }
          return null;
    }, [data]);

    // if (loading) {
    //     return null;
    // }

    if (error) {
        return null;
    }

    return (
        category ? (
            <Typography sx={{ marginBottom: '0px' }} className={isDesktop ? classes.desktopSubTitle2 : classes.subTitle2} variant="subtitle2" gutterBottom>
                <Link
                    aria-label={category.name}
                    to={{
                        pathname: resourceUrl(`/expand/${category.pathKey}/${category.uid}`),
                        state: { parentCatName: category.name, categoryId: category.uid, subCatName: '', categoryDescp: category.catDescp, imageUrl: category.imageUrl, mobImageUrl: category.mobImageUrl, viewAll: 0 }
                    }}
                >
                    {category.name}
                </Link>
            </Typography>
        ) : null
    );
};

export default CategoryName;
