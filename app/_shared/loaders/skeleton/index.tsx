import classNames from "classnames";
import styles from "./style.module.scss";
interface Props {
  className?: any;
  style?: any;
}

function SekeletonLoader(props: Props) {
  return (
    <>
      <div
        className={classNames(
          styles.skeletonLoader,
          styles.short_clip,
          props.className ? props.className : ""
        )}
        style={props?.style}
      ></div>
    </>
  );
}

export default SekeletonLoader;
