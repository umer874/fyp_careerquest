const BaseURL = "http://localhost:3001/api/";


const GoogleKey = "";

const Endpoint = {
  auth: {
    login: "/sign-in",
    register: "/register",
    refreshToken: "/refresh-tokens",
    resetRequest: "auth/reset-request",
    resetPassword: "auth/reset-password",
    updatePassword: "auth/update-password",
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
    update: "users/update-profile",
    getUpdatedUser: "users/get-updated-user",
    getUser: "users/get-user/:id",
    addFcmToken: "users/add-fcm-token",
  },
  porfolio: {
    create: "portfolios/create",
    update: "portfolios/update/:id",
    delete: "portfolios/delete/:id",
    get: "portfolios/get/:id",
    getUserPortfolios: "portfolios/get-user-portfolios/:id",
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
