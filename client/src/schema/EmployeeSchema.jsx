import * as Yup from 'yup';

const EmployeeSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot be longer than 50 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
    gender: Yup.string()
        .required('Gender is required'),
    role: Yup.string()
        .required('Please select a role'),
    degrees: Yup.array()
        .min(1, 'Please select at least one degree')
        .required('Please select at least one degree'),
   
});

export default EmployeeSchema;
