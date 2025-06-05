"use client";
import { Icons } from "assets";
import classNames from "classnames";
import AuthPageHeading from "components/auth/authPageHeading";
import CustomButton from "components/common/customButton";
import CustomInput from "components/common/customInput";
import { toastMessage } from "components/common/toast";
import { useFormik } from "formik";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next13-progressbar";
import { useEffect, useRef } from "react";
import { routeConstant } from "routes/constants";
import { ResetPasswordService } from "services/auth";
import { handleErrors } from "utils/helper";
import { ResetPasswordVS } from "utils/validation";
import styles from "./style.module.scss";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenRef = useRef<string>("");
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordVS,
    onSubmit: (values) => {
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
    ResetPasswordService({
      token: tokenRef.current,
      password: values.password,
    })
      .then(({ status }) => {
        if (status) {
          toastMessage("success", "Password has been successfully updated!");
          resetForm();
          router.push(routeConstant.login.path);
        }
      })
      .catch((error) => {
        handleErrors(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    let token = searchParams.get("token");
    if (!token) {
      router.replace(routeConstant.login.path);
    } else {
      tokenRef.current = token;
    }
  }, []);

  return (
    <div className={classNames(styles.auth_page_container)}>
      <div>
        <AuthPageHeading
          heading="Set New Password"
          desc="Your new password must be different from previously used passwords."
        />
        <div className={classNames(styles.auth_content_container)}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <CustomInput
                required
                label="Create Password"
                type="password"
                isPassword
                Icon={Icons.LockIcon}
                placeholder="Enter password"
                name="password"
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.password && errors.password ? errors.password : ""
                }
              />
            </div>
            <div>
              <CustomInput
                required
                label="Confirm Password"
                type="password"
                isPassword
                Icon={Icons.LockIcon}
                placeholder="Enter password"
                name="confirmPassword"
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              />
            </div>
            <div className="mt-4">
              <CustomButton
                title="Set New Password"
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

export default ResetPassword;
