// paymentHandler.js

import RazorpayCheckout from 'react-native-razorpay';
import {Alert} from 'react-native';

/**
 * Initialize Razorpay payment with the specified options
 * @param {number} amount - The amount to be paid (in INR)
 * @param {string} name - The name of the person/business receiving the payment
 * @param {string} email - User's email for pre-fill
 * @param {string} contact - User's contact number for pre-fill
 * @param {string} description - Description of the payment
 * @param {string} imageUrl - Logo image URL (optional)
 */
const initiatePayment = (
  amount,
  name,
  email,
  contact,
  description,
  imageUrl = '',
) => {
  if (amount <= 0) {
    Alert.alert('Invalid Amount', 'Please check the amount before proceeding.');
    return;
  }

  // Convert amount to paise (1 INR = 100 paise)
  const amountInPaise = amount * 100;

  const options = {
    description: description,
    image: imageUrl || 'https://your-website-logo-url.com/logo.png', // Replace with your logo URL
    currency: 'INR',
    key: '', // Replace with your Razorpay API Key
    amount: amountInPaise, // Amount in paise
    name: name,
    prefill: {
      email: email,
      contact: contact,
      name: name,
    },
    theme: {color: '#F37254'},
  };

  // Open Razorpay Checkout with the dynamic amount
  RazorpayCheckout.open(options)
    .then(data => {
      // Handle payment success
      onPaymentSuccess(data);
    })
    .catch(error => {
      // Handle payment error
      onPaymentFailure(error);
    });
};

/**
 * Handle payment success
 * @param {object} data - The Razorpay payment response data
 */
const onPaymentSuccess = data => {
  Alert.alert('Payment Successful', `Payment ID: ${data.razorpay_payment_id}`);
  // You can send the payment details to your backend or log the payment for tracking purposes
  console.log('Payment Details:', data);
};

/**
 * Handle payment failure
 * @param {object} error - The error response from Razorpay
 */
const onPaymentFailure = error => {
  Alert.alert('Payment Failed', `Error: ${error.description}`);
  console.log('Payment Error:', error);
};

export {initiatePayment};
