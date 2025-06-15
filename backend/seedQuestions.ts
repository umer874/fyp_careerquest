require('dotenv').config();

const mongoose = require('mongoose');
const Question = require('./models/Question');


export interface Question {
  id: number;
  question: string;
  options: { id: string; text: string }[];
}

const questions: Question[] = [
        {
            id: 1,
            question: "Which programming language are you most proficient in?",
            options: [
                { id: 'A', text: 'C++' },
                { id: 'B', text: 'Python' },
                { id: 'C', text: 'Java' },
                { id: 'D', text: 'JavaScript' },
                { id: 'E', text: 'Other' },
            ],
        },
        {
            id: 2,
            question: "Which area of software development interests you most?",
            options: [
                { id: 'A', text: 'Frontend (React, Angular, Vue)' },
                { id: 'B', text: 'Backend (Node.js, Django, Spring)' },
                { id: 'C', text: 'Mobile Development' },
                { id: 'D', text: 'Data Science/AI' },
                { id: 'E', text: 'DevOps/Cloud' },
            ],
        },
        {
            id: 3,
            question: "Which UI/UX design tool do you prefer?",
            options: [
                { id: 'A', text: 'Figma' },
                { id: 'B', text: 'Adobe XD' },
                { id: 'C', text: 'Sketch' },
                { id: 'D', text: 'InVision Studio' },
                { id: 'E', text: 'Other' },
            ],
        },
        {
            id: 4,
            question: "Which database technology are you most familiar with?",
            options: [
                { id: 'A', text: 'SQL (MySQL, PostgreSQL)' },
                { id: 'B', text: 'NoSQL (MongoDB, Cassandra)' },
                { id: 'C', text: 'Graph Databases (Neo4j)' },
                { id: 'D', text: 'In-memory (Redis)' },
                { id: 'E', text: 'NewSQL' },
            ],
        },
        {
            id: 5,
            question: "Which version control system do you primarily use?",
            options: [
                { id: 'A', text: 'Git (GitHub, GitLab)' },
                { id: 'B', text: 'Mercurial' },
                { id: 'C', text: 'SVN' },
                { id: 'D', text: 'Perforce' },
                { id: 'E', text: 'Other' },
            ],
        },
    ];


const seed = async () => {
  await mongoose.connect('mongodb://localhost:27017/your-db-name');
  await Question.deleteMany();
  await Question.insertMany(questions);
  console.log('Questions seeded!');
  process.exit();
};

seed();
