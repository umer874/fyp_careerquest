import classNames from "classnames";
import styles from "./style.module.scss";

interface NoContentCardProps {
  label1: string;
  label2: string;
  Icon: any;
  customIconContianer: any;
  customLabel1Style: any;
  customLabel2Style: any;
  customContainer: any;
  style: any;
}

const NoContentCard = ({
  label1,
  label2,
  Icon,
  customIconContianer,
  customLabel1Style,
  customLabel2Style,
  customContainer,
  style,
}: Partial<NoContentCardProps>) => {
  return (
    <div
      className={classNames(
        "flex flex-col items-center",
        customContainer ? customContainer : " gap-3"
      )}
      style={style}
    >
      {Icon ? (
        <Icon
          className={classNames(
            styles.noContentImg,
            customIconContianer && customIconContianer
          )}
        />
      ) : null}

      <div
        className={classNames(
          styles.labalContainer,
          "gap-1 flex flex-col items-center"
        )}
      >
        <label
          className={classNames(
            styles.label1,
            customLabel1Style && customLabel1Style
          )}
        >
          {label1}
        </label>
        <label
          className={classNames(
            styles.label2,
            customLabel2Style && customLabel2Style
          )}
        >
          {label2}
        </label>
      </div>
    </div>
  );
};

export default NoContentCard;
