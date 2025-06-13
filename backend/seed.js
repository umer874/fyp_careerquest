require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Clear existing users (optional)
    await User.deleteMany();

    // Fake user data
    const users = [
      {
        firstName: 'Ali',
        lastName: 'Raza',
        email: 'ali@example.com',
        password: 'password123',
        dob: new Date('1995-06-15'),
        phone: '03001234567',
        coordinates: [67.001, 24.861], // [longitude, latitude]
        checked: true,
        fileName: 'ali_resume.pdf',
      },
      {
        firstName: 'Sara',
        lastName: 'Khan',
        email: 'sara@example.com',
        password: 'mypassword',
        dob: new Date('1998-11-22'),
        phone: '03111234567',
        coordinates: [74.345, 31.549],
        checked: true,
      },
      {
        firstName: 'Hamza',
        lastName: 'Iqbal',
        email: 'hamza@example.com',
        password: 'secure123',
        dob: new Date('2000-01-05'),
        phone: '03221234567',
        coordinates: [72.831, 33.684],
        checked: false,
      },
    ];

    // Hash passwords and save users
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
        password: hashedPassword,
      });
      await user.save();
    }

    console.log('✅ Seeding completed!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

seed();
