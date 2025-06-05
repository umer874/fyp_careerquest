"use client";
import classNames from "classnames";
import styles from "./style.module.scss";
import Image from "next/image";
import CustomButton from "components/common/customButton";
import { Icons, Images } from "assets";
import CustomSectionHeading from "components/common/customSectionHeading";
import Link from "next/link";


const HowItWorks = () => {
  const workData = [
    {
      count: 1,
      title: "Take the Assessment",
      desc: "Understand your skills, interests, and strengths through a personalized assessment to help guide your career path.",
    },
    {
      count: 2,
      title: "Get Expert Guidance",
      desc: "Receive valuable insights and career advice from professionals who will help shape your career journey based on your results.",
    },
    {
      count: 3,
      title: "Explore Tailored Opportunities",
      desc: "Discover job and career recommendations specifically suited to your goals and skillset, with guidance every step of the way.",
    },
  ];

  const solutionData = [
    "Connective tissue to existing resources, people, and ideas",
    "Stabilizing support to be able to be successful",
    "Mentorship to build pathways",
    "Empowerment to reach full potential",
  ];

  return (
    <section className={classNames(styles.sectionContainer)}>
      <div >
        <div className={classNames(styles.customContainer)}>
          <div className={classNames(styles.content)}>
            <div className={classNames(styles.imgContainer)}>
              <div
                className={classNames(
                  styles.imgContent,
                  "flex flex-col justify-center gap-5 items-start"
                )}
              >
                <h1>Realize Your Ambitions</h1>
                <Link
                  className="cursor-pointer"
                  target="_blank"
                  href="https://forms.monday.com/forms/4d5c49bfd93c74e246f4278a65a593dd?r=use1"
                >
                  <CustomButton
                    Icon={Icons.Briefcase}
                    IconDirection="left"
                    title="Become a Fellow"
                    containerStyle="bg-green"
                  />
                </Link>
              </div>
            </div>
            <CustomSectionHeading heading="How It Works" description="" />

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-7 sm:gap-5 xs:gap-4 gap-3">
              {workData.map((items, index) => (
                <div key={index} className={classNames(styles.stepItem)}>
                  <div className={classNames(styles.iconContainer)}>
                    <h2>{items.count}</h2>
                  </div>
                  <div className={classNames(styles.itemContent, "")}>
                    <div>
                      <h4>{items.title}</h4>
                      <p>{items.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={classNames(styles.whyCareerLabsContainer,"mt-12")}>
        <div className={classNames(styles.customContainer)}>

          <div className="flex items-center grid lg:grid-cols-2 sm:grid-cols-1  lg:grid-cols-[50%_50%] grid-cols-1 lg:gap-7 sm:gap-5 xs:gap-4 gap-12">

            <div className={classNames(styles.sectionImgContainer, "pt-12")}>
              <Image src={Images.Solution} alt="section-img" />
            </div>
            <div
              className={classNames(
                styles.whySectionContent,
                "flex flex-col  gap-5 pl-8"
              )}
            >

              <h6 style={{"color":"#0092D6"}}>Activities & Outputs</h6>

              <h3 style={{"color":"#18417E"}}>CareerQuest Solution</h3>

              <div className={classNames(styles.whySectionContentRight, "flex flex-col gap-4")}>
                <p>
                  CareerQuest is designed to address these challenges by equipping young adults with the skills,
                  experiences, and networks needed to succeed in the modern workforce. Rooted in respect, empowerment,
                  and equity, CareerQuest fosters resilience, confidence, and long-term professional growth.
                </p>
                <ul>
                  {solutionData.map((items, index) => (
                    <li
                      className="flex items-center gap-2 sx:mt-4 mt-3"
                      key={index}
                    >
                      <span>
                        <Icons.StarListIcon />
                      </span>
                      <p>{items}</p>
                    </li>
                  ))}
                </ul>
                <CustomButton
                  containerStyle="bg-blue xs:mt-4 mt-3 w-80"
                  title="Explore Job Oppurtunities"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames(styles.quoteContainer, "mx-auto mt-14")}>
        <p>
          “Success is no accident. It is hard work, perseverance, learning, studying, sacrifice, and most of all, love for what you are doing.”
        </p>
        <p>- Pelé</p>
      </div>
    </section>

  );
};

export default HowItWorks;
