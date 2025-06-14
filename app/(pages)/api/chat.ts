import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface CareerMatch {
  title: string;
  description: string;
  icon: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { answers } = req.body;

  // Validate input
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Invalid answers format' });
  }
    const prompt = `
    You are a career advisor AI. Based on the following quiz answers, suggest the most suitable IT career. Be concise and include a title, description, and emoji icon.
    
    Answers: ${JSON.stringify(answers)}
    
    Respond in JSON format like:
    {
      "title": "Frontend Developer",
      "description": "You enjoy working with design and code to build engaging user experiences.",
      "icon": "💻"
    }`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0]?.message?.content;
    if (!content) throw new Error('No content in response');

    const jsonResponse = JSON.parse(content);
    
    

    res.status(200).json(jsonResponse);
  
}