import classNames from "classnames";
import React from "react";
import { Swiper as SwiperClass } from "swiper";
import styles from "./style.module.scss";
import { Icons } from "assets";

interface SwiperNavButtonsProps {
  swiper: SwiperClass | null;
}

export const SwiperNavButtons = ({ swiper }: SwiperNavButtonsProps) => {
  if (!swiper) {
    return null;
  }

  return (
    <div className={styles.customNavigation}>
      <button
        className={classNames(styles.swiperButton, styles.prevButton)}
        onClick={() => swiper.slidePrev()}
      >
        <Icons.ArrowLeft />
      </button>
      <button
        className={classNames(styles.swiperButton, styles.nextButton)}
        onClick={() => swiper.slideNext()}
      >
        <Icons.ArrowRight />
      </button>
    </div>
  );
};
