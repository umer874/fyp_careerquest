// services/jobRecommendation.ts
import axios from 'axios';
import { BaseURL, Endpoint } from 'utils/endpoints';


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

interface CareerMatch {
  title: string;
  description: string;
  icon: string;
  coreSkills: string[];
  relatedCategories: string[];
}

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

const careerMatches: Record<CareerKey, CareerMatch> = {
  frontend: {
    title: "Frontend Specialist",
    description: "You excel at creating intuitive user interfaces with modern frameworks like React, Angular, or Vue.",
    icon: "💻",
    coreSkills: ['react', 'javascript', 'ui', 'css', 'responsive'],
    relatedCategories: ['ui', 'tools']
  },
  backend: {
    title: "Backend Engineer",
    description: "You specialize in server-side logic, databases, and API development.",
    icon: "🔌",
    coreSkills: ['node', 'java', 'api', 'microservices', 'rest'],
    relatedCategories: ['backend', 'database', 'architecture']
  },
  fullstack: {
    title: "Full Stack Developer",
    description: "You're proficient in both frontend and backend technologies, capable of building complete web applications.",
    icon: "🔄",
    coreSkills: ['javascript', 'node'],
    relatedCategories: ['ui', 'backend', 'database']
  },
  devops: {
    title: "DevOps Engineer",
    description: "You focus on automation, CI/CD pipelines, and infrastructure management using tools like Docker, Kubernetes, and cloud platforms.",
    icon: "⚙️",
    coreSkills: ['docker', 'kubernetes', 'ci-cd', 'automation', 'cloud'],
    relatedCategories: ['devops', 'cloud', 'tools']
  },
  dataScientist: {
    title: "Data Scientist",
    description: "You extract insights from complex datasets using statistical analysis, machine learning, and data visualization techniques.",
    icon: "📊",
    coreSkills: ['python', 'machine-learning', 'statistics', 'data-analysis', 'pandas'],
    relatedCategories: ['ai', 'database', 'analytics']
  },
  aiEngineer: {
    title: "AI Engineer",
    description: "You build intelligent systems using deep learning, natural language processing, and computer vision technologies.",
    icon: "🤖",
    coreSkills: ['neural-networks', 'tensorflow', 'nlp', 'deep-learning', 'python'],
    relatedCategories: ['ai', 'ml', 'deep-learning']
  },
  cloudArchitect: {
    title: "Cloud Architect",
    description: "You design and implement scalable cloud infrastructure solutions on platforms like AWS, Azure, or GCP.",
    icon: "☁️",
    coreSkills: ['aws', 'azure', 'gcp', 'cloud', 'scalability'],
    relatedCategories: ['cloud', 'devops', 'architecture']
  },
  securityEngineer: {
    title: "Security Engineer",
    description: "You protect systems and data from cyber threats through encryption, authentication, and security protocols.",
    icon: "🔒",
    coreSkills: ['encryption', 'security', 'oauth', 'jwt', 'cybersecurity'],
    relatedCategories: ['security', 'authentication', 'encryption']
  },
  mobileDeveloper: {
    title: "Mobile Developer",
    description: "You create native or cross-platform mobile applications for iOS and Android using technologies like React Native or Flutter.",
    icon: "📱",
    coreSkills: ['react-native', 'flutter', 'ios', 'android', 'mobile'],
    relatedCategories: ['mobile', 'cross-platform', 'ui']
  },
  qaEngineer: {
    title: "QA Engineer",
    description: "You ensure software quality through automated testing, manual testing, and quality assurance processes.",
    icon: "🧪",
    coreSkills: ['testing', 'automation', 'qa', 'tdd', 'quality'],
    relatedCategories: ['testing', 'automation', 'quality']
  },
  databaseAdmin: {
    title: "Database Administrator",
    description: "You specialize in database design, optimization, and management for SQL, NoSQL, and NewSQL systems.",
    icon: "💾",
    coreSkills: ['sql', 'nosql', 'database', 'optimization', 'data-modeling'],
    relatedCategories: ['database', 'data-modeling', 'optimization']
  },
  technicalManager: {
    title: "Technical Manager",
    description: "You lead technical teams, manage projects, and bridge the gap between technical and business requirements.",
    icon: "👔",
    coreSkills: ['leadership', 'communication', 'project-management', 'agile', 'strategy'],
    relatedCategories: ['soft-skills', 'management', 'communication']
  }
};

// services/jobRecommendation.ts
export const getRecommendedJobs = (
  userCareer: CareerKey | undefined, // Make optional
  userSkills: string[],
  allJobs: Job[]
): Job[] => {
  return allJobs.map(job => {
    let score = 0;
    
    // Career-based scoring only if career exists
    if (userCareer) {
      if (job.preferredCareer === userCareer) score += 10;
      if (job.relatedCareers?.includes(userCareer)) score += 5;
      
      const careerCoreSkills = careerMatches[userCareer].coreSkills;
      const coreMatches = careerCoreSkills.filter(skill =>
        job.requiredSkills.includes(skill)
      ).length;
      score += coreMatches * 5;
    }
    
    // Skill-based scoring (always works)
    const skillMatches = job.requiredSkills.filter(skill => 
      userSkills.includes(skill)
    ).length;
    score += skillMatches * 8; // Increased weight for skills
    
    return { ...job, relevanceScore: score };
  })
  .filter(job => job.relevanceScore > 5)
  .sort((a, b) => b.relevanceScore - a.relevanceScore)
  .slice(0, 6);
};