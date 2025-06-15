const Question = require('../models/Question');
const User = require('../models/User');

exports.submitAssessment = async (req, res) => {
  try {
    const { userId, answers } = req.body;
    
    // 1. Validate input
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: "Answers must be a non-empty array" });
    }

    // 2. Get all questions (only needed fields)
    const questions = await Question.find({}, 'questionId options');

    // 3. Calculate skills
    const skillScores = {};
    let processedAnswers = 0;

    answers.forEach(answer => {
      const question = questions.find(q => q.questionId === answer.questionId);
      
      if (!question) {
        console.warn(`Question ${answer.questionId} not found`);
        return;
      }

      const option = question.options.find(o => o.id === answer.optionId);
      
      if (option?.tags) {
        option.tags.forEach(tag => {
          skillScores[tag] = (skillScores[tag] || 0) + (option.weight || 1);
        });
        processedAnswers++;
      }
    });

    // 4. Handle case where no valid answers processed
    if (processedAnswers === 0) {
      return res.status(400).json({ 
        error: "No valid answers processed",
        debug: {
          receivedAnswers: answers,
          availableQuestions: questions.map(q => q.questionId)
        }
      });
    }

    // 5. Get top 3 skills
    const topSkills = Object.entries(skillScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([skill]) => skill);

    // 6. Update user
    await User.findByIdAndUpdate(userId, { skills: topSkills });

    res.json({ 
      success: true,
      skills: topSkills,
      debug: {
        processedAnswers,
        skillScores
      }
    });

  } catch (error) {
    console.error("Assessment error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
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




