import styles from "./style.module.scss";
import { Icons } from "assets";
import classNames from "classnames";
import AuthPageHeading from "components/auth/authPageHeading";
import CustomInput from "components/common/customInput";
import { FormikErrors, FormikTouched } from "formik";

interface StepTwoProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  values: CreatePasswordType;
  errors: FormikErrors<CreatePasswordType>;
  touched: FormikTouched<CreatePasswordType>;
}

const StepTwo = ({
  handleSubmit,
  handleChange,
  values,
  errors,
  touched,
}: StepTwoProps) => {
  return (
    <div>
      <AuthPageHeading
        heading="Set Your Password"
        desc="Create a secure password to protect your account and get started."
      />
      <div className={classNames(styles.auth_content_container)}>
        <form onSubmit={handleSubmit}>
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
              error={touched.password && errors.password ? errors.password : ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <CustomInput
              required
              label="Confirm Password"
              type="password"
              isPassword
              Icon={Icons.LockIcon}
              placeholder="Confirm password"
              name="confirmPassword"
              customInputStyle="white-bg-input"
              customInputContainer="white-bg-input-max-height"
              value={values.confirmPassword}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : ""
              }
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepTwo;
