// pages/api/users/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from 'lib/dbConnect';
import User from '../../../../backend/models/User';

type Data = {
  message?: string;
  token?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await dbConnect();

  const { firstname, lastname, email, dob, phonenumber, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: `${firstname} ${lastname}`,
      email,
      dob,
      phone: phonenumber,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.status(201).json({ message: 'User registered', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
