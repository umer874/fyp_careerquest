const mongoose = require('mongoose');
const Question = require('../models/Question');
const User = require('../models/User');

exports.submitAssessment = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    // 1. Enhanced input validation
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        error: "Invalid user ID",
        details: `Received: ${userId} (${typeof userId})`
      });
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        error: "Invalid answers format",
        details: "Expected non-empty array of answer objects"
      });
    }

    // 2. Get questions with only necessary fields
    const questions = await Question.find({})
      .select('questionId options.id options.text options.tags options.weight')
      .lean();

    // 3. Calculate skill scores with validation
    const skillScores = {};
    let validAnswersCount = 0;

    for (const answer of answers) {
      const question = questions.find(q => q.questionId === answer.questionId);

      if (!question) {
        console.warn(`Question ${answer.questionId} not found`);
        continue;
      }

      const option = question.options.find(o => o.id === answer.optionId);

      if (!option) {
        console.warn(`Option ${answer.optionId} not found in question ${answer.questionId}`);
        continue;
      }

      if (option.tags?.length) {
        option.tags.forEach(tag => {
          skillScores[tag] = (skillScores[tag] || 0) + (option.weight || 1);
        });
        validAnswersCount++;
      }
    }

    // 4. Validate we processed answers
    if (validAnswersCount === 0) {
      return res.status(400).json({
        error: "No valid answers processed",
        details: {
          receivedAnswers: answers.length,
          matchedQuestions: questions.length
        }
      });
    }

    // 5. Get top 3 skills with score information
    const scoredSkills = Object.entries(skillScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([skill, score]) => ({ skill, score }));

    const topSkills = scoredSkills.map(item => item.skill);

    // 6. Update user with transaction for data consistency
    const session = await mongoose.startSession();
    session.startTransaction();

    let committed = false;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          skills: topSkills,
          careerMatch: req.body.careerMatch,
          careerRole: scoredSkills[0].skill,
          lastAssessmentDate: new Date(),
           $inc: { assessmentsTaken: 1 },
          has_taken_test: true
        },
        {
          new: true,
          session,
          select: 'skills lastAssessmentDate has_taken_test'
        }
      );

      if (!updatedUser) {
        await session.abortTransaction();  // Roll back
        return res.status(404).json({ error: "User not found for update" });
      }

      await session.commitTransaction();

      committed = true;

      res.json({
        success: true,
        skills: topSkills,
        skillDetails: scoredSkills,
        careerRole: scoredSkills[0].skill,
        user: {
          skills: updatedUser.skills,
          has_taken_test: updatedUser.has_taken_test,
          lastAssessed: updatedUser.lastAssessmentDate
        }
      });
    } catch (updateError) {
      if (!committed) {
        await session.abortTransaction();
      }
      throw updateError;
    } finally {
      session.endSession();
    }


  } catch (error) {
    console.error("Assessment error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .select('-__v')
      .lean();

    res.status(200).json(questions);
  } catch (err) {
    console.error("Failed to fetch questions:", err);
    res.status(500).json({
      error: 'Failed to fetch questions',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};