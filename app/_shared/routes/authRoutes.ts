import { routeConstant } from "./constants";

const commonRoutes: any = [
  {
    path: routeConstant.home.path,
    title: routeConstant.home.title,
  },
  {
    path: routeConstant.resetPassword.path,
    title: routeConstant.resetPassword.title,
  },
  {
    path: routeConstant.insights.path,
    title: routeConstant.insights.title,
  },
  {
    path: routeConstant.jobDetail.path,
    title: routeConstant.jobDetail.title,
  },
  {
    path: routeConstant.events.path,
    title: routeConstant.events.title,
  },
  {
    path: routeConstant.eventDetail.path,
    title: routeConstant.eventDetail.title,
  },
  {
    path: routeConstant.contact.path,
    title: routeConstant.contact.title,
  },
];

const fellowRoutes: any = [
  ...commonRoutes,
  // {
  //   path: routeConstant.fellow.chats.path,
  //   title: routeConstant.fellow.chats.title,
  // },
  {
    path: routeConstant.fellow.portfolios.path,
    title: routeConstant.fellow.portfolios.title,
  },
  {
    path: routeConstant.fellow.projects.path,
    title: routeConstant.fellow.projects.title,
  },
  {
    path: routeConstant.fellow.resume.path,
    title: routeConstant.fellow.resume.title,
  },
  {
    path: routeConstant.fellow.portfolioDetail.path,
    title: routeConstant.fellow.portfolioDetail.title,
  },
  {
    path: routeConstant.fellow.projectDetail.path,
    title: routeConstant.fellow.projectDetail.title,
  },
  {
    path: routeConstant.fellow.jobs.path,
    title: routeConstant.fellow.jobs.title,
  },
  {
    path: routeConstant.fellow.jobsDetail.path,
    title: routeConstant.fellow.jobsDetail.title,
  },
  {
    path: routeConstant.fellow.events.path,
    title: routeConstant.fellow.events.title,
  },
  {
    path: routeConstant.fellow.eventsDetail.path,
    title: routeConstant.fellow.eventsDetail.title,
  },
  {
    path: routeConstant.fellow.contact.path,
    title: routeConstant.fellow.contact.title,
  },
  {
    path: routeConstant.fellow.profileSettings.path,
    title: routeConstant.fellow.profileSettings.title,
  },
];

const coachMentorRoutes: any = [
  ...commonRoutes,
  {
    path: routeConstant.coach.chat.path,
    title: routeConstant.coach.chat.title,
  },
  {
    path: routeConstant.coach.fellowDetail.path,
    title: routeConstant.coach.fellowDetail.title,
  },
  {
    path: routeConstant.coach.portfolioDetail.path,
    title: routeConstant.coach.portfolioDetail.title,
  },
  {
    path: routeConstant.coach.projectDetail.path,
    title: routeConstant.coach.projectDetail.title,
  },
  {
    path: routeConstant.coach.contact.path,
    title: routeConstant.coach.contact.title,
  },
  {
    path: routeConstant.coach.profileSettings.path,
    title: routeConstant.coach.profileSettings.title,
  },
];

const participantRoutes: any = [
  ...commonRoutes,
  {
    path: routeConstant.profileSettings.path,
    title: routeConstant.profileSettings.title,
  },
];

const publicRoutes: any = [
  ...commonRoutes,
  {
    path: routeConstant.login.path,
    title: routeConstant.login.title,
  },
  {
    path: routeConstant.signUp.path,
    title: routeConstant.signUp.title,
  },
  {
    path: routeConstant.forgotPassword.path,
    title: routeConstant.forgotPassword.title,
  },
];

export { publicRoutes, fellowRoutes, coachMentorRoutes, participantRoutes };
