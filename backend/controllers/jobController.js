// controllers/jobRecommendation.js
const Job = require('../models/job');

exports.getRecommendedJobs = async (req, res) => {
  try {
    const { skills, careerRole } = req.body;
    
    if ((!skills || !Array.isArray(skills) || skills.length === 0) && !careerRole) {
      return res.status(400).json({ error: "Either skills array or careerRole is required" });
    }

    let query = {};
    let sort = {};

    // Priority 1: Career role match with skill overlap
    if (careerRole) {
      query = { 
        $or: [
          { careerRoles: careerRole },
          { requiredSkills: { $in: skills || [] } }
        ]
      };
      sort = { 
        // Jobs matching career role come first
        careerRoleMatch: -1,
        // Then sort by skill match percentage
        matchPercentage: -1 
      };
    } 
    // Priority 2: Skill-based matching
    else {
      query = { requiredSkills: { $in: skills } };
      sort = { matchPercentage: -1 };
    }

    const recommendedJobs = await Job.aggregate([
      { $match: query },
      {
        $addFields: {
          matchedSkills: {
            $setIntersection: ["$requiredSkills", skills || []]
          },
          careerRoleMatch: {
            $cond: [
              { $in: [careerRole, "$careerRoles"] },
              1, // Boost score if career role matches
              0
            ]
          }
        }
      },
      {
        $addFields: {
          matchPercentage: {
            $round: [
              {
                $multiply: [
                  {
                    $divide: [
                      { $size: "$matchedSkills" },
                      { $size: "$requiredSkills" }
                    ]
                  },
                  100
                ]
              }
            ]
          }
        }
      },
      { $match: { matchPercentage: { $gte: 12 } } },
      { $sort: sort },
      { $limit: 10 }
    ]);

    res.json({ jobs: recommendedJobs });
  } catch (error) {
    console.error("Job recommendation error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};