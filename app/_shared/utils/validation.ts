import * as yup from "yup";

const passwordRegExp = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/;

const LoginVS = yup.object().shape({
  email: yup
    .string()
    .required("Email is Required")
    .email("Invalid Email")
    .label("Email"),
  password: yup.string().required("Password is Required").label("Password"),
});

const ForgotPasswordVS = yup.object().shape({
  email: yup
    .string()
    .required("Email is Required")
    .email("Invalid Email")
    .label("Email"),
});

const ResetPasswordVS = yup.object().shape({
  password: yup
    .string()
    .required("New Password is Required")
    .matches(
      passwordRegExp,
      "Password must contain at least One Upper Case Character, One Lower Case Character, One Special Character and One Number"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is Required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

const RegisterVS = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is Required")
    .label("First Name"),
  lastName: yup.string().required("Last Name is Required").label("Last Name"),
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is Required")
    .label("Email"),
  dob: yup.mixed().required("Date of Birth is Required").label("Date of Birth"),
  phone: yup
    .string()
    .required("Phone Number is Required")
    .label("Phone Number"),
  // address: yup.string().required("Address is Required").label("Address"),
  // coordinates: yup
  //   .array()
  //   .min(2, "Please select your address from the dropdown")
  //   .required("Please select your address from the dropdown")
  //   .label("Coordinates"),
  checked: yup
    .boolean()
    .oneOf([true], "Terms and Conditions are Required")
    .required("Terms and Conditions are Required")
    .label("Terms and Conditions"),
});

const UpdateProfileVS = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is Required")
    .label("First Name"),
  lastName: yup.string().required("Last Name is Required").label("Last Name"),
  dob: yup.mixed().required("Date of Birth is Required").label("Date of Birth"),
  phone: yup
    .string()
    .required("Phone Number is Required")
    .label("Phone Number"),
  address: yup.string().required("Address is Required").label("Address"),
  coordinates: yup
    .array()
    .min(2, "Please select your address from the dropdown")
    .required("Please select your address from the dropdown")
    .label("coordinates"),
});

const UpdateEducationsVS = yup.object().shape({
  educations: yup.array().of(
    yup.object().shape({
      institute: yup
        .string()
        .required("Institute is Required")
        .trim("Institute cannot include leading and trailing spaces")
        .strict(true)
        .label("Institute")
        .min(3, "Institute must be at least 3 characters long"),
      degree: yup
        .string()
        .required("Degree is Required")
        .trim("Degree cannot include leading and trailing spaces")
        .strict(true)
        .label("Degree"),
      completion_date: yup
        .mixed()
        .label("Completion Date")
        .required("Completion Date is Required")
        .strict(true),
    })
  ),
});

const UpdateExperienceVS = yup.object().shape({
  exps: yup.array().of(
    yup.object().shape({
      institute: yup
        .string()
        .required("Institute is Required")
        .trim("Institute cannot include leading and trailing spaces")
        .strict(true)
        .label("Institute")
        .min(3, "Institute must be at least 3 characters long"),
      designation: yup
        .string()
        .required("Designation is Required")
        .trim("Designation cannot include leading and trailing spaces")
        .strict(true)
        .label("Designation"),
      from: yup
        .mixed()
        .label("Start Date")
        .required("Start Date is Required")
        .strict(true),
      to: yup
        .mixed()
        .label("Completion Date")
        .required("Completion Date is Required")
        .strict(true),
    })
  ),
});

const UpdatePasswordVS = yup.object().shape({
  currentPassword: yup.string().required("Current Password is Required"),
  password: yup
    .string()
    .required("New Password is Required")
    .matches(
      passwordRegExp,
      "Password must contain at least One Upper Case Character, One Lower Case Character, One Special Character and One Number"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is Required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

const ContactVS = yup.object().shape({
  firstname: yup
    .string()
    .required("First Name is Required")
    .label("First Name"),
  lastname: yup.string().required("Last Name is Required").label("Last Name"),
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is Required")
    .label("Email"),
  phone: yup
    .string()
    .required("Phone Number is Required")
    .label("Phone Number"),
  message: yup.string().required("Message is Required").label("Message"),
});

const ApplyFellowShipVS = yup.object().shape({
  email: yup
    .string()
    .required("Email is Required")
    .email("Invalid Email")
    .label("email"),
  reason: yup.string().required("Reason is Required").label("Reason"),
});

const CreatePortfolioVS = yup.object().shape({
  title: yup.string().required("Title is Required").label("Title"),
  description: yup
    .string()
    .required("Description is Required")
    .label("Description"),
  file: yup.mixed().required("File is Required").label("File"),
});

const UpdatePortfolioVS = yup.object().shape({
  title: yup.string().required("Title is Required").label("Title"),
  description: yup
    .string()
    .required("Description is Required")
    .label("Description"),
  file: yup.mixed().label("File").nullable(),
});

const JobApplicationStep1 = yup.object().shape({
  email: yup
    .string()
    .required("Email is Required")
    .email("Invalid Email")
    .label("email"),
  phonenumber: yup
    .string()
    .required("Phone Number is Required")
    .label("phonenumber"),
});

const JobApplicationStep2 = yup.object().shape({
  resume: yup.mixed().required("Resume is Required").label("Resume"),
  cover_letter: yup
    .mixed()
    .required("Cover Letter is Required")
    .label("Cover Letter"),
  projects: yup.array().of(yup.number()).label("Projects"),
  portfolios: yup.array().of(yup.number()).label("Portfolios"),
});

export {
  LoginVS,
  ForgotPasswordVS,
  RegisterVS,
  UpdateProfileVS,
  UpdatePasswordVS,
  ContactVS,
  ResetPasswordVS,
  UpdateEducationsVS,
  UpdateExperienceVS,
  ApplyFellowShipVS,
  CreatePortfolioVS,
  UpdatePortfolioVS,
  JobApplicationStep1,
  JobApplicationStep2,
};
