import React, { useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { FormattedMessage, useIntl } from 'react-intl';
import defaultClasses from './topSearches.module.css';
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ErrorOutline } from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import 'swiper/swiper-bundle.css';
import { useQuery } from '@apollo/client';
import { GET_TOP_SEARCHES } from './topSearches.qql';

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

const TopSearches = props => {
    const { setSearchTerm } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const { loading, error, data } = useQuery(GET_TOP_SEARCHES, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });


    const handleChipClick = (label) => {
        console.log("Label = ", label);
        setSearchTerm(label);
    };

    const swiperChipConfig = {
        spaceBetween: 4,
        slidesPerView: 3.5,
        centeredSlides: false,
        grabCursor: true,
        loop: false
    };

    const topSearches = useMemo(() => {
        if (!loading && data && data.topSearches) {
          return data.topSearches;
        }
        return null;
    }, [loading, data]);

    // if (loading) {
    //     return null;
    // } 

    // if (error) {
    //     return <ErrorContent errorMessage={error.message} />;
    // }

    let pageContent = (
        !loading && topSearches.length > 0 ? (
            <>
                <span className={classes.topSearchesLabel}>
                    <FormattedMessage
                        id="topSearches.search"
                        defaultMessage="Top Searches"
                    />
                </span>
                <div className={classes.topSearchesKeywords}>
                    {topSearches.map((keyword, index) => (
                        <Chip
                            key={index}
                            // sx={{ width: '100%' }}
                            label={keyword.label}
                            variant="outlined"
                            onClick={() => handleChipClick(keyword.label)}
                        />
                    ))}
                </div>
            </>
        ) : null
    );

    return (
        <div className={classes.root}>
            {pageContent}
        </div>
    );
};

export default TopSearches;
