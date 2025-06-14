"use client";

import classNames from "classnames";
import styles from "./style.module.scss";
import { Icons } from "assets";
import Link from "next/link";
import CustomSectionHeading from "components/common/customSectionHeading";
import { routeConstant } from "routes/constants";

const WorkProcess = () => {
  const stepsData = [
    {
      icon: <Icons.Step1 />,
      title: "Skill and Personality Test",
      desc: "Evaluate your strengths and interests to discover the right career path for you.",
      linkText: "Application",
      linkPath:
        "https://forms.monday.com/forms/4d5c49bfd93c74e246f4278a65a593dd?r=use1",
    },
    {
      icon: <Icons.Step2 />,
      title: "Personalized Dashboard",
      desc: "Track your progress and explore tailored job recommendations based on your personality and skill assessments.",
      linkText: "Resources",
      linkPath: routeConstant.events.path,
    },
    {
      icon: <Icons.Step3 />,
      title: "Get Involved",
      desc: "Sign up to be an employer partner, mentor, speaker, or volunteer. Partner with our Fellows to shape the future.",
      linkText: "Information",
      linkPath: routeConstant.volunteerOpportunities.path,
    },
  ];

  return (
    <section className={classNames(styles.sectionContainer)}>
      <div className={classNames(styles.customContainer)}>
        <div className={classNames(styles.content)}>
          <CustomSectionHeading
            heading="Navigate Your Path to Your Goals"
            description=""
          />
          <div
            className={classNames(
              styles.gridContainer,
              "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 sm:gap-5 xs:gap-4 gap-3"
            )}
          >
            {stepsData.map((items, index) => (
              <div
                key={index}
                className={classNames(
                  styles.stepItem,
                  "lg:mb-0 mb-10 flex flex-col justify-between"
                )}
              >
                <div className={classNames(styles.iconContainer, "mx-auto")}>
                  {items.icon}
                </div>

                <div className={classNames(styles.itemContent, "text-center ")}>
                  <div>
                    <h4>{items.title}</h4>
                    <p>{items.desc}</p>
                  </div>
                </div>
                <Link
                  className={classNames(
                    styles.cardLink,
                    "flex justify-center items-center gap-5 cursor-pointer"
                  )}
                  target="_blank"
                  href={items.linkPath}
                >
                  View {items.linkText}
                  <Icons.ArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
