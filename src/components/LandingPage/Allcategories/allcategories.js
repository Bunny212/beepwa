import React, { Fragment, useMemo } from 'react';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import {shape, string} from 'prop-types';
import { Link, useLocation, useParams } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import Image from '@magento/venia-ui/lib/components/Image';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { Skeleton } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';


import { styled } from '@mui/material/styles';
import CategoryIcon from '../Icons/CategoryIcon.svg';

import defaultClasses from './allcategories.module.css';

import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES  } from '../queries/GetAllCategories';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledLink = styled(Link)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 65,
    height: 65,
    boxShadow: '0px', // Box shadow
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
}));
  
const ImageWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
  
const StyledImage = styled(Image)({
    // height: '30px',
    // width: '30px',
    marginTop: '-5px',
});

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

const AllCategories = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const location = useLocation();
    const { formatMessage } = useIntl();
    const { uid, all } = useParams();
    //const { categoryId, all } = location.state || {};

    const { loading, error, data, refetch } = useQuery(GET_ALL_CATEGORIES, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            categoryId: uid,
            all: all
        },
    });

    const getAllCategories = useMemo(() => {
        if (data && data.getAllCategories) {
            return data.getAllCategories;
          }
          return null;
    }, [data]);

    // useEffect(() => {
    //     refetch();
    // }, []);
    
    // if (loading) {
    //     return (
    //         <div className={classes.root}>
    //             {/* Text Skeleton */}
    //             <Skeleton animation="wave" variant="text" width={100} height={25} />
        
    //             {/* Rounded Skeletons */}
    //             <Box sx={{ flexGrow: 1 }}>
    //                 <Grid container spacing={2}>
    //                     {[...Array(9)].map((_, index) => (
    //                         <Grid item xs={4} key={index}>
    //                             <Item>
    //                                 <Skeleton animation="wave" variant="rounded" width={55} height={55} />
    //                             </Item>
    //                         </Grid>
    //                     ))}
    //                 </Grid>
    //             </Box>
    //             {/* Text Skeleton */}
    //             <Skeleton animation="wave" variant="text" width={100} height={25} />
        
    //             {/* Rounded Skeletons */}
    //             <Box sx={{ flexGrow: 1 }}>
    //                 <Grid container spacing={2}>
    //                     {[...Array(9)].map((_, index) => (
    //                         <Grid item xs={4} key={index}>
    //                             <Item>
    //                                 <Skeleton animation="wave" variant="rounded" width={55} height={55} />
    //                             </Item>
    //                         </Grid>
    //                     ))}
    //                 </Grid>
    //             </Box>
    //         </div>
    //     );
    // }

    if (error) {
        return <ErrorContent errorMessage={error.message} />;
    }

    return (
        <Fragment>
            <div className={classes.root}>
                {getAllCategories && getAllCategories.categories.map(category => (
                    <div key={category.uid}>
                        <h2 className={classes.heading}>{category.name}</h2>
                        <Box sx={{ flexGrow: 1 }}>
                        {category.subcategories && category.subcategories.length > 0 && (
                            <Grid sx={{ padding: '0px' }} container spacing={2}>
                            {category.subcategories.map(subcategory => (
                                <Grid sx={{ padding: '0px' }} item xs={4} key={subcategory.uid}>
                                    <Item>
                                        <StyledLink
                                        aria-label='New'
                                        to={{
                                            pathname: resourceUrl(`/expand/${subcategory.pathKey}/${subcategory.uid}`),
                                            state: {
                                                parentCatName: subcategory.title,
                                                categoryId: subcategory.uid,
                                                subCatName: subcategory.name,
                                                categoryDescp: subcategory.description,
                                                imageUrl: subcategory.imageUrl,
                                                mobImageUrl: subcategory.mobImageUrl
                                            }
                                        }}
                                        data-cy="Category-Landing-quickAccess"
                                        >
                                        <StyledAvatar>
                                            <ImageWrapper>
                                            <StyledImage
                                                src={subcategory.iconUrl ? subcategory.iconUrl : CategoryIcon}
                                                alt={subcategory.name}
                                                title={subcategory.name}
                                            />
                                            </ImageWrapper>
                                        </StyledAvatar>
                                        <Typography className={classes.categoryTitle} variant="subtitle1" gutterBottom>
                                            {subcategory.name}
                                        </Typography>
                                        </StyledLink>
                                    </Item>
                                </Grid>
                            ))}
                            </Grid>
                        )}
                        </Box>
                        <br/>
                    </div>
                ))}
            </div>
            <Paper sx={{ position: 'fixed', bottom: '10px', left: 0, right: 0, zIndex: '99999999', background: 'transparent', padding: '0 10px' }} elevation={0}>
                {/* {loading ? (
                    <Button disabled className={classes.fullBtn} variant="contained" size="medium">
                        <Skeleton variant="text" height={15} width={120} />
                    </Button>
                ) : ( */}
                {getAllCategories && (
                    <Button component={Link} to={{
                    pathname: resourceUrl(`/expand/${getAllCategories.pathKey}/${getAllCategories.uid}`),
                    state: {parentCatName: formatMessage({ id: "viewAllProducts.parentCatName" }), categoryId: uid, subCatName: '', categoryDescp: '', imageUrl: getAllCategories.imageUrl, mobImageUrl: getAllCategories.mobImageUrl, viewAll: 1 }
                    }} className={classes.fullBtn} variant="contained" size="medium">
                        <FormattedMessage id="viewAllProducts.buttonText" />
                    </Button>
                )}
                {/* )} */}
            </Paper>
        </Fragment>
    );
}

AllCategories.propTypes = {
    classes: shape({root: string})
};
AllCategories.defaultProps = {};
export default AllCategories;