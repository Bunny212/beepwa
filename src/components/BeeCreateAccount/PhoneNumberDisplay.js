import React from "react";

const PhoneNumberDisplay = ({ phoneNumber, classes }) => {
  // Check if the phoneNumber is valid
  if (!phoneNumber) {
    return <span className={classes.phoneValue}>Invalid phone number</span>;
  }

  // Get the length of the last 4 digits to be hidden
  const hiddenDigits = 0;
  
  // Get the total length of the phone number
  const totalLength = phoneNumber.length;

  // Calculate the number of visible digits based on the total length and the digits to be hidden
  const visibleDigits = totalLength - hiddenDigits;

  // Create the hidden part with 'x'
  const hiddenPart = "x".repeat(hiddenDigits);

  // Combine the hidden part and the visible part (first digits)
  const formattedPhoneNumber = phoneNumber.slice(0, visibleDigits) + hiddenPart;

  return <span className={classes.phoneValue}>{formattedPhoneNumber}</span>;
};

export default PhoneNumberDisplay;
