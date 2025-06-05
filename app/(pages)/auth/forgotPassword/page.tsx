"use client";
import { Icons } from "assets";
import classNames from "classnames";
import AuthPageHeading from "components/auth/authPageHeading";
import CustomButton from "components/common/customButton";
import CustomInput from "components/common/customInput";
import { toastMessage } from "components/common/toast";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next13-progressbar";
import { routeConstant } from "routes/constants";
import { ForgotPasswordService } from "services/auth";
import { handleErrors } from "utils/helper";
import * as Yup from "yup";
import styles from "./style.module.scss";

const ForgotPassword = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: () => {
      handleResetPassword();
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = formik;

  const handleResetPassword = () => {
    setSubmitting(true);
    ForgotPasswordService(values)
      .then(({ status }) => {
        if (status) {
          toastMessage("success", "Reset password link sent to your email");
          router.push(routeConstant.login.path);
          resetForm();
        }
      })
      .catch((error) => {
        handleErrors(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={classNames(styles.auth_page_container)}>
      <div>
        <AuthPageHeading
          heading="Forgot password?"
          desc="Enter the email address associated with your account and we'll send you 4-digit OTP code to reset your password."
        />
        <div className={classNames(styles.auth_content_container)}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <CustomInput
                required
                label="Email Address"
                type="email"
                name="email"
                Icon={Icons.Email}
                placeholder="e.g. abc@example.com"
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? errors.email : ""}
              />
            </div>
            <div className="mt-4">
              <CustomButton
                title="Send Code"
                containerStyle="w-full bg-blue maxHeighted_btn"
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
              />
            </div>
          </form>
          <div className={classNames(styles.backLink)}>
            <Link
              className="flex items-center gap-1"
              href={routeConstant.login.path}
            >
              <span>
                <Icons.ArrowLeft />
              </span>
              Back To Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
