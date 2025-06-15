require('dotenv').config();

// routes/assessment.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/assessment.controller');

//router.get('/assessment/questions', controller.getQuestions);
router.post('/assessment/submit', controller.submitAssessment);


// Add this temporary route
router.get('/debug/questions', async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json({
      count: questions.length,
      sampleQuestion: {
        id: questions[0]?._id,
        questionId: questions[0]?.questionId,
        options: questions[0]?.options.map(o => ({
          id: o.id,
          tags: o.tags,
          weight: o.weight
        }))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
