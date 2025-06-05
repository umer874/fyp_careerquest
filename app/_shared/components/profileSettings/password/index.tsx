"use client";
import React from "react";
import styles from "../style.module.scss";
import classNames from "classnames";
import CustomInput from "components/common/customInput";
import { Icons } from "assets";
import CustomButton from "components/common/customButton";
import { useFormik } from "formik";
import { UpdatePasswordVS } from "utils/validation";
import { UpdatePasswordService } from "services/auth";
import { toastMessage } from "components/common/toast";
import { handleErrors } from "utils/helper";

const initialValues: UpdatePasswordType = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

const PasswordSettings = () => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: UpdatePasswordVS,
    onSubmit: (values, actions) => {
      handleUpdatePassword();
    },
  });

  const {
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = formik;

  const handleUpdatePassword = () => {
    setSubmitting(true);

    UpdatePasswordService({
      current_password: values.currentPassword,
      password: values.password,
    })
      .then(({ status, data }) => {
        if (status) {
          toastMessage("success", "Password updated successfully");
          resetForm();
        }
      })
      .catch((err) => {
        handleErrors(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <section className={classNames(styles.sectionContainer)}>
      <h6>Change Password</h6>
      <form
        className={classNames(
          styles.profileForm,
          "grid grid-cols-12 gap-3 mt-4"
        )}
      >
        <div className="col-span-12">
          <CustomInput
            customInputStyle="white-bg-input"
            customInputContainer="white-bg-input-max-height"
            isPassword
            Icon={Icons.LockIcon}
            IconDirection="left"
            label="Current Password"
            placeholder="•••••••••••"
            required
            type="password"
            value={values.currentPassword}
            onChange={handleChange("currentPassword")}
            error={
              touched.currentPassword && errors.currentPassword
                ? errors.currentPassword
                : ""
            }
          />
        </div>
        <div className="xs:col-span-6 col-span-12">
          <CustomInput
            customInputStyle="white-bg-input"
            customInputContainer="white-bg-input-max-height"
            isPassword
            Icon={Icons.LockIcon}
            IconDirection="left"
            label="New Password"
            placeholder="•••••••••••"
            required
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            error={touched.password && errors.password ? errors.password : ""}
          />
        </div>
        <div className="xs:col-span-6 col-span-12">
          <CustomInput
            customInputStyle="white-bg-input"
            customInputContainer="white-bg-input-max-height"
            isPassword
            Icon={Icons.LockIcon}
            IconDirection="left"
            label="Confirm Password"
            placeholder="•••••••••••"
            required
            type="password"
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={
              touched.confirmPassword && errors.confirmPassword
                ? errors.confirmPassword
                : ""
            }
          />
        </div>
        <div
          className={classNames(
            styles.buttonContainer,
            "col-span-12 ml-auto mb-1"
          )}
        >
          <CustomButton
            title="Save Changes"
            containerStyle="bg-blue maxHeighted_btn w-full"
            loading={isSubmitting}
            disabled={isSubmitting}
            onClick={() => handleSubmit()}
          />
        </div>
      </form>
    </section>
  );
};

export default PasswordSettings;
