// validationSchema.js
import * as Yup from 'yup';

export const stepOneSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .length(10, 'Mobile number must be 10 digits'),
});

export const stepTwoSchema = Yup.object().shape({
  birthDate: Yup.string().required('Date of birth is required'),
  // baptismDate: Yup.string().required('Date of baptism is required'),
});

export const passConfirmPassValidation = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  cpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .when('isChangePasswordVisible', {
      is: true,
      then: Yup.string().required('Confirm password is required'),
    }),
});

// Validation Schema for Formik
// export const forgotPasswordValidation = Yup.object().shape({
//   email: Yup.string()
//     .email('Please enter a valid email')
//     .required('Email is required'),
//   otp: Yup.string()
//     .length(4, 'OTP must be 4 digits')
//     .when('isOTPFildVisible', {
//       is: true,
//       then: Yup.string().required('OTP is required'),
//     }),

//   ...passConfirmPassValidation,
// });

// Validation Schema for Formik
export const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),

  otp: Yup.lazy((value, {context}) =>
    context.isOTPFildVisible
      ? Yup.string()
          .length(4, 'OTP must be 4 digits')
          .required('OTP is required')
      : Yup.string().notRequired(),
  ),

  password: Yup.lazy((value, {context}) =>
    context.isChangePasswordVisible
      ? Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required')
      : Yup.string().notRequired(),
  ),

  cpassword: Yup.lazy((value, {context}) => {
    console.log('Context:', context);
    return context.isChangePasswordVisible
      ? Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm password is required')
      : Yup.string().notRequired();
  }),
});

// // Define validation schema
// export const loginValidationSchema = Yup.object().shape({
//   phone: Yup.string()
//     .email('Please enter a valid email address')
//     .required('Email is required'),
//   password: Yup.string().required('Password is required'),
// });

export const loginValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .transform((value, originalValue) => {
      // Remove all non-digits except leading '+'
      const cleaned = originalValue.replace(/[^\d+]/g, '');
      // Preserve '+' and following digits
      return cleaned.startsWith('+')
        ? '+' + cleaned.slice(1).replace(/\D/g, '')
        : cleaned.replace(/\D/g, '');
    })
    .test('is-indian-number', 'Invalid phone number', value => {
      if (!value) return false;

      // Check for +91 followed by 10 digits starting with 6-9
      if (value.startsWith('+91')) {
        return value.length === 13 && /^\+91[6-9]\d{9}$/.test(value);
      }
      // Check for 0 followed by 10 digits starting with 6-9
      else if (value.startsWith('0')) {
        return value.length === 11 && /^0[6-9]\d{9}$/.test(value);
      }
      // Check standard 10-digit number starting with 6-9
      else {
        return value.length === 10 && /^[6-9]\d{9}$/.test(value);
      }
    })
    .required('Phone number is required'),
  // password: Yup.string().required('Password is required'),
});
