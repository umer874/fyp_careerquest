import classNames from "classnames";
import styles from "./style.module.scss";
import CustomPageHeader from "components/common/customPageHeader";
import Image from "next/image";
import { Icons, Images } from "assets";
import CustomButton from "components/common/customButton";
import { title } from "process";

const GetInvolved = () => {
  const whyListData = [
    "Offering job opportunities and paid project work",
    "Hosting job shadows",
    "Providing workplace tours",
    "Speaking on career panels",
    "Joining or hosting networking events",
  ];

  const ctaData = [
    {
      img: Images.CommunityImg1,
      title: "Apply to Become a CareerQuest Fellow",
      desc: "Are you a BGCB Club alum, aged 18-24, looking to build your career?",
      btnText: "Apply to Be a Fellow",
    },
    {
      img: Images.CommunityImg2,
      title: "Volunteer as a CareerQuest Mentor",
      desc: "Have at least 5 years of professional experience and 10 hours to make a difference? Join us as a mentor!",
      btnText: "Sign Up to Mentor",
    },
  ];

  return (
    <div className={classNames(styles.eventWrapper)}>
      <div className={classNames(styles.customContainer)}>
        <CustomPageHeader
          heading="Join the CareerQuest Community"
          description="We support Boys & Girls Clubs of Boston alums aged 18 – 24 in building meaningful job and career pathways through coaching, mentorship, and links to resources."
        />

        <div className={classNames(styles.contentContainer)}>
          <div
            className={classNames(
              styles.ctaSection,
              "grid sm:grid-cols-2 grid-cols-1 md:gap-7 gap-5"
            )}
          >
            {ctaData.map((items, index) => (
              <div key={index} className={classNames(styles.ctaCard)}>
                <Image src={items.img} alt="section-img" />
                <div
                  className={classNames(
                    styles.content,
                    "flex flex-col justify-between gap-4 items-start"
                  )}
                >
                  <div>
                    <h3>{items.title}</h3>
                    <p className="mb-3">{items.desc}</p>
                  </div>
                  <div className="mt-auto">
                    <CustomButton
                      containerStyle="bg-blue"
                      title={items.btnText}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={classNames(styles.highlightsSection)}>
            <div className={classNames(styles.customContainer)}>
              {/* <div className={classNames(styles.quoteContainer, "mx-auto")}>
                <p>
                  “We all have to work to understand and support one another.”
                </p>
                <p>- Michelle Obama</p>
              </div> */}

              <div className={classNames(styles.content)}>
                <Image src={Images.CommunityImg3} alt="section-img" />
                <div
                  className={classNames(
                    styles.whySectionContent,
                    "grid grid-cols-12 sm:gap-0 gap-6"
                  )}
                >
                  <div
                    className={classNames(
                      styles.whySectionContentRight,
                      "md:col-span-4 col-span-12"
                    )}
                  >
                    <h3>Become an Employer Partner</h3>
                    <CustomButton
                      containerStyle="bg-blue sm:mt-5 mt-3"
                      title="Register as a Partner"
                    />
                  </div>
                  <div
                    className={classNames(
                      styles.contentLeft,
                      "md:col-span-6 col-span-12 flex justify-start"
                    )}
                  >
                    <div>
                      <ul className="">
                        {whyListData.map((items, index) => (
                          <li
                            className="flex items-center gap-2 sx:mt-4 sm:mt-3 mt-2"
                            key={index}
                          >
                            <span>
                              <Icons.DoubleArrowRight />
                            </span>
                            <p>{items}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;
