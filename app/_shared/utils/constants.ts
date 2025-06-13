import { Icons, Images } from "assets";
import React from "../../_assets/images/React.png";
import 
 from "../../_assets/images/
.png";
import UI from "../../_assets/images/UI.png";
import SeniorUI from "../../_assets/images/seniorUI.png";

import { routeConstant } from "routes/constants";

const headerLinks: SideBarItemPathType[] = [
  {
    path: routeConstant.home.path,
    title: routeConstant.home.title,
  },
  {
    path: routeConstant.about.path,
    title: routeConstant.about.title,
  },
  // {
  //   path: routeConstant.insights.path,
  //   title: routeConstant.insights.title,
  // },
  // {
  //   path: routeConstant.getInvolved.path,
  //   title: routeConstant.getInvolved.title,
  // },
  {
    path: routeConstant.contact.path,
    title: routeConstant.contact.title,
  },
];

const authSliderData = [
  {
    img: Images.AuthSliderImg1,
    desc: "",
    title: "",
    designation: "",
  },
];

const fellowDashboardConstants:
  SideBarItemsType[] = [
    {
      title: "Pages",
      paths: [
        {
          path: routeConstant.fellow.profile.path,
          title: routeConstant.fellow.profile.title,
          Icon: Icons.Profile,
        },
      ],
    },
    {
      title: "",
      paths: [
        {
          path: routeConstant.fellow.portfolios.path,
          title: routeConstant.fellow.portfolios.title,
          Icon: Icons.Portfolio,
        },
      ],
    },
    {
      title: "",
      paths: [
        {
          path: routeConstant.fellow.jobs.path,
          title: routeConstant.fellow.jobs.title,
          Icon: Icons.Jobs,
        },
      ],
    },
  ];




const coachesDashboardConstants: SideBarItemsType[] = [
  {
    title: "Main",
    paths: [
      {
        path: routeConstant.coach.chat.path,
        title: routeConstant.coach.chat.title,
        Icon: Icons.Chat,
      },
    ],
  },
];

const PortfolioTabs: {
  label: string;
  value: string;
}[] = [
    // { label: "Portfolio", value: routeConstant.fellow.portfolios.path },
    { label: "Project", value: routeConstant.fellow.projects.path },
    { label: "Resume", value: routeConstant.fellow.resume.path },
  ];
const servicesData = [
  {
    icon: Images.AlumPicture1,
    title: "Skill Assessments",
    desc: "Uncover your strengths and passions through detailed assessments, forming the foundation for personalized career guidance.",
  },
  {
    icon: Images.AlumPicture2,
    title: "Career Goals and Preferences",
    desc: "Captures user-defined goals, preferred roles, industries, and work environments to align recommendations with personal aspirations.",
  },
  {
    icon: Images.AlumPicture3,
    title: "Job Market Trends",
    desc: "Incorporates real-time labor market data to match users with high-demand roles and skills, ensuring relevance and employability.",
  },
  {
    icon: Images.AlumPicture4,
    title: "Profile Customization",
    desc: "Collects personal and professional details, including education, experience, skills, and career preferences, to build a tailored profile for recommendations.",
  },
  {
    icon: Images.AlumPicture5,
    title: "Collaboration Opportunities",
    desc: "Connects users with industry professionals and organizations to explore internships, jobs, and career guidance.",
  },
  {
    icon: Images.AlumPicture6,
    title: "Approach",
    desc: "Each person is valued for who they are and what they bring to CareerQuest. Diversity in thought, culture, and life experience are seen as strengths that teach and expand our collective whole.",
  },
];

const jobData = [
  {
    "title": "Junior UI / UX Designer",
    "company": "Netsole",
    "salaryRange": "35,000 - 45,000",
    "location": "Lahore, Pakistan",
    "jobType": ["Full time", "Beginner level"],
    "experience": ["1+ yrs exp"],
    "workMode": ["Hybrid"],
    "image": {
      "src": UI, // Corrected image path
      "width": 200,
      "height": 200
    },
    "applyButton": "Apply Now"
  },
  {
    "title": "ReactJS Developer",
    "company": "Coding Agents",
    "salaryRange": "60,000 - 70,000",
    "location": "Lahore, Pakistan",
    "jobType": ["Full time", "Mid level"],
    "experience": ["2-3+ yrs exp"],
    "workMode": ["Remote"],
    "image": {
      "src": React, // Corrected image path
      "width": 200,
      "height": 200
    },
    "applyButton": "Apply Now"
  },
  {
    "title": "
 Developer",
    "company": "System Limited",
    "salaryRange": "85,000 - 1,000,000",
    "location": "Lahore, Pakistan",
    "jobType": ["Full time", "Senior level"],
    "experience": ["4+ yrs exp"],
    "workMode": ["On-Site"],
    "image": {
      "src": 
, // Corrected image path
      "width": 200,
      "height": 200
    },
    
    "applyButton": "Apply Now"
  }
];

const jobs = [
  {
    id: 1,
    title: "Junior UI/UX Designer",
    company: {
      title: "TechCorp",
      company_asset: {
        icon: UI, // Imported icon
        width: 200,
        height: 200
      }
    },
    position_overview: "This role seeks a visionary designer driven by an unwavering passion for crafting intuitive and engaging user experiences. The candidate will collaborate across multidisciplinary teams to conceptualize, prototype, and iteratively refine sophisticated UI components that elevate the user journey to a new standard of excellence.",
    created_at: "2025-01-15T08:30:00Z"
  },
  {
    id: 2,
    title: "Senior UI/UX Designer",
    company: {
      title: "Creative Labs",
      company_asset: {
        icon: SeniorUI, // Imported icon
        width: 200,
        height: 200
      }
    },
    position_overview: "As a Senior Designer, you will spearhead strategic design initiatives, driving innovation to solve complex, high-impact challenges. This role demands not only creative mastery but also leadership in mentoring emerging talent, fostering a collaborative design culture, and shaping the evolution of transformative workplace communication solutions.",
    created_at: "2025-01-20T12:00:00Z"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: {
      title: "Slack Technologies, LLC",
      company_asset: {
        icon: 
, // Imported icon
        width: 200,
        height: 200
      }
    },
    position_overview: "As a 
 Developer, you will collaborate with the development team to build robust, scalable, and efficient backend systems while refining your skills in 
 programming. This role involves writing clean, maintainable code, developing APIs, integrating databases, and contributing to projects that enhance application performance and user experience, ensuring alignment with business requirements and technical goals.",
    created_at: "2025-01-18T12:40:00Z"
  },
  // Add more job objects here...
];





export {
  headerLinks,
  authSliderData,
  fellowDashboardConstants,
  coachesDashboardConstants,
  PortfolioTabs,
  servicesData,
  jobData,
  jobs,
};
