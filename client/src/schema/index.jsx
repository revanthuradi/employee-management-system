import * as yup from "yup";

export const signUpSchema = yup.object({
  userName: yup.string().min(2).max(25).required("Please enter your name"),
  password: yup
    .string()
    .min(6)
    .max(25)
    .required("Password must contain at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});


export const loginSchema = yup.object({
  email: yup.string().email().required("please Enter your email"),
  password: yup
    .string()
    .min(6)
    .max(25)
    .required("password must contain atleast 6 characters"),
});
