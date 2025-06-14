"use client";
import classNames from "classnames";
import styles from "./style.module.scss";
import ModalWrapper from "../modalWrapper";
import ModalHeader from "../modalHeader";
import CustomButton from "../customButton";

interface CustomModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  customContentContainer?: any;
  showModalFooter?: boolean;
  showModalHeader?: boolean;
  actionButtonText?: string;
  loading?: boolean;
}

const CustomModal = ({
  children,
  isOpen,
  onClose,
  onNext,
  title,
  showBackButton = false,
  showModalHeader = true,
  onBack,
  size = "md",
  customContentContainer,
  showModalFooter = true,
  actionButtonText = "Submit Now",
  loading,
}: CustomModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <div
        className={classNames(
          styles.contentContainer,
          styles[size],
          customContentContainer
        )}
      >
        {showModalHeader && (
          <ModalHeader
            title={title}
            isBack={showBackButton}
            handleClose={onClose}
            handleBack={onBack}
          />
        )}
        <div className={styles.modalContent}>{children}</div>
        {showModalFooter && (
          <div
            className={classNames(
              styles.modalFooter,
              "flex items-center justify-end"
            )}
          >
            <CustomButton
              title={actionButtonText}
              containerStyle="bg-blue maxHeighted_btn"
              onClick={() => {
                onNext?.();
              }}
              loading={loading}
              disabled={loading}
            />
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default CustomModal;
