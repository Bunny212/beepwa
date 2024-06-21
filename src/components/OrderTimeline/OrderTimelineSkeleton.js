import React, { useEffect, useState, useMemo } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

const OrderTimelineSkeleton = () => {
    const TOTAL_STEPS = 3;
    const statusStepMap = new Map([
        ["pending", { step: 1, label: 'Order placed' }],
        ["processing", { step: 2, label: 'Processing' }],
        ["complete", { step: 3, label: 'Delivered' }]
    ]);

    const stepLabels = useMemo(() => {
        const labels = [];
        for (let step = 1; step <= TOTAL_STEPS; step++) {
            const currentStatus = statusStepMap.get(Array.from(statusStepMap)[step - 1][0]);
            labels.push(currentStatus.label);
        }
        return labels;
    }, []);

    const stepElements = useMemo(() => {
        const elements = [];
        for (let step = 1; step <= TOTAL_STEPS; step++) {
            elements.push(
                <TimelineItem key={step} sx={{ minHeight: 'inherit' }}>
                    <TimelineSeparator>
                        <TimelineDot
                            sx={{
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                                margin: '0px',
                                borderColor: '#E0E0E0',
                            }}
                            variant={'outlined'}
                        />
                        {step < TOTAL_STEPS && (
                            <TimelineConnector
                                sx={{
                                    minHeight: '14px',
                                    backgroundColor: '#E0E0E0',
                                }}
                            />
                        )}
                    </TimelineSeparator>
                    <TimelineContent
                        sx={{
                            padding: '0 14px',
                            marginTop: '-5px',
                            fontFamily: 'Roobert',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            color: '#E0E0E0',
                        }}
                    >
                        {/* {step === 1 && 'Order placed'}
                        {step === 2 && 'Processing'}
                        {step === 3 && 'Delivered'} */}
                        {/* <Skeleton animation="wave" height={14} width="50%" /> */}
                        <Typography component="div" variant='caption'>
                            <Skeleton width="50%" />
                        </Typography>
                    </TimelineContent>
                </TimelineItem>
            );
        }
        return elements;
    }, []);

    return (
        <Timeline
            sx={{
                padding: '6px 0',
                [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                },
            }}
        >
            {stepElements}
        </Timeline>
    );
};

export default OrderTimelineSkeleton;
