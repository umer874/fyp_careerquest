"use client";
import { Icons } from "assets";
import classNames from "classnames";
import AuthPageHeading from "components/auth/authPageHeading";
//import CustomAutoComplete from "components/common/customAutoComplete";
import CustomCheckbox from "components/common/customCheckbox";
import CustomInput from "components/common/customInput";
import CustomPhoneInput from "components/common/customPhoneInput";
import CustomFileUpload from "components/common/customProfileUpload";
import { FormikErrors, FormikTouched } from "formik";
import styles from "./style.module.scss";

interface StepOneProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  values: RegisterType;
  errors: FormikErrors<RegisterType>;
  touched: FormikTouched<RegisterType>;
  setFieldValue: (field: string, value: any) => void;
}

const StepOne = ({
  handleChange,
  values,
  touched,
  errors,
  setFieldValue,
}: StepOneProps) => {
  return (
    <div className={classNames(styles.auth_content_container)}>
      <AuthPageHeading
        heading="Welcome to CareerQuest!"
        desc="Your new password must be different from previously used passwords."
      />

      <div className="mt-3">
        <label className="inputLabel">Your Profile Photo</label>
      </div>
      <CustomFileUpload
        file={values.file}
        onFileChange={(file) => {
          if (file) {
            setFieldValue("file", file);
          }
        }}
      />
      <div className="flex flex-col w-full">
        <div className={classNames("flex lg:flex-row flex-col gap-2")}>
          <div className="lg:w-1/2 w-full">
            <CustomInput
              required
              label="First Name"
              type="text"
              name="firstName"
              customInputStyle="white-bg-input"
              customInputContainer="white-bg-input-max-height"
              placeholder="Enter your first name"
              value={values.firstName ?? ""}
              error={
                touched.firstName && errors.firstName ? errors.firstName : ""
              }
              onChange={handleChange}
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <CustomInput
              required
              label="Last Name"
              type="text"
              name="lastName"
              customInputStyle="white-bg-input"
              customInputContainer="white-bg-input-max-height"
              placeholder="Enter your last Name"
              value={values.lastName ?? ""}
              error={touched.lastName && errors.lastName ? errors.lastName : ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <CustomInput
          type="email"
          customInputStyle="white-bg-input"
          customInputContainer="white-bg-input-max-height"
          label="Email"
          name="email"
          Icon={Icons.Email}
          IconDirection="left"
          placeholder="contact@arlenemcopy.com"
          required
          value={values.email ?? ""}
          error={touched.email && errors.email ? errors.email : ""}
          onChange={handleChange}
        />

        <CustomInput
          type="date"
          isDate
          customInputStyle="white-bg-input"
          customInputContainer="white-bg-input-max-height"
          label="Date of Birth"
          name="dob"
          Icon={Icons.CalendarBlank}
          IconDirection="left"
          placeholder="YYYY-MM-DD"
          required
          value={values.dob}
          // onChange={(e) =>
          //   handleChange({
          //     // @ts-error
          //     target: { name: "dob", value: e.target.value },
          //   } as React.ChangeEvent<HTMLInputElement>)
          // }
          error={touched.dob && errors.dob ? errors.dob : ""}
        />

        <CustomPhoneInput
          required
          label="Phone Number"
          placeholder="000-000-0000"
          name="phone"
          customInputContainer="transparentPhoneInput"
          value={values.phone}
          error={touched.phone && errors.phone ? errors.phone : ""}
          onChange={(val) =>
            handleChange({
              target: { name: "phone", value: val },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />

  

        <div
          className=" flex items-center"
          onClick={() => {
            setFieldValue("checked", !values.checked);
          }}
        >
          <CustomCheckbox
            filtersCheckbox="filtersCheckbox"
            checked={values.checked}
            onChange={() => {
              setFieldValue("checked", !values.checked);
            }}
          />
          <label className={classNames(styles.label)}>
            Accept to <span>Privacy Policy</span> and{" "}
            <span>Terms & conditions</span>
          </label>
        </div>
        <div className={classNames("error w-full mb-3")}>
          {touched.checked && errors.checked ? errors.checked : ""}
        </div>
      </div>
    </div>
  );
};

export default StepOne;
