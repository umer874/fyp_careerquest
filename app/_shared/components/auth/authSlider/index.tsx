import { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper/modules";
import { SwiperNavButtons } from "components/common/swipperCustomButtons";
import { authSliderData } from "utils/constants";
import classNames from "classnames";
import styles from "./style.module.scss";
import Image from "next/image";
import { Icons } from "assets";

function AuthSlider() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  return (
    <div
      className={classNames(
        styles.authSliderWrapper,
        "h-full flex items-center"
      )}
    >
      <Swiper
        loop
        spaceBetween={15}
        slidesPerView={1}
        // breakpoints={{
        //   768: {
        //     slidesPerView: 2,
        //   },
        //   1024: {
        //     slidesPerView: 1,
        //   },
        // }}
        modules={[Pagination, Navigation, A11y]}
        onSwiper={setSwiperInstance}
      >
        {authSliderData.map((item, index) => (
          <SwiperSlide className="my-auto" key={index}>
            <div className={classNames(styles.itemContainer, "")}>
              <Image className="" src={item.img} alt="slider-img" />
              <div className={classNames(styles.itemContent)}>
                <div className={classNames(styles.descContainer)}>
                  <span>
                    <Icons.QuoteIcon />
                  </span>
                  <p>{item.desc}</p>
                </div>

                <div className="flex justify-between pr-10">
                  <div>
                    <h6>{item.title}</h6>
                    <span>{item.designation}</span>
                  </div>
                  {/* <div className={classNames(styles.arrowsContainer)}>
                    <SwiperNavButtons swiper={swiperInstance} />
                  </div> */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AuthSlider;
