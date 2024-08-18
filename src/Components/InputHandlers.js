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

// Function to handle email input
export const handleEmailChange = text => {
  return text.replace(/^\s+/g, ''); // Remove leading spaces only
};
