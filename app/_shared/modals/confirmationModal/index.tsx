import CustomModal from "components/common/customModal";
import styles from "./style.module.scss";
import { Icons } from "assets";
import classNames from "classnames";
import CustomButton from "components/common/customButton";

interface ConfirmationModalProps {
  isOpen: boolean;
  haveSingleButton?: boolean;
  isDeleteModal?: boolean;
  isSuccessModal?: boolean;
  actionButtonText?: string | any;
  isOfferModal?: boolean;
  isOrderModal?: boolean;
  disableIcon?: boolean;
  title: string;
  heading?: string;
  headingSecondary?: string;
  description?: string;
  singleButtonText?: string;
  onClose: () => void;
  onConfirm?: () => void;
  loading?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  haveSingleButton,
  isDeleteModal,
  actionButtonText = "Submit",
  isSuccessModal,
  disableIcon,
  title,
  heading,
  headingSecondary,
  description,
  singleButtonText,
  loading,
}: ConfirmationModalProps) => {
  return (
    <CustomModal
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showBackButton={false}
      customContentContainer="noSidePadding"
      showModalFooter={false}
    >
      <div className={classNames(styles.confirmationModal)}>
        {!disableIcon && (
          <div className={classNames(styles.iconContainer, "mb-2")}>
            {isSuccessModal ? <Icons.SuccessIcon /> : <Icons.DeleteIcon />}
          </div>
        )}

        <h4> {heading}</h4>
        <h4 className="textBlue">{headingSecondary}</h4>
        <p>{description}</p>

        <div className={classNames(styles.buttonContainer, "w-full")}>
          {isDeleteModal ? (
            <>
              <CustomButton
                onClick={onClose}
                title="Not Now"
                containerStyle="outlined-button-secondary maxHeighted_btn"
              />
              <CustomButton
                onClick={onConfirm}
                title={actionButtonText}
                containerStyle="maxHeighted_btn bg-red"
                loading={loading}
                disabled={loading}
              />
            </>
          ) : (
            <>
              <CustomButton
                onClick={onConfirm}
                title={actionButtonText}
                containerStyle="maxHeighted_btn bg-blue"
                loading={loading}
                disabled={loading}
              />
            </>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmationModal;
