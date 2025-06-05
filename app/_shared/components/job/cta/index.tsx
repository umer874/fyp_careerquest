"use client";

import classNames from "classnames";
import styles from "./style.module.scss";
import CustomButton from "components/common/customButton";
import { Images } from "assets";
import { useSelector } from "react-redux";
import { useRouter } from "next13-progressbar";
import { routeConstant } from "routes/constants";
import { useState } from "react";
import BecomeFellowModal from "modals/becomeFellowModal";
import Image from "next/image";
//import { UserType } from "utils/enum";
import Link from "next/link";
import useWindowDimensions from "hooks/useWindowDimensions";

interface JobsCTAProps {
  // index: number;
}

function JobsCTA() {
  const { width } = useWindowDimensions();
  const { auth } = useSelector((state: any) => state.root);
  const router = useRouter();
  const [becomeFellowModal, setBecomeFellowModal] = useState<boolean>(false);

  const openFellowModal = () => setBecomeFellowModal(true);
  const closeFellowModal = () => setBecomeFellowModal(false);

  const handleClick = (ctaKey: string) => {
    if (
      ctaKey === "cta-1" &&
      auth?.isLoggedIn
    ) {
      openFellowModal();
    } else if (ctaKey === "cta-1" && !auth?.isLoggedIn) {
      router.push(routeConstant.login.path);
    } else {
      console.log(`CTA action for ${ctaKey}`);
    }
  };

  const ctaData = [
    {
      key: "cta-1",
      img: Images.Jobimg,
      heading: "The Best Flexible Jobs",
      title: "",
      desc: "Discover roles tailored to your skills and <br />preferences, designed to help you thrive in your <br />career while maintaining a healthy lifestyle",
      buttonTitle: "Become Fellow",
      linkPath: routeConstant.vision.path,
    },

  ];

  // if (!ctaData[index]) return null;

  // const { key, img, heading, title, buttonTitle, desc, linkPath } =
  //   ctaData[index];

  return (
    <div className=" md:mb-6 mb-4">
      {ctaData.map((data, index) => (
        <div
          key={index}
          className={classNames(styles.imgContainer, "relative")}
        >
          <div className={classNames(styles.imgWrapper)}>
            <Image
              src={data.img}
              alt={`${data.title} banner`}
              layout="responsive"
              // width={800}
              // height={400}
              className={classNames(styles.image)}
            />
          </div>
          <div
            className={classNames(
              styles.imgContent,
              "absolute top-0 flex items-center h-full"
            )}
          >
            <div>
              <h4>
                {data.heading} {data.heading ? "" : ""}
              </h4>
              <h4>
                {data.title} {data.title ? "" : ""}
              </h4>
              <p dangerouslySetInnerHTML={{ __html: ctaData[0].desc }} />
              <div className={classNames(styles.buttonContainer)}>
                <Link href={data.linkPath}>
                  {data.buttonTitle && (
                    <CustomButton
                      title={data.buttonTitle}
                      containerStyle="bg-green"
                      onClick={() => handleClick(data.key)}
                    />
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <BecomeFellowModal
        title="Become a fellow"
        isOpen={becomeFellowModal}
        onClose={closeFellowModal}
      />
    </div>
  );
}

export default JobsCTA;
