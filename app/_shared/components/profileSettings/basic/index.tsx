"use client";
import React from "react";
import styles from "../style.module.scss";
import CustomInput from "components/common/customInput";
import { Icons } from "assets";
import classNames from "classnames";
import CustomButton from "components/common/customButton";
import CustomPhoneInput from "components/common/customPhoneInput";
import { useDispatch, useSelector } from "react-redux";
import CustomFileUpload from "components/common/customProfileUpload";
import { useFormik } from "formik";
import { UpdateProfileVS } from "utils/validation";
import { UpdateProfileService } from "services/user";
import { toastMessage } from "components/common/toast";
import { handleErrors } from "utils/helper";
import { setAuthReducer } from "redux/reducers/authSlice";
import CustomAutoComplete from "components/common/customAutoComplete";
import { useCookies } from "react-cookie";
import moment from "moment";

interface BasicSettingsProps {
  userCookie: any;
}

const BasicSettings = ({ userCookie }: BasicSettingsProps) => {
  const {
    auth: { user, isLoggedIn, token, refreshToken },
  } = useSelector((state: any) => state.root);
  const [cookie, setCookie] = useCookies();

  const dispatch = useDispatch();

  const initialValues: UpdateProfileType = {
    firstName: user?.first_name ?? "",
    lastName: user?.last_name ?? "",
    email: user?.email ?? "",
    dob: user?.dob ? moment(user?.dob).format("YYYY-MM-DD") : "",
    address: user?.address ?? "",
    phone: user?.phone ?? "",
    coordinates: user?.coordinates?.coordinates ?? [],
    file: null,
    profileAsset: userCookie?.profile_asset ?? "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: UpdateProfileVS,
    onSubmit: (values, actions) => {
      handleUpdateProfile();
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
    setFieldValue,
  } = formik;

  const handleUpdateProfile = () => {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("firstname", values.firstName);
    formData.append("lastname", values.lastName);
    formData.append("dob", values.dob);
    formData.append("address", values.address);
    formData.append("phonenumber", values.phone);
    formData.append("coordinates", JSON.stringify(values.coordinates));
    if (values.file) {
      formData.append("profile_image", values.file);
    }

    UpdateProfileService(formData)
      .then(({ status, data }) => {
        if (status) {
          toastMessage("success", "Profile Updated Successfully");
          dispatch(
            setAuthReducer({
              user: data?.data,
              token: token,
              refreshToken: refreshToken,
              isLoggedIn: isLoggedIn,
            })
          );

          setCookie(
            "user",
            JSON.stringify({
              isLoggedIn: true,
              id: data?.data?.id,
              first_name: data?.data?.first_name,
              last_name: data?.data?.last_name,
              email: data?.data?.email,
              role: data?.data?.type,
              profile_asset: data?.data?.profile_asset?.full_path ?? "",
              resume_asset: data?.data?.resume_asset?.full_path ?? "",
            }),
            {
              path: "/",
              maxAge: 3600 * 24 * 30,
              sameSite: true,
            }
          );
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
      <h6>Account Information</h6>
      <div className="mt-4 mb-3">
        <label>Your Profile Photo</label>
      </div>
      <CustomFileUpload
        file={values.file}
        onFileChange={(file) => {
          if (file) {
            setFieldValue("file", file);
          }
        }}
        previewURL={values.profileAsset}
      />
      <form
        className={classNames(styles.profileForm, "grid grid-cols-12 gap-3")}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="xs:col-span-6 col-span-12">
          <CustomInput
            customInputStyle="white-bg-input"
            customInputContainer="white-bg-input-max-height"
            label="First Name"
            placeholder="Arlene"
            required
            value={values.firstName}
            name="firstName"
            onChange={handleChange("firstName")}
            error={
              touched.firstName && errors.firstName ? errors.firstName : ""
            }
          />
        </div>
        <div className="xs:col-span-6 col-span-12">
          <CustomInput
            customInputStyle="white-bg-input"
            customInputContainer="white-bg-input-max-height"
            label="Last Name"
            placeholder="McCoy"
            required
            value={values.lastName}
            name="lastName"
            onChange={handleChange("lastName")}
            error={touched.lastName && errors.lastName ? errors.lastName : ""}
          />
        </div>
        <div className="xs:col-span-6 col-span-12">
          <CustomInput
            type="email"
            customInputStyle="white-bg-input"
            customInputContainer="white-bg-input-max-height"
            label="Email"
            Icon={Icons.Email}
            IconDirection="left"
            placeholder="contact@arlenemccopy.com"
            required
            value={values.email}
            name="email"
            onChange={handleChange("email")}
            error={touched.email && errors.email ? errors.email : ""}
            readOnly
          />
        </div>
        <div className="xs:col-span-6 col-span-12">
          <CustomPhoneInput
            required
            name="phone"
            label="Phone Number"
            customInputContainer="transparentPhoneInput"
            value={values.phone}
            onChange={(val) => {
              if (val) {
                setFieldValue("phone", val);
              }
            }}
            error={touched.phone && errors.phone ? errors.phone : ""}
          />
        </div>

        <div className="col-span-6">
          <CustomInput
            customInputStyle="white-bg-input"
            customInputContainer="white-bg-input-max-height"
            Icon={Icons.Calendar}
            label="Date of Birth"
            IconDirection="left"
            type="date"
            isDate
            placeholder="MM/DD/YYYY"
            value={values.dob}
            name="dob"
            onChange={handleChange("dob")}
            error={touched.dob && errors.dob ? errors.dob : ""}
          />
        </div>

        <div className={"col-span-6"}>
          <CustomAutoComplete
            customInputStyle="white-bg-input"
            customInputContainer="white-bg-input-max-height"
            Icon={Icons.LocationPin}
            label="Mailing Address"
            placeholder="2972 123 Main Street, Boston, MA 02116, USA"
            required
            value={values.address}
            name="address"
            onChange={handleChange("address")}
            error={
              touched.address && errors.address
                ? errors.address
                : touched.coordinates && errors.coordinates
                ? String(errors.coordinates)
                : ""
            }
            formikKey="address"
            setFieldValue={setFieldValue}
            addressKey="coordinates"
          />
        </div>
        <div
          className={classNames(
            styles.buttonContainer,
            "col-span-12 ml-auto mb-4"
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

export default BasicSettings;
