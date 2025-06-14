"use client";
import classNames from "classnames";
import styles from "./style.module.scss";
import CustomPageHeader from "components/common/customPageHeader";
import Image from "next/image";
import { Icons, Images } from "assets";
import CustomInput from "components/common/customInput";
import CustomPhoneInput from "components/common/customPhoneInput";
import CustomTextArea from "components/common/customTextArea";
import CustomButton from "components/common/customButton";
import { useFormik } from "formik";
import { ContactVS } from "utils/validation";
import { ContactUsService } from "services/general";
import { handleErrors } from "utils/helper";
import { toastMessage } from "components/common/toast";
import { useSelector } from "react-redux";
import { ContactUs } from "_shared/types/general";

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
    <div className={classNames(styles.eventWrapper)}>
      <div className={classNames(styles.customContainer)}>
        <CustomPageHeader
          isContactHeader
          heading="We Want to Hear From You"
          description="Have questions or need assistance? Reach out to us! Whether you're a Participant, Fellow, Employer, or Mentor, our team is ready to support you."
        />
        <div
          className={classNames(
            styles.content,
            "grid md:grid-cols-2 grid-cols-1 xl:gap-16 lg:gap-8 gap-6"
          )}
        >
          <div className={classNames(styles.imgContainer)}>
            <Image
              width={628}
              height={708}
              src={Images.ContactImg}
              alt="contactImg"
            />
          </div>
          <div className={classNames(styles.formContainer)}>
            <h5>Get In Touch</h5>
            <p>You can also get in touch with us using the form below.</p>

            <form
              className={classNames(
                styles.contactForm,
                "grid grid-cols-12 gap-3"
              )}
            >
              <div className="xs:col-span-6 col-span-12">
                <CustomInput
                  customInputStyle="white-bg-input"
                  customInputContainer="white-bg-input-max-height"
                  label="First Name"
                  placeholder="e.g. John"
                  required
                  value={values.firstname}
                  error={
                    touched.firstname && errors.firstname
                      ? errors.firstname
                      : ""
                  }
                  onChange={handleChange("firstname")}
                />
              </div>
              <div className="xs:col-span-6 col-span-12">
                <CustomInput
                  customInputStyle="white-bg-input"
                  customInputContainer="white-bg-input-max-height"
                  label="Last Name"
                  placeholder="e.g. Doe"
                  required
                  value={values.lastname}
                  error={
                    touched.lastname && errors.lastname ? errors.lastname : ""
                  }
                  onChange={handleChange("lastname")}
                />
              </div>
              <div className="col-span-12">
                <CustomInput
                  customInputStyle="white-bg-input"
                  customInputContainer="white-bg-input-max-height"
                  Icon={Icons.Email}
                  label="Email Address"
                  placeholder="e.g. abc@example.com"
                  required
                  value={values.email}
                  error={touched.email && errors.email ? errors.email : ""}
                  onChange={handleChange("email")}
                />
              </div>
              <div className="col-span-12">
                <CustomPhoneInput
                  required
                  label="Phone Number"
                  customInputContainer="transparentPhoneInput"
                  value={values.phone}
                  error={touched.phone && errors.phone ? errors.phone : ""}
                  onChange={(val: string | undefined) => {
                    if (val) setFieldValue("phone", val);
                  }}
                />
              </div>
              <div className="col-span-12">
                <CustomTextArea
                  label="Your Message"
                  placeholder="Write something..."
                  rows={6}
                  required
                  value={values.message}
                  error={
                    touched.message && errors.message ? errors.message : ""
                  }
                  onChange={handleChange("message")}
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
                  onClick={() => {
                    handleSubmit();
                  }}
                  disabled={isSubmitting}
                  loading={isSubmitting}
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
