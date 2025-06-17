const BaseURL = "http://localhost:3001";



const GoogleKey = "";

const Endpoint = {
  auth: {
    login: "/api/sign-in",
    register: "/api/register",
    refreshToken: "/api/refresh-tokens",
    resetRequest: "auth/reset-request",
    resetPassword: "auth/reset-password",
    updatePassword: "auth/update-password",
  },
  assessment:{
     questions:"/api/assessment/questions",
     submit:"/api/assessment/submit",

  },
  job: {
    get: "jobs/get",
    getJobDetail: "jobs/get/:id",
    applyJob: "applications/apply-job/:id",
  },
  event: {
    get: "events/get",
    getEventDetail: "events/get/:id",
    getEventforCalendar: "events/get-all-for-calendar",
  },
  general: {
    contactUs: "/support/send-support-message",
  },
  user: {
    update: "/api/update-profile",
    getUpdatedUser: "/api/get-updated-user",
    getUser: "/api/get-user/:id",
    addFcmToken: "/api//add-fcm-token",
  },
  porfolio: {
    create: "/api/portfolios/create",
    update: "/api/portfolios/update/:id",
    delete: "/api/portfolios/delete/:id",
    get: "/api/portfolios/get/:id",
    getUserPortfolios: "/api/portfolios/get-user-portfolios/:id",
  },
  project: {
    create: "projects/create",
    update: "projects/update/:id",
    delete: "projects/delete/:id",
    get: "projects/get/:id",
    getUserProjects: "projects/get-user-portfolios/:id",
  },
  chat: {
    getAllConversation: "chat/get-all-conversations",
    getMessages: "chat/get-chats/:id",
    sendMessage: "chat/send-message",
  },
  notification: {
    get: "notifications/get-all-notifications",
    markRead: "notifications/mark-as-read/",
    unReadCount: "notifications/unread-count",
  },
};

export { Endpoint, BaseURL, GoogleKey };
