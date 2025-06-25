const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      dob,
      phonenumber,
      phone,
      coordinates,
      checked,
      password,
    } = req.body;

    const payload = {
      firstName: firstname || req.body.firstName,
      lastName: lastname || req.body.lastName,
      email,
      dob,
      phone: phonenumber || phone,
      coordinates: JSON.parse(coordinates || '[]'),
      checked: checked === 'true',
      password,
    };

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return res.status(400).json({ message: ['Email already exists'] });
    }

    // ✅ Hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(payload.password, 10);
    } catch (bcryptError) {
      console.error("Password hashing error:", bcryptError.message);
      return res.status(500).json({ message: ['Password encryption failed'] });
    }

    // ✅ Save user
    const newUser = new User({ ...payload, password: hashedPassword });
    try {
      await newUser.save();
    } catch (dbError) {
      console.error("User save error:", dbError.message);
      return res.status(500).json({ message: ['Failed to save user to database'] });
    }

    // ✅ Create JWT
    let token;
    try {
      token = jwt.sign({ id: newUser._id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1d',
      });
    } catch (jwtError) {
      console.error("JWT creation error:", jwtError.message);
      return res.status(500).json({ message: ['Failed to generate token'] });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        email: newUser.email,
      },
      accessToken: token, // <-- Rename from `token` to `accessToken`
      refreshToken: jwt.sign({ id: newUser._id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d',
      }),
    });


  } catch (err) {
    console.error('Register Error:', err.message);
    res.status(500).json({ message: ['Unexpected server error'] });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

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

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,  // ✅ changed _id to id for frontend consistency
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
         has_taken_test: user.has_taken_test,
      },
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

