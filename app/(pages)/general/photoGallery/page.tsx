import classNames from "classnames";
import styles from "./style.module.scss";
import CustomSectionHeading from "components/common/customSectionHeading";
import { Images } from "assets";
import Image from "next/image";

function PhotoGallery() {
  const partners = [
    Images.Gallery1,
    Images.Gallery2,
    Images.Gallery3,
    Images.Gallery4,
    Images.Gallery5,
    Images.Gallery3,
    Images.Gallery7,
    Images.Gallery8,
    Images.Gallery9,
    Images.Gallery10,
    Images.Gallery11,
    Images.Gallery12,
  ];

  return (
    <section className={classNames(styles.sectionContainer)}>
      <div className={classNames(styles.headingContainer)}>
        <div className={classNames(styles.customContainer)}>
          <CustomSectionHeading heading="Photo Gallery" description="" />
        </div>
      </div>

      <div className={classNames(styles.customContainer)}>
        <div
          className={classNames(
            styles.contentContainer,
            "grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 md:gap-6 xs:gap-4 gap-3"
          )}
        >
          {partners.map((items, index) => (
            <div key={index} className={classNames(styles.imgContainer)}>
              <Image src={items} alt="gallery-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhotoGallery;
