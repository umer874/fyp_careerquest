import CustomModal from "components/common/customModal";
import styles from "./style.module.scss";
import classNames from "classnames";
import CustomInput from "components/common/customInput";
import { Icons, Images } from "assets";
import CustomPhoneInput from "components/common/customPhoneInput";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { JobApplicationStep1 } from "utils/validation";
import { JobApplicationStep11 } from "_shared/types/user";
import { useEffect } from "react";


interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  title: string;
  buttonText?: string;
  step1Values: JobApplicationStep11 | undefined;
  setStep1Values: (values: JobApplicationStep11) => void;
}

const JobApplicationModal = ({
  isOpen,
  onClose,
  onNext,
  title,
  buttonText,
  step1Values,
  setStep1Values,
}: JobApplicationModalProps) => {
  const {
    auth: { user },
  } = useSelector((state: any) => state.root);

  const initialValues: JobApplicationStep11 = {
    email: step1Values?.email
      ? step1Values?.email
      : user.email
      ? user.email
      : "",
    phonenumber: step1Values?.phonenumber
      ? step1Values?.phonenumber
      : user.phone
      ? user.phone
      : "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: JobApplicationStep1,
    onSubmit: (values) => {
      setStep1Values(values);
      onNext();
    },
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    values,
    touched,
    errors,
  } = formik;

  useEffect(() => {
    if (isOpen) {
      setFieldValue(
        "email",
        step1Values?.email ? step1Values?.email : user.email ? user.email : ""
      );
      setFieldValue(
        "phonenumber",
        step1Values?.phonenumber
          ? step1Values?.phonenumber
          : user.phone
          ? user.phone
          : ""
      );
    } else {
      resetForm();
    }
  }, [isOpen]);

  return (
    <CustomModal
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      onNext={handleSubmit}
      showBackButton={false}
      customContentContainer="noSidePadding"
      actionButtonText={buttonText}
    >
      <div className={classNames(styles.modalContentContainer)}>
        <div className={classNames(styles.content)}>
          <div
            className={classNames(styles.profile, "flex flex-col items-center")}
          >
            <div className={classNames(styles.imgContainer)}>
              <Image
                width={70}
                height={70}
                src={user?.profile_asset?.full_path || Images.DefaultAvatar}
                alt="profile-img"
              />
            </div>
            <h6>
              {user?.first_name} {user?.last_name}
            </h6>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <CustomInput
              required
              label="Email Address"
              type="email"
              Icon={Icons.Email}
              placeholder="contact@arlenemcopy.com"
              customInputContainer="white-bg-input-max-height"
              value={values.email ?? ""}
              onChange={handleChange("email")}
              error={touched.email && errors.email ? errors.email : ""}
            />
            <CustomPhoneInput
              required
              label="Phone Number"
              placeholder="000-000-0000"
              name="phonenumber"
              customInputContainer="transparentPhoneInput"
              value={values.phonenumber ?? ""}
              onChange={(value) => setFieldValue("phonenumber", value)}
              error={errors.phonenumber ? errors.phonenumber : ""}
            />
            <div>
              <span className={classNames(styles.smallText)}>
                Submitting this application won’t change your CareerQuest
                profile.
              </span>
            </div>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default JobApplicationModal;
