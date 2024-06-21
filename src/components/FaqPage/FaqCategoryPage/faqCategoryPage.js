import React, { Fragment, useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Link, useParams, useLocation } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import defaultClasses from './faqCategory.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import Image from '@magento/venia-ui/lib/components/Image';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowIcon from '../../Icons/Arrow.svg';
import QuestionCircle from '../../Icons/bi_question_circle.svg';
import IconBox from '../iconBox';
import { ErrorOutline } from '@mui/icons-material';
import FaqsLoader from '../faqsLoader';

import { useQuery } from '@apollo/client';
import { GET_FAQS_QUESTIONS_BY_CATEGORY } from '../talons/faqsQuestions.qql';

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

function convertToIdentifier(title) {
    const cleanedTitle = title.replace(/[^\w\s]/g, ''); // Remove non-word characters
    return cleanedTitle.toLowerCase().replace(/\s+/g, '-');
}

const FaqCategoryPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { category } = useParams();
    const location = useLocation();
    const { faqCategoryId } = location.state || {};
    const { formatMessage } = useIntl();
    const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl';

    const { loading, error, data, refetch } = useQuery(GET_FAQS_QUESTIONS_BY_CATEGORY, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            id: faqCategoryId
        }
    });

    const getFaqsQuestionsByCategeoryId = useMemo(() => {
        if (data && data.getFaqsQuestionsByCategeoryId) {
            return data.getFaqsQuestionsByCategeoryId;
          }
          return null;
    }, [data]);

    if (loading) {
        return (
            <FaqsLoader classes={classes} />
        );
    }

    if (error) {
        return <ErrorContent errorMessage={error.message} />;
    }

    let questionsContent = (
        getFaqsQuestionsByCategeoryId.map(question => (
            <ListItemButton key={question.question_id} component={Link} to={{
                pathname: resourceUrl(`/faq/${category}/${convertToIdentifier(question.title)}`),
                state: { headerTitle: `${category}`, articleTitle: question.title, articleContent: question.description }
            }} className={classes.listItemBtn}>
                <ListItemText primary={question.title} />
                <ListItemIcon sx={{ justifyContent: 'end', ...(isRTL && { justifyContent: 'flex-start', transform: 'rotate(180deg)' }) }}>
                    <Image
                        height='25px'
                        src={ArrowIcon}
                        alt='Search'
                        title='Search'
                        width='15px'
                    />
                </ListItemIcon>
            </ListItemButton>
        ))
    );

    let pageContent = (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6}>
                    <IconBox src={QuestionCircle} />
                    <Typography sx={{ mt: 4, mb: 2 }} className={classes.pageTitle} component="div">
                        {category}
                    </Typography>
                    <Typography sx={{ mt: 4, mb: 2 }} className={classes.pageSubTitle}>
                        <FormattedMessage id="faqMoreCommitments" defaultMessage="Find out more about our commitments below." />
                    </Typography>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {questionsContent}
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

export default FaqCategoryPage;
