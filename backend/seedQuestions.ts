
require('dotenv').config();

import dotenv from 'dotenv';
import mongoose from 'mongoose';
const Question = require('./models/question');



interface Question {
  questionId: number;
  question: string;
  options: {
    id: string;
    text: string;
    tags: string[]; // ✅ Corrected
    weight: number; // ✅ Use lowercase 'number'
  }[];
}


  const questions = [
  // Fundamentals
  {
    questionId: 1,
    category: "fundamentals",
    question: "Which programming paradigm do you prefer?",
    options: [
      { id: 'A', text: 'Object-Oriented Programming', tags: ['oop', 'java', 'csharp'], weight: 3 },
      { id: 'B', text: 'Functional Programming', tags: ['functional', 'scala', 'haskell'], weight: 3 },
      { id: 'C', text: 'Procedural Programming', tags: ['c', 'pascal'], weight: 2 },
      { id: 'D', text: 'Multi-paradigm approach', tags: ['javascript', 'python'], weight: 4 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  },

  // Frontend
  {
    questionId: 2,
    category: "frontend",
    question: "Which frontend framework do you prefer for complex applications?",
    options: [
      { id: 'A', text: 'React', tags: ['react', 'next.js'], weight: 4 },
      { id: 'B', text: 'Angular', tags: ['typescript', 'enterprise'], weight: 4 },
      { id: 'C', text: 'Vue.js', tags: ['vue', 'progressive'], weight: 3 },
      { id: 'D', text: 'Svelte', tags: ['svelte', 'compiler'], weight: 3 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  },

  // Backend
  {
    questionId: 3,
    category: "backend",
    question: "Which backend technology do you prefer for building APIs?",
    options: [
      { id: 'A', text: 'Node.js', tags: ['node', 'javascript', 'api'], weight: 4 },
      { id: 'B', text: 'Spring Boot', tags: ['java', 'spring', 'microservices'], weight: 4 },
      { id: 'C', text: 'Django', tags: ['python', 'django', 'rapid'], weight: 3 },
      { id: 'D', text: '.NET Core', tags: ['csharp', 'dotnet', 'enterprise'], weight: 4 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  },

  // Cloud/DevOps
  {
    questionId: 4,
    category: "devops",
    question: "Which cloud platform do you prefer for deployment?",
    options: [
      { id: 'A', text: 'AWS', tags: ['aws', 'cloud', 'scalable'], weight: 4 },
      { id: 'B', text: 'Azure', tags: ['azure', 'microsoft', 'enterprise'], weight: 4 },
      { id: 'C', text: 'Google Cloud', tags: ['gcp', 'ai', 'kubernetes'], weight: 3 },
      { id: 'D', text: 'Self-hosted solutions', tags: ['onprem', 'security'], weight: 3 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  },

  // Databases
  {
    questionId: 5,
    category: "database",
    question: "Which database technology do you prefer for transactional systems?",
    options: [
      { id: 'A', text: 'SQL (MySQL, PostgreSQL)', tags: ['sql', 'relational', 'acid'], weight: 4 },
      { id: 'B', text: 'NoSQL (MongoDB, Cassandra)', tags: ['nosql', 'scalable', 'flexible'], weight: 4 },
      { id: 'C', text: 'Graph Databases (Neo4j)', tags: ['graph', 'relationships'], weight: 3 },
      { id: 'D', text: 'NewSQL (CockroachDB)', tags: ['newsql', 'scalable', 'acid'], weight: 3 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  },

  // Security
  {
    questionId: 6,
    category: "security",
    question: "Which security approach do you prioritize?",
    options: [
      { id: 'A', text: 'Encryption & Data Protection', tags: ['encryption', 'data-security'], weight: 4 },
      { id: 'B', text: 'Authentication & Authorization', tags: ['oauth', 'jwt', 'iam'], weight: 4 },
      { id: 'C', text: 'Network Security', tags: ['firewalls', 'vpn', 'ddos'], weight: 3 },
      { id: 'D', text: 'Security by Design', tags: ['secure-coding', 'sdlc'], weight: 4 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  },

  // Testing
  {
    questionId: 7,
    category: "testing",
    question: "Which testing methodology do you prefer?",
    options: [
      { id: 'A', text: 'Test-Driven Development', tags: ['tdd', 'automation'], weight: 4 },
      { id: 'B', text: 'Behavior-Driven Development', tags: ['bdd', 'collaboration'], weight: 3 },
      { id: 'C', text: 'Exploratory Testing', tags: ['manual', 'user-experience'], weight: 3 },
      { id: 'D', text: 'Performance Testing', tags: ['load', 'stress', 'scalability'], weight: 4 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  },

  // Architecture
  {
    questionId: 8,
    category: "architecture",
    question: "Which architectural pattern do you prefer for large systems?",
    options: [
      { id: 'A', text: 'Microservices', tags: ['distributed', 'scalable'], weight: 4 },
      { id: 'B', text: 'Monolith', tags: ['simple', 'single-codebase'], weight: 2 },
      { id: 'C', text: 'Serverless', tags: ['faas', 'event-driven'], weight: 3 },
      { id: 'D', text: 'Event-Driven Architecture', tags: ['events', 'decoupled'], weight: 4 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  },

  // AI/ML
  {
    questionId: 9,
    category: "ai",
    question: "Which AI/ML approach interests you most?",
    options: [
      { id: 'A', text: 'Deep Learning', tags: ['neural-networks', 'tensorflow'], weight: 4 },
      { id: 'B', text: 'Natural Language Processing', tags: ['nlp', 'chatbots'], weight: 3 },
      { id: 'C', text: 'Computer Vision', tags: ['image-processing', 'opencv'], weight: 3 },
      { id: 'D', text: 'Predictive Analytics', tags: ['machine-learning', 'forecasting'], weight: 4 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  },

  // Mobile
  {
    questionId: 10,
    category: "mobile",
    question: "Which mobile development approach do you prefer?",
    options: [
      { id: 'A', text: 'Native Development', tags: ['ios', 'android', 'performance'], weight: 4 },
      { id: 'B', text: 'Cross-Platform (React Native)', tags: ['javascript', 'cross-platform'], weight: 4 },
      { id: 'C', text: 'Cross-Platform (Flutter)', tags: ['dart', 'ui', 'performance'], weight: 4 },
      { id: 'D', text: 'Progressive Web Apps', tags: ['web', 'offline'], weight: 3 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  },

  // Soft Skills
  {
    questionId: 11,
    category: "soft-skills",
    question: "Which soft skill is most valuable in your work?",
    options: [
      { id: 'A', text: 'Problem Solving', tags: ['analytical', 'critical-thinking'], weight: 4 },
      { id: 'B', text: 'Communication', tags: ['collaboration', 'documentation'], weight: 4 },
      { id: 'C', text: 'Time Management', tags: ['organization', 'deadlines'], weight: 3 },
      { id: 'D', text: 'Adaptability', tags: ['flexibility', 'learning'], weight: 4 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  },

  // Tools & Methodologies
  {
    questionId: 12,
    category: "tools",
    question: "Which development methodology do you prefer?",
    options: [
      { id: 'A', text: 'Agile (Scrum)', tags: ['iterative', 'sprints'], weight: 4 },
      { id: 'B', text: 'Kanban', tags: ['continuous', 'flow'], weight: 3 },
      { id: 'C', text: 'Waterfall', tags: ['structured', 'sequential'], weight: 2 },
      { id: 'D', text: 'DevOps', tags: ['automation', 'ci-cd'], weight: 4 },
      { id: 'E', text: 'None of these', tags: ['generalist'], weight: 1 }
    ]
  }
];


const seed = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI missing in .env");

    // Enhanced connection with proper timeouts
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    });

    console.log('✅ Connected to MongoDB Atlas');

    
    console.log('⏳ Clearing existing questions...');
    await Question.deleteMany({}).maxTimeMS(30000); // 30s timeout
    console.log('✅ Existing questions cleared');

    // Insert new data with timeout handling
    console.log('⏳ Seeding new questions...');
    const result = await Question.insertMany(questions, {
      maxTimeMS: 30000 // 30s timeout
    });

    console.log(`✅ Successfully seeded ${result.length} questions`);
    console.log('Sample question:', {
      id: result[0].questionId,
      question: result[0].question.slice(0, 50) + '...'
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();
