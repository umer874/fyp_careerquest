require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/job');

const sampleJobs = [
  {
    title: "Frontend React Developer",
    company: "Tech Innovations Inc.",
    description: "We're looking for a skilled React developer to join our frontend team.",
    salaryRange: "$80,000 - $120,000",
    location: "San Francisco, CA",
    jobType: ["Full-time"],
    experience: ["Mid", "Senior"],
    workMode: ["Remote", "Hybrid"],
    requiredSkills: ["react", "javascript", "ui"],
    isRemote: true
  },
  {
    title: "Backend Node.js Engineer",
    company: "Data Systems Ltd.",
    description: "Join our backend team to build scalable APIs and services.",
    salaryRange: "$90,000 - $130,000",
    location: "New York, NY",
    jobType: ["Full-time"],
    experience: ["Senior"],
    workMode: ["Hybrid"],
    requiredSkills: ["node", "api", "microservices"],
    isRemote: false
  },
  // Add more sample jobs...
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Job.deleteMany({});
    await Job.insertMany(sampleJobs);
    console.log('✅ Jobs seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Job seeding failed:', error);
    process.exit(1);
  }
};

seedJobs();