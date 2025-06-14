"use client";

import classNames from "classnames";
import styles from "./style.module.scss";
import { Icons, Images } from "assets";
import Image from "next/image";
import CustomButton from "components/common/customButton";
import { useState } from "react";
import LeaderModal from "modals/leaderModal";
import CustomAccordion from "components/common/customAccordion";
import useWindowDimensions from "hooks/useWindowDimensions";
import { servicesData } from "utils/constants";

function AboutProgram() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const { width } = useWindowDimensions();


  const empowermentData = [
    {
      icon: <Icons.EmpowerIcon1 />,
      title: "Define Your Goals",
      desc: "Set a clear vision for your career path.",
    },
    {
      icon: <Icons.EmpowerIcon2 />,
      title: "Take Ownership",
      desc: "Make decisions that align with your passions.",
    },
    {
      icon: <Icons.EmpowerIcon3 />,
      title: "Develop Skills",
      desc: "Refine problem-solving and critical thinking abilities.",
    },
    {
      icon: <Icons.EmpowerIcon4 />,
      title: "Achieve Confidence",
      desc: "Prepare for real-world challenges with self-assurance.",
    },
  ];

  const accordionData = [
    {
      title: "Short-Term Outcomes (0–2 years)",
      listItems: [
        "Job readiness and goal setting skills",
        "Clarity in job and career plans",
        "Foundational work experience",
        "Professional networks",
        "Mentoring",
        "Support for challenges",
      ],
    },
    {
      title: "Medium-Term Outcomes (2–5 years)",
      listItems: [
        "Lorem ipsum dolor sit amet consectetur adipisicing.",
        "Lorem ipsum dolor sit amet consectetur.",
        "Lorem ipsum dolor sit amet.",
        "Lorem ipsum dolor sit amet.",
        "Lorem ipsum dolor sit amet consectetur.",
        "Lorem ipsum.",
      ],
    },
    {
      title: "Long-Term Outcomes (5+ years)",
      listItems: [
        "Lorem ipsum dolor sit amet consectetur adipisicing.",
        "Lorem ipsum dolor sit amet consectetur.",
        "Lorem ipsum dolor sit amet.",
        "Lorem ipsum dolor sit amet.",
        "Lorem ipsum dolor sit amet consectetur.",
        "Lorem ipsum.",
      ],
    },
    {
      title: "Impacts to Boston and Chelsea",
      listItems: [
        "Lorem ipsum dolor sit amet consectetur adipisicing.",
        "Lorem ipsum dolor sit amet consectetur.",
        "Lorem ipsum dolor sit amet.",
        "Lorem ipsum dolor sit amet.",
        "Lorem ipsum dolor sit amet consectetur.",
        "Lorem ipsum.",
      ],
    },
  ];

  const leadersData = [
    {
      name: "Dana Smith",
      bio: (
        <>
          Dana Smith is a passionate advocate for youth empowerment and career
          development. With over 10 years of experience in workforce readiness
          and mentoring, Dana has guided hundreds of young adults toward
          achieving their career goals. Her expertise lies in skill development,
          professional networking, and helping individuals build confidence to
          navigate the competitive job market. <br /> <br /> Dana believes in
          the transformative power of personalized coaching and is committed to
          fostering resilience, critical thinking, and growth mindsets in her
          mentees. As a dedicated mentor at CareerQuest, she plays a vital role
          in shaping the next generation of leaders and innovators.
        </>
      ),
      img: Images.LeaderImg1,
    },
    {
      name: "Hamza Abdul",
      bio: (
        <>
          Hamza Abdul specializes in fostering equity and empowerment within
          underserved communities through strategic initiatives. <br /> <br />
          Hamza believes in the transformative power of personalized coaching
          and is committed to fostering resilience, critical thinking, and
          growth mindsets in her mentees. As a dedicated mentor at CareerQuest,
          she plays a vital role in shaping the next generation of leaders and
          innovators.
        </>
      ),
      img: Images.LeaderImg2,
    },
  ];

  const valuesData = [
    "Respect",
    "Joy",
    "Equity",
    "Resilience",
    "Integrity",
    "Empowerment",
  ];
  const whyListData = [
    "Creating Job Opportunities",
    "Facilitating Job Shadows",
    "Organizing Workplace",
    "Participating in Career Panels",
    "Networking Opportunities",
  ];

  const solutionData = [
    "Connective tissue to existing resources, people, and ideas",
    "Stabilizing support to be able to be successful",
    "Mentorship to build pathways",
    "Empowerment to reach full potential",
  ];

  const [becomeFellowModal, setBecomeFellowModal] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<{
    name: string;
    bio: string;
    img: string;
  } | null>(null);

  // const openFellowModal = (leader: (typeof leadersData)[0]) => {
  //   // @ts-error
  //   setSelectedLeader(leader);
  //   setBecomeFellowModal(true);
  // };

  const closeFellowModal = () => {
    setBecomeFellowModal(false);
    setSelectedLeader(null);
  };

  return (
    <section className={classNames(styles.sectionContainer)}>
      <div className={classNames(styles.aboutUsBanner)}>
        <h2>About Us</h2>
      </div>
      <div className={classNames(styles.contentWrapper)}>
        <div className={classNames(styles.customContainer)}>
          <div className={classNames(styles.heading)}>
            <div className={classNames(styles.leftContent, "")}>
              <h4 className="mb-3">The Challenge</h4>
              <div className="flex xs:flex-row flex-col xs:justify-between justify-center items-center xs:gap-y-0 gap-y-3 gap-x-16 mt-2">
                <h3>
                  31% of young adults aged 18 – 24 {width > 992 && <br />} are
                  underemployed
                </h3>
                <div className="flex justify-end">
                  <p>
                    31% of young adults aged 18 – 24 in Boston and Chelsea{" "}
                    {width > 992 && <br />} are underemployed, not earing living
                    wages, or disconnected from the {width > 640 && <br />}{" "}
                    economy*
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={classNames(styles.content,"pt-8")}>
            <h4>
              At CareerQuest, Boys & Girls are engaging in:
            </h4>
            <div className="grid md:grid-cols-3 xs:grid-cols-2 xs:gap-4 gap-3 mt-4">
              {servicesData.map((items, index) => (
                <div
                  key={index}
                  className={classNames(
                    styles.gridItem,
                    "flex flex-col xl:gap-6 md:gap-4 "
                  )}
                >
                  <div className={classNames(styles.iconContainer)}>
                    <Image
                      src={items.icon}
                      height={80}
                      width={80}
                      alt="alum picture"
                    />
                  </div>
                  <h5>{items.title}</h5>
                  <p>{items.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={classNames(styles.empowermentSection)}>
          <div className={classNames(styles.customContainer)}>

            <div
              className={classNames(
                styles.contentContainer,
                "grid sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-6"
              )}
            >
              <div>
                <h3>Learner-Led</h3>
                <Image src={Images.CommunityImg1} alt="section-img" />
              </div>
              <div className="flex flex-col justify-between xs:gap-6 gap-4 lg:py-12 xs:py-6 py-2">
                {empowermentData.map((items, index) => (
                  <div key={index} className="flex gap-5">
                    <span className={classNames(styles.iconContainer)}>
                      {items.icon}
                    </span>
                    <div className="flex flex-col justify-between">
                      <h5>{items.title}</h5>
                      <p>{items.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(styles.whyCareerLabsContainer)}>
          <div className={classNames(styles.customContainer)}>
            <div className={classNames(styles.quoteContainer, "mx-auto")}>
              <p>
                “Success depends on employees. For me knowing and connecting
                with my team is very important.”
              </p>
              <p>- Divine Ndhlukula</p>
            </div>
            <div className={classNames(styles.sectionImgContainer, "pt-12")}>
              <Image src={Images.WhySectionImg} alt="section-img" />
            </div>
            <div
              className={classNames(
                styles.whySectionContent,
                "flex xs:flex-row  xs:justify-between sm:gap-24 xs:gap-12 gap-7"
              )}
            >
              <div>
                <h2>Why CareerQuest Matters</h2>
                <CustomButton
                  containerStyle="bg-blue xs:mt-4 mt-3"
                  title="Join Us Now"
                />
              </div>
              <div className={classNames(styles.whySectionContentRight)}>
                <p>
                  CareerQuest is committed to fostering broader societal contributions, focusing on social
                  equity, economic mobility, community leadership, and addressing youth
                  disconnection. Our mission empowers young adults, enhancing their roles within the community and economy.
                </p>
                <ul>
                  {whyListData.map((items, index) => (
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
              </div>
            </div>
          </div>
        </div>

    

        <div className={classNames(styles.vision)}>
          <div
            className={classNames(
              styles.customContainer,
              "grid sm:grid-cols-2 grid-cols-1 gap-6"
            )}
          >
            <div className="flex items-center">
              <div className="flex flex-col items-start md:gap-2.5">
                <h2>Our Vision for the Future</h2>
                <p>
                Our vision is to foster an inclusive economy that strengthens communities and ensures
                 that opportunity and prosperity are accessible to everyone, regardless of background or circumstance.
                </p>
              </div>
            </div>
            <div>
              <Image src={Images.VisionProgramImg} alt="section-img" />
            </div>
          </div>
        </div>

        {/* <div className={classNames(styles.impact)}>
          <div
            className={classNames(
              styles.customContainer,
              "grid md:grid-cols-2 grid-cols-1 gap-6"
            )}
          >
            <div className="flex flex-col items-start md:gap-12 gap-8">
              <div className="flex flex-col gap-2">
                <h2>Our Impact</h2>
                <p>We are actively measuring our efficacy and impact.</p>
              </div>
              <Image src={Images.ImpactProgramImg} alt="section-img" />
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="w-full flex flex-col justify-between h-full">
                {accordionData.map((item, index) => (
                  <CustomAccordion
                    key={index}
                    title={item.title}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(index)}
                  >
                    <ul>
                      {item.listItems.map((listItem, idx) => (
                        <li
                          className="flex items-center xs:gap-3 gap-2.5"
                          key={idx}
                        >
                          <span>
                            <Icons.DotIcon />
                          </span>
                          <p>{listItem}</p>
                        </li>
                      ))}
                    </ul>
                  </CustomAccordion>
                ))}
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {selectedLeader && (
        <LeaderModal
          title={selectedLeader.name}
          bio={selectedLeader.bio}
          img={selectedLeader.img}
          isOpen={becomeFellowModal}
          onClose={closeFellowModal}
        />
      )}
    </section>
  );
}

export default AboutProgram;
