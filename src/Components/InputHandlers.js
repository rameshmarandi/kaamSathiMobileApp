// inputHandlers.js

// Function to handle general text input (string fields)
export const handleTextChange = text => {
  return text
    .replace(/^\s+/g, '') // Remove leading spaces
    .replace(/[^a-zA-Z\s]/g, '') // Remove special characters, allow only letters and spaces
    .replace(/\s+/g, ' '); // Allow only one space between words
};

// Function to handle numeric input (number fields)
export const handleNumberChange = text => {
  return text.replace(/[^0-9]/g, ''); // Remove everything except digits
};

export const numberWithDecimal = text => {
  return text
    .replace(/[^0-9.]/g, '') // Allow only digits and a decimal point
    .replace(/(\..*)\./g, '$1'); // Ensure only one decimal point is allowed
};

// Function to handle email input
export const handleEmailChange = text => {
  return text.replace(/^\s+/g, ''); // Remove leading spaces only
};

export const removeSpaces = text => {
  return text
    .replace(/[^a-zA-Z\s]/g, '') // Remove special characters, allowing only letters and spaces
    .replace(/\s{2,}/g, ' ') // Replace multiple spaces with a single space
    .replace(/^\s+/g, ''); // Remove leading spaces
};
