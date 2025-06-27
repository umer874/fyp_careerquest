require('dotenv').config();
const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');

const app = express();

// Enable CORS for Express
const allowedOrigins = [
  "https://careerquestx.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/', userRoutes);

app.use('/api/jobs', jobRoutes);

const portfolioRoutes = require('./routes/portfolio');
app.use('/api/portfolios', portfolioRoutes);

// Routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/', authRoutes);

const assessmentRoutes = require('./routes/assessment.routes');
app.use('/api/assessment', assessmentRoutes);

// Create HTTP server
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: "https://careerquestx.vercel.app", // Allow frontend URL only
    methods: ["GET", "POST"],
    credentials: true, // Allows sending cookies with Socket.IO
  },
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    const PORT = process.env.PORT || 3001; // Use Render's PORT or fallback
    server.listen(PORT, () => {
      console.log(`Server and Socket.IO running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
