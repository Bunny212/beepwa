import React, { useEffect, useState, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { timelineItemClasses } from '@mui/lab/TimelineItem';

const OrderTimeline = ({ status }) => {
    const { formatMessage } = useIntl();
    const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl';
    const TOTAL_STEPS = 3;
    const statusStepMap = new Map([
        ["pending", { step: 1, label: formatMessage({ id: 'orderPlaced', defaultMessage: 'Order placed' }) }],
        ["processing", { step: 2, label: formatMessage({ id: 'processing', defaultMessage: 'Processing' }) }],
        ["complete", { step: 3, label: formatMessage({ id: 'delivered', defaultMessage: 'Delivered' }) }]
    ]);

    // Changed the way currentStep and currentStatus are derived
    const currentStep = statusStepMap.get(status.toLowerCase())?.step;
    //const currentStep = statusStepMap.get(status.toLowerCase()).step;
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
                                backgroundColor:
                                    step <= currentStep ? '#FFC629' : 'transparent',
                                boxShadow: 'none',
                                margin: '0px',
                                borderColor: step <= currentStep ? '#FFC629' : '#E0E0E0',
                            }}
                            variant={step <= currentStep ? 'filled' : 'outlined'}
                        />
                        {step < TOTAL_STEPS && (
                            <TimelineConnector
                                sx={{
                                    minHeight: '14px',
                                    backgroundColor:
                                        step < currentStep ? '#E0E0E0' : '#E0E0E0',
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
                            color:
                                step <= currentStep ? '#000' : '#E0E0E0',
                            ...(isRTL && { textAlign: 'right' })
                        }}
                    >
                        {/* {step === 1 && 'Order placed'}
                        {step === 2 && 'Processing'}
                        {step === 3 && 'Delivered'} */}
                        {stepLabels[step - 1]}
                    </TimelineContent>
                </TimelineItem>
            );
        }
        return elements;
    }, [currentStep]);

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

export default OrderTimeline;
