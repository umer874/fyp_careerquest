const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  salaryRange: { type: String },
  location: { type: String, required: true },
  jobType: { type: [String], enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  experience: { type: [String], enum: ['Entry', 'Mid', 'Senior'] },
  workMode: { type: [String], enum: ['Remote', 'Hybrid', 'On-site'] },
  requiredSkills: { type: [String], required: true },
  isRemote: { type: Boolean, default: false },
  postedAt: { type: Date, default: Date.now },
  careerRoles: {
    type: [String],
    enum: [
      'frontend', 'backend', 'fullstack', 'devops', 'dataScientist',
      'aiEngineer', 'cloudArchitect', 'securityEngineer', 'mobileDeveloper',
      'qaEngineer', 'databaseAdmin', 'technicalManager'
    ]
  }
});

module.exports = mongoose.model('Job', jobSchema);