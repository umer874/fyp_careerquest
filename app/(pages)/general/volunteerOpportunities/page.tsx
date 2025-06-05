import classNames from "classnames";
import styles from "./style.module.scss";
import CustomPageHeader from "components/common/customPageHeader";
import { Icons } from "assets";

const CulturalCompass = () => {
  const opportunitiesData = [
    {
      icon: <Icons.VolunteerIcon1 />,
      heading: "Be a Mentor",
      desc: [
        "Commit to 8 sessions with a Fellow who has developed a specific goal and life plan with their coach.",
        "Provide guidance, share expertise, and offer support as they work toward their career and personal aspirations.",
      ],
    },
    {
      icon: <Icons.VolunteerIcon2 />,
      heading: "Support Plan Presentations",
      desc: [
        "Attend a Fellow’s plan presentation to listen and provide thoughtful feedback.",
        "Offer encouragement and insight to help them refine their ideas and stay motivated.",
      ],
    },
    {
      icon: <Icons.VolunteerIcon3 />,
      heading: "Participate in Brainstorming Sessions",
      desc: [
        "Join a collaborative session where you and other volunteers help Fellows generate ideas and develop strategies to pursue new opportunities.",
      ],
    },
    {
      icon: <Icons.VolunteerIcon4 />,
      heading: "Assist in Career Preparation Workshops",
      desc: [
        "Help Fellows improve their professional skills by volunteering at workshops focused on:",
        {
          nestedDesc: [
            "Resume and cover letter writing",
            "Mock interviews",
            "Career planning and development",
            "Check the events page for other opportunities",
          ],
        },
      ],
    },
    {
      icon: <Icons.VolunteerIcon5 />,
      heading: "Support Alumni Events and Conferences",
      desc: [
        "Volunteer at alumni gatherings or conferences (see our Events Page for details).",
        "Engage with participants, assist with event logistics, and contribute to creating a vibrant and supportive community.",
      ],
    },
    {
      icon: <Icons.VolunteerIcon6 />,
      heading: "Serve as a Career Speaker",
      desc: [
        "Share your expertise by teaching Fellows about your sector or profession.",
        "Provide valuable insights about career paths, industry trends, and key skills needed to succeed in your field.",
      ],
    },
    {
      icon: <Icons.VolunteerIcon7 />,
      heading: "Participate in Monthly Networking Nights",
      desc: [
        "Attend networking events where Fellows can connect with professionals like you.",
        "Help expand their professional networks and offer advice to guide them on their career journeys.",
      ],
    },
    {
      icon: <Icons.VolunteerIcon8 />,
      heading: "Get Involved",
      desc: [
        "We want your time, expertise, and support - there’s a role for everyone who wants to be involved! Sign up today and be part of a transformative experience!",
      ],
    },
  ];

  return (
    <div className={classNames(styles.eventWrapper)}>
      <div className="sm:px-0 xs:px-4 px-3">
        <CustomPageHeader
          heading="Volunteer Opportunities"
          description="We need you to be successful in supporting Boys & Girls Clubs of Boston alums as they work toward their goals and dreams!"
        />
      </div>
      <div className={classNames(styles.customContainer)}>
        <div
          className={classNames(
            styles.contentContainer,
            "grid sm:grid-cols-2 grid-cols-1 md:gap-6 gap-4"
          )}
        >
          {opportunitiesData.map((items, index) => (
            <div
              key={index}
              className={classNames(
                styles.contentItem,
                "flex flex-col md:gap-5 gap-4"
              )}
            >
              {items.icon}
              <h4>{items.heading}</h4>
              <ul className={classNames(styles.descList)}>
                {items.desc.map((data, idx) => (
                  <li key={idx} className="flex gap-2">
                    {typeof data === "string" && (
                      <span>
                        <Icons.StarListIcon />
                      </span>
                    )}
                    {typeof data === "string" ? (
                      <p>{data}</p>
                    ) : (
                      data.nestedDesc && (
                        <div className={classNames(styles.nestedDesc, "pl-6")}>
                          <ul>
                            {data.nestedDesc.map((nestedItem, nestedIdx) => (
                              <li key={nestedIdx} className="flex gap-2">
                                <span>
                                  <Icons.StarListIcon />
                                </span>
                                <p>{nestedItem}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CulturalCompass;
