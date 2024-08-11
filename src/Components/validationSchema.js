import * as Yup from 'yup';

const sigupValidation = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  birthDate: Yup.date().required('Birthdate is required'),
});

const validationSchema = {
  sigupValidation,
};
export default validationSchema;
