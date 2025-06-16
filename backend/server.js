require('dotenv').config();
const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS for Express
app.use(cors());
app.use(express.json());

const userRoutes= require('./routes/userRoutes');
app.use('/api/',userRoutes);


const portfolioRoutes=require('./routes/portfolio');
app.use('/api/portfolios', portfolioRoutes);

// Routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/', authRoutes);

const assessmentRoutes=require('./routes/assessment.routes');
app.use('/api/assessment', assessmentRoutes);

// Create HTTP server
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (update in production)
    methods: ["GET", "POST"],
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