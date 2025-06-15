const Question = require('../models/Question');
const User = require('../models/User');

exports.getQuestions = async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
};

exports.submitAssessment = async (req, res) => {
  const { answers } = req.body;
  const userId = req.user.id;

  let skillScores = {};

  answers.forEach(({ questionId, optionId }) => {
    const question = questionsFromCache.find(q => q._id.toString() === questionId);
    const selectedOption = question?.options.find(o => o.id === optionId);
    selectedOption?.tags.forEach(tag => {
      skillScores[tag] = (skillScores[tag] || 0) + selectedOption.weight;
    });
  });

  // Filter top 3 skills
  const sortedSkills = Object.entries(skillScores)
    .sort(([, a], [, b]) => b - a)
    .map(([skill]) => skill)
    .slice(0, 3);

  await User.findByIdAndUpdate(userId, { skills: sortedSkills });

  res.json({ success: true, skills: sortedSkills });
};
