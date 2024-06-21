import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

function getOrdinalIndicator(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function calculateBusinessDay(methodTitle, formatMessage) {
  const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl';
  const regexEn = /^(\d+)-/;
  const regexAr = /(\d+)|[\u0660-\u0669]+/;
  const regex = isRTL ? regexAr : regexEn;
  const match = methodTitle.match(regex);
  const number = match ? parseInt(match[1]) : null;

  if (number !== null) {
    const currentDate = new Date();

    for (let i = 0; i < number; i++) {
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);

      // Check if the current day is a weekend (Saturday or Sunday)
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        i--; // If it's a weekend day, decrement the count
      }
    }

    const day = currentDate.getDate();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const ordinalIndicator = getOrdinalIndicator(day);

    return { formattedDate, ordinalIndicator };
  } else {
    // Error message formatting
    return { formattedDate: formatMessage({ id: 'error.invalidInput' }), ordinalIndicator: '' };
  }
}

function FormattedEstimationDeliveryDate({ methodTitle, className }) {
  const { formatMessage } = useIntl();
  const { formattedDate, ordinalIndicator } = calculateBusinessDay(methodTitle, formatMessage);

  return (
    <span className={className}>
      {formattedDate}<sup>{ordinalIndicator}</sup>
    </span>
  );
}

export default FormattedEstimationDeliveryDate;
