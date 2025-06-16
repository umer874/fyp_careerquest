import dbConnect from '../lib/db';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
     const { email, password } = req.body;
 
     const user = await User.findOne({ email });
     if (!user) return res.status(400).json({ message: 'Invalid email or password' });
 
     const isPasswordValid = await bcrypt.compare(password, user.password);
     if (!isPasswordValid)
       return res.status(400).json({ message: 'Invalid email or password' });
 
     // Generate access and refresh tokens
     const accessToken = jwt.sign(
       { id: user._id },
       process.env.JWT_ACCESS_SECRET,
       { expiresIn: '1h' }
     );
 
     const refreshToken = jwt.sign(
       { id: user._id },
       process.env.JWT_REFRESH_SECRET,
       { expiresIn: '7d' }
     );
 
     // Optionally: Save refresh token in DB or cache (for verification later)
 
     res.status(200).json({
       message: 'Login successful',
       user: {
         _id: user._id, // ✅ Add this line
         first_name: user.firstName,
         last_name: user.lastName,
         email: user.email,
       },
       accessToken,
       refreshToken
     });
 
 
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server error' });
   }
}
