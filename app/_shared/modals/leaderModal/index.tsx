import CustomModal from "components/common/customModal";
import styles from "./style.module.scss";
import classNames from "classnames";
import Image from "next/image";
import { Icons, Images } from "assets";
import Link from "next/link";

interface LeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  bio?: string | any;
  img?: any;
}

const LeaderModal = ({
  isOpen,
  onClose,
  title,
  bio,
  img,
}: LeaderModalProps) => {
  return (
    <CustomModal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      title=""
      showBackButton={false}
      showModalFooter={false}
      customContentContainer="noSidePadding"
    >
      <div className={classNames(styles.modalContentContainer)}>
        <div className={classNames(styles.content, "grid grid-cols-2")}>
          <Image src={img} alt="leader-img" />
          <div className="pl-10 flex flex-col gap-4 justify-center">
            <h2>{title}</h2>
            <p>{bio}</p>
            <Link href="#">
              <Icons.LinkedIn />
            </Link>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default LeaderModal;
