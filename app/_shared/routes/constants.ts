const routeConstant = {
  // Public Pages

  home: {
    path: "/",
    title: "Home",
  },

   test: {
      path: "/test",
      title: "Test",
    },
  insights: {
    path: "/general/insights",
    title: "Insights",
  },
  about: {
    path: "/general/about",
    title: "About",
  },
  jobDetail: {
    path: "/general/jobs/:id",
    title: "Job Detail",
  },
  events: {
    path: "/general/events",
    title: "Events",
  },
  eventDetail: {
    path: "/general/events/:id",
    title: "Event Detail",
  },
  contact: {
    path: "/general/contact",
    title: "Contact",
  },
  getInvolved: {
    path: "/general/getInvolved",
    title: "Get Involved",
  },
  vision: {
    path: "/general/vision",
    title: "Vision In Action",
  },
  volunteerOpportunities: {
    path: "/general/volunteerOpportunities",
    title: "Volunteer Opportunities",
  },
  culturalCompass: {
    path: "/general/culturalCompass",
    title: "Cultural Compass",
  },
  photoGallery: {
    path: "/general/photoGallery",
    title: "Photo Gallery",
  },
  profileSettings: {
    path: "/general/profileSettings",
    title: "Profile Settings",
  },

  // Auth
  login: {
    path: "/auth/login",
    title: "Login",
  },
  forgotPassword: {
    path: "/auth/forgotPassword",
    title: "Forgot Password",
  },
  resetPassword: {
    path: "/auth/resetPassword",
    title: "Reset Password",
  },
  signUp: {
    path: "/auth/signUp",
    title: "Signup",
  },

  // Fellow Dashboard

  fellow: {
    layout: {
      path: "/fellow/layout",
      title: "fellow",
    },
    dashboard: {
      path: "/fellow/dashboard",
      title: "Dashbaord",
    },
    profile: {
      path: "/fellow/profile",
      title: "My Profile",
    },
    portfolios: {
      path: "/fellow/portfolio/portfolio",
      title: "CareerGuide",
    },
    projects: {
      path: "/fellow/portfolio/project",
      title: "Project",
    },
    resume: {
      path: "/fellow/portfolio/resume",
      title: "Resume",
    },
    portfolioDetail: {
      path: "/fellow/portfolio/portfolio/:id",
      title: "Portfolio Detail",
    },
    projectDetail: {
      path: "/fellow/portfolio/project/:id",
      title: "Project Detail",
    },
    jobs: {
      path: "/fellow/jobs",
      title: "Jobs",
    },
    jobsDetail: {
      path: "/fellow/jobs/:id",
      title: "Jobs Detail",
    },
    events: {
      path: "/fellow/events",
      title: "Events",
    },
    eventsDetail: {
      path: "/fellow/events/:id",
      title: "Events Detail",
    },
    contact: {
      path: "/fellow/contact",
      title: "Contact",
    },
    profileSettings: {
      path: "/fellow/profileSettings",
      title: "Profile Settings",
    },
  },

  // Coaches/ Mentor Dashboard
  coach: {
    chat: {
      path: "/coaches/chats",
      title: "Career Chats",
    },
    fellowDetail: {
      path: "/coaches/fellow/:id",
      title: "Chat Detail",
    },
    portfolioDetail: {
      path: "/coaches/portfolio/:id",
      title: "Portfolio Detail",
    },
    projectDetail: {
      path: "/coaches/project/:id",
      title: "Project Detail",
    },
    profileSettings: {
      path: "/coaches/profileSettings",
      title: "Profile Settings",
    },
    contact: {
      path: "/coaches/contact",
      title: "Contact",
    },
  },
};

export { routeConstant };
