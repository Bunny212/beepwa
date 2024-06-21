import React, { Fragment } from 'react';
import Image from '@magento/venia-ui/lib/components/Image';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import ArrowIcon from '../Icons/Arrow.svg';
import QuestionCircle from '../Icons/bi_question_circle.svg';
import IconBox from './iconBox';

const FaqsLoader = props => {
    const classes = props.classes;

    const elements = Array.from({ length: 4 }, (_, index) => (
        <ListItemButton key={index + 1}
            className={classes.listItemBtn}>
            <ListItemText primary={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />} />
            <ListItemIcon sx={{ justifyContent: 'end' }}>
                <Image
                    height='25px'
                    src={ArrowIcon}
                    alt='Search'
                    title='Search'
                    width='15px'
                />
            </ListItemIcon>
        </ListItemButton>
    ));

    let pageContent = (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6}>
                    <IconBox src={QuestionCircle} />
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {elements}
                    </List>
                </Grid>
            </Box>
        </Fragment>
    )

    return (
        <div className={classes.root}>
            {pageContent}
        </div>
    );
};

export default FaqsLoader;
