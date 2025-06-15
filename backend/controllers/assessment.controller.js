const Question = require('../models/Question');
const User = require('../models/User');

exports.submitAssessment = async (req, res) => {
  try {
    const { answers, userId } = req.body;

    if (!userId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const questionsFromDB = await Question.find();
    const skillScores = {};

    answers.forEach(({ questionId, optionId }) => {
      const question = questionsFromDB.find(q => q._id.toString() === questionId);
      const selectedOption = question?.options.find(o => o.id === optionId);

      if (selectedOption?.tags) {
        selectedOption.tags.forEach(tag => {
          skillScores[tag] = (skillScores[tag] || 0) + (selectedOption.weight || 1);
        });
      }
    });

    const sortedSkills = Object.entries(skillScores)
      .sort(([, a], [, b]) => b - a)
      .map(([skill]) => skill)
      .slice(0, 3);

    await User.findByIdAndUpdate(userId, { skills: sortedSkills });

    res.json({ success: true, skills: sortedSkills });

  } catch (err) {
    console.error("Error in submitAssessment:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};




