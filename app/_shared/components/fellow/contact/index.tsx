"use client";

import classNames from "classnames";
import styles from "./style.module.scss";
import { Icons, Images } from "assets";
import Image from "next/image";
import CustomInput from "components/common/customInput";
import CustomPhoneInput from "components/common/customPhoneInput";
import CustomTextArea from "components/common/customTextArea";
import CustomButton from "components/common/customButton";
import { ContactUsService } from "services/general";
import { toastMessage } from "components/common/toast";
import { handleErrors } from "utils/helper";
import { ContactVS } from "utils/validation";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

const Contact = () => {
  const { auth } = useSelector((state: any) => state.root);
  const initialValues: ContactUs = {
    firstname: auth?.user?.first_name || "",
    lastname: auth?.user?.last_name || "",
    email: auth?.user?.email || "",
    phone: auth?.user?.phone || "",
    message: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: ContactVS,
    onSubmit: (values, actions) => {
      handleContactUs();
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
    resetForm,
  } = formik;

  const handleContactUs = () => {
    setSubmitting(true);
    ContactUsService(values)
      .then(({ status }) => {
        if (status) {
          toastMessage("success", "Message Sent Successfully");
          if (auth?.isLoggedIn) {
            setFieldValue("message", "");
          } else {
            resetForm();
          }
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
    <div className={classNames(styles.customContainer)}>
      <div
        className={classNames(
          styles.pageDetailWrapper,
          "grid md:grid-cols-2 grid-cols-1"
        )}
      >
        <div className={classNames(styles.heading, "md:border-r")}>
          <h4>Need Help? Contact Us!</h4>
          <div
            className={classNames(
              styles.emailContainer,
              "flex xs:flex-row flex-col items-center gap-2.5"
            )}
          >
            <span
              className={classNames(
                styles.iconContainer,
                "flex items-center justify-center"
              )}
            >
              <Icons.Email />
            </span>
            <p>help@careerquest.com</p>
          </div>

          <Image src={Images.ContactImg} alt="contact"className="pr-7" />
        </div> 
        <div className={classNames(styles.contactForm, "md:mt-0 xs:mt-4 mt-3")}>
          <div className={classNames(styles.formHeading)}>
            <h5>Get In Touch</h5>
            <p>You can also get in touch with us using the form below.</p>
            <form
              className={classNames(styles.form, "grid grid-cols-12 gap-2")}
              onSubmit={handleSubmit}
            >
              <div className="xs:col-span-6 col-span-12">
                <CustomInput
                  label="First Name"
                  placeholder="e.g. John"
                  customInputContainer="white-bg-input-max-height"
                  required
                  value={values.firstname}
                  onChange={handleChange("firstname")}
                  error={
                    touched.firstname && errors.firstname
                      ? errors.firstname
                      : ""
                  }
                />
              </div>
              <div className="xs:col-span-6 col-span-12">
                <CustomInput
                  label="Last Name"
                  placeholder="e.g. Doe"
                  customInputContainer="white-bg-input-max-height"
                  required
                  value={values.lastname}
                  onChange={handleChange("lastname")}
                  error={
                    touched.lastname && errors.lastname ? errors.lastname : ""
                  }
                />
              </div>
              <div className="col-span-12">
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
                  onChange={handleChange("email")}
                  error={touched.email && errors.email ? errors.email : ""}
                />
              </div>
              <div className="col-span-12">
                <CustomPhoneInput
                  required
                  label="Phone Number"
                  customInputContainer="transparentPhoneInput"
                  value={values.phone}
                  onChange={(val) => setFieldValue("phone", val)}
                  error={touched.phone && errors.phone ? errors.phone : ""}
                />
              </div>
              <div className="col-span-12">
                <CustomTextArea
                  label="Your Message"
                  placeholder="Write something..."
                  rows={6}
                  required
                  value={values.message}
                  onChange={handleChange("message")}
                  error={
                    touched.message && errors.message ? errors.message : ""
                  }
                />
              </div>
              <div
                className={classNames(
                  styles.buttonContainer,
                  "flex justify-end col-span-12"
                )}
              >
                <CustomButton
                  containerStyle="bg-blue maxHeighted_btn"
                  title="Send Message"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onClick={() => handleSubmit()}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
