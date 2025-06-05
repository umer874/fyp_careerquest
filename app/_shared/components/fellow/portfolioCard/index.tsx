import classNames from "classnames";
import styles from "./style.module.scss";
import Image, { StaticImageData } from "next/image";
import { Icons } from "assets";
import CustomButton from "components/common/customButton";
import { FileType } from "utils/enum";

type PortfolioCardProps = {
  id: string | any;
  img: StaticImageData | string;
  title: string;
  desc: string;
  date: string;
  type?: string;
  onPreviewClick?: () => void;
  onEditClick?: () => void;
};

const PortfolioCard = ({
  id,
  img,
  title,
  desc,
  date,
  type,
  onPreviewClick,
  onEditClick,
}: PortfolioCardProps) => {
  const renderIcon = () => {
    switch (type) {
      case FileType.IMAGE:
        return <Icons.PictureIcon />;
      case FileType.VIDEO:
        return <Icons.VideoIcon />;
      case FileType.PDF:
        return <Icons.PDFIcon />;
      default:
        return null;
    }
  };

  return (
    <div className={classNames(styles.cardWrapper)}>
      <div className={classNames(styles.cardContainer)}>
        <div className={classNames(styles.imgContainer)}>
          <Image width={322} height={210} src={img} alt="card-img" />
          {renderIcon && (
            <span className={classNames(styles.iconContainer)}>
              {renderIcon()}
            </span>
          )}
        </div>
        <div className={classNames(styles.date, "flex items-center gap-1")}>
          <span>
            <Icons.Calendar />
          </span>
          <span>{date}</span>
        </div>
        <p className={classNames(styles.title)}>{title}</p>
        <p className={classNames(styles.desc)}>{desc}</p>
        <div
          className={classNames(
            styles.buttonContainer,
            "flex items-center gap-2"
          )}
        >
          <CustomButton
            Icon={Icons.Eye}
            IconDirection="left"
            title="Preview"
            containerStyle="w-full btn-lighter-green"
            onClick={onPreviewClick}
          />
          <CustomButton
            Icon={Icons.EditIcon}
            IconDirection="left"
            title="Edit"
            containerStyle="w-full btn-lighter-blue"
            onClick={onEditClick}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
