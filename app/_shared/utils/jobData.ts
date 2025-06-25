// utils/jobData.ts
type CareerKey =
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'devops'
  | 'dataScientist'
  | 'aiEngineer'
  | 'cloudArchitect'
  | 'securityEngineer'
  | 'mobileDeveloper'
  | 'qaEngineer'
  | 'databaseAdmin'
  | 'technicalManager';
  
  interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  salaryRange: string;
  location: string;
  jobType: string[];
  experience: string[];
  workMode: string[];
  requiredSkills: string[];
  isRemote: boolean;
  careerRoles?: string[];
  matchPercentage?: number;
  preferredCareer?: CareerKey;
  relatedCareers?: CareerKey[];
  matchedSkills?: string[];
  experienceLevel?: 'entry' | 'mid' | 'senior';
}

export const jobData: Job[] = [
  {
    _id: "1",
    title: "Frontend React Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    salaryRange: "$90,000 - $130,000",
    requiredSkills: ["react", "javascript", "css", "ui", "responsive"],
    preferredCareer: "frontend",
    experienceLevel: "mid",
    isRemote: true,
    description: "Develop cutting-edge user interfaces with React and modern frontend technologies.",
    jobType: ["Full-time"],
    experience: ["2-5 years"],
    workMode: ["Remote", "Hybrid"]
  },
  {
    _id: "2",
    title: "Cloud Solutions Architect",
    company: "CloudTech Global",
    location: "Remote",
    salaryRange: "$120,000 - $160,000",
    requiredSkills: ["aws", "cloud", "architecture", "docker", "kubernetes"],
    preferredCareer: "cloudArchitect",
    relatedCareers: ["devops", "backend"],
    isRemote: true,
    description: "Design and implement scalable cloud infrastructure solutions for enterprise clients.",
    jobType: ["Full-time"],
    experience: ["5+ years"],
    workMode: ["Remote"]
  },
  {
    _id: "3",
    title: "Backend API Engineer",
    company: "DataSystems Corp",
    location: "New York, NY",
    salaryRange: "$110,000 - $150,000",
    requiredSkills: ["node", "api", "microservices", "rest", "java"],
    preferredCareer: "backend",
    experienceLevel: "mid",
    isRemote: false,
    description: "Build robust backend systems and APIs for high-traffic applications.",
    jobType: ["Full-time"],
    experience: ["3-5 years"],
    workMode: ["On-site"]
  },
  {
    _id: "4",
    title: "AI Research Scientist",
    company: "Neural Labs",
    location: "Boston, MA",
    salaryRange: "$140,000 - $190,000",
    requiredSkills: ["python", "machine-learning", "tensorflow", "neural-networks", "nlp"],
    preferredCareer: "aiEngineer",
    relatedCareers: ["dataScientist"],
    experienceLevel: "senior",
    isRemote: true,
    description: "Research and develop advanced AI models for natural language processing.",
    jobType: ["Full-time"],
    experience: ["PhD + 3 years"],
    workMode: ["Remote"]
  },
  {
    _id: "5",
    title: "DevOps Engineer",
    company: "InfraScale",
    location: "Austin, TX",
    salaryRange: "$110,000 - $150,000",
    requiredSkills: ["docker", "kubernetes", "sdlc", "automation", "load","csharp","dotnet"],
    preferredCareer: "devops",
    experienceLevel: "mid",
    isRemote: true,
    description: "Implement and maintain CI/CD pipelines and cloud infrastructure.",
    jobType: ["Full-time"],
    experience: ["3-5 years"],
    workMode: ["Remote", "Hybrid"]
  },
  {
    _id: "6",
    title: "Mobile Developer (Flutter)",
    company: "AppVentures",
    location: "Seattle, WA",
    salaryRange: "$100,000 - $140,000",
    requiredSkills: ["flutter", "mobile", "ios", "android", "rest"],
    preferredCareer: "mobileDeveloper",
    experienceLevel: "mid",
    isRemote: true,
    description: "Create beautiful cross-platform mobile applications with Flutter.",
    jobType: ["Full-time"],
    experience: ["3+ years"],
    workMode: ["Remote"]
  },
  {
    _id: "7",
    title: "Data Science Lead",
    company: "AnalyticsPro",
    location: "Chicago, IL",
    salaryRange: "$150,000 - $200,000",
    requiredSkills: ["python", "data-analysis", "machine-learning", "statistics", "pandas"],
    preferredCareer: "dataScientist",
    experienceLevel: "senior",
    isRemote: false,
    description: "Lead data science initiatives and build predictive models for business insights.",
    jobType: ["Full-time"],
    experience: ["6+ years"],
    workMode: ["Hybrid"]
  },
  {
    _id: "8",
    title: "Cybersecurity Specialist",
    company: "SecureNet Solutions",
    location: "Remote",
    salaryRange: "$120,000 - $160,000",
    requiredSkills: ["security", "encryption", "oauth", "jwt", "cybersecurity"],
    preferredCareer: "securityEngineer",
    experienceLevel: "mid",
    isRemote: true,
    description: "Protect systems and networks from cyber threats and vulnerabilities.",
    jobType: ["Full-time"],
    experience: ["3-5 years"],
    workMode: ["Remote"]
  },
  {
    _id: "9",
    title: "Database Administrator",
    company: "DataFlow Systems",
    location: "Denver, CO",
    salaryRange: "$100,000 - $140,000",
    requiredSkills: ["sql", "database", "nosql", "data-modeling", "optimization"],
    preferredCareer: "databaseAdmin",
    experienceLevel: "mid",
    isRemote: false,
    description: "Manage and optimize database systems for high-performance applications.",
    jobType: ["Full-time"],
    experience: ["3+ years"],
    workMode: ["On-site"]
  },
  {
    _id: "10",
    title: "QA Automation Engineer",
    company: "QualityFirst",
    location: "Portland, OR",
    salaryRange: "$90,000 - $120,000",
    requiredSkills: ["testing", "automation", "qa", "tdd", "quality"],
    preferredCareer: "qaEngineer",
    experienceLevel: "mid",
    isRemote: true,
    description: "Develop automated testing frameworks to ensure software quality.",
    jobType: ["Full-time"],
    experience: ["3+ years"],
    workMode: ["Remote"]
  },
  {
    _id: "11",
    title: "Technical Project Manager",
    company: "ProductiveTeams",
    location: "Miami, FL",
    salaryRange: "$130,000 - $170,000",
    requiredSkills: ["leadership", "communication", "project-management", "agile", "strategy"],
    preferredCareer: "technicalManager",
    experienceLevel: "senior",
    isRemote: true,
    description: "Lead technical teams and manage complex software projects.",
    jobType: ["Full-time"],
    experience: ["5+ years"],
    workMode: ["Remote"]
  },
  {
    _id: "12",
    title: "Full Stack Developer",
    company: "WebCraft Studios",
    location: "Toronto, Canada",
    salaryRange: "$100,000 - $140,000",
    requiredSkills: ["javascript", "node", "react", "api", "database"],
    preferredCareer: "fullstack",
    experienceLevel: "mid",
    isRemote: true,
    description: "Build end-to-end web applications from frontend to backend.",
    jobType: ["Full-time"],
    experience: ["3+ years"],
    workMode: ["Remote"]
  }
];