
require('dotenv').config();

import dotenv from 'dotenv';
import mongoose from 'mongoose';
const Question = require('./models/Question');



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


const questions: Question[] = [
  {
    questionId: 1,
    question: "Which programming language are you most proficient in?",
    options: [
      { id: 'A', text: 'C++', tags: ['problem-solving', 'low-level'], weight: 2 },
      { id: 'B', text: 'Python', tags: ['ai', 'automation', 'scripting'], weight: 3 },
      { id: 'C', text: 'Java', tags: ['backend', 'oop'], weight: 2 },
      { id: 'D', text: 'JavaScript', tags: ['frontend', 'web'], weight: 3 },
      { id: 'E', text: 'Other', tags: ['generalist'], weight: 1 },
    ],
  },
  {
    questionId: 2,
    question: "Which area of software development interests you most?",
    options: [
      { id: 'A', text: 'Frontend (React, Angular, Vue)', tags: ['frontend', 'uiux'], weight: 3 },
      { id: 'B', text: 'Backend (Node.js, Django, Spring)', tags: ['backend', 'api'], weight: 3 },
      { id: 'C', text: 'Mobile Development', tags: ['mobile', 'cross-platform'], weight: 3 },
      { id: 'D', text: 'Data Science/AI', tags: ['ai', 'data'], weight: 4 },
      { id: 'E', text: 'DevOps/Cloud', tags: ['devops', 'cloud'], weight: 3 },
    ],
  },
  {
   questionId: 3,
    question: "Which UI/UX design tool do you prefer?",
    options: [
      { id: 'A', text: 'Figma', tags: ['uiux', 'design'], weight: 3 },
      { id: 'B', text: 'Adobe XD', tags: ['uiux', 'design'], weight: 2 },
      { id: 'C', text: 'Sketch', tags: ['uiux', 'design'], weight: 2 },
      { id: 'D', text: 'InVision Studio', tags: ['uiux', 'design'], weight: 2 },
      { id: 'E', text: 'Other', tags: ['design'], weight: 1 },
    ],
  },
  {
    questionId: 4,
    question: "Which database technology are you most familiar with?",
    options: [
      { id: 'A', text: 'SQL (MySQL, PostgreSQL)', tags: ['database', 'sql'], weight: 3 },
      { id: 'B', text: 'NoSQL (MongoDB, Cassandra)', tags: ['database', 'nosql'], weight: 3 },
      { id: 'C', text: 'Graph Databases (Neo4j)', tags: ['database', 'graph'], weight: 2 },
      { id: 'D', text: 'In-memory (Redis)', tags: ['database', 'performance'], weight: 2 },
      { id: 'E', text: 'NewSQL', tags: ['database', 'scalable'], weight: 2 },
    ],
  },
  {
   questionId: 5,
    question: "Which version control system do you primarily use?",
    options: [
      { id: 'A', text: 'Git (GitHub, GitLab)', tags: ['tools', 'collaboration'], weight: 3 },
      { id: 'B', text: 'Mercurial', tags: ['tools'], weight: 2 },
      { id: 'C', text: 'SVN', tags: ['tools'], weight: 2 },
      { id: 'D', text: 'Perforce', tags: ['tools'], weight: 2 },
      { id: 'E', text: 'Other', tags: ['tools'], weight: 1 },
    ],
  },
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

    // Verify connection is ready
    // await mongoose.connection.db.admin().ping();
    // console.log('✅ Database ping successful');

    // Clear existing data with timeout handling
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
