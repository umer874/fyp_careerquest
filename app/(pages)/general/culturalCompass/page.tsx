import classNames from "classnames";
import styles from "./style.module.scss";
import CustomPageHeader from "components/common/customPageHeader";
import { Icons } from "assets";

const CulturalCompass = () => {
  const issuesData = [
    {
      heading: "Issue 1",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur auctor porttitor. Curabitur lacinia et ante ut hendrerit. Morbi in lacinia tellus. Ut scelerisque purus nec velit dapibus, quis consectetur lacus congue.",
    },
    {
      heading: "Issue 2",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur auctor porttitor. Curabitur lacinia et ante ut hendrerit. Morbi in lacinia tellus. Ut scelerisque purus nec velit dapibus, quis consectetur lacus congue.",
    },
    {
      heading: "Issue 3",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur auctor porttitor. Curabitur lacinia et ante ut hendrerit. Morbi in lacinia tellus. Ut scelerisque purus nec velit dapibus, quis consectetur lacus congue.",
    },
    {
      heading: "Issue 4",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur auctor porttitor. Curabitur lacinia et ante ut hendrerit. Morbi in lacinia tellus. Ut scelerisque purus nec velit dapibus, quis consectetur lacus congue.",
    },
    {
      heading: "Issue 5",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur auctor porttitor. Curabitur lacinia et ante ut hendrerit. Morbi in lacinia tellus. Ut scelerisque purus nec velit dapibus, quis consectetur lacus congue.",
    },
  ];

  return (
    <div className={classNames(styles.eventWrapper)}>
      <div className="sm:px-0 xs:px-4 px-3">
        <CustomPageHeader
          heading="Cultural Compass"
          description="Our newsletter offers thought leadership and resources from
        CareerQuest staff, volunteers, Fellows, and partners, exploring complex
        topics like educational disparities, microaggressions, and language
        differences and their impacts on young adults in the workplace. We
        want the newsletter to encourage readers to engage with new ideas and
        perspectives on class, race, and workplace dynamics. Visit the events
        page for roundtable conversations on these issues."
        />
      </div>
      <div className={classNames(styles.customContainer)}>
        <div
          className={classNames(
            styles.contentContainer,
            "grid sm:grid-cols-2 grid-cols-1 md:gap-6 gap-4"
          )}
        >
          {issuesData.map((items, index) => (
            <div
              key={index}
              className={classNames(
                styles.contentItem,
                "flex flex-col md:gap-5 gap-4"
              )}
            >
              <Icons.FavLogoBullet />
              <h4>{items.heading}</h4>
              <p>{items.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CulturalCompass;
