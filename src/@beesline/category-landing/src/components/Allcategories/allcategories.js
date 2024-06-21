import React, { Fragment, useEffect } from 'react';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import {shape, string} from 'prop-types';
import { Link, useParams, useLocation } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import Image from '@magento/venia-ui/lib/components/Image';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { Skeleton } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';


import { styled } from '@mui/material/styles';
import NewIcon from '../Icons/NewIcon.svg';
import DealsIcon from '../Icons/DealsIcon.svg';
import RoutinesIcon from '../Icons/RoutinesIcon.svg';
import Top10Icon from '../Icons/Top10Icon.svg';
import CategoryIcon from '../Icons/CategoryIcon.svg';
import SkinIcon from '../Icons/SkinIcon.svg';
import IncIcon from '../Icons/IncIcon.svg';
import SeasonIcon from '../Icons/SeasonIcon.svg';

import defaultClasses from './index.css';
import { isNonEmptyArray } from '@apollo/client/utilities';

import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES  } from '../../queries/GetAllCategories';

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
    height: '30px',
    width: '30px',
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
    // const { categoryId } = useParams();
    const location = useLocation();
    //const categoryId = location.pathname.split('/').pop();
        // Split the pathname by '/'
    const pathSegments = location.pathname.split('/');

    // Get the last two segments as parameters
    const categoryId = pathSegments[pathSegments.length - 2];
    const all = pathSegments[pathSegments.length - 1];

    const { loading, error, data, refetch } = useQuery(GET_ALL_CATEGORIES, {
        variables: {
          categoryId: categoryId,
          all: all
        },
    });

    useEffect(() => {
        // Perform additional logic or data manipulation here on page load
        // You can also trigger a manual refetch if needed
        refetch();
    }, []);
    
    if (loading) {
        return (
            <div className={classes.root}>
                {/* Text Skeleton */}
                <Skeleton animation="wave" variant="text" width={100} height={25} />
        
                {/* Circular Skeletons */}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {[...Array(9)].map((_, index) => (
                            <Grid item xs={4} key={index}>
                                <Item>
                                    <Skeleton animation="wave" variant="circular" width={55} height={55} />
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                {/* Text Skeleton */}
                <Skeleton animation="wave" variant="text" width={100} height={25} />
        
                {/* Circular Skeletons */}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {[...Array(9)].map((_, index) => (
                            <Grid item xs={4} key={index}>
                                <Item>
                                    <Skeleton animation="wave" variant="circular" width={55} height={55} />
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        );
    }

    if (error) {
        return <ErrorContent errorMessage={error.message} />;
    }

    const { getAllCategories } = data;

    return (
        <Fragment>
            <div className={classes.root}>
                {getAllCategories.map(category => (
                    <div key={category.id}>
                        <h2 className={classes.heading}>{category.name}</h2>
                        <Box sx={{ flexGrow: 1 }}>
                        {category.subcategories && category.subcategories.length > 0 && (
                            <Grid sx={{ padding: '0px' }} container spacing={2}>
                            {category.subcategories.map(subcategory => (
                                <Grid sx={{ padding: '0px' }} item xs={4} key={subcategory.id}>
                                    <Item>
                                        <StyledLink
                                        aria-label='New'
                                        //to={resourceUrl('/category-landing/categoryinner/'+ subcategory.id)}
                                        to={{
                                            pathname: resourceUrl('/category-landing/expanded/' + subcategory.id),
                                            state: { parentCatName: category.name, subCatName: subcategory.name, categoryDescp: subcategory.catDescp, imageUrl: subcategory.imageUrl }
                                        }}
                                        data-cy="Category-Landing-quickAccess"
                                        >
                                        <StyledAvatar>
                                            <ImageWrapper>
                                            <StyledImage
                                                src={CategoryIcon}
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
        </Fragment>
    );
}

AllCategories.propTypes = {
    classes: shape({root: string})
};
AllCategories.defaultProps = {};
export default AllCategories;