import CustomModal from "components/common/customModal";
import styles from "./style.module.scss";
import classNames from "classnames";
import CustomInput from "components/common/customInput";
import CustomTextArea from "components/common/customTextArea";
import { useFormik } from "formik";
import { ApplyFellowShipVS } from "utils/validation";
import { ApplyFellowShipService } from "services/user";
import { toastMessage } from "components/common/toast";
import { handleErrors } from "utils/helper";
import { useSelector } from "react-redux";

interface BecomeFellowModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const BecomeFellowModal = ({
  isOpen,
  onClose,
  title,
}: BecomeFellowModalProps) => {
  const {
    auth: { user, isLoggedIn },
  } = useSelector((state: any) => state.root);

  const initialValues: ApplyFellowShipType = {
    email: isLoggedIn ? user?.email : "",
    reason: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: ApplyFellowShipVS,
    onSubmit: (values, actions) => {
      handleApplyFellowShip();
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

  const handleApplyFellowShip = () => {
    setSubmitting(true);
    ApplyFellowShipService(values)
      .then(({ data: { data }, status }) => {
        if (status) {
          toastMessage("success", "Application Submitted Successfully");
          resetForm();
          onClose();
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
    <CustomModal
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showBackButton={false}
      customContentContainer="noSidePadding"
      onNext={handleSubmit}
      loading={isSubmitting}
    >
      <div className={classNames(styles.modalContentContainer)}>
        <div className={classNames(styles.content)}>
          <form>
            <CustomInput
              required
              label="Email Address"
              type="email"
              name="email"
              placeholder="abc@example.com"
              customInputContainer="white-bg-input-max-height"
              value={values.email}
              onChange={handleChange("email")}
              error={touched.email && errors.email ? errors.email : ""}
            />
            <CustomTextArea
              label="Why do you want to Become a fellow"
              placeholder="Write something..."
              rows={6}
              required
              value={values.reason}
              onChange={handleChange("reason")}
              error={touched.reason && errors.reason ? errors.reason : ""}
            />
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default BecomeFellowModal;
