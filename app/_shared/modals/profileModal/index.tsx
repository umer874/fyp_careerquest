import CustomModal from "components/common/customModal";
import styles from "./style.module.scss";
import classNames from "classnames";
import Image from "next/image";
import { Images } from "assets";
import moment from "moment";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  user: any;
}

const ProfileModal = ({ isOpen, onClose, user, title }: ProfileModalProps) => {
  return (
    <CustomModal
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showBackButton={false}
      customContentContainer="noSidePadding"
      showModalFooter={false}
    >
      <div className={classNames(styles.modalContentContainer)}>
        <div
          className={classNames(
            styles.content,
            "grid grid-cols-12 sm:gap-8 gap-4"
          )}
        >
          <div className="xs:col-span-4 col-span-12">
            <div
              className={classNames(
                styles.imgContainer,
                "flex flex-col items-center justify-center gap-4"
              )}
            >
              <Image
                src={user?.profile_asset?.full_path ?? Images.DefaultAvatar}
                alt="profile-img"
                height={120}
                width={120}
              />
              <h4>
                {user?.first_name} {user?.last_name}
              </h4>
            </div>
          </div>
          <div className="xs:col-span-8 col-span-12">
            <div className={classNames(styles.contentItemContainer)}>
              <div
                className={classNames(
                  styles.contentItem,
                  "flex sm:flex-row flex-col sm:items-center items-start sm:gap-0 gap-0.5"
                )}
              >
                <div className="sm:w-5/12 w-full">
                  <p className={classNames(styles.label)}>Phone Number:</p>
                </div>
                <div className="sm:w-7/12 w-full">
                  <p className={classNames(styles.value)}>{user?.phone}</p>
                </div>
              </div>
              <div
                className={classNames(
                  styles.contentItem,
                  "flex sm:flex-row flex-col sm:items-center items-start sm:gap-0 gap-0.5"
                )}
              >
                <div className="sm:w-5/12 w-full">
                  <p className={classNames(styles.label)}>Email Address:</p>
                </div>
                <div className="sm:w-7/12 w-full">
                  <p className={classNames(styles.value)}>{user?.email}</p>
                </div>
              </div>
              <div
                className={classNames(
                  styles.contentItem,
                  "flex sm:flex-row flex-col sm:items-center items-start sm:gap-0 gap-0.5"
                )}
              >
                <div className="sm:w-5/12 w-full">
                  <p className={classNames(styles.label)}>Address:</p>
                </div>
                <div className="sm:w-7/12 w-full">
                  <p className={classNames(styles.value)}>{user?.address}</p>
                </div>
              </div>
            </div>
            {user?.educations?.length > 0 ? (
              <div className={classNames(styles.contentItemContainer, "pt-2")}>
                {user?.educations?.map((data: any, index: number) => (
                  <div
                    key={index}
                    className={classNames(
                      styles.contentItem,
                      "flex sm:flex-row flex-col sm:items-center items-start sm:gap-0 gap-0.5"
                    )}
                  >
                    <div className="sm:w-5/12 w-full">
                      {index === 0 && (
                        <p className={classNames(styles.label)}>Education:</p>
                      )}
                    </div>
                    <div className="sm:w-7/12 w-full">
                      <p className={classNames(styles.value)}>{data?.degree}</p>
                      <span className={classNames(styles.smallText)}>
                        {data?.institute} |{" "}
                        {moment(data?.completion_date).format("YYYY")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {user?.experiences?.length > 0 ? (
              <div className={classNames(styles.contentItemContainer, "pt-2")}>
                {user?.experiences?.map((data: any, index: number) => (
                  <div
                    key={index}
                    className={classNames(
                      styles.contentItem,
                      "flex sm:flex-row flex-col sm:items-center items-start sm:gap-0 gap-0.5"
                    )}
                  >
                    <div className="sm:w-5/12 w-full">
                      {index === 0 && (
                        <p className={classNames(styles.label)}>Experience:</p>
                      )}
                    </div>
                    <div className="sm:w-7/12 w-full">
                      <p className={classNames(styles.value)}>
                        {data?.designation}
                      </p>
                      <span className={classNames(styles.smallText)}>
                        {data?.institute}
                      </span>
                      <br />
                      <span className={classNames(styles.smallText)}>
                        {moment(data?.from).format("MMMM DD, YYYY")} -{" "}
                        {moment(data?.to).format("MMMM DD, YYYY")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ProfileModal;
